import { connectDB, Waitlist } from '@/lib/mongodb';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Log the environment variable status
console.log('API Key Status:', {
  resend: {
    exists: !!process.env.RESEND_API_KEY,
    length: process.env.RESEND_API_KEY?.length || 0,
    startsWith: process.env.RESEND_API_KEY?.substring(0, 3) || 'none'
  },
  kit: {
    apiKey: !!process.env.CONVERTKIT_API_KEY,
    formId: !!process.env.CONVERTKIT_FORM_ID
  }
});

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Phone number validation patterns
const phonePatterns: Record<string, { pattern: string, minLength: number, maxLength: number }> = {
  "+1": {
    pattern: "^[2-9]\\d{2}[2-9]\\d{2}\\d{4}$", // US/Canada: 10 digits, no leading 1
    minLength: 10,
    maxLength: 10
  },
  "+44": {
    pattern: "^7\\d{9}$", // UK: 10 digits starting with 7
    minLength: 10,
    maxLength: 10
  },
  // Default pattern for other countries
  "default": {
    pattern: "^\\d{6,15}$", // 6-15 digits
    minLength: 6,
    maxLength: 15
  }
};

// Validate phone number based on country code
function validatePhoneNumber(phoneNumber: string, countryCode: string): boolean {
  // Get the pattern for the country code or use default
  const patternInfo = phonePatterns[countryCode] || phonePatterns.default;
  
  // Check length
  if (phoneNumber.length < patternInfo.minLength || phoneNumber.length > patternInfo.maxLength) {
    return false;
  }
  
  // Check pattern
  const pattern = new RegExp(patternInfo.pattern);
  return pattern.test(phoneNumber);
}

// Function to add subscriber to Kit.com
async function addToConvertKit(email: string, firstName: string, fields: Record<string, string>) {
  if (!process.env.CONVERTKIT_API_KEY || !process.env.CONVERTKIT_FORM_ID) {
    throw new Error('Kit.com API keys missing');
  }
  
  // Kit.com's correct v4 API endpoint for subscribing to a form
  // Documentation: https://developers.kit.com/v4#forms-add-subscriber-to-form
  const url = `https://api.kit.com/v4/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`;
  
  // Log environment variables for debugging (redacted)
  console.log('Environment variables check:', {
    KIT_API_KEY_EXISTS: !!process.env.CONVERTKIT_API_KEY,
    KIT_API_KEY_PREFIX: process.env.CONVERTKIT_API_KEY?.substring(0, 4),
    KIT_FORM_ID: process.env.CONVERTKIT_FORM_ID,
    KIT_FORM_ID_IS_NUMERIC: !isNaN(Number(process.env.CONVERTKIT_FORM_ID)), // Check if form ID is numeric
  });
  
  // Prepare the request body according to the V4 API docs
  // Note: in v4 API, api_key is NOT in the body, it's only in the header
  const data: { 
    email: string; 
    first_name: string; 
    fields?: Record<string, string>;
  } = {
    email,
    first_name: firstName
  };
  
  // We need to add the custom fields if they exist
  if (Object.keys(fields).length > 0) {
    data.fields = fields;
  }
  
  try {
    console.log('Kit.com payload:', {
      email,
      first_name: firstName,
      fields_count: Object.keys(fields).length
    });
    
    // Make request to Kit.com API using the v4 header format
    console.log(`Making request to Kit.com v4 API: ${url}`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Kit-Api-Key': process.env.CONVERTKIT_API_KEY
      },
      body: JSON.stringify(data),
    });
    
    console.log('Kit.com API response status:', response.status);
    
    // Get response for logging/debugging
    const responseText = await response.text();
    console.log('Kit.com API response body:', responseText.substring(0, 200) + (responseText.length > 200 ? '...' : ''));
    
    // Parse response if it's JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = { raw: responseText };
      console.error('Failed to parse Kit.com response as JSON:', e);
    }
    
    if (!response.ok) {
      console.error('Non-OK response from Kit API:', {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseData
      });
      throw new Error(`Kit.com API error: ${response.status} - ${JSON.stringify(responseData)}`);
    }
    
    console.log('Kit.com API success! Subscriber added.');
    return responseData;
  } catch (error) {
    console.error('Kit.com API error:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    // Log the start of request processing
    console.log('API route hit, processing request...');
    console.log('Request headers:', Object.fromEntries(request.headers.entries()));
    
    // Parse the request body
    const body = await request.json();
    console.log('Received data:', body);
    
    const { email, name, company, countryCode, phoneNumber, goals, challenges } = body;

    // Validate required fields
    if (!email || !name || !phoneNumber || !goals || !challenges) {
      console.error('Missing required fields:', { email, name, phoneNumber, goals, challenges });
      return NextResponse.json(
        { message: 'Missing required fields', success: false },
        { status: 400 }
      );
    }

    // Validate phone number format
    if (!validatePhoneNumber(phoneNumber, countryCode || "+1")) {
      console.error('Invalid phone number format:', { phoneNumber, countryCode });
      return NextResponse.json(
        { message: 'Invalid phone number format', success: false },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('MongoDB connected successfully');

    // Check if email already exists
    const existingEntry = await Waitlist.findOne({ email });
    if (existingEntry) {
      console.log('Email already exists in waitlist:', email);
      return NextResponse.json(
        { 
          message: 'This email is already on our waitlist! We\'ll be in touch soon.', 
          success: true 
        },
        { status: 200 }
      );
    }

    // Format phone number for storage (ensure it's just digits)
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Create new waitlist entry
    console.log('Creating waitlist entry...');
    const waitlistEntry = await Waitlist.create({
      email,
      name,
      company,
      countryCode: countryCode || "+1",
      phoneNumber: formattedPhoneNumber,
      goals,
      challenges,
    });
    console.log('Waitlist entry created:', waitlistEntry);

    // Send to Kit.com (formerly ConvertKit)
    try {
      console.log('Attempting to add subscriber to Kit.com:', email);
      
      // Prepare custom fields for Kit.com
      const customFields = {
        company: company || '',
        phone: `${countryCode || "+1"} ${formattedPhoneNumber}`,
        goals: goals,
        challenges: challenges
      };
      
      // Add to Kit.com
      const kitResponse = await addToConvertKit(email, name, customFields);
      console.log('Kit.com subscription successful:', kitResponse);
    } catch (kitError) {
      console.error('Error adding to Kit.com:', kitError);
      // Continue execution even if Kit.com subscription fails
      if (kitError instanceof Error) {
        console.error('Kit.com error details:', {
          message: kitError.message,
          stack: kitError.stack,
          name: kitError.name,
        });
      }
    }

    // Optionally still send with Resend during transition (you can remove this later)
    if (process.env.RESEND_API_KEY) {
      try {
        console.log('Attempting to send confirmation email via Resend to:', email);
        const emailResponse = await resend.emails.send({
          from: 'Metrics Health <jc@metricshealth.com>',
          to: email,
          subject: 'Welcome to Metrics Health Waitlist!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333;">Welcome to Metrics Health!</h1>
              <p>Hi ${name},</p>
              <p>Thank you for joining our waitlist! We're excited to help you achieve your health goals.</p>
              <p>Here's what you shared with us:</p>
              <ul>
                <li><strong>Your Goals:</strong> ${goals}</li>
                <li><strong>Current Challenges:</strong> ${challenges}</li>
                <li><strong>Phone Number:</strong> ${countryCode} ${formattedPhoneNumber}</li>
                ${company ? `<li><strong>LinkedIn:</strong> <a href="${company}" target="_blank">${company}</a></li>` : ''}
              </ul>
              <p>We'll be in touch soon with more information about our program and how we can help you reach your goals.</p>
              <p>Best regards,<br>The Metrics Health Team</p>
            </div>
          `,
        });
        console.log('Resend email sent successfully:', emailResponse);
      } catch (emailError) {
        console.error('Error sending Resend email:', emailError);
        // Log the full error details
        if (emailError instanceof Error) {
          console.error('Resend email error details:', {
            message: emailError.message,
            stack: emailError.stack,
            name: emailError.name,
            cause: emailError.cause
          });
        }
        // Continue execution even if email fails
      }
    } else {
      console.error('RESEND_API_KEY is not configured');
    }

    console.log('Sending success response...');
    return NextResponse.json(
      { message: 'Successfully joined waitlist', success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('API Error:', error);
    // Log the full error details
    if (error instanceof Error) {
      console.error('Full error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        cause: error.cause
      });
    }
    return NextResponse.json(
      { 
        message: 'Error joining waitlist', 
        error: error.message,
        success: false 
      },
      { status: 500 }
    );
  }
} 
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
  convertkit: {
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

// Function to add subscriber to ConvertKit using V3 API
async function addToConvertKit(email: string, phoneNumber: string, firstName: string, lastName: string, goals: string, challenges: string, linkedinUrl: string) {
  if (!process.env.CONVERTKIT_API_KEY || !process.env.CONVERTKIT_FORM_ID) {
    console.error('ConvertKit configuration missing');
    return { success: false, message: 'ConvertKit configuration missing' };
  }

  try {
    const response = await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email: email,
        first_name: firstName,
        fields: {
          phone_number: phoneNumber,
          last_name: lastName,
          goals: goals,
          challenges: challenges,
          linkedin_url: linkedinUrl
        }
      }),
    });

    const data = await response.json();
    console.log('ConvertKit response:', data);

    if (data.subscription) {
      return {
        success: true,
        message: 'Added to ConvertKit successfully',
        data
      };
    } else {
      return {
        success: false,
        message: 'Failed to add to ConvertKit',
        error: data
      };
    }
  } catch (error) {
    console.error('Error adding to ConvertKit:', error);
    return {
      success: false,
      message: 'Error adding to ConvertKit',
      error
    };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received data:', body);

    const { email, name, company, countryCode, phoneNumber, goals, challenges, linkedinUrl } = body;
    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ');

    // Validate required fields
    if (!email || !name || !phoneNumber) {
      return NextResponse.json(
        { error: 'Email, name, and phone number are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone number format
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
    if (!phoneRegex.test(formattedPhoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
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
        { error: 'Email already exists in waitlist' },
        { status: 400 }
      );
    }

    // Create new waitlist entry
    console.log('Creating waitlist entry...');
    const waitlistEntry = await Waitlist.create({
      email,
      name,
      company,
      countryCode,
      phoneNumber: formattedPhoneNumber,
      goals,
      challenges,
      linkedinUrl
    });
    console.log('Waitlist entry created:', waitlistEntry);

    try {
      console.log('Attempting to add subscriber to ConvertKit:', email);
      
      // Add to ConvertKit with all fields
      const convertKitResult = await addToConvertKit(
        email,
        formattedPhoneNumber,
        firstName,
        lastName,
        goals,
        challenges,
        linkedinUrl
      );
      console.log('ConvertKit subscription result:', convertKitResult);
    } catch (ckError) {
      // Don't throw an error, just log it - form submission will continue
      console.error('Error adding to ConvertKit:', ckError);
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
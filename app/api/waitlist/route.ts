import { connectDB, Waitlist } from '@/lib/mongodb';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Log the Resend API key status (without exposing the actual key)
console.log('Resend API Key Status:', {
  exists: !!process.env.RESEND_API_KEY,
  length: process.env.RESEND_API_KEY?.length || 0,
  startsWith: process.env.RESEND_API_KEY?.substring(0, 3) || 'none'
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Log the start of request processing
    console.log('API route hit, processing request...');
    console.log('Request headers:', Object.fromEntries(request.headers.entries()));
    
    // Parse the request body
    const body = await request.json();
    console.log('Received data:', body);
    
    const { email, name, company, goals, challenges } = body;

    // Validate required fields
    if (!email || !name || !goals || !challenges) {
      console.error('Missing required fields:', { email, name, goals, challenges });
      return NextResponse.json(
        { message: 'Missing required fields', success: false },
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

    // Create new waitlist entry
    console.log('Creating waitlist entry...');
    const waitlistEntry = await Waitlist.create({
      email,
      name,
      company,
      goals,
      challenges,
    });
    console.log('Waitlist entry created:', waitlistEntry);

    // Send confirmation email
    if (process.env.RESEND_API_KEY) {
      try {
        console.log('Attempting to send confirmation email to:', email);
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
              </ul>
              <p>We'll be in touch soon with more information about our program and how we can help you reach your goals.</p>
              <p>Best regards,<br>The Metrics Health Team</p>
            </div>
          `,
        });
        console.log('Email sent successfully:', emailResponse);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Log the full error details
        if (emailError instanceof Error) {
          console.error('Email error details:', {
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
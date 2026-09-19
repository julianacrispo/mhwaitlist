"use client"

import Link from "next/link"
import Script from "next/script"

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Logo Header */}
        <div className="mb-10 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h4l2-6 4 12 2-9 2 3h4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-2xl font-bold tracking-tight">METRICS HEALTH</span>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Schedule Your Strategy Call</h1>
          <p className="text-lg text-gray-600 text-center mb-8">Choose a time that works for you to discuss your goals and transformation plan</p>
          
          <div className="rounded-xl overflow-hidden shadow-lg bg-white">
            <div className="flex flex-col md:flex-row h-[700px] md:h-[600px]">
              {/* Left side content for larger screens */}
              <div className="hidden md:block w-1/3 bg-blue-600 text-white p-8">
                <h2 className="text-2xl font-bold mb-4">What to Expect:</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-200 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Personal assessment of your health goals</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-200 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom roadmap based on your unique needs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-200 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Insights from our data-driven approach</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-200 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No pressure - just valuable information</span>
                  </li>
                </ul>
                
                <div className="mt-8 border-t border-blue-500 pt-6">
                  <p className="italic text-blue-100">
                    "Our strategy calls are the start of transformational journeys. We're excited to understand your unique goals."
                  </p>
                  <p className="mt-2 font-medium">— Juliana Crispo, Founder</p>
                </div>
              </div>
              
              {/* Calendly container - takes full width on mobile, 2/3 on desktop */}
              <div className="w-full md:w-2/3 h-full">
                {/* Calendly inline widget */}
                <div className="calendly-inline-widget h-full" data-url="https://calendly.com/metricshealthschedule/juliana-crispo-au-pair-intros-clone"></div>
                <Script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
              </div>
            </div>
          </div>
          
          {/* Mobile only what to expect section */}
          <div className="md:hidden mt-8 bg-blue-600 text-white p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">What to Expect:</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-200 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Personal assessment of your health goals</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-200 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Custom roadmap based on your unique needs</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-200 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Insights from our data-driven approach</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 
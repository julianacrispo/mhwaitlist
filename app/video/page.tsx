"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Script from "next/script"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function VideoPage() {
  const [showButton, setShowButton] = useState(false)
  const videoTimerRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  
  // Start timer when page loads
  useEffect(() => {
    videoTimerRef.current = setTimeout(() => {
      setShowButton(true);
    }, 15000); // 15 seconds
    
    return () => {
      if (videoTimerRef.current) {
        clearTimeout(videoTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Logo Header */}
        <div className="mb-10 flex justify-center">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h4l2-6 4 12 2-9 2 3h4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-2xl font-bold tracking-tight">METRICS HEALTH</span>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Your Transformation Starts Here</h1>
          <p className="text-lg text-gray-600 text-center mb-8">Watch this important message to learn how our approach can transform your health</p>
          
          <div className="rounded-xl overflow-hidden shadow-lg bg-white p-6">
            {/* Wistia Video */}
            <div className="relative aspect-video mb-6">
              <div className="relative w-full aspect-video mx-auto bg-gray-200 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-lg text-gray-600 mb-2">Wistia Video Placeholder</p>
                  <p className="text-sm text-gray-500">Replace this with your Wistia embed code</p>
                  {/* Example Wistia embed code structure (commented out) */}
                  {/* 
                  <script src="https://fast.wistia.com/embed/medias/YOUR_VIDEO_ID.jsonp" async></script>
                  <script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>
                  <div className="wistia_responsive_padding" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                    <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
                      <div className="wistia_embed wistia_async_YOUR_VIDEO_ID videoFoam=true" style={{ height: '100%', position: 'relative', width: '100%' }}>
                        <div className="wistia_swatch" style={{ height: '100%', left: 0, opacity: 1, overflow: 'hidden', position: 'absolute', top: 0, transition: 'opacity 200ms', width: '100%' }}>
                          <img src="https://fast.wistia.com/embed/medias/YOUR_VIDEO_ID/swatch" style={{ filter: 'blur(5px)', height: '100%', objectFit: 'contain', width: '100%' }} alt="" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                  */}
                </div>
              </div>
            </div>
            
            {/* Testimonial quote to add credibility */}
            <div className="mb-8 bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <svg className="h-8 w-8 text-blue-400 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div>
                  <p className="text-blue-800 italic mb-2">
                    "After struggling for years with fad diets and extreme workouts, Metrics Health showed me a sustainable approach. In 90 days, I saw improvements I never thought possible."
                  </p>
                  <p className="text-sm text-blue-600 font-medium">Rebecca K., Founder & CEO</p>
                </div>
              </div>
            </div>
            
            {/* CTA Button that appears after 15 seconds */}
            <div className="text-center">
              {showButton ? (
                <div className="animate-fade-in">
                  <Button 
                    onClick={() => router.push('/schedule')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-xl font-medium transition-transform hover:scale-105"
                    size="lg"
                  >
                    Apply for Your Strategy Call
                  </Button>
                  <p className="mt-3 text-sm text-gray-500">Limited spots available - schedule your call now</p>
                </div>
              ) : (
                <p className="text-gray-500 italic">Please watch the video to learn about our program...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
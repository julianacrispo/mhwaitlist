"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, X, Zap } from "lucide-react"
import { Toaster } from "react-hot-toast"

export default function PricingPage() {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 py-6">
        {/* Logo - Same as main page */}
        <div className="mb-6 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h4l2-6 4 12 2-9 2 3h4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-2xl font-bold tracking-tight">METRICS HEALTH</span>
          </Link>
        </div>

        {/* Pricing Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-4xl font-bold uppercase tracking-tight mb-3">Pricing Plans</h1>
          <p className="text-lg text-gray-300">
            Choose the perfect plan to help you reach your health goals on autopilot
          </p>
        </div>

        {/* Pricing Table */}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Plan */}
            <div className="bg-gray-800 border border-blue-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-xl font-semibold mb-2">BASIC</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$699</span>
                  <span className="text-gray-400 ml-1">/year</span>
                </div>
                <p className="mt-1 text-gray-400 text-sm">Training Only</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Access to all recipes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Access to all eating guides</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Access to all cooking guides</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Access to past office hour recordings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Monthly Live Group Calls With Juliana</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Basic community forum access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Custom workouts tailored for your goals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">App Access With Custom Workout Tracking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Daily Encouragement from your Coach</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex items-start gap-2">
                      <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm">Check in cadence with your Coach</span>
                        <p className="text-blue-400 mt-1 text-sm">Monthly</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex items-start gap-2">
                      <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm">1:1 Calls With Juliana</span>
                        <p className="text-blue-400 mt-1 text-sm">0</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex items-start gap-2">
                      <X className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-400">Customized Nutrition Plan</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                    Join Now
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Standard Plan */}
            <div className="bg-gray-800 border border-blue-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-xl font-semibold mb-2">STANDARD</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$1,999</span>
                  <span className="text-gray-400 ml-1">/year</span>
                </div>
                <p className="mt-1 text-gray-400 text-sm">Training & Nutrition</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Access to all recipes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Access to all eating guides</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Access to all cooking guides</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Access to past office hour recordings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Monthly Live Group Calls With Juliana</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Full community forum access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Custom workouts tailored for your goals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">App Access With Custom Workout Tracking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Daily Encouragement from your Coach</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex items-start gap-2">
                      <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm">Check in cadence with your Coach</span>
                        <p className="text-blue-400 mt-1 text-sm">Weekly</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex items-start gap-2">
                      <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm">1:1 Calls With Juliana</span>
                        <p className="text-blue-400 mt-1 text-sm">2</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex items-start gap-2">
                      <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Customized Nutrition Plan</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <div className="relative">
                    <div className="absolute -top-11 left-0 right-0 flex justify-center">
                      <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                        2 spots available
                      </div>
                    </div>
                    <Button className="w-full bg-white hover:bg-gray-100 text-gray-900 rounded-full">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* VIP Plan */}
            <div className="bg-gray-800 border-2 border-blue-500 rounded-xl overflow-hidden relative">
              <div className="absolute -top-4 right-6">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-lg">
                  Most Popular
                </div>
              </div>
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-xl font-semibold mb-2">VIP</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$3,999</span>
                  <span className="text-gray-400 ml-1">/year</span>
                </div>
                <p className="mt-1 text-gray-400 text-sm">Comprehensive Support</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Access to all recipes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Access to all eating guides</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Access to all cooking guides</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Access to past office hour recordings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Monthly Live Group Calls With Juliana</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Full community forum access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Custom workouts tailored for your goals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">App Access With Custom Workout Tracking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Daily Encouragement from your Coach</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex items-start gap-2">
                      <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm">Check in cadence with your Coach</span>
                        <p className="text-blue-400 mt-1 text-sm">Daily</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex items-start gap-2">
                      <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm">1:1 Calls With Juliana</span>
                        <p className="text-blue-400 mt-1 text-sm">4</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex items-start gap-2">
                      <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Customized Nutrition Plan</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <div className="relative">
                    <div className="absolute -top-11 left-0 right-0 flex justify-center">
                      <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                        1 spot available
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="mt-16 mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="relative flex">
              <div className="h-4 w-4 text-blue-200 animate-pulse">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-2 w-2 text-blue-400">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-300">Transform in 30 days or you don't pay</span>
          </div>
          <p className="text-md text-gray-300 mb-6">
            We're so confident in our approach that we offer a 30-day transformation guarantee. 
            If you don't see measurable results in your first month, we'll refund your payment.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
            Schedule a Free Consultation
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-md mb-1">How does the 30-day guarantee work?</h3>
              <p className="text-gray-300 text-sm">
                If you don't see measurable progress in your first 30 days while following our program, 
                we'll refund your payment in full. We track specific metrics to ensure you're making 
                progress toward your goals.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-md mb-1">Can I switch between plans?</h3>
              <p className="text-gray-300 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the 
                start of your next billing cycle.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-md mb-1">What's included in the bi-annual testing?</h3>
              <p className="text-gray-300 text-sm">
                Our Gold plan includes comprehensive health assessments twice a year. This 
                includes bloodwork analyzing over 500 biomarkers, medical-grade body composition testing, 
                and cardiovascular fitness evaluation to track your progress with precision.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} Metrics Health. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <Link href="/pricing" className="hover:text-gray-300">Pricing</Link>
            <Link href="#" className="hover:text-gray-300">Terms</Link>
            <Link href="#" className="hover:text-gray-300">Privacy</Link>
          </div>
        </footer>
      </div>
    </div>
  )
} 
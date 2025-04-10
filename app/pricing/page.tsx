"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check, X } from "lucide-react"
import { Toaster } from "react-hot-toast"

export default function PricingPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-gray-100">
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
        <div className="mx-auto max-w-3xl text-center mb-8">
          <h1 className="text-4xl font-bold uppercase tracking-tight mb-3">Pricing Plans</h1>
          <p className="text-lg text-gray-600">
            Choose the perfect plan to help you reach your health goals on autopilot
          </p>
        </div>

        {/* Pricing Table */}
        <div className="mx-auto max-w-5xl overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-3 mb-2">
              <div className="bg-white p-4 rounded-tl-xl font-semibold">
                {/* Empty cell */}
              </div>
              <div className="bg-gray-100 p-4 rounded-t-xl text-center">
                <h3 className="text-xl font-semibold">Training Only</h3>
                <div className="mt-2">
                  <span className="text-2xl font-bold">$259</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
                <p className="mt-1 text-gray-500 text-sm">Paid Annually</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-t-xl text-center">
                <h3 className="text-xl font-semibold">Training & Nutrition</h3>
                <div className="mt-2">
                  <span className="text-2xl font-bold">$619</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
                <p className="mt-1 text-gray-500 text-sm">Paid Annually</p>
              </div>
              <div className="relative pt-6">
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <div className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap shadow-md">
                    Most Popular
                  </div>
                </div>
                <div className="bg-pink-50 p-4 rounded-tr-xl text-center border-t-2 border-x-2 border-pink-400">
                  <h3 className="text-xl font-semibold">VIP</h3>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">$1039</span>
                    <span className="text-gray-500 text-sm">/mo</span>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm">Paid Annually</p>
                </div>
              </div>
            </div>

            {/* Feature Rows */}
            <div className="grid grid-cols-4 gap-3 border-b border-gray-200 py-2">
              <div className="p-3 flex items-center font-medium text-sm">
                All recipes
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center bg-pink-50 border-x-2 border-pink-400">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 border-b border-gray-200 py-2">
              <div className="p-3 flex items-center font-medium text-sm">
                All eating guides
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center bg-pink-50 border-x-2 border-pink-400">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 border-b border-gray-200 py-2">
              <div className="p-3 flex items-center font-medium text-sm">
                All cooking guides
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center bg-pink-50 border-x-2 border-pink-400">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 border-b border-gray-200 py-2">
              <div className="p-3 flex items-center font-medium text-sm">
                Access to past office hour recordings
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center bg-pink-50 border-x-2 border-pink-400">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 border-b border-gray-200 py-2">
              <div className="p-3 flex items-center font-medium text-sm">
                Monthly Live Group Calls With Juliana
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center bg-pink-50 border-x-2 border-pink-400">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 border-b border-gray-200 py-2">
              <div className="p-3 flex items-center font-medium text-sm">
                Community Forum Access
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center bg-pink-50 border-x-2 border-pink-400">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 border-b border-gray-200 py-2">
              <div className="p-3 flex items-center font-medium text-sm">
                Custom workouts tailored for your goals
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center bg-pink-50 border-x-2 border-pink-400">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 border-b border-gray-200 py-2">
              <div className="p-3 flex items-center font-medium text-sm">
                App Access With Custom Workout Tracking + Health Monitoring
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center bg-pink-50 border-x-2 border-pink-400">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 border-b border-gray-200 py-2">
              <div className="p-3 flex items-center font-medium text-sm">
                Daily Encouragement from your Coach
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center bg-pink-50 border-x-2 border-pink-400">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 border-b border-gray-200 py-2">
              <div className="p-3 flex items-center font-medium text-sm">
                Check in cadence with you dedicated Coach
              </div>
              <div className="p-3 flex justify-center items-center">
                <span className="text-xs font-medium">Monthly</span>
              </div>
              <div className="p-3 flex justify-center items-center">
                <span className="text-xs font-medium">Weekly</span>
              </div>
              <div className="p-3 flex justify-center items-center bg-pink-50 border-x-2 border-pink-400">
                <span className="text-xs font-medium">Daily</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 border-b border-gray-200 py-2">
              <div className="p-3 flex items-center font-medium text-sm">
                1:1 Calls With Juliana
              </div>
              <div className="p-3 flex justify-center items-center">
                <span className="text-xs font-medium">0</span>
              </div>
              <div className="p-3 flex justify-center items-center">
                <span className="text-xs font-medium">2</span>
              </div>
              <div className="p-3 flex justify-center items-center bg-pink-50 border-x-2 border-pink-400">
                <span className="text-xs font-medium">4</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 py-2">
              <div className="p-3 flex items-center font-medium text-sm">
                Customized Nutrition Plan
              </div>
              <div className="p-3 flex justify-center items-center">
                <X className="h-4 w-4 text-gray-300" />
              </div>
              <div className="p-3 flex justify-center items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <div className="p-3 flex justify-center items-center bg-pink-50 border-x-2 border-pink-400 border-b-2">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="grid grid-cols-4 gap-3 mt-3">
              <div className="p-3"></div>
              <div className="p-3 flex justify-center">
                <Button variant="outline" size="sm" className="w-full">Get Started</Button>
              </div>
              <div className="p-3 flex justify-center">
                <Button variant="outline" size="sm" className="w-full">Get Started</Button>
              </div>
              <div className="p-3 flex justify-center">
                <Button size="sm" className="w-full bg-pink-500 hover:bg-pink-600">Get Started</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="mt-16 mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="relative flex">
              <div className="h-4 w-4 text-pink-200 animate-pulse">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-2 w-2 text-pink-400">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">Transform in 30 days or you don't pay</span>
          </div>
          <p className="text-md text-gray-600 mb-6">
            We're so confident in our approach that we offer a 30-day transformation guarantee. 
            If you don't see measurable results in your first month, we'll refund your payment.
          </p>
          <Button size="default" className="bg-pink-500 hover:bg-pink-600">
            Schedule a Free Consultation
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-md mb-1">How does the 30-day guarantee work?</h3>
              <p className="text-gray-600 text-sm">
                If you don't see measurable progress in your first 30 days while following our program, 
                we'll refund your payment in full. We track specific metrics to ensure you're making 
                progress toward your goals.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-md mb-1">Can I switch between plans?</h3>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the 
                start of your next billing cycle.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-md mb-1">What's included in the bi-annual testing?</h3>
              <p className="text-gray-600 text-sm">
                Our Gold plan includes comprehensive health assessments twice a year. This 
                includes bloodwork analyzing over 500 biomarkers, medical-grade body composition testing, 
                and cardiovascular fitness evaluation to track your progress with precision.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} Metrics Health. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <Link href="/pricing" className="hover:text-gray-700">Pricing</Link>
            <Link href="#" className="hover:text-gray-700">Terms</Link>
            <Link href="#" className="hover:text-gray-700">Privacy</Link>
          </div>
        </footer>
      </div>
    </div>
  )
} 
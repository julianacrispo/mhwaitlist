"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast, Toaster } from "react-hot-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const challengeOptions = [
  "Weight management",
  "Low energy",
  "Poor sleep",
  "Stress",
  "Time constraints",
  "Meal planning",
  "Previous diet failures",
  "Other"
]

export default function ApplyPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    countryCode: "+1",
    phoneNumber: "",
    goals: "",
    challenges: [] as string[]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Get email from URL query parameter (set by Calendly)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const email = params.get('email')
    if (email) {
      setFormData(prev => ({ ...prev, email }))
    }
  }, [])
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to submit application')
      }
      
      // Show success message
      setShowSuccess(true)
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        router.push('/')
      }, 3000)
      
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Error submitting application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleChallengeChange = (challenge: string) => {
    setFormData(prev => {
      const challenges = prev.challenges.includes(challenge)
        ? prev.challenges.filter(c => c !== challenge)
        : [...prev.challenges, challenge]
      return { ...prev, challenges }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <Toaster position="top-center" />
      
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
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Complete Your Application</h1>
          <p className="text-lg text-gray-600 text-center mb-8">Help us understand your goals so we can prepare for your strategy call</p>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">Personal Information</h2>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Jane Smith"
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company"
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <Label htmlFor="countryCode">Code</Label>
                    <Select 
                      name="countryCode" 
                      value={formData.countryCode}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, countryCode: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="+1" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+44">+44</SelectItem>
                        <SelectItem value="+61">+61</SelectItem>
                        <SelectItem value="+33">+33</SelectItem>
                        <SelectItem value="+49">+49</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-3">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="555-123-4567"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Goals Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">Your Health Goals</h2>
                
                <div>
                  <Label htmlFor="goals">What are your primary health goals?</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    placeholder="I want to..."
                    className="mt-1 min-h-[100px]"
                    required
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">What challenges have you faced? (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {challengeOptions.map(challenge => (
                      <div key={challenge} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`challenge-${challenge}`}
                          checked={formData.challenges.includes(challenge)}
                          onChange={() => handleChallengeChange(challenge)}
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`challenge-${challenge}`}>{challenge}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Application'}
                </Button>
                <p className="text-center text-sm text-gray-500 mt-2">
                  We're excited to speak with you on your scheduled call!
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Application Submitted!</DialogTitle>
            <DialogDescription className="text-center">
              Thank you! Your application has been received and we will confirm your call shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center my-4">
            <div className="rounded-full bg-green-100 p-3">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p className="text-center text-gray-500">Redirecting you to the homepage...</p>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
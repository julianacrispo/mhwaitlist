"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "react-hot-toast"

// Common country codes
const countryCodes = [
  { code: "+1", country: "US/Canada" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+64", country: "New Zealand" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
  { code: "+91", country: "India" },
  { code: "+52", country: "Mexico" },
  { code: "+55", country: "Brazil" },
  { code: "+27", country: "South Africa" },
  { code: "+971", country: "UAE" },
  { code: "+65", country: "Singapore" },
  { code: "+82", country: "South Korea" },
]

// Phone number validation patterns for different country codes
const phonePatterns = {
  "+1": {
    pattern: "^[2-9]\\d{2}[2-9]\\d{2}\\d{4}$", // US/Canada: 10 digits, no leading 1
    example: "Example: 5551234567",
    minLength: 10,
    maxLength: 10
  },
  "+44": {
    pattern: "^7\\d{9}$", // UK: 10 digits starting with 7
    example: "Example: 7123456789",
    minLength: 10,
    maxLength: 10
  },
  // Default pattern for other countries
  "default": {
    pattern: "^\\d{6,15}$", // 6-15 digits
    example: "Enter 6-15 digits",
    minLength: 6,
    maxLength: 15
  }
}

// Get pattern info based on country code
const getPatternInfo = (countryCode) => {
  return phonePatterns[countryCode] || phonePatterns.default;
}

export function WaitlistModal({ isOpen, onClose, email, onSubmit }) {
  const [formData, setFormData] = useState({
    email: email || "",
    name: "",
    company: "",
    countryCode: "+1",
    phoneNumber: "",
    goals: "",
    challenges: "",
  })
  const [phoneError, setPhoneError] = useState("")
  const patternInfo = getPatternInfo(formData.countryCode)

  useEffect(() => {
    setFormData(prev => ({ ...prev, email }))
  }, [email])

  // Reset phone error when country code changes
  useEffect(() => {
    setPhoneError("")
    // Clear phone number when country code changes to avoid validation issues
    setFormData(prev => ({ ...prev, phoneNumber: "" }))
  }, [formData.countryCode])

  const validatePhoneNumber = () => {
    const { phoneNumber, countryCode } = formData
    const patternInfo = getPatternInfo(countryCode)
    
    // Remove any non-digit characters for validation
    const digitsOnly = phoneNumber.replace(/\D/g, '')
    
    if (!digitsOnly) {
      setPhoneError("Phone number is required")
      return false
    }
    
    if (digitsOnly.length < patternInfo.minLength || digitsOnly.length > patternInfo.maxLength) {
      setPhoneError(`Phone number should be ${patternInfo.minLength} digits for ${countryCode}`)
      return false
    }
    
    const pattern = new RegExp(patternInfo.pattern)
    if (!pattern.test(digitsOnly)) {
      setPhoneError(`Invalid phone number format for ${countryCode}`)
      return false
    }
    
    setPhoneError("")
    return true
  }

  const handlePhoneChange = (e) => {
    // Allow only digits, spaces, dashes, and parentheses
    const value = e.target.value.replace(/[^\d\s\-()]/g, '')
    setFormData({ ...formData, phoneNumber: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate phone number
    const isPhoneValid = validatePhoneNumber()
    if (!isPhoneValid) {
      toast.error("Please enter a valid phone number")
      return
    }
    
    console.log('Modal form data being submitted:', formData)
    try {
      // Format phone number to remove any non-digit characters before submitting
      const formattedData = {
        ...formData,
        phoneNumber: formData.phoneNumber.replace(/\D/g, '')
      }
      
      await onSubmit(formattedData)
      console.log('Form submission successful')
      onClose()
    } catch (error) {
      console.error('Error in modal submit:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for Coaching</DialogTitle>
          <DialogDescription>
            We only accept clients we can truly transform. Please take a minute to tell us about yourself and your goals below. 
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex gap-2">
              <Select 
                value={formData.countryCode} 
                onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.code} {country.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex-1">
                <Input
                  id="phoneNumber"
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  onBlur={validatePhoneNumber}
                  placeholder={patternInfo.example}
                  maxLength={patternInfo.maxLength}
                  className={phoneError ? "border-red-500" : ""}
                />
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">LinkedIn Profile URL or Occupation (We're a community of high-achievers so we want to know what you do)</Label>
            <Input
              id="company"
              type="url"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="goals">What are your main health goals?</Label>
            <Textarea
              id="goals"
              required
              value={formData.goals}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              placeholder="e.g., Weight loss, muscle gain, better energy levels..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="challenges">What's your biggest health challenge right now?</Label>
            <Textarea
              id="challenges"
              required
              value={formData.challenges}
              onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
              placeholder="e.g., Lack of time, stress, inconsistent routine..."
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 
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
import { CheckIcon, X } from "lucide-react"
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toast } from "react-hot-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

// Health goal options
const healthGoalOptions = [
  "Lose Fat",
  "Build Muscle",
  "Tone & Sculpt My Body",
  "Improve My Metabolism",
  "Improve My Energy Levels",
  "Increase Strength"
]

// Challenge options
const challengeOptions = [
  "My attempts aren't working and I need help",
  "I don't have the time for traditional methods",
  "I'm uncertain about what to do to reach the goal"
]

// Add Kit.com form ID for direct embed script
const KIT_FORM_ID = '1e4c7e7c60'

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
    challenges: [],
  })
  const [phoneError, setPhoneError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [challengesOpen, setChallengesOpen] = useState(false)
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

  const handleChallengeToggle = (challenge) => {
    setFormData(prev => {
      const currentChallenges = [...prev.challenges]
      if (currentChallenges.includes(challenge)) {
        return {
          ...prev,
          challenges: currentChallenges.filter(c => c !== challenge)
        }
      } else {
        return {
          ...prev,
          challenges: [...currentChallenges, challenge]
        }
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate phone number
    const isPhoneValid = validatePhoneNumber()
    if (!isPhoneValid) {
      toast.error("Please enter a valid phone number")
      return
    }

    // Validate that at least one challenge is selected
    if (formData.challenges.length === 0) {
      toast.error("Please select at least one challenge")
      return
    }
    
    // Set submitting state
    setIsSubmitting(true)
    
    try {
      // Format challenges for submission
      const challengesFormatted = formData.challenges.join(', ')
      
      // Format phone number to remove any non-digit characters before submitting
      const formattedData = {
        ...formData,
        phoneNumber: formData.phoneNumber.replace(/\D/g, ''),
        challenges: challengesFormatted
      }
      
      // Submit the data to the API
      await onSubmit(formattedData)
      
      // Let the parent component handle success messaging
      console.log('Form submission successful')
      onClose()
    } catch (error) {
      console.error('Error in form submission:', error)
      toast.error("There was an error submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
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
            <Label htmlFor="name">Name</Label>
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
            <Label htmlFor="goals">What is your #1 goal right now?</Label>
            <Select
              id="goals"
              required
              value={formData.goals}
              onValueChange={(value) => setFormData({ ...formData, goals: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your primary goal" />
              </SelectTrigger>
              <SelectContent>
                {healthGoalOptions.map((goal) => (
                  <SelectItem key={goal} value={goal}>
                    {goal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>What are your challenges reaching this goal without 1:1 support? (Select all that apply)</Label>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between h-auto min-h-10 py-2"
                >
                  {formData.challenges.length > 0 ? (
                    <div className="flex flex-wrap gap-1 mr-2">
                      {formData.challenges.map(challenge => (
                        <Badge 
                          variant="secondary" 
                          key={challenge}
                          className="mr-1 mb-1"
                        >
                          {challenge}
                          <button
                            className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleChallengeToggle(challenge);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Select challenges...</span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[300px]">
                {challengeOptions.map(challenge => (
                  <DropdownMenuItem
                    key={challenge}
                    onClick={() => handleChallengeToggle(challenge)}
                    className={cn(
                      "flex items-center justify-between cursor-pointer py-2",
                      formData.challenges.includes(challenge) && "bg-accent font-medium"
                    )}
                  >
                    <span>{challenge}</span>
                    {formData.challenges.includes(challenge) && (
                      <CheckIcon className="h-4 w-4 ml-2 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 
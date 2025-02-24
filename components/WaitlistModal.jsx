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

export function WaitlistModal({ isOpen, onClose, email, onSubmit }) {
  const [formData, setFormData] = useState({
    email: email || "",
    name: "",
    company: "",
    goals: "",
    challenges: "",
  })

  useEffect(() => {
    setFormData(prev => ({ ...prev, email }))
  }, [email])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Modal form data being submitted:', formData)
    try {
      await onSubmit(formData)
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
          <DialogTitle>Join Our Waitlist</DialogTitle>
          <DialogDescription>
            Tell us a bit more about yourself to help us personalize your experience.
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
            <Label htmlFor="company">Company (Optional)</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
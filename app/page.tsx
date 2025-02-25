"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { WaitlistModal } from "@/components/WaitlistModal"
import { Toaster } from "react-hot-toast"

const mainTestimonials = [
  {
    name: "Arryn G.",
    role: "Founder",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1683379965641-ItA9j0xZXOVaorO2L4Ujp91oSz3aAs.jpeg",
    quote:
      "In 16 weeks I became the strongest and leanest version of myself. I'm now pregnant and I have amazing habits and an understanding of my body that I can use for life.",
  },
  {
    name: "Samantha O.",
    role: "Executive Director",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1699468920068-iJhTVRpZPBNYJyjw6I6QyMuuZZRLBG.jpeg",
    quote:
    "Prior to Metrics Health, I struggled to find balance. In the past year I lost 20 lbs naturally while juggling a career and 3 kids. What's been a game changer is creating habits my family and I can use for life.",  },
  {
    name: "Rebecca K.",
    role: "Founder & CEO",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1647997479940-BUrD4dnrSbg5pZf9s93fib509uPDHo.jpeg",
    quote:
      "Metrics Health has helped me strike the balance I need to achieve health goals while pursuing my other ambitions. I initally started with the goal of fat loss but that has expanded to improving cardio health and cognitive function in a measurable way.",
  },
  {
    name: "Bethany P.",
    role: "Founder",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-21%20at%2010.35.29%E2%80%AFAM-liWI2wrbyUuH0ncZ8WXFbUeozYpgQ9.png",
    quote:
      "In the span of 5 weeks during my busiest work season I lost 3% bodyfat and gained 3 LBS of lean body mass. I have worked with many coaching services in the past but approaching habits this way was transformative for me.",
  },
  {
    name: "Trina L.",
    role: "Director",
    image: "/placeholder.svg",
    quote:
      "Metrics Health has completely transformed the way I look at food, my body and the scale. As a result, I have made steady progress on goals and I am a much more balanced and healthy person.",
  },
  {
    name: "Lisa D",
    role: "Family Medical Doctor",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lisa-CNtVLXZaYK8bF5YXJNOYjjTVdgTT5y.jpeg",
    quote:
      "Juliana is taking her insights from years as a busy executive, Mom and pro physique athlete and pairing that with the latest research to help ambitius people measure what truly matters. I am excited to see how many people Metrics Health can help.",
  }
]

const finalRowTestimonials = [
  {
    name: "Alyson C.",
    role: "Non Profit Executive",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alyson-aAsuqDQT6TVPAj2ZqDArSFU9yvQ6LD.jpeg",
    quote:
      "Prior to Metrics Health I had lost 12 lbs of muscle in a year on Dexascan. Clearly my efforts to lose fat weren't working. In the span of the first 6 weeks I added 3 lbs of muscle and lost 4 lbs of body fat. I am now armed with habits I can use for life.",
  },
  {
    name: "Marina M.",
    role: "Founder & Youtuber",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/marina-I2HgSWKgb1b6qfQjYOBfmhKkZqS7JN.jpeg",
    quote:
      "Juliana is the person I ask when I want to understand habit psychology or the trends on the edge of health. With Metrics Health, she is bringing both together in a way that's truly unique and exciting.",
  },
  {
    name: "Ivanna B.",
    role: "Wellness Tech Founder",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ivanna-x5NLBXihbcuSWyRq10Khb9QSBQPYWV.jpeg",
    quote:
      "As a Triathlete, Founder and Mom, I was struggling to take my triathlon game to the next level. Juliana immediately pointed me in the right direction and I'll be doing my first Ironman at 39.",
  },
  {
    name: "Karla R.",
    role: "Healthcare Strategist",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/karla-Z4HOnKhl0PYTRNLZ4JxCdiD9Y0TMY3.jpeg",
    quote:
      "The data-driven approach combined with holistic health insights has been revolutionary for our organization's growth and team wellbeing.",
  },
  {
    name: "Sarah M.",
    role: "Tech Executive",
    image: "/placeholder.svg",
    quote:
      "The combination of data-driven insights and personalized coaching has helped me achieve results I never thought possible. In just 12 weeks, I've seen dramatic improvements in both my physical and mental performance.",
  },
  {
    name: "Rachel P.",
    role: "Startup Founder",
    image: "/placeholder.svg",
    quote:
      "As a busy founder, I needed a program that could adapt to my unpredictable schedule. Metrics Health provided exactly that, plus the accountability and structure I needed to stay consistent.",
  },
  {
    name: "Jennifer K.",
    role: "Investment Banker",
    image: "/placeholder.svg",
    quote:
      "The program's focus on measurable results and sustainable habits has been transformative. I've lost 15 lbs while maintaining my energy levels through long work days.",
  },
  {
    name: "Michelle D.",
    role: "Product Leader",
    image: "/placeholder.svg",
    quote:
      "What sets Metrics Health apart is their scientific approach to wellness. Every recommendation is backed by data, and the results speak for themselves.",
  },
  {
    name: "Catherine L.",
    role: "VC Partner",
    image: "/placeholder.svg",
    quote:
      "I've tried many health programs, but none have been as effective or sustainable as this one. The personalized approach and focus on habits has made all the difference.",
  },
  {
    name: "Alexandra W.",
    role: "Medical Director",
    image: "/placeholder.svg",
    quote:
      "As a physician, I appreciate the evidence-based approach. The program's integration of health metrics with lifestyle changes is truly innovative and effective.",
  },
  {
    name: "Emily R.",
    role: "Finance Director",
    image: "/placeholder.svg",
    quote:
      "The program's data-driven approach helped me optimize my workouts and nutrition while managing a demanding career. I've achieved better results in 3 months than I did in years of traditional programs.",
  },
  {
    name: "Victoria H.",
    role: "Tech Entrepreneur",
    image: "/placeholder.svg",
    quote:
      "As someone who loves data and measurable outcomes, Metrics Health's approach resonated with me immediately. The personalized insights and actionable strategies have transformed my health journey.",
  },
  {
    name: "Diana M.",
    role: "Corporate Attorney",
    image: "/placeholder.svg",
    quote:
      "Despite my packed schedule, the program's flexibility and evidence-based methods helped me achieve my health goals. The focus on sustainable habits has been key to maintaining my results.",
  }
]

const allTestimonials = [...mainTestimonials, ...finalRowTestimonials]
const testimonialsFiltered = allTestimonials.filter((t) => !["Suzy", "Kara B."].includes(t.name))

const faqItems = [
  {
    question: "How is Metrics Health different from other programs?",
    answer:
      "Metrics Health is specifically designed for busy, high-achieving women, focusing on sustainable habits and data-driven results. Our program adapts to your lifestyle, ensuring you can reach your health goals without disrupting your busy schedule.",
  },
  {
    question: "How much time do I need to commit to the program?",
    answer:
      "Our program is flexible and can be tailored to your schedule. Most participants find that dedicating a minimum of 10 minutes a day is sufficient to see results. Best results are achieved when combined with dedicated custom exercise sessions totaling 90 minutes spread throughout the week",
  },
  {
    question: "How much does it cost?",
    answer:
      "Investment in the program starts in the high 4 figures. This is explained by the diagnostic testing and high level of service and customization provided to get clients life changing results",
  },
  {
    question: "What kind of results can I expect?",
    answer:
      "While results vary, many of our clients report noticeable improvements in energy levels in the first 3 days. In 21 days they see decreases in bodyfat and close fitting loser. By 4 weeks, they notice a more toned looking physique. Clients also report improvements in metabolism, fertility, mood, immunne function, and lower stress levels.",
  },
  {
    question: "Is this program suitable for beginners?",
    answer:
      "Yes. Metrics Health is designed to accommodate all fitness levels, from beginners to advanced and even PRO level athletes. Our personalized data-driven approach ensures that you're working at a level that's challenging yet achievable for you.",
  },
  {
    question: "How does the 7-day guarantee work?",
    answer:
      "We're confident in our program's effectiveness. If you don't notice a difference in your energy levels, sleep quality, or overall well-being within the first 7 days, we'll refund your investment in full.",
  }
]

interface WaitlistFormData {
  email: string
  name: string
  company?: string
  goals: string
  challenges: string
}

export default function Home() {
  const [email, setEmail] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleJoinWaitlist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const emailValue = email.trim()
    if (emailValue) {
      setIsModalOpen(true)
    } else {
      toast.error('Please enter your email address')
    }
  }

  const handleSubmit = async (formData: WaitlistFormData) => {
    setIsSubmitting(true)
    try {
      console.log('Submitting form data:', formData)
      
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist')
      }

      toast.success('Successfully joined the waitlist! Check your email for confirmation.')
      setIsModalOpen(false)
      setEmail("")
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error(error instanceof Error ? error.message : 'Error joining waitlist. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-gray-100">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 py-8">
        {/* Logo */}
        <div className="mb-20 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-100 p-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
              </svg>
            </div>
            <span className="text-2xl font-bold">METRICS HEALTH</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-2xl pt-8 text-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2">
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
                <span className="text-sm text-gray-500">Notice the difference in 7 days or you don't pay</span>
              </div>
              <h1 className="font-bold text-[2.75rem] uppercase leading-[0.85] tracking-[-0.03em] lg:text-[3.5rem]">
                HOW HIGH-ACHIEVINGWOMEN REACH HEALTH GOALS ON AUTOPILOT
              </h1>
            </div>

            <div className="space-y-6">
              <form onSubmit={handleJoinWaitlist} className="flex justify-center gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 max-w-xs rounded-xl bg-blue-100/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit" 
                  className="h-12 rounded-xl bg-black px-8 text-white hover:bg-black/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </Button>
              </form>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex -space-x-3">
                    {testimonialsFiltered.slice(0, 4).map((testimonial, index) => (
                      <Image
                        key={index}
                        src={testimonial.image || "/placeholder.svg"}
                        alt={`Team member ${index + 1}`}
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600">Loved by 50+ founders and execs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="mt-24 px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonialsFiltered.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
                  <div className="flex items-start mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover mr-4 flex-shrink-0"
                    />
                    <div>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 text-sm flex-grow">{testimonial.quote}</blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-32 px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-6 text-center text-sm text-gray-500">
        Metrics Health International Copyright 2025
      </footer>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={email}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
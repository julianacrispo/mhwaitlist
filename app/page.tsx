"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { WaitlistModal } from "@/components/WaitlistModal.jsx"
import { Toaster } from "react-hot-toast"
import { AnimatedText } from "@/components/AnimatedText"

const mainTestimonials = [
  {
    name: "Arryn G.",
    role: "Founder",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1683379965641-ItA9j0xZXOVaorO2L4Ujp91oSz3aAs.jpeg",
    quote:
      "For years I was dieting and never making any progress. In 16 weeks, I became the strongest and leanest verion of myself just in time for my first pregnancy. I finally understand my body and built foundational sustainable habits I can use for life.",
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
    image: "https://c67qkd4jojiixsgq.public.blob.vercel-storage.com/trinaJPEG-wmHQeid6YFsCADKCaDhVWtOLTYQRMb.JPEG",
    quote: "Metrics Health has completely transformed the way I look at health for the better. What worked in my 20s no longer works in my 40s and I've been able to achieve my goals despite some of life's craziest seasons."
  },
  {
    name: "Lisa D.",
    role: "Family Medical Doctor",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lisa-CNtVLXZaYK8bF5YXJNOYjjTVdgTT5y.jpeg",
    quote:
      "Juliana is taking her insights from years as a busy executive, Mom and pro physique athlete and pairing that with the latest research to help ambitious people measure what truly matters. I recommend Metrics Health to my busy, working mom patients."
  }
]

const finalRowTestimonials = [
  {
    name: "Alyson C.",
    role: "Non Profit Executive",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alyson-aAsuqDQT6TVPAj2ZqDArSFU9yvQ6LD.jpeg",
    quote:
      "Prior to Metrics Health I had lost 12 lbs of muscle in a year on Dexascan. Clearly my efforts to lose fat weren't working. In the span of the first 6 weeks I added 3 lbs of muscle and lost 4 lbs of body fat. I am now hooked on the process and armed with habits I can use for life."
  },
  {
    name: "Marina M.",
    role: "Founder & Youtuber",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/marina-I2HgSWKgb1b6qfQjYOBfmhKkZqS7JN.jpeg",
    quote:
      "Juliana has been a go-to resource for ambitious women to find balance with their health goals on Youtube for a while now. With Metrics Health, she is bringing it all together in a way that's truly unique, actionable, and exciting for the modern woman."
  },
  {
    name: "Ivanna B.",
    role: "Founder",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ivanna-x5NLBXihbcuSWyRq10Khb9QSBQPYWV.jpeg",
    quote:
      "As a Mom, Founder and new Triathlete, I wanted to take my triathlon game to the next level. Metrics Health got me going in the right direction and I'll be doing my first Ironman at 39. My times, performance and recovery has never been better."
  },
  {
    name: "Karla R.",
    role: "Founder",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/karla-Z4HOnKhl0PYTRNLZ4JxCdiD9Y0TMY3.jpeg",
    quote:
      "The results are exciting and transformative not only for individual women but for women's health. There has never been a better time to join Metrics Health."
  },
  {
    name: "Suzy R.",
    role: "Business Owner",
    image: "https://c67qkd4jojiixsgq.public.blob.vercel-storage.com/suzy-CwwpTzOsOzDCWi4gVeGg0CxYW0RfC5.jpeg",
    quote:
      "I've had many successful attempts at fat loss but no successful attempts at managing to keep it off. After speaking with Metrics Health it became clear that this approach was different. I was initially skeptical but after months of progress and results I can confidently say that this approach is different and I don't see the weight ever coming back on."
  },
  {
    name: "Kara F.",
    role: "Managing Director",
    image: "https://c67qkd4jojiixsgq.public.blob.vercel-storage.com/kara-dAd14NxoHHhOrgdq7hmcUXHjaDiDUj.jpg",
    quote:
      "I had shopped multiple executive health coaching programs prior to joining Metrics Health and a year in I can honestly say I'm so glad I joined this one. I've lost the post partum weight, gained strength, become my most vibrant and healthiest self and done so all while growing my business and being the Mom I want to be. Metrics truly gets the needs of ambitious women like no other."
  },
  {
    name: "Krissy H.",
    role: "Founder",
    image: "https://c67qkd4jojiixsgq.public.blob.vercel-storage.com/krissy-xCchKKc04UxGJzWgUI0B4rvhTDvAYY.jpeg",
    quote:
      "During the span of 6 months I grew my new business from 0 to multiple 7 figures. Metrics Health helped me navigate an extremely busy time in my life so that I didn't go backwards. I've been able to put in place systems to help me stay healthy despite the chaos of early stage growth."
  },
  {
    name: "Denise D.",
    role: "Founder",
    image: "https://c67qkd4jojiixsgq.public.blob.vercel-storage.com/denise-6hB1cidNBnzuehJe33p5axpK5GcN2b.jpeg",
    quote:
      "My body wasn't working as well as it had prior to having my daughter and I wanted to feel and look like myself again. Metrics Health helped me troubleshoot the issues I was facing and put in place the nutrition to feel like myself again. I am gearing up for my second pregnancy and am so glad I have Metrics Health in my corner through the process."
  },
  {
    name: "Victoria N.",
    role: "Healthcare Executive",
    image: "https://c67qkd4jojiixsgq.public.blob.vercel-storage.com/victoria-TnWGftYbanqrcBIA1O7cn0VT69bnqa.jpeg",
    quote:
      "As an executive in one of the top healthcare companies in the world, my health was a dumpster fire due to the lifestyle. I needed accountability, metrics and goals to get back on track. Now at 50 I can honestly say I feel better than my 30s. I also don't look like I'm 50 which is a big plus."
  },
  {
    name: "Ida R.",
    role: "Technology Director",
    image: "https://c67qkd4jojiixsgq.public.blob.vercel-storage.com/ida-i2anCD6wa8yGjedQa5Mdc9tpR2ABgY.png",
    quote:
      "I spent years spinning my wheels trying to do what I thought was best for my body and not getting the results I wanted. Within weeks I got better results than the years I spent trying on my own. If you want to look better than you ever had before in your 40's + then Metrics Health is the way to go."
  },
  {
    name: "Stacey M.",
    role: "Founder",
    image: "https://c67qkd4jojiixsgq.public.blob.vercel-storage.com/stacey-kyoUdQtmtklxatn1NSdu3PTVcQxkye.jpeg",
    quote:
      "This is the best program I have used in terms of results for time spent. Metrics Health has cracked the code for high-achieving women. I am actually motivated to do the things I know are good for my health which has been a game changer for me."
  },
  {
    name: "Kasey L.",
    role: "Founder",
    image: "https://c67qkd4jojiixsgq.public.blob.vercel-storage.com/kasey-cnxhy0ROafEoHS2ztrDI4qo4Bvqggy.jpeg",
    quote:
      "Metrics Health is taking a decade of experiments and insights and distilling them into protocols that will move the needle most for the individual. The approach is realistic and maintainable. As a Mom of soon-to-be 2 kiddos, I'm glad to have Metrics Health in my corner."
  },
  {
    name: "Katerina L.",
    role: "Founder & CEO",
    image: "https://c67qkd4jojiixsgq.public.blob.vercel-storage.com/katerina-DpTKAqBo2DExcfrocZ6HKHsUjXpVFM.jpeg",
    quote:
      "My company focuses on preventing burnout in employees using Neuroscience so I was excited to see Metrics Health had developed an approach using what we know about health. What Juliana knows is that the issue isn't know what to do, it's knowing how to make it a habit and that's where Metrics Health shines."
  }
]

const allTestimonials = [...mainTestimonials, ...finalRowTestimonials]
const testimonialsFiltered = allTestimonials.filter((t) => !["Suzy"].includes(t.name))

const faqItems = [
  {
    question: "How is Metrics Health different from other programs?",
    answer: "Metrics Health is specifically designed for busy, high-achieving women, focusing on sustainable habits and data-driven results. After the diagnostic progress, our program adapts to your lifestyle, ensuring you can reach your health goals without disrupting your busy schedule.",
  },
  {
    question: "How much time do I need to commit to the program?",
    answer: "The initial diagnostic process is a time commitment of about 3 total hours which can be spread over the course of 1 month. After the diagnostic process, our program is flexible and can be tailored to your schedule. Most participants find that dedicating a minimum of 10 minutes a day is sufficient to see results. Best results are achieved when combined with dedicated custom exercise sessions totaling 90 minutes spread throughout the week",
  },
  {
    question: "How much does it cost?",
    answer: "Investment in the program starts in the high 4 figures. 98% of members report Metrics Health being the best investment they have ever made in themselves and end up renewing for an annual term. If you think of your body like your 'forever home' it makes sense to invest in making sure this home is the healthy, happy and strong using the latest science and best support possible.",
  },
  {
    question: "What kind of results can I expect?",
    answer: "Clients report noticeable improvements in energy levels in the first 3 days. In 21 days they see decreases in bodyfat, a more toned appearance, less bloating and more energy. Long term they report noticable improvements in metabolism, fertility, mood, immunne function, and lower stress levels.",
  },
  {
    question: "Is this program suitable for beginners?",
    answer: "Yes. Metrics Health is designed to accommodate all fitness levels, from beginners to advanced and even PRO level athletes. Our personalized data-driven approach ensures that you're working at a level that's challenging yet achievable for you.",
  },
  {
    question: "How does the guarantee work?",
    answer: "We're confident in our program's effectiveness. If you go through the diagnostic process, execute the simple daily habits and don't get the promised results, we'll refund your investment in full.",
  }
]

interface WaitlistFormData {
  email: string
  name: string
  company?: string // LinkedIn Profile URL
  countryCode: string
  phoneNumber: string
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
      console.log('Starting form submission with data:', formData)
      
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)
      
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
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h4l2-6 4 12 2-9 2 3h4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-2xl font-bold tracking-tight">METRICS HEALTH</span>
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
                <span className="text-sm text-gray-500">Transform in 30 days or you don't pay</span>
              </div>
              <h1 className="font-bold text-[2.75rem] uppercase leading-[0.85] tracking-[-0.03em] lg:text-[3.5rem]">
                HOW HIGH-ACHIEVING WOMEN REACH HEALTH GOALS ON AUTOPILOT
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
                        unoptimized={true}
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
                      className="rounded-full object-cover mr-4 flex-shrink-0 w-[60px] h-[60px]"
                      style={{ aspectRatio: "1/1" }}
                      unoptimized={true}
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
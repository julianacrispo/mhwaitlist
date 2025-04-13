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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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
      "I had shopped multiple executive health coaching programs prior to joining Metrics Health and a year in I can honestly say I'm so glad I joined this one. I've lost the post partum weight, gained strength, became my most vibrant and healthiest self and done so all while growing my business and being the Mom I want to be. Metrics truly gets the needs of ambitious women like no other."
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
const testimonialsFiltered = allTestimonials.filter((t) => !["Suzy R."].includes(t.name))

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

interface CaseStudy {
  id: number;
  name: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  transformationImage: string;
  transformationImages: string[];
  metrics: string[];
  summary: string;
  fullStory: string;
}

export default function Home() {
  const [email, setEmail] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const [isTransformationModalOpen, setIsTransformationModalOpen] = useState(false)
  const [currentImageIndexes, setCurrentImageIndexes] = useState<Record<number, number>>({})
  const [modalImageIndex, setModalImageIndex] = useState(0)

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

  // Case studies data
  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      name: "Case Study 1",
      title: "16-Week Executive Transformation",
      beforeImage: "/placeholder.jpg",
      afterImage: "/placeholder-user.jpg",
      transformationImage: "https://i.imgur.com/9UIsBWC.jpg",
      transformationImages: ["https://i.imgur.com/9UIsBWC.jpg", "https://i.imgur.com/LQMCZt7.jpg"],
      metrics: ["-12% Body Fat Loss", "+8 lbs Muscle Gain", "Increased Energy"],
      summary: "Executive with 2 small kids who transformed her body while working 50+ hour weeks.",
      fullStory: "This Executive came to us as a busy executive and mother of 2, working 50+ hours per week. Her goals were to lose body fat, increase energy levels, and create sustainable healthy habits that fit her busy lifestyle. Using our tailored approach, she was able to achieve remarkable results in just 16 weeks without disrupting her demanding schedule.\n\nKey Changes:\n- Customized nutrition plan focused on protein timing and fast meal prep and dining out strategies for busy weekdays\n- Strategic 20-30-minute workouts 3x per week with optional 10-minute mobility sessions\n- Implementation of stress management techniques\n- Data-driven sleep optimization protocol\n\nShe not only achieved her physical transformation goals but also reported a 50% increase in energy levels, better cognitive function during important meetings, and established sustainable habits she can use with her family in her busiest seasons."
    },
    {
      id: 2,
      name: "Case Study 2",
      title: "12-Week Executive Transformation",
      beforeImage: "/placeholder.jpg",
      afterImage: "/placeholder-user.jpg",
      transformationImage: "https://i.imgur.com/SnsTj6m.png",
      transformationImages: ["https://i.imgur.com/SnsTj6m.png", "https://i.imgur.com/NLFFzFK.png"],
      metrics: ["-5% Body Fat Loss", "+5 lbs Muscle Gain", "Increased Energy"],
      summary: "Executive Mom who reclaimed her body and vitality.",
      fullStory: "This Executive and Mom had been spinning her wheels for years trying to get a more toned physique before she joined Metrics Health. She was struggling with fatigue and diminished strength levels.\n\nOur Approach:\n- Metabolic health restoration through strategic nutrition optimization\n- Recovery-focused movement plan customized to varying energy levels\n- Hormone optimization through precise nutrition protocols\n- Daily micro-habits that worked within her Executive and Mom lifestyle\n\nResults:\n- Lost 5% body fat and gained 5 lbs muscle in 3 months. \n- Reported 50% increase in daily energy levels\n- Successfully cut down on exercise time to spend more time enjoying Motherhood.\n- Established sustainable routines that work with her busy lifestyle\n\nShe credits her physical transformation with giving her the energy and mental clarity needed to be the best Mom she can be, proving that even the busiest Moms can prioritize health and tone up with the right system."
    },
    {
      id: 3,
      name: "Case Study 3",
      title: "12-Week Executive Transformation",
      beforeImage: "/placeholder.jpg",
      afterImage: "/placeholder-user.jpg",
      transformationImage: "https://i.imgur.com/ZnULWUt.png",
      transformationImages: ["https://i.imgur.com/ZnULWUt.png", "https://i.imgur.com/ToxQxwH.png"],
      metrics: ["-8% Body Fat Reduction", "+7 lbs Muscle gain"],
      summary: "Founder Who Overcame Her 'Bad Genetics'",
      fullStory: "This Founder came to Metrics Health wanting to get in the best shape of her life and build muscle before getting pregnant. Despite being highly successful professionally, she was unable to figure out how to achieve the energy and aesthetics she wanted in her appearance. She thought she was always doomed to hold belly fat due to her genetics.\n\nCustomized Protocol:\n- Diagnostic metabolic analysis identified cellular energy deficiencies\n- Therapeutic nutrition to restore metabolic flexibility\n- Strategic stress-reduction techniques integrated into her executive schedule\n- Precision approach to sleep quality improvement\n\nTransformation:\n- 8% reduction in body fat while maintaining muscle mass\n- Eliminated brain fog and improved cognitive function (measured through cognitive testing)\n- \n- Significant improvements in energy and body composition allowing her to think clearer and be more productive\n\nThis Founder's case exemplifies how Founder performance and health are intrinsically linked. By optimizing her physical health, her leadership capabilities and career trajectory accelerated simultaneously."
    },
    {
      id: 4,
      name: "Case Study 4",
      title: "8-Month Executive Transformation",
      beforeImage: "/placeholder.jpg",
      afterImage: "/placeholder-user.jpg",
      transformationImage: "https://i.imgur.com/rQW6N7L.png",
      transformationImages: ["https://i.imgur.com/rQW6N7L.png", "https://i.imgur.com/ObUTg8w.png"],
      metrics: ["-30 lbs Fat Loss", "+8 lbs Muscle Gain"],
      summary: "Founder Who Reclaimed Her Body Post 2 Babies",
      fullStory: "This 38 year old Founder wanted to get her body back post 2 babies. Despite running a 7-figure business and taking care of two small children (with help) she was determined to figure out how to make the rules of fitness work for her busy lifestyle.\n\nOur Comprehensive Approach:\n- Full biomarker panel to identify specific metabolic inefficiencies\n- Age-optimized hormone-supportive nutrition protocol\n- Resistance training customized for postpartum women\n- Precision supplementation based on lab results\n\nRemarkable Results:\n- 30 pounds of fat loss while gaining 7 pounds of muscle on Dexascan\n- Bloodwork showed biological age markers improved by 8+ years\n- Energy and resilience levels comparable to her 20s\n\nThis Founder's transformation proves that Motherhood and career goals are not barriers to achieving remarkable health outcomes when using a data-driven approach. Her case exemplifies our specialized protocols for executive women seeking to optimize health and performance."
    }
  ]

  // Functions to navigate between images
  const nextImage = (caseStudyId: number, isModal: boolean = false) => {
    if (isModal && selectedCase) {
      setModalImageIndex((prev) => 
        prev < selectedCase.transformationImages.length - 1 ? prev + 1 : 0
      );
    } else {
      setCurrentImageIndexes((prev) => {
        const currentIndex = prev[caseStudyId] || 0;
        const caseStudy = caseStudies.find(c => c.id === caseStudyId);
        if (!caseStudy) return prev;
        
        return {
          ...prev,
          [caseStudyId]: currentIndex < caseStudy.transformationImages.length - 1 ? currentIndex + 1 : 0
        };
      });
    }
  };

  const prevImage = (caseStudyId: number, isModal: boolean = false) => {
    if (isModal && selectedCase) {
      setModalImageIndex((prev) => 
        prev > 0 ? prev - 1 : selectedCase.transformationImages.length - 1
      );
    } else {
      setCurrentImageIndexes((prev) => {
        const currentIndex = prev[caseStudyId] || 0;
        const caseStudy = caseStudies.find(c => c.id === caseStudyId);
        if (!caseStudy) return prev;
        
        return {
          ...prev,
          [caseStudyId]: currentIndex > 0 ? currentIndex - 1 : caseStudy.transformationImages.length - 1
        };
      });
    }
  };

  const openTransformationModal = (caseStudy: CaseStudy) => {
    setSelectedCase(caseStudy);
    setModalImageIndex(currentImageIndexes[caseStudy.id] || 0);
    setIsTransformationModalOpen(true);
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
                <span className="text-sm text-gray-500">Try Our Approach for 30 Days Risk-Free</span>
              </div>
              <h1 className="font-bold text-[2.75rem] uppercase leading-[0.85] tracking-[-0.03em] lg:text-[3.5rem]">
                HOW SMART WOMEN REACH HEALTH GOALS ON AUTOPILOT
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
                  {isSubmitting ? "Applying..." : "Apply for Coaching"}
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

        {/* Video Section */}
        <section className="mt-16 px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-8">Watch What Our Clients Are Saying</h2>
            <div className="relative w-full aspect-video mx-auto">
              <script src="https://fast.wistia.com/embed/medias/c1vfvocy2u.jsonp" async></script>
              <script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>
              <div className="wistia_responsive_padding" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
                  <div className="wistia_embed wistia_async_c1vfvocy2u videoFoam=true" style={{ height: '100%', position: 'relative', width: '100%' }}>
                    <div className="wistia_swatch" style={{ height: '100%', left: 0, opacity: 1, overflow: 'hidden', position: 'absolute', top: 0, transition: 'opacity 200ms', width: '100%' }}>
                      <img src="https://fast.wistia.com/embed/medias/c1vfvocy2u/swatch" style={{ filter: 'blur(5px)', height: '100%', objectFit: 'contain', width: '100%' }} alt="" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Stories Section */}
        <section className="mt-24 px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-2">Transformation Stories</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Real results from real clients who committed to the Metrics Health approach.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((caseStudy) => (
                <div key={caseStudy.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div 
                    className="relative group cursor-pointer" 
                    onClick={() => openTransformationModal(caseStudy)}
                  >
                    <Image 
                      src={caseStudy.transformationImages[currentImageIndexes[caseStudy.id] || 0]}
                      alt={`${caseStudy.name} transformation`}
                      width={600} 
                      height={400} 
                      className="w-full h-80 object-cover"
                      unoptimized={true}
                    />
                    {caseStudy.transformationImages.length > 1 && (
                      <>
                        <button 
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage(caseStudy.id);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button 
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage(caseStudy.id);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                          {caseStudy.transformationImages.map((_, index) => (
                            <span 
                              key={index} 
                              className={`h-1.5 rounded-full ${index === (currentImageIndexes[caseStudy.id] || 0) ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                      <span className="text-white font-medium px-4 py-2">Click to see full story</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{caseStudy.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {caseStudy.metrics.map((metric, index) => (
                        <div key={index} className="bg-blue-100 px-2 py-1 rounded text-xs text-blue-800">{metric}</div>
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      {caseStudy.summary}
                    </p>
                    <button 
                      className="text-blue-600 font-medium text-sm flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        openTransformationModal(caseStudy);
                      }}
                    >
                      Read full story
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Principles Section */}
        <section className="mt-24 px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">Our Principles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Principle 1 - Autopilot */}
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Autopilot</h3>
                <p className="text-gray-600 text-sm">
                  Applying the latest research on habit formation, we help our clients start small and scale up to a healthy lifestyle that runs on autopilot.
                </p>
              </div>
              
              {/* Principle 2 - Minimum Effective Dose */}
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Minimum Effective Dose Workouts</h3>
                <p className="text-gray-600 text-sm">
                  You're strapped on time and stressed enough already. Adding too much work can actually make you reverse progress. Our workouts are custom tailored to your goals and unique genetics. They are no-fluff or filler and backed by the latest evidence to ensure you get the highest return on your exercise time.
                </p>
              </div>
              
              {/* Principle 3 - Eat What You Love */}
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Eat What You Love</h3>
                <p className="text-gray-600 text-sm">
                  If you can't eat what you love and enjoy your lifestyle, what is the point? Our approach ensures you can maintain your social life and food preferences while still achieving your health goals.
                </p>
              </div>
              
              {/* Principle 4 - Accountability */}
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Accountability</h3>
                <p className="text-gray-600 text-sm">
                  You have a ton of accountability in your professional life, but very little when it comes to your health. Receiving accountability from an expert coach and peers might be the missing link you've been needing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-24 px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">Client Love</h2>
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

        {/* FAQ Section - Temporarily Hidden */}
        {/* 
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
        */}

        {/* Bottom CTA */}
        <section className="mt-24 px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to Transform Your Health?</h2>
            
            <form className="flex justify-center gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 max-w-xs rounded-xl bg-blue-100/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="h-12 rounded-xl bg-black px-8 text-white hover:bg-black/90"
              >
                Apply for Coaching
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2">We will never sell your information or spam you</p>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="mt-16 py-6 text-center text-sm text-gray-500">
        © 2025 Metrics Health International LLC
      </footer>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={email}
        onSubmit={handleSubmit}
      />

      {/* Transformation Story Modal */}
      <Dialog 
        open={isTransformationModalOpen} 
        onOpenChange={setIsTransformationModalOpen}
      >
        {selectedCase && (
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedCase.name}'s Transformation</DialogTitle>
              <DialogDescription>
                {selectedCase.title}
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4">
              <div className="mb-6 relative">
                <Image 
                  src={selectedCase.transformationImages[modalImageIndex]}
                  alt={`${selectedCase.name} transformation`}
                  width={600} 
                  height={400} 
                  className="w-full h-auto rounded-md"
                  unoptimized={true}
                />
                {selectedCase.transformationImages.length > 1 && (
                  <>
                    <button 
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                      onClick={() => prevImage(selectedCase.id, true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                      onClick={() => nextImage(selectedCase.id, true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2 mb-2">
                      {selectedCase.transformationImages.map((_, index) => (
                        <button 
                          key={index} 
                          className={`h-2 rounded-full transition-all ${
                            index === modalImageIndex ? 'w-6 bg-blue-500' : 'w-2 bg-gray-300 hover:bg-gray-400'
                          }`}
                          onClick={() => setModalImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4 mt-8">
                {selectedCase.metrics.map((metric, index) => (
                  <div key={index} className="bg-blue-100 px-2 py-1 rounded text-xs text-blue-800">{metric}</div>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-gray-700 whitespace-pre-line">
                {selectedCase.fullStory}
              </div>
              
              <div className="mt-8 border-t pt-6">
                <h4 className="font-medium mb-2">Ready for your transformation?</h4>
                <Button 
                  onClick={() => {
                    setIsTransformationModalOpen(false)
                    setTimeout(() => setIsModalOpen(true), 300)
                  }}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Apply for Coaching
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
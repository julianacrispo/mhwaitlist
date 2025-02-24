import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Update the mainTestimonials array
const mainTestimonials = [
  {
    name: "Arryn G.",
    role: "Founder",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1683379965641-ItA9j0xZXOVaorO2L4Ujp91oSz3aAs.jpeg",
    quote:
      "In 16 weeks I became my strongest and leanest version of myself in preparation for my first pregnancy. I have established habits and an understanding of my body that I can use for life.",
  },
  {
    name: "Samantha O.",
    role: "Executive at Morgan Stanley",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1699468920068-iJhTVRpZPBNYJyjw6I6QyMuuZZRLBG.jpeg",
    quote:
      "Prior to Metrics Health, I struggled to find balance - especially as a Mom of 3. In the past year I lost 20 lbs naturally and most importantly established habits my family and I will use for life. ",
  },
  {
    name: "Rebecca K.",
    role: "Founder & CEO",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1647997479940-BUrD4dnrSbg5pZf9s93fib509uPDHo.jpeg",
    quote:
      "Metrics Health has helped me strike the balance I need to achieve health goals while pursuing my other ambitions. I initally started with the goal of fat loss but that has expanded to improving cardio health and cognitive function in a measurable way.",
  },
  {
    name: "Bethany P",
    role: "Serial Entrepreneur",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-21%20at%2010.35.29%E2%80%AFAM-liWI2wrbyUuH0ncZ8WXFbUeozYpgQ9.png",
    quote:
      "In the span of 5 weeks during my busiest work season I lost 3% bodyfat and gained 3 LBS of lean body mass. I have worked with many coaching services in the past but approaching habits this way was transformative for me.",
  },
  {
    name: "Trina L",
    role: "CMO of InnovateCorp",
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
  },
  {
    name: "Katerina L",
    role: "Founder & CEO",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/katerina-quUgYNi30XSAzBxsZ8P8Yu99Ocrtd6.jpeg",
    quote:
      "Juliana is the person I trust for understanding metrics related. to improving strength, body composition and optimizing nutrition for performance and aesthetic goals. Metrics Health is helping bring those insights to busy people with goals outside of fitness.",
  },
  {
    name: "Kara F",
    role: "Managing Director",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kara.jpg-DBwKfYOorRMBzJCxLhhRS0slWfhb7r.jpeg",
    quote:
      "I came to Metrics Health hoping to lose fat, gain muscle and become a healthier version of myself for my kids. I was able to achieve all of that in a way that fit my lifestyle. Juliana has an understanding of real life Mom stressors and when to push and pull on health goals which has been essential in this process.",
  },
  {
    name: "Denise D.",
    role: "Founder",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/denise-5vi9p6lSPmLpFg0j9xEnTQwOnhj0OE.jpeg",
    quote:
      "Fo thepast year, Metrics Health  has been my go-to resource for staying accountable to my health goals. I would recommend it to any busy Mom and executive who knows how important health is.",
  },
  {
    name: "Krissy H.",
    role: "Founder",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/krissy-F0Wus6Smz5Ri94eITyXJ5nRQhn6uDZ.jpeg",
    quote:
      "Working with Metrics Health has helped me become much more aware of my health and stay accountable to my health goals while growing from 0 to a multi-million dollar business in 6 months.",
  },
  {
    name: "Ida R.",
    role: "Technology Executive",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ida-7OEDStVw3AUyLXLS452w3izbWSJBrA.png",
    quote:
      "Prior I had spent years spinning my wheels not getting results I worked hard for. Within a span of 3 months with Metrics Health I saw more progress working less that I did trying for years on my own.",
  },
  {
    name: "Kasey L.",
    role: "Founder & CEO",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kasey-VUCyYYz17jHS1r7oPmwgh2M87Lcw2g.jpeg",
    quote:
      'Juliana is taking a decade of insights and distilling on what matters to help busy people like me make progress when it feels like you have "no time". Her approach is realistic and maintainable.',
  },
  {
    name: "Suzy R.",
    role: "Pharmacy Owner",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/suzy-i5X1KqiP78McVwyjJcs906aIfgi0Fc.jpeg",
    quote:
      "Prior to Metrics Health, I had tried many diet and health programs for the weight to always come back on. Metrics Health showed me what was wrong with these approaches and gave me a system I could use to make progress even even in my busiest seasons. I continue to make progress on my body composition and feel better every day.",
  },
  {
    name: "Victoria N.",
    role: "Healthcare Executive",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/victoria-a7BP6i7QqLhFfvZA2VxybhqkR9zgq3.jpeg",
    quote:
      "Prior to Metrics Health I was running my health into the ground with my executive lifestyle. Metrics Health gave me a simple system and accountability to get back on track and make meaningful and meaasurable progress toward my health goals. At 50 now, I have never felt stronger or more confident in my skin.",
  },
  {
    name: "Stacey M.",
    role: "Business Development Director",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stacey-cZaOevmvpwAJR7pqRfGqMm2pv3yGtm.jpeg",
    quote: "The strategic framework Justin provides has helped me build stronger, healthier business relationships.",
  },

  {
    name: "Suzy M.",
    role: "Health Tech Innovator",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/suzy-i5X1KqiP78McVwyjJcs906aIfgi0Fc.jpeg",
    quote:
      "The comprehensive approach to health metrics and business growth has completely transformed how I run my company. Justin's insights are invaluable.",
  },
]

// Update the finalRowTestimonials array to include Karla R.'s testimonial
const finalRowTestimonials = [
  {
    name: "Alyson",
    role: "Tech Entrepreneur",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alyson-aAsuqDQT6TVPAj2ZqDArSFU9yvQ6LD.jpeg",
    quote:
      "Justin's approach to integrating health metrics with business performance has revolutionized how I run my company.",
  },
  {
    name: "Marina",
    role: "Wellness Entrepreneur",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/marina-I2HgSWKgb1b6qfQjYOBfmhKkZqS7JN.jpeg",
    quote:
      "Justin's approach to combining health metrics with business strategy has been transformative for my wellness practice.",
  },
  {
    name: "Ivanna",
    role: "Wellness Tech Founder",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ivanna-x5NLBXihbcuSWyRq10Khb9QSBQPYWV.jpeg",
    quote:
      "Justin's insights on combining health metrics with business growth have been game-changing for my wellness platform.",
  },
  {
    name: "Karla R.",
    role: "Healthcare Strategist",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/karla-Z4HOnKhl0PYTRNLZ4JxCdiD9Y0TMY3.jpeg",
    quote:
      "The data-driven approach combined with holistic health insights has been revolutionary for our organization's growth and team wellbeing.",
  },
]

// Remove the separate final row for Karla R. and other testimonials
// Instead, add them to the main testimonials array
const allTestimonials = [...mainTestimonials, ...finalRowTestimonials]

// Update the testimonialsFiltered array definition
const testimonialsFiltered = allTestimonials.filter((t) => !["Suzy", "Kara B."].includes(t.name))

// Add this constant after the testimonialsFiltered array
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
  },
]

export default function WaitlistHero() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-gray-100">
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
                HOW BUSY WOMEN REACH HEALTH GOALS ON AUTOPILOT
              </h1>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 max-w-xs rounded-xl bg-blue-100/50"
                />
                <Button className="h-12 rounded-xl bg-black px-8 text-white hover:bg-black/90">Join Waitlist</Button>
              </div>

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
        <section className="mt-32 px-4 md:px-6 lg:px-8">
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
                      <h3 className="font-bold text-lg font-bold">{testimonial.name}</h3>
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
    </div>
  )
}


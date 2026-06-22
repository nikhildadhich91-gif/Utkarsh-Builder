import React, { useState } from 'react';
import { FadeUp } from '../components/ui/FadeUp';
import Contact from '../components/Contact';
import { ArrowUpRight, ChevronDown, HelpCircle, Phone, Mail, MapPin } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What areas of Jaipur do you execute projects in?",
    answer: "We cover all major zones in Jaipur, with an active footprint in Raja Park, C-Scheme, Malviya Nagar, Vaishali Nagar, Mansarovar, and Jagatpura. We can also consult on plot selection and zoning codes."
  },
  {
    title: "Guarantee",
    question: "What structural warranties do you offer?",
    answer: "We offer our signature 5-Month Guarantee to Build structural frameworks, and provide a 10-year structural engineering warranty on all reinforced concrete foundations, columns, and slabs."
  } as any,
  {
    question: "Do you handle JDA (Jaipur Development Authority) municipal permits?",
    answer: "Yes, our turnkey project scope covers the creation of structural blueprints, submission to the Jaipur Development Authority (JDA), zoning code compliance, electrical board approvals, and construction permits."
  },
  {
    question: "What is the typical billing and payment structure?",
    answer: "We divide bills into 5 clear progress-based milestones: Foundation completion, structural frame completion, masonry completion, plaster/finishes, and final keys handover. Zero hidden costs, fully documented."
  }
];

export const ContactPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#FAF7F5] w-full min-h-screen text-[#2A2A2A] pb-24">

      {/* 1. Premium Header Banner */}
      <div className="inner-hero-banner">
        {/* Decorative radial glows */}
        <div className="inner-hero-banner-glow top-[-50px] right-[-100px]" />
        <div className="inner-hero-banner-glow bottom-[-50px] left-[-100px]" />

        <div className="relative z-10 max-w-4xl pt-16">
          <FadeUp delay={0.1}>
            <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] block mb-4">
              Get In Touch
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h1 className="text-[#1B1B1B] mb-6">
              Let's Build Together
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-[#6F6F6F] font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Ready to start your next building project? Send us a message and we will get back to you shortly.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* 2. Content Layout: Contact form + Max Reed styled Reach Me card */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10 -mt-10 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-white pt-16 border-t border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column: Reach Me Widget (Max Reed Style) - 4 spans */}
          <div className="lg:col-span-4 text-left space-y-6">

            {/* Direct Contact Card */}
            <FadeUp delay={0.1} y={30} className="bg-white text-[#1B1B1B] p-8 rounded-3xl border border-black/5 shadow-xl relative overflow-hidden group">
              {/* Corner action button */}
              <div className="absolute top-6 right-6">
                <a
                  href="mailto:nowalutkarsh@gmail.com"
                  className="h-11 w-11 rounded-full bg-black/5 hover:bg-[#C92C15] hover:text-white transition-all duration-300 flex items-center justify-center text-[#1B1B1B] cursor-pointer shadow-md"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>

              <div className="space-y-8">
                <span className="text-xs uppercase tracking-[0.22em] text-[#C92C15] font-bold block">
                  Reach Me
                </span>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#6F6F6F] shrink-0" />
                    <a href="mailto:nowalutkarsh@gmail.com" className="text-sm md:text-base font-light text-[#1B1B1B] hover:text-[#C92C15] transition-colors">
                      nowalutkarsh@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-[#6F6F6F] shrink-0" />
                    <a href="tel:+918562034491" className="text-sm md:text-base font-light text-[#1B1B1B] hover:text-[#C92C15] transition-colors">
                      +91 8562034491
                    </a>
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <MapPin className="h-4 w-4 text-[#6F6F6F] shrink-0 mt-1" />
                    <p className="text-xs text-[#6F6F6F] leading-relaxed font-light">
                      C-3, Opp. Pink Square Mall,<br />Raja Park, Jaipur, Rajasthan
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-black/5 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xxs uppercase tracking-wider text-[#6F6F6F] font-semibold">
                    Accepting New Enquiries
                  </span>
                </div>
              </div>
            </FadeUp>

            {/* Subtle brand credibility card */}
            <FadeUp delay={0.2} y={30} className="bg-[#FAF7F5] border border-black/5 p-8 rounded-3xl text-left">
              <h4 className="text-xs uppercase tracking-widest text-[#C92C15] font-semibold mb-3">Our Office</h4>
              <p className="text-sm text-[#6F6F6F] font-light leading-relaxed">
                Our main office is located in Raja Park, Jaipur. You can visit us to discuss your construction plans in person.
              </p>
            </FadeUp>

          </div>

          {/* Right Column: Form Component - 8 spans */}
          <div className="lg:col-span-8">
            <Contact isEmbedded={true} />
          </div>

        </div>
      </div>

      {/* 3. FAQ Section Accordion Grid */}
      <div className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Faqs</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1B1B1B] tracking-tight">
              Frequently Asked Questions
            </h2>
          </FadeUp>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FadeUp
              key={idx}
              delay={idx * 0.08}
              y={20}
              className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden"
              once={true}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-[#FAF7F5]/50"
              >
                <div className="flex items-center gap-3 pr-4">
                  <HelpCircle className="h-4 w-4 text-[#C92C15] shrink-0" />
                  <span className="font-semibold text-sm md:text-base text-[#1B1B1B]">{faq.question}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${openFaq === idx ? 'transform rotate-180 text-[#C92C15]' : ''
                  }`} />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === idx ? 'max-h-[200px] border-t border-gray-100' : 'max-h-0'
                  }`}
              >
                <p className="p-6 text-sm text-[#6F6F6F] font-light leading-relaxed text-left bg-gray-50/50">
                  {faq.answer}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

    </div>
  );
};
export default ContactPage;

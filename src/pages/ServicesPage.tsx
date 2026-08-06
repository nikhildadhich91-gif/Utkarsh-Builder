import { useState, useEffect } from 'react';
import { FadeUp } from '../components/ui/FadeUp';
import { StaggerContainer } from '../components/ui/StaggerContainer';
import { HeroSection } from '../components/ui/hero-section-2';
import { PointerHighlight } from '../components/ui/pointer-highlight';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import '../components/ui/FlowingMenu.css';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  extendedDetails: string;
  image: string;
}

const servicesData: ServiceItem[] = [
  {
    number: '01',
    title: 'Home Design and Construction',
    description: 'We provide end-to-end residential construction services, designing and building custom homes tailored to your lifestyle.',
    extendedDetails: 'From architectural plans and foundation laying to high-end finishes, our expert team ensures your dream home is built with precision, structural integrity and modern style.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '02',
    title: 'Commercial Construction',
    description: 'We build modern, functional and efficient commercial structures including offices, retail stores and warehouses.',
    extendedDetails: 'Our construction methods prioritize workflow optimization, building durability, safety compliance and energy-efficient spaces to help your business grow.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '03',
    title: 'Interior Design and Construction',
    description: 'We design and execute beautiful interior layouts that maximize space, utility and modern aesthetics.',
    extendedDetails: 'Our interior services include custom cabinetry, premium ceiling designs, lighting, partitions and floor finishes for both homes and office settings.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '04',
    title: 'Construction and Management',
    description: 'We offer professional project management, ensuring your construction project stays on schedule, on budget and meets top standards.',
    extendedDetails: 'We oversee site operations, material sourcing, subcontractor coordination, safety inspections and progress reporting from start to finish.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
  },
  {
    number: '05',
    title: 'Renovation and Remodeling',
    description: 'We update and transform existing structures into fresh, modern layouts with reinforced stability.',
    extendedDetails: 'Whether it is updating an old home layout, expanding rooms, or renovating retail shops, we upgrade both appearance and structural strength.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80'
  }
];

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What types of construction services do you offer?",
    answer: "We provide a wide range of services including Home Design and Construction, Commercial Construction, Interior Design and Construction, Construction Management as well as Renovation and Remodeling."
  },
  {
    question: "Do you manage projects from planning through completion?",
    answer: "Yes, our turnkey services cover all aspects of the construction process, including site evaluation, architectural and structural coordination, material procurement, on-site supervision and final project handover."
  },
  {
    question: "How is structural quality and safety maintained?",
    answer: "We adhere strictly to local building standards and engineering guidelines. By using certified, high-strength materials and performing regular on-site quality checks, we ensure that every structure is durable, safe and built to last."
  },
  {
    question: "Which areas or regions do you operate in?",
    answer: "We primarily execute residential and commercial projects across various locations in Rajasthan, adapting our building methods to suit local climate conditions and regional authority guidelines."
  },
  {
    question: "How can I schedule a consultation or get a project estimate?",
    answer: "You can book a consultation with our engineering team by visiting our Contact page and completing the enquiry form. We will review your requirements and get in touch to discuss details."
  }
];



const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

interface FlowingServiceCardProps {
  service: ServiceItem;
}

const FlowingServiceCard: React.FC<FlowingServiceCardProps> = ({ 
  service
}) => {
  return (
    <div 
      className="service-item-card py-6 md:py-8 border-b border-[#1B1B1B]/15 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 group hover:bg-[#FAF7F5]/40 transition-all duration-300 px-4 md:px-6 rounded-2xl text-left relative overflow-hidden"
    >
      {/* Left side: Fixed Image */}
      <div className="w-full md:w-56 lg:w-64 shrink-0 aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-black/5 bg-gray-100 relative z-10">
        <img 
          src={service.image} 
          alt={service.title} 
          width={400} 
          height={300} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy" 
        />
      </div>

      {/* Right side: Exact Content Block (5 lines aligned as indicated by user arrows) */}
      <div className="flex-1 text-left space-y-3 md:space-y-4 relative z-10">
        {/* Line 1: Heading */}
        <h3 className="text-xl md:text-2xl font-semibold text-[#1B1B1B] tracking-tight group-hover:text-[#C92C15] transition-colors duration-300">
          {service.title}
        </h3>

        {/* Lines 2 & 3: Description */}
        <p className="text-sm md:text-base text-[#6F6F6F] font-light leading-relaxed">
          {service.description}
        </p>

        {/* Lines 4 & 5: Extended Details */}
        <p className="text-xs md:text-sm text-[#6F6F6F]/80 font-light leading-relaxed border-l-2 border-[#C92C15]/30 pl-4 group-hover:border-[#C92C15] transition-all">
          {service.extendedDetails}
        </p>
      </div>
    </div>
  );
};

export const ServicesPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Our Services | Utkarsh Builder - Premium Construction Services";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore residential home design and construction, commercial retail construction, turnkey project management and renovation services by Utkarsh Builder in Jaipur, Rajasthan.');
    }
  }, []);

  return (
    <main className="bg-[#FAF7F5] w-full min-h-screen text-[#2A2A2A] pb-24">


      {/* 1. Premium Header Banner */}
      <div className="w-full pt-20">
        <HeroSection
          className="rounded-none border-none shadow-none w-full min-h-[500px] md:min-h-[600px]"
          title={
            <>
              Quality Construction <br />
              <span className="text-[#C92C15]">Built for Generations</span>
            </>
          }
          subtitle={
            <>
              From bespoke custom homes and commercial buildings to premium interior design and project management, we bring structural integrity and <PointerHighlight delay={0.5} containerClassName="text-[#C92C15] font-semibold">excellence</PointerHighlight> to life in Rajasthan.
            </>
          }
          callToAction={{
            text: "Book A Consultation",
            href: "/contact#contact-section"
          }}
          backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
        />
      </div>

      {/* 2. Core Competencies Services Section (Sticky Full-Width Header) */}
      <div className="w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] z-10 -mt-10 pb-16 md:pb-24 relative">
        
        {/* Full-Width Sticky Glass Header (No border, frosted transparency) */}
        <div className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md pt-16 md:pt-20 pb-4 md:pb-6 mb-4 md:mb-8 text-center">
          <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
            <FadeUp delay={0.1} className="mb-1.5">
              <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">The Services</span>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B]">
                Core Competencies
              </h2>
            </FadeUp>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 w-full">
          <StaggerContainer staggerChildren={0.15} className="flex flex-col gap-4 md:gap-6 border-t border-[#1B1B1B]/15 pt-6">
            {servicesData.map((service) => (
              <motion.div
                key={service.number}
                id={`service-${service.number}`}
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <FlowingServiceCard 
                  service={service} 
                />
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>

      {/* 3. FAQ Section Accordion Grid */}
      <div className="py-12 md:py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">Faqs</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-2xl md:text-4xl font-semibold text-[#1B1B1B] tracking-tight">
              Frequently Asked Questions
            </h2>
          </FadeUp>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <FadeUp
              key={idx}
              delay={idx * 0.08}
              y={20}
              className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden"
              once={true}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-4 py-4 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-[#FAF7F5]/50"
              >
                <div className="flex items-center gap-3 pr-4">
                  <HelpCircle className="h-4 w-4 text-[#C92C15] shrink-0" />
                  <span className="font-semibold text-xs md:text-base text-[#1B1B1B]">{faq.question}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${openIndex === idx ? 'transform rotate-180 text-[#C92C15]' : ''
                  }`} />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === idx ? 'max-h-[220px] border-t border-gray-100' : 'max-h-0'
                  }`}
              >
                <p className="p-4 md:p-6 text-xs md:text-sm text-[#6F6F6F] font-light leading-relaxed text-left bg-gray-50/50">
                  {faq.answer}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

    </main>
  );
};

export default ServicesPage;

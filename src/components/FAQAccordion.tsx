import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FadeUp } from './ui/FadeUp';

interface FaqItemData {
  question: string;
  answer: string;
}

interface FaqSections {
  Services: FaqItemData[];
  Workflow: FaqItemData[];
  Updates: FaqItemData[];
}

const faqSections: FaqSections = {
  Updates: [
    {
      question: 'How can I track the progress of my construction project?',
      answer: 'We establish a dedicated group for sharing daily photographic updates and progress reports directly from your project site.',
    },
    {
      question: 'Will I receive a detailed cost breakdown for my project?',
      answer: 'We provide you an estimated cost break-down before we start, helping you manage your budget effectively.',
    },
  ],
  Workflow: [
    {
      question: 'What is the process for starting a new construction project with Utkarsh Builder?',
      answer: 'Our process starts with an initial consultation and needs assessment followed by architectural drawings, budgeting, sourcing and procurement, scheduling and final handover.',
    },
    {
      question: 'How do you ensure the quality of construction materials?',
      answer: 'We source our products from our reputed partners in the construction industry, ensuring high quality and cost efficiency.',
    },
    {
      question: 'Who will oversee my construction project?',
      answer: 'One point of contact is assigned to every project to track material deliveries and share daily progress reports.',
    },
    {
      question: 'How does Utkarsh Builder ensure safety compliance?',
      answer: 'We conduct safety checks at the site to prevent any unforeseen incidents.',
    },
  ],
  Services: [
    {
      question: 'What services does Utkarsh Builder offer?',
      answer: 'We offer end-to-end turnkey construction services, including custom residential building, commercial construction, project management and renovations.',
    },
    {
      question: 'How does Utkarsh Builder help me save on costs?',
      answer: 'We help you save on brokerage and extra fees by procuring material at wholesale rates to keep your project cost down.',
    },
    {
      question: 'What guarantees do you offer regarding project timelines?',
      answer: 'We guarantee on-time delivery of the project as per our proven track record.',
    },
    {
      question: 'What benefits do your reputed partners bring to my project?',
      answer: 'Our partners are well known and respected in the construction industry, ensuring high-quality workmanship for your project.',
    },
  ],
};

export const FAQAccordion: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof FaqSections>('Updates');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleTabChange = (tab: keyof FaqSections) => {
    setActiveTab(tab);
    setOpenIndex(null);
  };

  const currentFaqList = faqSections[activeTab];

  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Header Block */}
        <div className="text-center mb-12">
          <FadeUp delay={0.1}>
            <span className="text-[#C92C15] text-xs font-extrabold uppercase tracking-[0.2em] block mb-3">
              FAQ
            </span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight">
              Frequently Asked Questions
            </h2>
          </FadeUp>
        </div>

        {/* Segmented Radio-style Tab Switcher */}
        <FadeUp delay={0.3} className="flex p-1.5 bg-black/5 rounded-2xl border border-black/10 gap-2 mb-10 max-w-md mx-auto">
          {(Object.keys(faqSections) as Array<keyof FaqSections>).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#C92C15] text-white shadow-md'
                    : 'text-[#333333] hover:text-[#111111] hover:bg-black/5'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </FadeUp>

        {/* Accordion List */}
        <div className="space-y-4 text-left">
          {currentFaqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <FadeUp
                key={`${activeTab}-${idx}`}
                delay={idx * 0.06}
                y={15}
                className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 text-[#111111]"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full px-6 py-5 md:px-8 md:py-6 flex justify-between items-center text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-sm md:text-base font-extrabold text-[#111111] hover:text-[#C92C15] transition-colors duration-200 pr-4">
                    {item.question}
                  </span>
                  <div className={`h-8 w-8 rounded-full bg-black/5 border border-black/10 flex items-center justify-center text-[#C92C15] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#C92C15] text-white border-[#C92C15]' : ''
                  }`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Animated Accordion body */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-black/10' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-5 md:px-8 md:py-6 text-xs md:text-sm text-[#333333] leading-relaxed font-medium bg-black/5">
                    {item.answer}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQAccordion;

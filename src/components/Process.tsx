import React from 'react';
import { motion } from 'framer-motion';
import { FadeUp } from './ui/FadeUp';
import { StaggerContainer } from './ui/StaggerContainer';
import { Users, FileText, Activity, ShieldAlert, Key } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Consultation',
    description: 'Deep dive into your requirements, location analysis, and budget planning.',
    icon: Users,
  },
  {
    number: '02',
    title: 'Planning & Design',
    description: 'Symmetry drawing, engineering calculations, and municipal approvals management.',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Execution',
    description: 'Disciplined site construction, cement mixing, concrete laying, and structural framing.',
    icon: Activity,
  },
  {
    number: '04',
    title: 'Quality Inspection',
    description: 'Multi-stage quality checks verifying plumbing, electrical, and concrete strength.',
    icon: ShieldAlert,
  },
  {
    number: '05',
    title: 'Handover',
    description: 'Finishing touches, cleanups, and delivering key lock sets to your ready-to-move space.',
    icon: Key,
  },
];

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-[#FAF7F5] relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          <FadeUp delay={0.1} className="mb-3">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase">How We Build</span>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1B1B1B] tracking-tight">
              Our Construction Journey
            </h2>
          </FadeUp>
        </div>

        {/* Timeline Grid (Responsive: Horizontal on large, Vertical on mobile) */}
        <div className="relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gray-200 z-0">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="h-full bg-[#C92C15] origin-left"
            />
          </div>

          {/* Steps */}
          <StaggerContainer staggerChildren={0.2} className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={idx} 
                  onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left group cursor-pointer"
                >
                  
                  {/* Icon Circle */}
                  <motion.div 
                    variants={{
                      hidden: { scale: 0.8, opacity: 0 },
                      show: { scale: 1, opacity: 1 }
                    }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className={`h-20 w-20 rounded-full border flex items-center justify-center mb-6 shadow-md transition-all duration-300 relative z-10 ${
                      activeStep === idx 
                        ? 'bg-[#C92C15] text-white border-[#C92C15]' 
                        : 'bg-white border-[#1B1B1B]/10 text-[#C92C15] group-hover:bg-[#C92C15] group-hover:text-white group-hover:border-[#C92C15]'
                    }`}
                  >
                    <Icon className="h-7 w-7" />
                    
                    {/* Index Badge */}
                    <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-[#C92C15] text-white text-xs font-bold flex items-center justify-center border-2 border-white select-none">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[#1B1B1B] mb-3 group-hover:text-[#C92C15] transition-colors duration-300 lg:min-h-[56px] flex items-center lg:items-start justify-center lg:justify-start">
                    {step.title}
                  </h3>
                </div>
              );
            })}
          </StaggerContainer>

        </div>

        {/* Dynamic Detail Card */}
        {activeStep !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-8 bg-white border border-black/5 rounded-3xl max-w-2xl mx-auto shadow-xl text-center"
          >
            <span className="text-[#C92C15] text-xs font-bold uppercase tracking-widest block mb-2">
              Step {steps[activeStep].number}: {steps[activeStep].title}
            </span>
            <p className="text-sm text-[#6F6F6F] font-light leading-relaxed">
              {steps[activeStep].description}
            </p>
          </motion.div>
        )}

      </div>
    </section>
  );
};
export default Process;

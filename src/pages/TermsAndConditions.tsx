import React from 'react';
import { ShieldAlert, Clock, Phone, Mail, Wrench, Scale, Landmark, ShieldCheck } from 'lucide-react';
import { FadeUp } from '../components/ui/FadeUp';

const keyTerms = [
  {
    icon: <Landmark className="h-5 w-5" />,
    title: "Scope of Work",
    desc: "Construction follows finalized blueprints, structural layouts, and approved material specifications.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "5-Stage Billing",
    desc: "Progress-based milestone payments from foundation to final handover — zero hidden costs.",
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "2-Year Warranty",
    desc: "Free repair for structural defects, leakages, electrical, and plumbing for 2 years post-handover.",
  },
  {
    icon: <Scale className="h-5 w-5" />,
    title: "Dispute Resolution",
    desc: "Governed by Indian law. Arbitration in Jaipur, Rajasthan for any unresolved disputes.",
  },
];

export const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-[#FAF7F5] w-full min-h-screen text-[#2A2A2A] pt-28 md:pt-32 pb-20 md:pb-28">

      {/* ── Header Banner ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 mb-14 md:mb-20 text-left">
        <FadeUp delay={0.05}>
          <span className="text-[#C92C15] text-xs font-bold uppercase tracking-[0.25em] block mb-4">
            Legal Agreement
          </span>
        </FadeUp>
        <FadeUp delay={0.15}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-[#1B1B1B] tracking-tight leading-tight mb-4">
            Terms &amp; Conditions
          </h1>
        </FadeUp>
        <FadeUp delay={0.25}>
          <p className="text-xs md:text-sm text-[#6F6F6F] font-light">
            Last Updated: June 24, 2026
          </p>
        </FadeUp>
      </section>

      {/* ── Key Terms Grid ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 mb-14 md:mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {keyTerms.map((item, i) => (
            <FadeUp key={i} delay={0.1 + i * 0.08} y={20}>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-black/[0.04] flex gap-5 items-start text-left group hover:border-[#C92C15]/15 hover:shadow-lg transition-all duration-300">
                <div className="h-10 w-10 rounded-xl bg-[#C92C15]/[0.06] border border-[#C92C15]/10 flex items-center justify-center text-[#C92C15] shrink-0 group-hover:bg-[#C92C15] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B1B1B] mb-1.5">{item.title}</h4>
                  <p className="text-xs text-[#6F6F6F] font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Full-Width Terms Content Card ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        <FadeUp delay={0.1} y={20}>
          <div className="bg-white p-8 md:p-14 rounded-[28px] md:rounded-[40px] border border-black/[0.04] shadow-sm space-y-10 text-left">

            {/* Disclaimer */}
            <div className="bg-amber-50/60 border border-amber-200/40 rounded-2xl p-5 md:p-6 text-amber-800 text-xs md:text-sm flex gap-3.5 items-start leading-relaxed">
              <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Disclaimer:</strong> This is a simplified online version of our standard legal Terms and Conditions. The detailed legal contract agreement document is available upon request through our corporate communication channels.
              </div>
            </div>

            {/* Intro */}
            <p className="text-sm md:text-base text-[#6F6F6F] leading-[1.85] font-light">
              Welcome to Utkarsh Builder. Please read these Terms and Conditions carefully before requesting our construction or consulting services. By using our services, signing construction milestone schedules, or browsing this site, you agree to be bound by the following Terms and Conditions.
            </p>

            <hr className="border-black/[0.04]" />

            {/* Section 1 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">1. Scope of Work</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                We commit to constructing the residential or commercial building on the specified plot of land as per the finalized blueprints, structural layouts, drawings, and materials specifications approved by the Owner. Construction will follow verified structural design schedules, using premium building materials, and will be carried out in a professional, certified manner.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">2. Billing &amp; Payment Structure</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                The Owner agrees to clear invoices based on the progress-milestone payment schedule. We operate on 5 clear progressive milestone bills:
              </p>
              <ul className="list-disc pl-5 text-sm text-[#6F6F6F] space-y-2.5 font-light leading-relaxed">
                <li><strong className="text-[#1B1B1B] font-medium">Milestone 1:</strong> Foundation completion and testing.</li>
                <li><strong className="text-[#1B1B1B] font-medium">Milestone 2:</strong> Main RCC structural frame and column casting completion.</li>
                <li><strong className="text-[#1B1B1B] font-medium">Milestone 3:</strong> Brick masonry and external wall setups.</li>
                <li><strong className="text-[#1B1B1B] font-medium">Milestone 4:</strong> Internal/external plaster and electrical/plumbing line laying.</li>
                <li><strong className="text-[#1B1B1B] font-medium">Milestone 5:</strong> Tile laying, finishes, painting, and key handover.</li>
              </ul>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                Payments are tracked transparently. Construction starts within 15 days of receiving the primary project advance.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">3. Site Access &amp; Feasibility</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                The Owner agrees to provide Utkarsh Builder, our site engineers, sub-contractors, and laborers unrestricted, safe access to the building plot. Necessary utility clearances (water, primary electricity connections) must be arranged to facilitate construction work.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">4. Turnkey Services &amp; Management Fees</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                Our turnkey scope includes: architectural planning, structural analysis drawings, municipal permissions assistance, material testing (concrete compression / steel tensile strength), and supervision by senior consultants. A standard management and coordination fee of 15% of the construction cost applies to custom turnkey projects, deducted according to progress bills.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">5. Inspection Rights</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                The Owner or their representative has the right to inspect the construction work and materials at any time without prior notice. Any requested changes should be communicated, and the Builder will be given reasonable time to implement them.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">6. Liability for Defects &amp; Warranty</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                We stand by our work. Utkarsh Builder provides a 2-year warranty post-handover for core structural defects, structural cracks, and leakages arising from workmanship issues. Free repair services apply to plumbing lines and electrical wiring installed by us during this period.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">7. Force Majeure</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                Neither party will be held liable for delays or failure to perform due to unforeseen events beyond their control, including but not limited to natural disasters, government orders, or supply chain disruptions.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">8. Dispute Resolution &amp; Termination</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                Either party holds the right to terminate the contract in case of material breach or ongoing quality failures, after giving a 30-day written warning notice. In case of a dispute, the parties will attempt to resolve it amicably through negotiation. If unsuccessful, the dispute will be resolved through arbitration in Jaipur, Rajasthan. This Agreement is governed by the laws of India.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-[#1B1B1B]">9. Acceptance of Terms</h3>
              <p className="text-sm text-[#6F6F6F] leading-relaxed font-light">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>

            {/* Disclaimer repeat */}
            <div className="bg-[#FAF7F5] border border-black/[0.04] rounded-2xl p-5 md:p-6 text-xs md:text-sm flex gap-3.5 items-start leading-relaxed text-[#6F6F6F]">
              <ShieldCheck className="h-5 w-5 text-[#C92C15] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1B1B1B]">Note:</strong> This is a simplified version of our Terms and Conditions. A detailed legal document is available upon request through our communication channels.
              </div>
            </div>

          </div>
        </FadeUp>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 mt-14 md:mt-20">
        <FadeUp delay={0.15} y={20}>
          <div className="bg-[#1B1B1B] rounded-[24px] md:rounded-[32px] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Need a detailed contract?</h3>
              <p className="text-sm text-white/50 font-light max-w-lg leading-relaxed">
                Connect with us to receive the full legal agreement document or to clarify any contractual terms for your project.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="mailto:nowalutkarsh@gmail.com"
                className="flex items-center gap-2 px-6 py-3 bg-[#C92C15] text-white rounded-xl text-sm font-medium hover:bg-[#D43B13] transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </a>
              <a
                href="tel:+918562034491"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-all hover:scale-[1.02] active:scale-95 border border-white/10"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

    </div>
  );
};

export default TermsAndConditions;

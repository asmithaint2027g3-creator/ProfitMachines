import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-white text-[#0066FF] border-b-2 border-[#0066FF]">
      <div className="relative w-full max-w-[95%] lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="space-y-10">

          {/* Badge */}
          <motion.div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border-2 border-[#0066FF] rounded-full">
            <Sparkles className="w-4 h-4 text-[#0066FF]" />
            <span className="text-xs text-[#0066FF] font-bold tracking-widest uppercase">
              AI-Powered Revenue Operating System
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold text-[#0066FF] leading-[1.05] tracking-tight max-w-5xl mx-auto">
            Increase Revenue Velocity by{' '}
            <span className="underline decoration-[#0066FF] decoration-4 underline-offset-8">
              5X in 12 Months
            </span>{' '}
            with AI Sales Ops
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[#0066FF] leading-relaxed max-w-2xl mx-auto font-medium">
            Propel your business on autopilot with <span className="font-bold">Artificial Intelligence (AI) & Machine Learning (ML)-Powered Sales Growth Automation</span> — from Demand Discovery to Revenue Management.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              asChild
              size="lg"
              className="bg-[#0066FF] hover:bg-white text-white hover:text-[#0066FF] border-2 border-[#0066FF] px-8 h-14 text-sm tracking-wide uppercase rounded-full transition-all font-bold"
            >
              <Link to="/book-consultation">
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-[#0066FF] bg-white text-[#0066FF] hover:bg-[#0066FF] hover:text-white h-14 text-sm tracking-wide uppercase rounded-full px-8 transition-all font-bold"
            >
              <Link to="/solutions">Explore AI Solutions</Link>
            </Button>
          </div>

          {/* Bento Grid Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 max-w-5xl mx-auto mt-12">
            {[
              { value: '5X', suffix: 'Revenue Growth' },
              { value: '1000X', suffix: 'Faster Process' },
              { value: '24/7', suffix: 'AI Automation' }
            ].map((stat, i) => (
              <div
                key={i}
                className="relative p-10 rounded-[2rem] bg-white border-2 border-[#0066FF] hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                <div className="relative z-10 flex flex-col items-start text-left gap-2">
                  <div className="text-5xl lg:text-6xl font-bold text-[#0066FF] tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#0066FF] font-bold uppercase tracking-wider">
                    {stat.suffix}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bento Box ICP */}
          <div className="mt-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-[2rem] p-10 md:p-14 border-2 border-[#0066FF] text-left relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
              
              <div className="flex-1 space-y-6">
                <div className="inline-block px-3 py-1 bg-white text-[#0066FF] text-xs font-bold uppercase tracking-widest rounded-md border-2 border-[#0066FF]">
                  Ideal Customer Profile
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#0066FF] tracking-tight leading-tight">
                  Designed For Revenue Leaders Who Need Predictable Growth.
                </h3>
                <p className="text-[#0066FF] text-lg leading-relaxed font-medium">
                  Built for CROs, VPs of Sales, and Growth Leaders accountable for pipeline velocity, conversion rates, and forecast accuracy—who need AI to operate their revenue engine continuously.
                </p>
              </div>

              <div className="flex-1 w-full bg-white rounded-2xl p-8 border-2 border-[#0066FF]">
                <h4 className="font-bold text-[#0066FF] uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0066FF]" />
                  Best Fit If You:
                </h4>
                <div className="space-y-4">
                  {[
                    "Own aggressive revenue targets",
                    "Manage complex B2B buying cycles",
                    "Need AI to replace manual sales & marketing ops"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#0066FF] mt-2 shrink-0"></div>
                      <span className="text-base text-[#0066FF] font-medium leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Trust Strip */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm font-bold text-[#0066FF]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0066FF]" />
            SOC2 Type II Certified
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#0066FF]" />
            99.99% Uptime SLA
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-slate-50 selection:bg-emerald-100">
      {/* Refined Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[120%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-50"></div>
        <div className="absolute -top-[20%] right-[10%] w-[600px] h-[600px] bg-emerald-400/5 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-multiply"></div>
      </div>

      <div className="relative w-full max-w-[95%] lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="space-y-10">

          {/* Premium Badge */}
          <motion.div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-full shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:border-slate-300 hover:bg-white transition-all cursor-default group">
            <Sparkles className="w-4 h-4 text-slate-800" />
            <span className="text-xs text-slate-700 font-bold tracking-widest uppercase">
              AI-Powered Revenue Operating System
            </span>
          </motion.div>

          {/* Ultra-refined Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold text-slate-900 leading-[1.05] tracking-tighter max-w-5xl mx-auto">
            Increase Revenue Velocity by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 drop-shadow-sm border-b-4 border-slate-900/10">
              5X in 12 Months
            </span>{' '}
            with AI Sales Ops
          </h1>

          {/* Subheadline with lighter contrast */}
          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium text-balance">
            Propel your business on autopilot with <span className="text-slate-800 font-semibold">Artificial Intelligence (AI) & Machine Learning (ML)-Powered Sales Growth Automation</span> — from Demand Discovery to Revenue Management.
          </p>

          {/* Minimalist CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              asChild
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-14 text-sm tracking-wide uppercase rounded-full shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 transition-all font-bold"
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
              className="border-slate-200 bg-white/50 backdrop-blur-sm text-slate-700 hover:bg-white hover:border-slate-300 h-14 text-sm tracking-wide uppercase rounded-full px-8 hover:text-slate-900 transition-all font-bold"
            >
              <Link to="/solutions">Explore AI Solutions</Link>
            </Button>
          </div>

          {/* Bento Grid Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 max-w-5xl mx-auto mt-12">
            {[
              { value: '5X', suffix: 'Revenue Growth', label: 'Revenue Growth' },
              { value: '1000X', suffix: 'Faster Process', label: 'Faster Process' },
              { value: '24/7', suffix: 'AI Automation', label: 'AI Automation' }
            ].map((stat, i) => (
              <div
                key={i}
                className="relative p-10 rounded-[2rem] bg-white border border-slate-100 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] hover:border-slate-200 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="relative z-10 flex flex-col items-start text-left gap-2">
                  <div className="text-5xl lg:text-6xl font-bold text-slate-900 tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">
                    {stat.suffix}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bento Box ICP */}
          <div className="mt-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-[2rem] p-10 md:p-14 border border-slate-100 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.03)] text-left relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
              
              <div className="flex-1 space-y-6">
                <div className="inline-block px-3 py-1 bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest rounded-md border border-slate-100">
                  Ideal Customer Profile
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  Designed For Revenue Leaders Who Need <span className="text-slate-500 line-through decoration-slate-300 mr-2">Guesses</span>
                  <span className="text-slate-900">Predictable Growth.</span>
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  Built for CROs, VPs of Sales, and Growth Leaders accountable for pipeline velocity, conversion rates, and forecast accuracy—who need AI to operate their revenue engine continuously.
                </p>
              </div>

              <div className="flex-1 w-full bg-slate-50/50 rounded-2xl p-8 border border-slate-100">
                <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-slate-700" />
                  Best Fit If You:
                </h4>
                <div className="space-y-4">
                  {[
                    "Own aggressive revenue targets",
                    "Manage complex B2B buying cycles",
                    "Need AI to replace manual sales & marketing ops"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0"></div>
                      <span className="text-base text-slate-600 font-medium leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
              <ShieldCheck className="w-5 h-5 text-brand-blue" />
              SOC2 Type II Certified
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
              <Zap className="w-5 h-5 text-brand-blue" />
              99.99% Uptime SLA
            </div>
          </div>

        </div>

        {/* Floating AI Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative w-full h-[500px] lg:h-[600px] hidden lg:block"
        >
           {/* Abstract Floating Elements representing AI Enterprise Infrastructure */}
           <motion.div 
             animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[10%] right-[10%] w-64 h-64 glass-dark rounded-3xl shadow-2xl overflow-hidden flex flex-col p-6 z-20"
           >
              <div className="w-full h-8 bg-slate-800 rounded-lg mb-4 opacity-50 animate-pulse"></div>
              <div className="w-3/4 h-8 bg-slate-800 rounded-lg mb-4 opacity-50 animate-pulse delay-75"></div>
              <div className="mt-auto w-full h-24 bg-gradient-to-t from-brand-blue/20 to-transparent rounded-lg"></div>
           </motion.div>

           <motion.div 
             animate={{ y: [15, -15, 15], x: [-5, 5, -5] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute bottom-[20%] left-[5%] w-48 h-48 glass rounded-full shadow-xl flex items-center justify-center z-30 border border-white/20"
           >
              <div className="w-32 h-32 rounded-full border-4 border-brand-purple/20 border-t-brand-purple animate-spin" style={{ animationDuration: '3s' }}></div>
              <Sparkles className="absolute w-8 h-8 text-brand-blue" />
           </motion.div>

           <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-500/10 rounded-full blur-3xl -z-10"></div>
        </motion.div>
      </div>

      {/* Trusted By Client Logos Placeholder */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 mt-20 pt-10 border-t border-slate-100"
      >
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
          Trusted by Innovative Teams Worldwide
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Placeholder shapes for logos until actual SVGs are provided */}
           <div className="h-8 w-24 md:w-32 bg-slate-200 rounded"></div>
           <div className="h-8 w-24 md:w-32 bg-slate-200 rounded"></div>
           <div className="h-8 w-24 md:w-32 bg-slate-200 rounded"></div>
           <div className="h-8 w-24 md:w-32 bg-slate-200 rounded"></div>
           <div className="h-8 w-24 md:w-32 bg-slate-200 rounded hidden md:block"></div>
        </div>
      </motion.div>
    </section>
  );
}

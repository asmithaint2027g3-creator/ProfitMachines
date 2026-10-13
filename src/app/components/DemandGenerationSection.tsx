import { Sparkles } from 'lucide-react';

const features = [
  {
    number: '01',
    title: 'AI Driven Demand Discovery',
    description: 'Uncover hidden market opportunities with AI-powered demand analysis'
  },
  {
    number: '02',
    title: 'AI Driven Demand Generation',
    description: 'Generate qualified demand automatically across all channels'
  },
  {
    number: '03',
    title: 'Competitive Demand Tracing',
    description: 'Track and analyze competitor demand patterns in real-time'
  },
  {
    number: '04',
    title: 'Micro-Segmentation Analytics',
    description: 'Target precise audience segments with AI-driven insights'
  },
  {
    number: '05',
    title: 'Offer Refinement & Optimization',
    description: 'Continuously optimize offers based on market response'
  },
  {
    number: '06',
    title: 'Multi-Channel Demand Gen Automation',
    description: 'Automate demand generation across all marketing channels'
  },
  {
    number: '07',
    title: 'Product-Market Fit Acceleration',
    description: 'Accelerate product-market fit with data-driven iterations'
  },
  {
    number: '08',
    title: 'Behavioral Segmentation & Targeting',
    description: 'Target based on behavior patterns and engagement signals'
  },
  {
    number: '09',
    title: 'AI Campaign Optimization',
    description: 'Automatically optimize campaigns for maximum ROI'
  },
  {
    number: '10',
    title: 'AI ChatGPT Conversational Marketing Engine',
    description: 'Engage prospects with intelligent conversational AI'
  },
];

export default function DemandGenerationSection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#0066FF] rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#0066FF]" />
            <span className="text-sm text-[#0066FF] font-bold">Automated Powerhouse</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0066FF] font-bold mb-6">
            AI-Driven Automated Demand Generation Powerhouse —{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#0066FF] bg-clip-text text-transparent">
              1000X Faster, No Holidays
            </span>
          </h2>
          <p className="text-lg text-[#0066FF] max-w-2xl mx-auto">
            Transform your demand generation with AI automation that never sleeps
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] to-purple-100 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative bg-white rounded-2xl p-8 border border-[#0066FF] hover:border-[#0066FF] transition-all shadow-sm hover:shadow-lg">
                {/* Number Badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-[#0066FF] mb-4 group-hover:bg-[#0066FF] group-hover:border-[#0066FF] transition-colors">
                  <span className="text-lg font-bold bg-gradient-to-r from-[#0066FF] to-[#0066FF] bg-clip-text text-transparent">
                    {feature.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0066FF] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#0066FF] leading-relaxed font-medium">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066FF] to-[#0066FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

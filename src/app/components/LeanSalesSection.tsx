import {
  Users,
  Heart,
  FileText,
  Target,
  LineChart,
  Workflow,
  Headphones,
  TrendingUp,
  Shield,
  MessageCircle
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Data-Driven Customer Insights',
    description: 'Deep customer intelligence powered by AI analytics'
  },
  {
    icon: Heart,
    title: 'Automated Lead & Loyalty Nurturing',
    description: 'Build lasting relationships with automated nurturing'
  },
  {
    icon: FileText,
    title: 'AI Personalized Content Creation',
    description: 'Generate personalized content at scale with AI'
  },
  {
    icon: Target,
    title: 'Micro-Segmentation & Targeting',
    description: 'Precision targeting with advanced segmentation'
  },
  {
    icon: LineChart,
    title: 'Predictive Analytics',
    description: 'Forecast sales outcomes with AI predictions'
  },
  {
    icon: Workflow,
    title: 'AI Multi-Channel Engagement',
    description: 'Engage customers across all touchpoints seamlessly'
  },
  {
    icon: Headphones,
    title: 'AI Customer Success Ops',
    description: 'Ensure customer success with AI-driven operations'
  },
  {
    icon: TrendingUp,
    title: 'AI Revenue Expansion',
    description: 'Identify and execute upsell opportunities automatically'
  },
  {
    icon: Shield,
    title: 'AI Customer Retention',
    description: 'Reduce churn with predictive retention strategies'
  },
  {
    icon: MessageCircle,
    title: 'AI ChatGPT Conversational Engine',
    description: 'Intelligent conversations that convert and retain'
  },
];

export default function LeanSalesSection() {
  return (
    <section className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-6">
            AI Driven Lean Sales &{' '}
            <span className="bg-gradient-to-r from-[#2878B5] to-emerald-600 bg-clip-text text-transparent">
              Sales Transformation
            </span>
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            Transform your sales process with lean, AI-powered operations
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClass = index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'purple' : 'cyan';

            const colors = {
              blue: {
                bg: 'bg-white',
                border: 'border-slate-200 group-hover:border-emerald-300',
                icon: 'bg-emerald-50 text-[#2878B5]',
                glow: 'group-hover:shadow-lg group-hover:shadow-blue-500/10'
              },
              purple: {
                bg: 'bg-white',
                border: 'border-slate-200 group-hover:border-teal-300',
                icon: 'bg-teal-50 text-teal-700',
                glow: 'group-hover:shadow-lg group-hover:shadow-purple-500/10'
              },
              cyan: {
                bg: 'bg-white',
                border: 'border-slate-200 group-hover:border-cyan-300',
                icon: 'bg-cyan-50 text-cyan-600',
                glow: 'group-hover:shadow-lg group-hover:shadow-cyan-500/10'
              }
            }[colorClass];

            return (
              <div
                key={index}
                className={`group relative ${colors.bg} rounded-xl p-6 border ${colors.border} transition-all duration-300 hover:-translate-y-1 ${colors.glow}`}
              >
                <div className={`inline-flex p-3 rounded-lg ${colors.icon} mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

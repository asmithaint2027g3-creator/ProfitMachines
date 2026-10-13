import {
  Target,
  TrendingUp,
  Compass,
  BarChart3,
  Navigation,
  Zap,
  Lightbulb,
  MessageSquare,
  Settings,
  RefreshCw,
  FileText,
  Activity
} from 'lucide-react';

const capabilities = [
  { icon: Target, title: 'Bottlenecks Identification', color: 'blue' },
  { icon: TrendingUp, title: 'Conversion Rate Mapping', color: 'purple' },
  { icon: Compass, title: '360° AI Sales Assessment', color: 'cyan' },
  { icon: BarChart3, title: 'Competitive KPI Analytics', color: 'blue' },
  { icon: Navigation, title: 'Lead Movement Tracking', color: 'purple' },
  { icon: Zap, title: 'Sales Funnel Velocity', color: 'cyan' },
  { icon: Lightbulb, title: 'Predictive Sales Conversion Insights', color: 'blue' },
  { icon: MessageSquare, title: 'Objection Handling Evaluation', color: 'purple' },
  { icon: Settings, title: 'Sales Process Streamlining', color: 'cyan' },
  { icon: RefreshCw, title: 'Continuous Sales Improvement', color: 'blue' },
  { icon: FileText, title: 'Data-Backed Recommendations', color: 'purple' },
  { icon: Activity, title: 'Real-Time Performance Analytics', color: 'cyan' },
];

const getColorClasses = (color: string) => {
  switch (color) {
    case 'blue':
      return {
        bg: 'from-[#0066FF]/10 to-[#0066FF]/10',
        border: 'border-[#0066FF]/20',
        icon: 'text-[#0066FF]',
        glow: 'group-hover:shadow-[0_0_20px_rgba(6,78,59,0.3)]'
      };
    case 'purple':
      return {
        bg: 'from-[#0066FF]/10 to-[#0066FF]/10',
        border: 'border-purple-500/20',
        icon: 'text-[#0066FF]',
        glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]'
      };
    case 'cyan':
      return {
        bg: 'from-cyan-500/10 to-cyan-600/10',
        border: 'border-cyan-500/20',
        icon: 'text-cyan-400',
        glow: 'group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]'
      };
    default:
      return {
        bg: 'from-[#0066FF]/10 to-[#0066FF]/10',
        border: 'border-[#0066FF]/20',
        icon: 'text-[#0066FF]',
        glow: 'group-hover:shadow-[0_0_20px_rgba(6,78,59,0.3)]'
      };
  }
};

export default function AIAnalyticsGrid() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0066FF] font-bold mb-6">
            AI Analytics Driven{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#0066FF] bg-clip-text text-transparent">
              Sales Transformation
            </span>
          </h2>
          <p className="text-lg text-[#0066FF]">
            Leverage cutting-edge AI analytics to transform every aspect of your sales process
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;

            // Simplified color mapping for light theme
            const colors = {
              blue: 'bg-white text-[#0066FF] border-[#0066FF] group-hover:border-[#0066FF] group-hover:shadow-blue-500/10',
              purple: 'bg-[#0066FF] text-[#0066FF] border-[#0066FF] group-hover:border-purple-400 group-hover:shadow-purple-500/10',
              cyan: 'bg-cyan-50 text-cyan-600 border-cyan-200 group-hover:border-cyan-400 group-hover:shadow-cyan-500/10'
            }[capability.color] || 'bg-white text-[#0066FF] border-[#0066FF]';

            return (
              <div
                key={index}
                className="group relative bg-white rounded-xl p-6 border border-[#0066FF] transition-all hover:-translate-y-1 hover:shadow-lg hover:border-[#0066FF]"
              >
                <div className={`inline-flex p-3 rounded-lg border mb-4 ${colors.split(' ').filter(c => c.startsWith('bg') || c.startsWith('text') || c.startsWith('border-[#0066FF]')).join(' ')}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-[#0066FF] font-bold leading-snug text-lg">
                  {capability.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import {
  Activity,
  BarChart3,
  Compass,
  Database,
  GitBranch,
  Gauge,
  Lightbulb,
  MessageSquare,
  Settings,
  TrendingUp
} from 'lucide-react';

const metrics = [
  { icon: Activity, label: 'Bottlenecks Identification', value: '12 Found', trend: '+5%' },
  { icon: BarChart3, label: 'Conversion Rate Scrutiny', value: '23.4%', trend: '+8%' },
  { icon: Compass, label: '360° Sales Assessment', value: '94/100', trend: '+12%' },
  { icon: Database, label: 'KPI-Driven Analytics', value: '47 KPIs', trend: '+3%' },
  { icon: GitBranch, label: 'Lead Movement Tracking', value: '1,247', trend: '+24%' },
  { icon: Gauge, label: 'Sales Funnel Efficiency', value: '87%', trend: '+15%' },
  { icon: Lightbulb, label: 'Predictive Insights', value: '98% Acc', trend: '+6%' },
  { icon: MessageSquare, label: 'Objection Handling', value: '4.8/5', trend: '+0.3' },
  { icon: Settings, label: 'Process Streamlining', value: '34% Faster', trend: '+11%' },
  { icon: TrendingUp, label: 'Continuous Improvement', value: 'Active', trend: 'Live' },
];

export default function AnalyticsDashboard() {
  return (
    <section className="py-20 lg:py-32 bg-slate-50 border-t border-slate-200">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-6">
            Analytics Driven Sales &{' '}
            <span className="bg-gradient-to-r from-[#2878B5] to-emerald-600 bg-clip-text text-transparent">
              Revenue Situation Analytics
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            Real-time dashboard for complete sales and revenue visibility
          </p>
        </div>

        {/* Dashboard Container */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/50 to-purple-200/50 rounded-3xl blur-2xl opacity-50"></div>

          <div className="relative bg-white rounded-3xl p-6 lg:p-10 border border-slate-200 shadow-xl">
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Sales Analytics Dashboard
                </h3>
                <p className="text-slate-500">Real-time metrics and insights</p>
              </div>
              <div className="flex items-center gap-2 mt-4 sm:mt-0 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-bold">Live Data</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                const isPositive = metric.trend.startsWith('+') || metric.trend === 'Live' || metric.trend === 'Active';

                return (
                  <div
                    key={index}
                    className="group relative bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-emerald-300 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md"
                  >
                    {/* Icon */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 rounded-lg bg-white border border-slate-100 shadow-sm">
                        <Icon className="w-5 h-5 text-[#2878B5]" />
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                        }`}>
                        {metric.trend}
                      </span>
                    </div>

                    {/* Value */}
                    <div className="text-2xl font-bold text-slate-900 mb-1">
                      {metric.value}
                    </div>

                    {/* Label */}
                    <div className="text-xs text-slate-500 font-semibold leading-tight uppercase tracking-wide">
                      {metric.label}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all"
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chart Preview */}
            <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-slate-900 font-bold">Revenue Velocity Trend</h4>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs bg-white border border-slate-200 text-[#1E6297] rounded-lg font-bold shadow-sm">7D</button>
                  <button className="px-3 py-1 text-xs text-slate-500 rounded-lg hover:bg-white hover:text-slate-900 transition-colors">30D</button>
                  <button className="px-3 py-1 text-xs text-slate-500 rounded-lg hover:bg-white hover:text-slate-900 transition-colors">90D</button>
                </div>
              </div>

              <div className="h-40 flex items-end justify-around gap-2">
                {Array.from({ length: 12 }).map((_, i) => {
                  const height = Math.random() * 60 + 40;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-emerald-400 to-purple-400 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

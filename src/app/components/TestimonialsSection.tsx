import { Quote, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';

const testimonials = [
  {
    company: 'TalentVector.AI',
    logo: 'TV',
    testimonial: 'ProfitMachines completely transformed our sales process. The AI-driven approach helped us identify bottlenecks we didn\'t even know existed.',
    author: 'CEO & Founder',
    metrics: [
      { icon: Users, label: 'High-Quality Leads', value: '24X', color: 'blue' },
      { icon: TrendingUp, label: 'Conversion Rate', value: '3X', color: 'purple' },
      { icon: Clock, label: 'Sales Cycle Reduction', value: '50%', color: 'cyan' },
      { icon: DollarSign, label: 'Startup Valuation', value: '6X', color: 'green' },
    ]
  },
  {
    company: 'EPSUNSOL',
    logo: 'EP',
    testimonial: 'The AI-powered automation has been a game-changer. We\'ve significantly reduced our cost of sales while dramatically increasing lead quality.',
    author: 'Head of Revenue',
    metrics: [
      { icon: DollarSign, label: 'Cost of Sales Reduction', value: '65%', color: 'blue' },
      { icon: Users, label: 'SQL Auto-Generated', value: '80%', color: 'purple' },
      { icon: TrendingUp, label: 'Revenue Growth', value: '4.2X', color: 'cyan' },
      { icon: Clock, label: 'Time to Close', value: '-40%', color: 'green' },
    ]
  },
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: 'from-[#0066FF] to-[#0066FF]',
    purple: 'from-[#0066FF] to-[#0066FF]',
    cyan: 'from-cyan-500 to-cyan-600',
    green: 'from-green-500 to-green-600',
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 bg-white border-t border-[#0066FF]">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0066FF] font-bold mb-6 tracking-tight">
            Customer{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#0066FF] bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-lg text-[#0066FF] leading-relaxed font-normal">
            See how leading B2B companies are achieving exponential growth with ProfitMachines
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] to-purple-100 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative bg-white rounded-3xl p-8 border border-[#0066FF] hover:border-[#0066FF] transition-all shadow-sm hover:shadow-lg">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0066FF] to-[#0066FF] rounded-xl flex items-center justify-center shadow-sm border border-[#0066FF]">
                      <span className="text-[#0066FF] font-bold text-lg">{testimonial.logo}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0066FF]">{testimonial.company}</h3>
                      <p className="text-sm text-[#0066FF] font-medium">{testimonial.author}</p>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-[#0066FF]" />
                </div>

                {/* Testimonial Text */}
                <p className="text-[#0066FF] leading-relaxed mb-8 italic">
                  "{testimonial.testimonial}"
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {testimonial.metrics.map((metric, metricIndex) => {
                    const Icon = metric.icon;
                    return (
                      <div
                        key={metricIndex}
                        className="bg-white rounded-xl p-4 border border-[#0066FF] hover:border-[#0066FF] transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`w-4 h-4 bg-gradient-to-r ${getColorClasses(metric.color)} bg-clip-text text-transparent`} />
                          <span className="text-xs text-[#0066FF] font-semibold">{metric.label}</span>
                        </div>
                        <div className={`text-2xl font-bold bg-gradient-to-r ${getColorClasses(metric.color)} bg-clip-text text-transparent`}>
                          {metric.value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

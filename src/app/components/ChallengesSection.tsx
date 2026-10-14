import { AlertCircle } from 'lucide-react';

const demandChallenges = [
  'Faulty Demand Discovery',
  'Marketing Channel Misalignment',
  'Poor Demand Capture',
  'Misaligned Marketing Investment',
  'Poor Offer-to-Need Mapping',
  'Lack of Clear Strategy',
  'Poor Buyer Personas',
];

const salesChallenges = [
  'Lack of Lead Capture System',
  'Unclear Value Proposition',
  'Poor Pre-Sales Engagement',
  'Lack of Lead Nurturing',
  'Ineffective Content Mapping',
  'Unqualified Digital Sales Team',
  'Sales & Marketing Misalignment',
];

export default function ChallengesSection() {
  return (
    <section className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-bold mb-6">
            Sales & Demand Generation{' '}
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Challenges
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            Identify and overcome the critical challenges holding back your revenue growth
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Demand Generation Challenges */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-8 border border-red-100 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-50 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Demand Generation Performance Challenges
                </h3>
              </div>

              <div className="space-y-3">
                {demandChallenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-100 hover:border-red-200 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-red-700 font-semibold">{index + 1}</span>
                    </div>
                    <span className="text-slate-700 font-medium">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sales & Revenue Challenges */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-8 border border-orange-100 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Sales & Revenue Challenges
                </h3>
              </div>

              <div className="space-y-3">
                {salesChallenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100 hover:border-orange-200 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-orange-700 font-semibold">{index + 1}</span>
                    </div>
                    <span className="text-slate-700 font-medium">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

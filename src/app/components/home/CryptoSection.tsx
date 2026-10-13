import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Hexagon, Network, Key, Boxes } from 'lucide-react';

const cryptoFeatures = [
    {
        icon: Network,
        title: 'Blockchain Infrastructure',
        desc: 'Custom L1/L2 nodes, validator setups, and high-throughput RPC endpoints for enterprise-scale dApps.'
    },
    {
        icon: Key,
        title: 'Smart Contract Security',
        desc: 'Comprehensive audits, formal verification, and secure deployment pipelines for DeFi and Web3 protocols.'
    },
    {
        icon: Boxes,
        title: 'Asset Tokenization',
        desc: 'Regulatory-compliant tokenization platforms for real-world assets (RWA), real estate, and digital securities.'
    },
    {
        icon: Hexagon,
        title: 'Web3 Integration',
        desc: 'Seamless bridging of legacy Web2 infrastructure with decentralized Web3 ecosystems and wallet providers.'
    }
];

export default function CryptoSection() {
    return (
        <section className="py-32 bg-white relative overflow-hidden border-t border-[#0066FF]" id="crypto">
            {/* Background elements */}
            <div className="absolute inset-0 bg-grid-slate-200 opacity-40 pointer-events-none"></div>
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#0066FF]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/2"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white border border-[#0066FF] text-[#0066FF] font-semibold text-xs tracking-widest uppercase mb-6 shadow-sm">
                            Web3 & Blockchain
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0066FF] mb-6 tracking-tight">
                            Next-Generation <span className="text-[#0066FF] bg-gradient-to-r from-[#0066FF] to-[#0066FF]">Crypto Infrastructure</span>
                        </h2>
                        <p className="text-xl text-[#0066FF] font-medium mb-10 leading-relaxed max-w-xl">
                            We build secure, scalable, and compliant decentralized applications for financial institutions and forward-thinking enterprises.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/book-consultation" className="btn-cta-primary bg-[#0066FF] hover:bg-[#0066FF] shadow-indigo-500/25 group">
                                <span className="flex items-center">
                                    Discuss Web3 Strategy
                                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {cryptoFeatures.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-3xl border border-[#0066FF] hover:border-[#0066FF] transition-all duration-300 group shadow-sm hover:shadow-lg"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white border border-[#0066FF] flex items-center justify-center mb-6 group-hover:bg-[#0066FF] group-hover:border-[#0066FF] transition-all duration-300">
                                    <feature.icon className="w-6 h-6 text-[#0066FF] group-hover:text-[#0066FF] transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-[#0066FF] mb-3 group-hover:text-[#0066FF] transition-colors">{feature.title}</h3>
                                <p className="text-sm text-[#0066FF] leading-relaxed font-medium">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

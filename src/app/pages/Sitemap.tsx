import { ArrowLeft, Map, Layout, Users, Shield, Briefcase, Database, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sitemap() {
    const sitemapData = [
        {
            category: "Main",
            icon: Layout,
            links: [
                {
                    name: "Home",
                    path: "/",
                    sections: [
                        "Hero Section",
                        "AI-Powered Revenue Acceleration Engines",
                        "Demand Discovery Engine",
                        "Performance Marketing Engine",
                        "Growth Acceleration Engine",
                        "Market Validation Engine",
                        "Customer Journey Engine",
                        "Startup MVP Engine",
                        "Lead Generation Engine",
                        "Free AI Revenue Diagnostic"
                    ]
                },
                {
                    name: "Book for Consultation",
                    path: "/book-consultation",
                    sections: [
                        "Proprietary AI Growth Framework",
                        "Booking Form",
                        "Testimonials"
                    ]
                }
            ]
        },
        {
            category: "Platform & Solutions",
            icon: Database,
            links: [
                {
                    name: "Solutions",
                    path: "/solutions",
                    sections: [
                        "AI Business Growth Strategy",
                        "AI Market Strategy & Demand Intelligence",
                        "AI-Driven Growth Hacking",
                        "AI Performance Marketing",
                        "Autonomous Sales Agents",
                        "Sales Process Optimization",
                        "AI Revenue Operations (RevOps)",
                        "Revenue Acceleration & Expansion"
                    ]
                },
                {
                    name: "Outcomes",
                    path: "/outcomes",
                    sections: [
                        "Business Impact & Key Results",
                        "Growth Metrics",
                        "Success Indicators"
                    ]
                },
                {
                    name: "Offerings",
                    path: "/offerings",
                    sections: [
                        "Detailed Service Packages",
                        "Relocated Outcome Pages",
                        "Profit Pool Discovery (Parent Offering)",
                        "  +- Market Discovery",
                        "  +- Demand Discovery",
                        "  +- Value Discovery",
                        "  +- Channel Discovery",
                        "  +- Competitive Discovery",
                        "  +- Customer Discovery",
                        "  +- Product-Market Fit Discovery",
                        "  +- B2B Profit Pool Discovery",
                        "  +- B2C Profit Pool Discovery"
                    ]
                },
                {
                    name: "Resources",
                    path: "/resources",
                    sections: [
                        "AI Revenue Playbooks",
                        "Demand Gen Frameworks",
                        "Sales Guides",
                        "RevOps Best Practices",
                        "Case Studies & Whitepapers"
                    ]
                }
            ]
        },
        {
            category: "Industries & Verticals",
            icon: Briefcase,
            links: [
                {
                    name: "Industries",
                    path: "/industries",
                    sections: [
                        "BFSI",
                        "Enterprise",
                        "B2B",
                        "B2C",
                        "Startup / Early Stage"
                    ]
                },
                {
                    name: "Verticals",
                    path: "/verticals",
                    sections: [
                        "Target Market Segments",
                        "Vertical-Specific Solutions"
                    ]
                },
                {
                    name: "Crypto & Web3",
                    path: "/crypto",
                    sections: [
                        "Web3 Growth Strategies",
                        "Tokenomics & Community",
                        "DeFi Marketing"
                    ]
                }
            ]
        },
        {
            category: "Company",
            icon: Users,
            links: [
                {
                    name: "Company",
                    path: "/company",
                    sections: [
                        "Our Mission",
                        "Leadership Team",
                        "Offices (Mumbai & Bangalore)",
                        "Contact Information"
                    ]
                },
                {
                    name: "Careers",
                    path: "/career",
                    sections: [
                        "Our Values",
                        "Open Positions",
                        "Join the Team"
                    ]
                }
            ]
        },
        {
            category: "Legal & Compliance",
            icon: Shield,
            links: [
                {
                    name: "Privacy Policy",
                    path: "/privacy",
                    sections: ["Data Collection", "Usage", "Rights", "Contact"]
                },
                {
                    name: "Terms of Service",
                    path: "/terms",
                    sections: ["Acceptance", "Services", "Responsibilities", "Liability"]
                },
                {
                    name: "Security Policy",
                    path: "/security",
                    sections: ["Controls", "Data Protection", "Compliance", "Incident Response"]
                },
                {
                    name: "Cookie Policy",
                    path: "/cookies",
                    sections: ["Cookie Types", "Management", "Updates"]
                },
                {
                    name: "Copyright Notice",
                    path: "/copyright",
                    sections: ["Ownership", "Permitted Use", "Infringement", "Trademarks"]
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-[#0066FF]">
            {/* Header/Hero Section */}
            <div className="bg-white border-b border-[#0066FF] pt-32 pb-12 lg:pt-40 lg:pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-50"></div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/" className="inline-flex items-center text-sm font-medium text-[#0066FF] hover:text-[#0066FF] mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white rounded-lg text-[#0066FF]">
                            <Map className="w-6 h-6" />
                        </div>
                        <span className="text-[#0066FF] font-bold uppercase tracking-wider text-sm">Site Overview</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0066FF] tracking-tight mb-6">
                        Detailed Sitemap
                    </h1>
                    <p className="text-lg text-[#0066FF] max-w-2xl">
                        A complete overview of all pages and their key sections on ProfitMachines
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-12">
                    {sitemapData.map((section, index) => (
                        <div key={index} className="bg-white p-8 lg:p-10 rounded-2xl border border-[#0066FF] shadow-sm hover:shadow-lg transition-all hover:border-[#0066FF] group">

                            {/* Category Header */}
                            <div className="flex items-center gap-4 mb-8 border-b border-[#0066FF] pb-6">
                                <div className="p-3 bg-white rounded-xl group-hover:bg-[#0066FF] group-hover:text-[#0066FF] transition-colors">
                                    <section.icon className="w-8 h-8 text-[#0066FF] group-hover:text-[#0066FF] transition-colors" />
                                </div>
                                <h2 className="text-2xl font-bold text-[#0066FF]">{section.category}</h2>
                            </div>

                            {/* Links Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                                {section.links.map((link, linkIndex) => (
                                    <div key={linkIndex} className="space-y-3">
                                        <Link
                                            to={link.path}
                                            className="flex items-center gap-2 text-lg font-bold text-[#0066FF] hover:text-[#0066FF] transition-colors group/link mb-2"
                                        >
                                            {link.name}
                                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                                        </Link>

                                        {/* Sections List */}
                                        {link.sections && link.sections.length > 0 && (
                                            <ul className="space-y-2 border-l-2 border-[#0066FF] pl-4">
                                                {link.sections.map((subSection, subIndex) => (
                                                    <li key={subIndex} className="text-sm text-[#0066FF] font-medium hover:text-[#0066FF] transition-colors flex items-center gap-2">
                                                        <div className="w-1 h-1 rounded-full bg-white"></div>
                                                        {subSection}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

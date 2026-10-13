import React from 'react';
import { Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {

    const quickLinks: { [key: string]: string } = {
        'Home': '/',
        'About Us': '/company',
        'Case Studies': '/outcomes',
        'Blogs': '/resources',
        'Careers': '/career',
        'Contact Us': '/book-consultation'
    };

    const solutionsLinks: { [key: string]: string } = {
        'AI Solutions': '/solutions',
        'Enterprise AI': '/solutions',
        'AI Agents': '/solutions',
        'Cloud Services': '/solutions',
        'Custom Software': '/solutions',
        'Cyber Security': '/security'
    };

    const industriesLinks: { [key: string]: string } = {
        'Healthcare': '/industries',
        'Finance': '/industries',
        'Retail': '/industries',
        'Manufacturing': '/industries',
        'Logistics': '/industries',
        'Enterprises': '/industries'
    };

    const techLinks: { [key: string]: string } = {
        'Artificial Intelligence': '/solutions',
        'Machine Learning': '/solutions',
        'Generative AI': '/solutions',
        'Cloud Computing': '/solutions',
        'Data Engineering': '/solutions'
    };

    return (
        <footer className="bg-white pt-16 pb-8 border-t-2 border-[#0066FF] font-sans text-[#0066FF] relative">
            <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Footer CTA Section */}
                <div className="bg-white border-2 border-[#0066FF] rounded-2xl p-8 md:p-12 mb-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 border border-[#0066FF] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                            <span>Executive Advisory Desk</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0066FF] mb-2 font-heading">Ready to Build Your Next AI Product?</h2>
                        <p className="text-[#0066FF] text-base md:text-lg font-medium">Let's discuss your requirements and recommend the right AI solution.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
                        <Link to="/book-consultation" className="inline-flex items-center justify-center bg-[#0066FF] text-white hover:bg-white hover:text-[#0066FF] border-2 border-[#0066FF] font-bold text-sm px-6 py-3.5 rounded-lg transition-all w-full sm:w-auto">
                            <span>Book Free Consultation</span>
                        </Link>
                        <a href="mailto:connect@profitmachines.com" className="inline-flex items-center justify-center bg-white text-[#0066FF] hover:bg-[#0066FF] hover:text-white border-2 border-[#0066FF] font-bold text-sm px-6 py-3.5 rounded-lg transition-all w-full sm:w-auto">
                            Email Us Directly
                        </a>
                    </div>
                </div>

                {/* Top Section: Brand & Contact vs Navigation Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">

                    {/* Brand & Contact (Left 4 Columns) */}
                    <div className="lg:col-span-4 space-y-6 lg:pr-8">
                        <div>
                            <Link to="/" className="inline-block mb-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-lg bg-[#0066FF] text-white flex items-center justify-center font-extrabold text-[12px] border border-[#0066FF]">PM</div>
                                    <div className="flex flex-col">
                                        <div className="text-xl md:text-2xl font-extrabold tracking-tight text-[#0066FF] font-heading">
                                            <span>Profit</span>
                                            <span>Machines</span>
                                        </div>
                                        <span className="text-[9px] font-mono font-bold tracking-[0.16em] uppercase text-[#0066FF]">
                                            Autonomous Revenue OS
                                        </span>
                                    </div>
                                </div>
                            </Link>
                            <p className="text-[#0066FF] leading-relaxed mb-6 font-medium text-sm max-w-sm">
                                Building Enterprise AI Solutions for the Future. AI, Cloud, Automation, Software. Delivered End-to-End.
                            </p>

                            <div className="space-y-3 mb-6">
                                <a href="mailto:connect@profitmachines.com" className="flex items-center gap-3 text-[#0066FF] hover:underline font-semibold text-sm">
                                    <div className="w-8 h-8 rounded border border-[#0066FF] flex items-center justify-center shrink-0">
                                        <Mail className="w-4 h-4 text-[#0066FF]" />
                                    </div>
                                    <span>connect@profitmachines.com</span>
                                </a>
                                <a href="tel:+919513088611" className="flex items-center gap-3 text-[#0066FF] hover:underline font-semibold text-sm">
                                    <div className="w-8 h-8 rounded border border-[#0066FF] flex items-center justify-center shrink-0">
                                        <Phone className="w-4 h-4 text-[#0066FF]" />
                                    </div>
                                    <span>+91 9513088611</span>
                                </a>
                                <div className="flex items-start gap-3 text-[#0066FF] font-medium text-sm">
                                    <div className="w-8 h-8 rounded border border-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
                                        <MapPin className="w-4 h-4 text-[#0066FF]" />
                                    </div>
                                    <span>Bengaluru, India · Delaware, USA</span>
                                </div>
                            </div>

                            {/* Social Icons */}
                            <div className="flex items-center gap-2.5">
                                <a href="https://linkedin.com/company/profitmachines" target="_blank" rel="noopener noreferrer" aria-label="ProfitMachines LinkedIn"
                                    className="w-9 h-9 rounded border border-[#0066FF] bg-white text-[#0066FF] hover:bg-[#0066FF] hover:text-white flex items-center justify-center transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a href="https://twitter.com/profitmachines" target="_blank" rel="noopener noreferrer" aria-label="ProfitMachines Twitter"
                                    className="w-9 h-9 rounded border border-[#0066FF] bg-white text-[#0066FF] hover:bg-[#0066FF] hover:text-white flex items-center justify-center transition-colors">
                                    <Twitter className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns (Right 8 Columns) */}
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0066FF] mb-4 pb-1 border-b border-[#0066FF]">
                                Navigation
                            </h4>
                            <ul className="space-y-2.5 text-sm font-medium">
                                {Object.entries(quickLinks).map(([name, link]) => (
                                    <li key={name}>
                                        <Link to={link} className="text-[#0066FF] hover:underline">
                                            {name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0066FF] mb-4 pb-1 border-b border-[#0066FF]">
                                Solutions
                            </h4>
                            <ul className="space-y-2.5 text-sm font-medium">
                                {Object.entries(solutionsLinks).map(([name, link]) => (
                                    <li key={name}>
                                        <Link to={link} className="text-[#0066FF] hover:underline">
                                            {name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0066FF] mb-4 pb-1 border-b border-[#0066FF]">
                                Industries
                            </h4>
                            <ul className="space-y-2.5 text-sm font-medium">
                                {Object.entries(industriesLinks).map(([name, link]) => (
                                    <li key={name}>
                                        <Link to={link} className="text-[#0066FF] hover:underline">
                                            {name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0066FF] mb-4 pb-1 border-b border-[#0066FF]">
                                Technologies
                            </h4>
                            <ul className="space-y-2.5 text-sm font-medium">
                                {Object.entries(techLinks).map(([name, link]) => (
                                    <li key={name}>
                                        <Link to={link} className="text-[#0066FF] hover:underline">
                                            {name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Legal Strip */}
                <div className="pt-8 border-t border-[#0066FF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#0066FF]">
                    <p>© {new Date().getFullYear()} ProfitMachines Inc. All rights reserved.</p>
                    <div className="flex flex-wrap items-center gap-6">
                        <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                        <Link to="/terms" className="hover:underline">Terms of Service</Link>
                        <Link to="/security" className="hover:underline">Security</Link>
                        <Link to="/cookies" className="hover:underline">Cookie Policy</Link>
                        <Link to="/sitemap" className="hover:underline">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

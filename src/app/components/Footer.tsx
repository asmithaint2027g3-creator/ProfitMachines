
import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Phone, Cloud, Share2, LayoutGrid, Box, Server, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Trustgrid-logo.png';

export default function Footer() {

    const quickLinks: { [key: string]: string } = {
        'Home': '/',
        'Offerings': '/offerings',
        'About Us': '/#about-us',
        'Case Studies': '/#case-studies',
        'Blogs': '/#blogs',
        'Careers': '/career',
        'Contact Us': '/book-consultation'
    };

    const solutionsLinks: { [key: string]: string } = {
        'AI Solutions': '/#solutions',
        'Enterprise AI': '/#solutions',
        'AI Agents': '/#solutions',
        'Cloud Services': '/#solutions',
        'Custom Software': '/#solutions',
        'Cyber Security': '/#solutions'
    };

    const industriesLinks: { [key: string]: string } = {
        'Healthcare': '/#industries',
        'Finance': '/#industries',
        'Retail': '/#industries',
        'Manufacturing': '/#industries',
        'Logistics': '/#industries',
        'Enterprises': '/#industries'
    };

    const techLinks: { [key: string]: string } = {
        'Artificial Intelligence': '/#technologies',
        'Machine Learning': '/#technologies',
        'Generative AI': '/#technologies',
        'Cloud Computing': '/#technologies',
        'Data Engineering': '/#technologies'
    };

    return (
        <footer className="bg-slate-900 pt-16 pb-8 border-t border-slate-800 font-sans text-slate-400 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#2878B5]/10 rounded-full blur-[140px] opacity-60"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#1E6297]/10 rounded-full blur-[140px] opacity-50"></div>
            </div>

            <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Footer CTA Section */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Build Your Next AI Product?</h2>
                        <p className="text-slate-400 text-lg">Let's discuss your requirements and recommend the right AI solution.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
                        <Link to="/book-consultation" className="btn-cta-primary w-full sm:w-auto">
                            Book Free Consultation
                        </Link>
                        <a href="mailto:connect@profitmachines.com" className="btn-cta-secondary text-slate-300 border-white/20 hover:bg-white/10 hover:border-white/30 hover:text-white w-full sm:w-auto">
                            Email Us Directly
                        </a>
                    </div>
                </div>

                {/* Top Section: Brand & Contact vs Navigation Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-8">

                    {/* Brand & Contact (Left 4 Columns) */}
                    <div className="lg:col-span-4 space-y-6 lg:pr-8">
                        {/* Brand */}
                        <div>
                            <Link to="/" className="inline-block mb-1">
                                <div className="flex items-center gap-2">
                                    <div className="text-xl md:text-2xl font-extrabold tracking-tight text-white flex items-center gap-0.5 font-heading">
                                        <span>Profit</span>
                                        <span className="text-[#2878B5]">Machines</span>
                                    </div>
                                </div>
                            </Link>
                            <p className="text-slate-400 leading-relaxed mb-8 font-medium text-sm max-w-sm">
                                Building Enterprise AI Solutions for the Future. AI. Cloud. Automation. Software. Delivered End-to-End.
                            </p>

                            <div className="space-y-4 mb-8">
                                <a href="mailto:connect@profitmachines.com" className="group flex items-center gap-4 text-slate-400 hover:text-white transition-colors duration-300">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#2878B5] group-hover:bg-[#2878B5] transition-all">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-sm tracking-wide">connect@profitmachines.com</span>
                                </a>
                                <a href="tel:+919513288612" className="group flex items-center gap-4 text-slate-400 hover:text-white transition-colors duration-300">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#2878B5] group-hover:bg-[#2878B5] transition-all">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-sm tracking-wide">+91 9513288612</span>
                                </a>
                            </div>

                            <div className="flex gap-4">
                                {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                                    <a key={i} href="#" aria-label={['LinkedIn', 'Twitter', 'Facebook'][i]} title={['LinkedIn', 'Twitter', 'Facebook'][i]} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#2878B5] hover:border-[#5CAAE6] transition-all hover:shadow-[0_0_15px_rgba(40,120,181,0.4)] hover:-translate-y-1">
                                        <Icon className="w-4 h-4" />
                                        <span className="sr-only">{['LinkedIn', 'Twitter', 'Facebook'][i]}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Grid - 4 Columns */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">

                        {/* Column 1: Quick Links */}
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest border-b border-white/10 pb-3">Quick Links</h3>
                            <ul className="space-y-3 text-[13px]">
                                {Object.keys(quickLinks).map((item, i) => (
                                    <li key={i}>
                                        <Link to={quickLinks[item]} className="text-slate-400 hover:text-[#5CAAE6] transition-all duration-300 block hover:translate-x-1 font-medium">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2: Solutions */}
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest border-b border-white/10 pb-3">Solutions</h3>
                            <ul className="space-y-3 text-[13px]">
                                {Object.keys(solutionsLinks).map((item, i) => (
                                    <li key={i}>
                                        <Link to={solutionsLinks[item]} className="text-slate-400 hover:text-[#5CAAE6] transition-all duration-300 block hover:translate-x-1 font-medium">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Industries */}
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest border-b border-white/10 pb-3">Industries</h3>
                            <ul className="space-y-3 text-[13px]">
                                {Object.keys(industriesLinks).map((item, i) => (
                                    <li key={i}>
                                        <Link to={industriesLinks[item]} className="text-slate-400 hover:text-[#5CAAE6] transition-all duration-300 block hover:translate-x-1 font-medium">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Technologies */}
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest border-b border-white/10 pb-3">Technologies</h3>
                            <ul className="space-y-3 text-[13px]">
                                {Object.keys(techLinks).map((item, i) => (
                                    <li key={i}>
                                        <Link to={techLinks[item]} className="text-slate-400 hover:text-[#5CAAE6] transition-all duration-300 block hover:translate-x-1 font-medium">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Our Offices - Premium Minimalist */}
                <div className="border-t border-white/10 py-10 mt-6">
                    <div className="flex items-center justify-center mb-10">
                        <h3 className="font-bold text-slate-300 text-xs tracking-[0.2em] uppercase px-6 border border-white/10 py-2 rounded-full bg-white/5 backdrop-blur-sm">
                            Global Presence
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 text-left justify-items-center">
                        {[
                            {
                                title: 'US Office',
                                address: ['501 E Kennedy Blvd Suite 1400,', 'Tampa, FL 33602, United States'],
                                email: 'connect@profitmachines.com',
                                phone: '+91 9513288612'
                            },
                            {
                                title: 'Singapore Office',
                                address: ['5 Temasek Boulevard, 17th Floor,', 'Singapore 038985'],
                                email: 'connect@profitmachines.com',
                                phone: '+65 6050 5235'
                            },
                            {
                                title: 'India Office',
                                address: ['PROFITMACHINES INNOVATION PVT LTD', 'Suite: 32, 235, Binnamangala, 2nd Floor,', '13th Cross Road, Indira Nagar 2nd Stage,', 'Hoysala Nagar, Bengaluru – 560038, India'],
                                email: 'connect@profitmachines.com',
                                phone: '+91 9513288612'
                            },
                            {
                                title: 'Mumbai Office',
                                address: ['WeWork, Raheja Platinum, Sag Baug,', 'Marol, Andheri East, Mumbai 400059'],
                                email: 'cs@profitmachines.com',
                                phone: '+91 9513088612'
                            },
                            {
                                title: 'Bangalore Office',
                                address: ['WeWork, 13th floor, Tin Factory,', 'Old Madras Rd, Bengaluru 560016'],
                                email: 'cs@profitmachines.com',
                                phone: '+91 9513088612'
                            }
                        ].map((office, idx) => (
                            <div key={idx} className="group flex flex-col items-start w-full max-w-xs">
                                <h4 className="flex items-center gap-3 font-bold text-slate-200 text-[13px] uppercase tracking-wide mb-4">
                                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                                    {office.title}
                                </h4>

                                <div className="mb-5 pl-7 border-l border-white/5 group-hover:border-emerald-600/50 transition-colors">
                                    {office.address.map((line, i) => (
                                        <p key={i} className="text-slate-400 text-[13px] leading-relaxed">
                                            {line}
                                        </p>
                                    ))}
                                </div>

                                <div className="space-y-3 pl-7">
                                    <a href={`mailto:${office.email}`} className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors text-[13px] group/item">
                                        <Mail className="w-3.5 h-3.5" />
                                        <span>{office.email}</span>
                                    </a>
                                    <a href={`tel:${office.phone.replace(/ /g, '')}`} className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors text-[13px] group/item">
                                        <Phone className="w-3.5 h-3.5" />
                                        <span>{office.phone}</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Partners & Recognition */}
                <div className="border-t border-white/10 py-6">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Trusted Ecosystem</span>
                        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-80 grayscale hover:grayscale-0 transition-all duration-700">
                            {/* Salesforce */}
                            <div className="flex items-center gap-2 group cursor-default">
                                <Cloud className="w-6 h-6 text-slate-500 group-hover:text-[#00A1E0] transition-colors" />
                                <span className="font-bold text-slate-400 text-sm group-hover:text-slate-200 transition-colors">Salesforce</span>
                            </div>
                            {/* HubSpot */}
                            <div className="flex items-center gap-2 group cursor-default">
                                <Share2 className="w-5 h-5 text-slate-500 group-hover:text-[#FF7A59] transition-colors" />
                                <span className="font-bold text-slate-400 text-sm group-hover:text-slate-200 transition-colors">HubSpot</span>
                            </div>
                            {/* Microsoft */}
                            <div className="flex items-center gap-2 group cursor-default">
                                <LayoutGrid className="w-5 h-5 text-slate-500 group-hover:text-[#00A4EF] transition-colors" />
                                <span className="font-bold text-slate-400 text-sm group-hover:text-slate-200 transition-colors">Microsoft</span>
                            </div>
                            {/* AWS */}
                            <div className="flex items-center gap-2 group cursor-default">
                                <Box className="w-6 h-6 text-slate-500 group-hover:text-[#FF9900] transition-colors" />
                                <span className="font-bold text-slate-400 text-sm group-hover:text-slate-200 transition-colors">AWS</span>
                            </div>
                            {/* Google Cloud */}
                            <div className="flex items-center gap-2 group cursor-default">
                                <Server className="w-5 h-5 text-slate-500 group-hover:text-[#4285F4] transition-colors" />
                                <span className="font-bold text-slate-400 text-sm group-hover:text-slate-200 transition-colors">Google Cloud</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10 mt-6">
                    <p className="text-xs text-slate-400 font-medium tracking-wide">
                        &copy; {new Date().getFullYear()} ProfitMachines. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400">
                        {['Privacy Policy', 'Terms of Service', 'Security', 'Copyright', 'Cookies', 'Sitemap'].map((item, i) => {
                            const path = `/${item.toLowerCase().replace(/ /g, '-')}`;
                            return (
                                <Link key={i} to={item === 'Privacy Policy' ? '/privacy' : item === 'Terms of Service' ? '/terms' : path} className="hover:text-emerald-400 transition-colors">
                                    {item}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}

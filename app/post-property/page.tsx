'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Home, Smartphone, ChevronDown, ChevronRight, Star, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Icons / Assets ---
// You would replace these with actual imports or correct paths if available.
// Using standard Lucide icons for now to mimic the design.

import { useRouter } from 'next/navigation';
import axios from 'axios';

const PostPropertyPage = () => {
    return (
        <div className="relative min-h-screen bg-[#F4F5F7] font-sans">
            {/* 1. Purple Background Hero Block (Absolute) */}
            <div className="absolute top-0 left-0 right-0 h-[550px] bg-black rounded-b-[3rem] md:rounded-b-[5rem] z-0 overflow-hidden">
                {/* Decorative Circles/Blobs */}
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-50px] left-[-50px] w-80 h-80 bg-[#C19B54] opacity-10 rounded-full blur-3xl"></div>
            </div>

            {/* Main Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 overflow-visible">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* --- LEFT COLUMN: STICKY FORM --- */}
                    <div className="lg:col-span-5 order-2 lg:order-1 sticky top-32 self-start z-30 rounded-3xl">
                        <PropertyFormCard />
                    </div>

                    {/* --- RIGHT COLUMN: CONTENT --- */}
                    <div className="lg:col-span-7 space-y-16 order-1 lg:order-2">

                        {/* A. Hero Text Section */}
                        <div className="text-white pt-8">
                            <div className="relative mb-6 inline-block">
                                <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight relative z-10">
                                    Rent/Sell property online
                                </h1>
                                {/* Yellow underline effect */}
                                <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#E5BA73] rounded-full"></div>
                            </div>

                            <div className="space-y-4 mt-6">
                                {[
                                    "Post your property ad for free",
                                    "Receive verified, price-matched and ready enquiries",
                                    "Sell/Rent faster with our premium Housing Assist services"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="bg-[#E5BA73] rounded-full p-0.5 flex-shrink-0">
                                            <CheckCircle2 size={16} className="text-black" strokeWidth={3} />
                                        </div>
                                        <span className="text-lg md:text-xl font-medium opacity-90">{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Vector/Image Placeholder */}

                        </div>

                        {/* B. WhatsApp / QR Section */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-auto">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#25D366]/10 p-3 rounded-full">
                                    <Smartphone className="text-[#25D366]" size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">Scan the QR code to post your property on WhatsApp</h3>
                                    <button className="mt-2 flex items-center gap-2 bg-[#25D366] text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-[#1fb855] transition-colors shadow-sm cursor-pointer">
                                        Post property on WhatsApp
                                        <ChevronRight size={16} />
                                    </button>
                                    <p className="text-xs text-gray-500 mt-2">*Standard WhatsApp rates apply</p>
                                </div>
                            </div>
                            <div className="bg-gray-100 p-2 rounded-lg border border-dashed border-gray-300">
                                <div className="w-24 h-24 bg-white flex items-center justify-center relative overflow-hidden">
                                    <Image
                                        src="/images/whatsapp-qr.png"
                                        alt="WhatsApp QR Code"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        className="p-1"
                                    />
                                </div>
                            </div>
                        </div>


                        {/* C. How it works Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-8">How to post your property online?</h2>
                            <div className="space-y-8">
                                <Step
                                    number="01"
                                    title="Fill up the property details"
                                    desc="Mention relevant details like locality, dimension, photos allowing your property to stand out."
                                    icon={<div className="bg-[#FDF8EE] p-3 rounded-full"><Smartphone className="text-[#C19B54]" /></div>}
                                />
                                <Step
                                    number="02"
                                    title="Property Verification process"
                                    desc="Our expert verification team reviews your listing to ensure accuracy and quality."
                                    icon={<div className="bg-[#FDF8EE] p-3 rounded-full"><CheckCircle2 className="text-[#C19B54]" /></div>}
                                />
                                <Step
                                    number="03"
                                    title="Your property goes live"
                                    desc="Once verified, your property is visible to millions of tenants/buyers."
                                    icon={<div className="bg-[#FDF8EE] p-3 rounded-full"><Home className="text-[#C19B54]" /></div>}
                                />
                            </div>
                        </div>

                        {/* D. FAQ Section */}
                        <div className="pt-8 border-t border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
                            <FAQAccordion />
                        </div>

                        {/* E. News / Articles Section */}
                        <div className="pt-8 border-t border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">News and Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ArticleCard
                                    category="Market Trends"
                                    title="Why Property Prices are Soaring in Pune 2024?"
                                    desc="An in-depth analysis of the current real estate market trends in Pune..."
                                    color="bg-[#FDF8EE]"
                                />
                                <ArticleCard
                                    category="Legal Guide"
                                    title="Documents Required for Selling Property"
                                    desc="Checklist of all the mandatory documents you need before listing..."
                                    color="bg-gray-100"
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};


// --- Sub-Components ---

const Step = ({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: React.ReactNode }) => (
    <div className="flex gap-4 md:gap-6 group">
        <div className="relative">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white shadow-md flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <div className="absolute -top-2 -right-2 bg-[#B58A3D] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {number}
            </div>
        </div>
        <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{desc}</p>
        </div>
    </div>
);

const PropertyFormCard = () => {

    const [propertyType, setPropertyType] = useState('residential');
    const [residentialType, setResidentialType] = useState('');
    const [commercialType, setCommercialType] = useState('');
    const [bhk, setBhk] = useState('');
    const [furnishing, setFurnishing] = useState('');
    const [areaUnit, setAreaUnit] = useState('sqft');

    // Form fields
    const [formData, setFormData] = useState({
        name: '',
        contactDetails: '',
        email: '',
        city: '',
        building: '',
        locality: '',
        area: '',
        shareWithAgents: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const payload = {
                userName: formData.name,
                city: formData.city,
                propertyCategory: propertyType, // residential or commercial
                propertyType: propertyType === 'residential' ? residentialType : commercialType,
                buildingName: formData.building,
                locality: formData.locality,
                bhk: bhk,
                area: formData.area,
                areaUnit: areaUnit,
                furnishing: furnishing,
                shareWithAgents: formData.shareWithAgents,
                contactDetails: formData.contactDetails,
                email: formData.email
            };

            await axios.post('http://localhost:9000/api/user-properties', payload);
            alert('Property posted successfully!');
            // Reset form or redirect
            setFormData({
                name: '',
                contactDetails: '',
                email: '',
                city: '',
                building: '',
                locality: '',
                area: '',
                shareWithAgents: false
            });
            setResidentialType('');
            setCommercialType('');
            setBhk('');
            setFurnishing('');
            // router.push('/'); // Optional redirect
        } catch (error) {
            console.error('Error posting property:', error);
            alert('Failed to post property. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl  border border-gray-100/50 flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-white z-10 sticky top-0 rounded-3xl">
                <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xl font-bold text-gray-800">Add Property Details</h3>
                </div>

            </div>

            {/* Scrollable Content */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar">

                {/* Name */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Your Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C19B54] focus:border-transparent transition-all"
                    />
                </div>

                {/* Contact Number */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Contact Number</label>
                    <input
                        type="text"
                        name="contactDetails"
                        value={formData.contactDetails}
                        onChange={handleInputChange}
                        placeholder="Enter contact number"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C19B54] focus:border-transparent transition-all"
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C19B54] focus:border-transparent transition-all"
                    />
                </div>

                {/* City */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Search City"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C19B54] focus:border-transparent transition-all"
                    />
                </div>

                {/* Property Type Category (High Level) */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Property Category</label>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setPropertyType('residential')}
                            className={`flex-1 py-2 rounded-lg border transition-all text-sm font-medium ${propertyType === 'residential' ? 'bg-[#B58A3D] text-white border-[#B58A3D]' : 'bg-white text-gray-600 border-gray-300'}`}
                        >
                            Residential
                        </button>
                        <button
                            onClick={() => setPropertyType('commercial')}
                            className={`flex-1 py-2 rounded-lg border transition-all text-sm font-medium ${propertyType === 'commercial' ? 'bg-[#B58A3D] text-white border-[#B58A3D]' : 'bg-white text-gray-600 border-gray-300'}`}
                        >
                            Commercial
                        </button>
                    </div>
                </div>

                {/* Specific Property Type Grid */}
                {propertyType === 'residential' && (
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Property Type</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['Apartment', 'Independent House', 'Duplex', 'Independent Floor', 'Villa', 'Penthouse', 'Studio', 'Farm House'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setResidentialType(type)}
                                    className={`py-2 px-2 rounded-lg border text-xs font-medium transition-all ${residentialType === type ? 'bg-[#FDF8EE] border-[#B58A3D] text-[#C19B54]' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Building / Project */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Building/Project/Society <span className="text-gray-400 font-normal normal-case">(Optional)</span></label>
                    <input
                        type="text"
                        name="building"
                        value={formData.building}
                        onChange={handleInputChange}
                        placeholder={residentialType ? "Enter building name" : "Please first fill Property Type to continue"}
                        disabled={!residentialType && !commercialType}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C19B54] focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-400"
                    />
                </div>

                {/* Locality */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Locality</label>
                    <input
                        type="text"
                        name="locality"
                        value={formData.locality}
                        onChange={handleInputChange}
                        placeholder="Please enter a valid locality"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C19B54] focus:border-transparent transition-all"
                    />
                </div>

                {/* BHK */}
                {propertyType === 'residential' && (
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">BHK</label>
                        <div className="flex flex-wrap gap-2">
                            {['1 RK', '1 BHK', '1.5 BHK', '2 BHK', '3+ BHK'].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => setBhk(val)}
                                    className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${bhk === val ? 'bg-[#FDF8EE] border-[#B58A3D] text-[#C19B54]' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Built Up Area */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Built Up Area</label>
                    <div className="flex gap-0 rounded-xl border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#3e2393] transition-all">
                        <input
                            type="number"
                            name="area"
                            value={formData.area}
                            onChange={handleInputChange}
                            placeholder="Area"
                            className="flex-1 px-4 py-3 border-none focus:outline-none"
                        />
                        <div className="bg-gray-50 border-l border-gray-300 px-3 flex items-center">
                            <select
                                value={areaUnit}
                                onChange={(e) => setAreaUnit(e.target.value)}
                                className="bg-transparent text-sm font-medium text-gray-600 focus:outline-none cursor-pointer"
                            >
                                <option value="sqft">Sq. Ft.</option>
                                <option value="sqyrd">Sq. Yards</option>
                                <option value="sqm">Sq. Meters</option>
                                <option value="acres">Acres</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Furnished Type */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Furnish Type</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Fully Furnished', 'Semi Furnished', 'Unfurnished'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFurnishing(type)}
                                className={`py-2 px-1 rounded-lg border text-xs font-medium transition-all ${furnishing === type ? 'bg-[#FDF8EE] border-[#B58A3D] text-[#C19B54]' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                            >
                                {type === 'Fully Furnished' ? 'Fully' : type === 'Semi Furnished' ? 'Semi' : 'None'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Helpers */}
                <button className="flex items-center gap-2 text-[#C19B54] font-medium text-sm hover:underline w-fit cursor-pointer">
                    <Plus size={16} /> Add Furnishings / Amenities
                </button>

                {/* Checkbox */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="shareWithAgents"
                        checked={formData.shareWithAgents}
                        onChange={handleInputChange}
                        id="shareAgents"
                        className="w-4 h-4 text-[#C19B54] rounded border-gray-300 focus:ring-[#C19B54]"
                    />
                    <label htmlFor="shareAgents" className="text-sm text-gray-600 cursor-pointer select-none">Share listing information with agents</label>
                </div>

            </div>

            {/* Footer / Submit */}
            <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 rounded-3xl z-10">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-[#B58A3D] hover:bg-[#96702e] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-lg flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'} <ChevronRight size={20} strokeWidth={2.5} />
                </button>
            </div>

        </div>
    );
}

const FAQAccordion = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { q: "How to post a property for rent/sell on PropertyDrone?", a: "To post a property, simply fill out the form on this page with your property details, upload photos, and verify your phone number. Your listing will go live after a quick verification check." },
        { q: "What details should I include to advertise my property?", a: "Include accurate location, carpet area, number of bedrooms/bathrooms, expected price/rent, and high-quality photos. Adding amenities and a description helps attract more genuine leads." },
        { q: "Is posting property free on PropertyDrone?", a: "Yes, you can post your first property listing for free as an owner. For multiple listings or premium visibility, we offer paid packages." },
        { q: "How verified enquiries work?", a: "We verify every enquiry through OTP and basic checks to ensuring you only talk to genuine buyers or tenants, saving you time from spam calls." }
    ];

    return (
        <div className="space-y-4">
            {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                        {faq.q}
                        <ChevronDown className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-[#C19B54]' : 'text-gray-400'}`} />
                    </button>
                    <AnimatePresence>
                        {openIndex === i && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100 mt-2">
                                    {faq.a}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}

const ArticleCard = ({ category, title, desc, color }: any) => (
    <div className={`p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer bg-white group h-full flex flex-col`}>
        <div className={`text-xs font-bold uppercase tracking-wide mb-3 ${color} inline-block px-2 py-1 rounded text-gray-600 w-fit`}>
            {category}
        </div>
        <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-[#C19B54] transition-colors line-clamp-2">
            {title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
            {desc}
        </p>
        <span className="text-[#C19B54] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Read Article <ChevronRight size={14} />
        </span>
    </div>
)

export default PostPropertyPage;

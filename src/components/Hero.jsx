import React from 'react';
import { translations } from '../utils/translations';
import heroImage from '../assets/hero-image.jpg';

const Hero = ({ onStart, language = 'en' }) => {
    const t = translations[language];

    return (
        <div className="relative overflow-hidden bg-[#FFF7ED]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
                <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
                    <div className="lg:w-1/2 lg:pr-12">
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
                            {t.headlineTop} <span className="text-orange-500">{t.headlinePrefix}</span>
                            <br />
                            <span className="text-orange-500">{t.headlineSuffix}</span>
                        </h1>
                        <p className="text-lg text-gray-500 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            {t.subheadline}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                onClick={onStart}
                                className="px-8 py-3.5 bg-orange-500 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-orange-600 transition-all"
                            >
                                {t.startDiagnosis}
                            </button>
                            <button className="px-8 py-3.5 bg-white text-gray-900 border border-gray-200 rounded-lg font-bold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm">
                                <span className="border-2 border-gray-900 rounded p-0.5">
                                    <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </span>
                                {t.watchDemo}
                            </button>
                        </div>

                        <div className="mt-16 flex flex-row items-center justify-between lg:justify-start lg:gap-24 gap-8 w-full lg:w-auto px-4 lg:px-0">
                            <div className="flex flex-col items-center lg:items-start">
                                <span className="text-3xl font-bold text-orange-500">10K+</span>
                                <span className="text-sm font-medium text-gray-500 mt-1">{t.happyPets}</span>
                            </div>
                            <div className="flex flex-col items-center lg:items-start">
                                <span className="text-3xl font-bold text-orange-500">500+</span>
                                <span className="text-sm font-medium text-gray-500 mt-1">{t.connectedVets}</span>
                            </div>
                            <div className="flex flex-col items-center lg:items-start">
                                <span className="text-3xl font-bold text-orange-500">95%</span>
                                <span className="text-sm font-medium text-gray-500 mt-1">{t.accuracyRate}</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:w-1/2 relative mt-12 lg:mt-0">
                        {/* Background Decoration */}

                        <img
                            src={heroImage}
                            alt="Vet examining a cat"
                            className="relative w-full max-w-xl mx-auto rounded-[2.5rem] shadow-2xl object-cover h-[550px]"
                        />

                        {/* Floating Card - Rating Badge */}
                        <div className="absolute bottom-8 right-[-20px] bg-orange-500 p-4 rounded-xl shadow-xl flex items-center gap-4 min-w-[200px]">
                            <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white shrink-0">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            </div>
                            <div className="text-white">
                                <p className="text-2xl font-bold leading-none">4.9/5</p>
                                <p className="text-sm font-medium text-orange-100 opacity-90">Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

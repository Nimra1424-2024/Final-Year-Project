import React, { useState } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { translations } from '../utils/translations';

const Navbar = ({ onGetStarted, onHome, language = 'en', setLanguage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const t = translations[language];

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'ur', name: 'اردو' }
    ];

    const currentLangName = languages.find(l => l.code === language)?.name || 'English';

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-orange-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center cursor-pointer" onClick={onHome}>
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30 mr-3">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <div>
                            <span className="font-bold text-2xl text-gray-900 leading-none">Skin Intel</span>
                            <p className="text-sm text-gray-500 font-normal">PetCare AI Platform</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => {
                                const featuresSection = document.getElementById('features');
                                featuresSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="text-gray-900 hover:text-orange-500 font-medium transition-colors cursor-pointer"
                        >
                            {t.features}
                        </button>
                        <button
                            onClick={() => {
                                const aboutSection = document.getElementById('about');
                                aboutSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="text-gray-900 hover:text-orange-500 font-medium transition-colors cursor-pointer"
                        >
                            {t.about}
                        </button>

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="flex items-center gap-2 text-gray-900 hover:text-orange-500 font-medium transition-colors"
                            >
                                <Globe className="w-5 h-5" />
                                <span>{currentLangName}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {isLangMenuOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setIsLangMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors ${language === lang.code ? 'text-orange-600 font-bold bg-orange-50' : 'text-gray-700'} ${lang.code === 'ur' ? 'font-noto-nastaliq text-right' : ''}`}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onGetStarted}
                            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition-all"
                        >
                            {t.getStarted}
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 shadow-lg">
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={() => {
                                const featuresSection = document.getElementById('features');
                                featuresSection?.scrollIntoView({ behavior: 'smooth' });
                                setIsOpen(false);
                            }}
                            className="text-gray-600 font-medium py-2 text-left"
                        >
                            {t.features}
                        </button>
                        <button
                            onClick={() => {
                                const aboutSection = document.getElementById('about');
                                aboutSection?.scrollIntoView({ behavior: 'smooth' });
                                setIsOpen(false);
                            }}
                            className="text-gray-600 font-medium py-2 text-left"
                        >
                            {t.about}
                        </button>

                        {/* Mobile Language Selector */}
                        <div className="py-2">
                            <p className="text-xs text-gray-400 uppercase font-bold mb-2">Language</p>
                            <div className="grid grid-cols-2 gap-2">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setIsOpen(false);
                                        }}
                                        className={`px-3 py-2 rounded-lg text-sm border ${language === lang.code ? 'border-orange-500 text-orange-600 bg-orange-50' : 'border-gray-200 text-gray-600'}`}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                onGetStarted();
                                setIsOpen(false);
                            }}
                            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold text-center shadow-lg shadow-orange-500/30"
                        >
                            {t.getStarted}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

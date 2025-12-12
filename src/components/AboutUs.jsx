import React from 'react';
import { Target, Eye, Users, Award } from 'lucide-react';
import { translations } from '../utils/translations';

const AboutUs = ({ language = 'en' }) => {
    const t = translations[language];

    return (
        <section id="about" className={`py-20 bg-gradient-to-br from-orange-50 to-white ${language === 'ur' ? 'font-noto-nastaliq text-right' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {t.aboutTitle}
                    </h2>
                    <p className="text-2xl text-orange-600 font-semibold mb-8">
                        {t.aboutSubtitle}
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Left Column - Text Content */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                {t.aboutText1}
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                {t.aboutText2}
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {t.aboutText3}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-6 text-center shadow-md border border-orange-100">
                                <div className="text-3xl font-bold text-orange-600 mb-2">10K+</div>
                                <div className="text-sm text-gray-600">{t.happyPets}</div>
                            </div>
                            <div className="bg-white rounded-xl p-6 text-center shadow-md border border-orange-100">
                                <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
                                <div className="text-sm text-gray-600">{t.connectedVets}</div>
                            </div>
                            <div className="bg-white rounded-xl p-6 text-center shadow-md border border-orange-100">
                                <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
                                <div className="text-sm text-gray-600">{t.accuracyRate}</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Mission & Vision */}
                    <div className="space-y-6">
                        {/* Mission */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-orange-500">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-orange-100 p-3 rounded-xl">
                                    <Target className="w-8 h-8 text-orange-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{t.ourMission}</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                {t.ourMissionText}
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-blue-100 p-3 rounded-xl">
                                    <Eye className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{t.ourVision}</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                {t.ourVisionText}
                            </p>
                        </div>

                        {/* Team Image/Illustration */}
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-lg">
                            <div className="flex items-center gap-4 mb-4">
                                <Users className="w-10 h-10" />
                                <div>
                                    <h4 className="text-xl font-bold">Expert Team</h4>
                                    <p className="text-orange-100">Veterinarians & AI Specialists</p>
                                </div>
                            </div>
                            <p className="text-orange-50">
                                Our team combines veterinary expertise with cutting-edge AI technology to deliver the best care for your pets.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;

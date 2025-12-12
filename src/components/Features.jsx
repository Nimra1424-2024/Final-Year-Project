import React from 'react';
import { Brain, Video, Globe, FileText, Heart } from 'lucide-react';
import { translations } from '../utils/translations';

const Features = ({ language = 'en' }) => {
    const t = translations[language];

    const features = [
        {
            icon: <Brain className="w-12 h-12" />,
            title: t.feature1Title,
            description: t.feature1Desc,
            color: "bg-blue-500",
            lightBg: "bg-blue-50"
        },
        {
            icon: <Video className="w-12 h-12" />,
            title: t.feature2Title,
            description: t.feature2Desc,
            color: "bg-green-500",
            lightBg: "bg-green-50"
        },
        {
            icon: <Globe className="w-12 h-12" />,
            title: t.feature3Title,
            description: t.feature3Desc,
            color: "bg-purple-500",
            lightBg: "bg-purple-50"
        },
        {
            icon: <FileText className="w-12 h-12" />,
            title: t.feature4Title,
            description: t.feature4Desc,
            color: "bg-orange-500",
            lightBg: "bg-orange-50"
        },
        {
            icon: <Heart className="w-12 h-12" />,
            title: t.feature5Title,
            description: t.feature5Desc,
            color: "bg-red-500",
            lightBg: "bg-red-50"
        }
    ];

    return (
        <section id="features" className={`py-20 bg-white ${language === 'ur' ? 'font-noto-nastaliq text-right' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {t.featuresTitle}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t.featuresSubtitle}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 hover:-translate-y-2"
                        >
                            {/* Icon */}
                            <div className={`${feature.lightBg} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <div className={`${feature.color} text-white rounded-xl p-3`}>
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Decorative Element */}
                            <div className={`absolute top-0 right-0 w-20 h-20 ${feature.color} opacity-5 rounded-bl-full`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;

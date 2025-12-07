import React, { useState } from 'react';
import {
    LogOut,
    Plus,
    Upload,
    Camera,
    Stethoscope,
    MapPin,
    History,
    User,
    ChevronDown,
    Video
} from 'lucide-react';
import { translations } from '../utils/translations';
import AddPetModal from './AddPetModal';

const Dashboard = ({ onLogout, userName = "John Smith", language = 'en', setLanguage, onNavigate, appointments = [], myPets = [], onAddPet }) => {
    const t = translations[language];
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [isAddPetOpen, setIsAddPetOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'ur', name: 'اردو' }
    ];

    const currentLangName = languages.find(l => l.code === language)?.name || 'English';

    const quickActions = [
        {
            id: 'add_pet',
            icon: <Plus className="w-6 h-6 text-blue-600" />,
            bg: "bg-blue-100",
            title: t.actions.addPet.title,
            desc: t.actions.addPet.desc
        },
        {
            id: 'upload',
            icon: <Upload className="w-6 h-6 text-green-600" />,
            bg: "bg-green-100",
            title: t.actions.upload.title,
            desc: t.actions.upload.desc
        },
        {
            id: 'symptoms',
            icon: <Camera className="w-6 h-6 text-purple-600" />,
            bg: "bg-purple-100",
            title: t.actions.symptoms.title,
            desc: t.actions.symptoms.desc
        },
        {
            id: 'consultation',
            icon: <Stethoscope className="w-6 h-6 text-orange-600" />,
            bg: "bg-orange-100",
            title: t.actions.consultation.title,
            desc: t.actions.consultation.desc
        },
        {
            id: 'find_vets',
            icon: <MapPin className="w-6 h-6 text-red-600" />,
            bg: "bg-red-100",
            title: t.actions.findVets.title,
            desc: t.actions.findVets.desc
        },
        {
            id: 'history',
            icon: <History className="w-6 h-6 text-yellow-600" />,
            bg: "bg-yellow-100",
            title: t.actions.history.title,
            desc: t.actions.history.desc
        }
    ];

    const handleQuickAction = (actionId) => {
        if (actionId === 'add_pet') {
            setIsAddPetOpen(true);
        } else if (actionId === 'upload' || actionId === 'symptoms') {
            if (onNavigate) onNavigate('diagnosis');
        } else if (actionId === 'find_vets') {
            if (onNavigate) onNavigate('veterinarians');
        } else if (actionId === 'consultation') {
            if (onNavigate) onNavigate('consultation');
        } else if (actionId === 'history') {
            if (onNavigate) onNavigate('medical-history');
        }
    };

    // myPets and onAddPet received from props

    const handleAddPetWrapper = (petData) => {
        if (onAddPet) onAddPet(petData);
        setIsAddPetOpen(false);
    };

    const recentDiagnoses = [
        {
            condition: "Dermatitis",
            confidence: "87%",
            confidenceLevel: "medium",
            description: "Apply topical antibiotic cream twice daily for 7-10 days. Keep area clean and dry.",
            image: "https://images.unsplash.com/photo-1576201836163-4975841e71d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
        },
        {
            condition: "Fungal Infection",
            confidence: "92%",
            confidenceLevel: "high",
            description: "Antifungal medication prescribed. Follow up in 2 weeks.",
            image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
        }
    ];

    return (
        <div className={`min-h-screen bg-white ${language === 'ur' ? 'font-noto-nastaliq text-right' : ''}`}>
            {/* Dashboard Navbar */}
            <nav className="bg-white border-b border-gray-100 relative z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-md">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <span className="font-bold text-xl text-orange-500">Skin Intel</span>
                        <span className="text-sm text-gray-400 mt-1">PetCare AI</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors"
                            >
                                <span className="text-sm font-medium">{currentLangName}</span>
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

                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                            <User className="w-6 h-6 text-gray-500" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Welcome Banner */}
                <div className="bg-orange-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{t.welcome}, {userName}!</h1>
                        <p className="text-orange-100 text-lg">{t.subtitle}</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-700 rounded-xl transition-colors border border-orange-400 font-medium"
                    >
                        <LogOut size={20} />
                        {t.logout}
                    </button>
                </div>

                {/* Quick Actions */}
                <div>
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">{t.quickActions}</h2>
                        <p className="text-gray-500">{t.quickActionsSubtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quickActions.map((action, index) => (
                            <div
                                key={index}
                                onClick={() => handleQuickAction(action.id)}
                                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-start gap-4"
                            >
                                <div className={`w-12 h-12 ${action.bg} rounded-xl flex items-center justify-center`}>
                                    {action.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-1">{action.title}</h3>
                                    <p className="text-sm text-gray-500">{action.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Middle Section: My Pets & Recent Diagnosis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* My Pets */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">{t.myPets}</h2>
                            <button
                                onClick={() => setIsAddPetOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <Plus size={18} />
                                {t.addPet}
                            </button>
                        </div>
                        <div className="space-y-4">
                            {myPets.map((pet, index) => (
                                <div key={index} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                    <img src={pet.image} alt={pet.name} className="w-16 h-16 rounded-full object-cover" />
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{pet.name}</h3>
                                        <p className="text-sm text-gray-500">{pet.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent AI Diagnosis */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">{t.recentDiagnosis}</h2>
                        <div className="space-y-4">
                            {recentDiagnoses.map((diagnosis, index) => (
                                <div key={index} className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow">
                                    <div className="flex gap-4 mb-4">
                                        <img src={diagnosis.image} alt={diagnosis.condition} className="w-20 h-20 rounded-xl object-cover" />
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-bold text-lg text-gray-900">{diagnosis.condition}</h3>
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${diagnosis.confidenceLevel === 'high' ? 'bg-red-500' : 'bg-orange-500'}`}>
                                                    {t.confidence}: {diagnosis.confidence}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold text-white uppercase ${diagnosis.confidenceLevel === 'high' ? 'bg-red-500' : 'bg-orange-500'}`}>
                                                    {diagnosis.confidenceLevel === 'high' ? 'High' : 'Medium'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 leading-relaxed">{diagnosis.description}</p>
                                        </div>
                                    </div>
                                    <button className="w-full py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                        {t.viewReport}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Upcoming Appointments */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">{t.upcomingAppointments}</h2>
                    <div className="space-y-4">
                        {appointments.map((apt, index) => (
                            <div key={index} className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                        <Stethoscope size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{apt.type}</h3>
                                        <p className="text-sm text-gray-500">{apt.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-1 uppercase ${apt.status === 'confirmed' ? 'bg-orange-500' : 'bg-gray-300 text-gray-700'}`}>
                                        {apt.status === 'confirmed' ? t.confirmed : t.pending}
                                    </span>
                                    <div className="font-bold text-gray-900">{apt.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AddPetModal
                isOpen={isAddPetOpen}
                onClose={() => setIsAddPetOpen(false)}
                onAddPet={handleAddPetWrapper}
                language={language}
            />
        </div>
    );
};

export default Dashboard;

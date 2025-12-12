import React, { useState } from 'react';
import { ArrowLeft, Camera, User, ChevronDown } from 'lucide-react';
import { translations } from '../utils/translations';

const Profile = ({ onBack, language = 'en', setLanguage, userName = 'John Smith' }) => {
    const t = translations[language];

    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Smith');
    const [email, setEmail] = useState('john.smith@email.com');
    const [phone, setPhone] = useState('+1 234 567 8900');
    const [profilePhoto, setProfilePhoto] = useState(null);

    const profileText = {
        title: t.profile?.title || "Profile Settings",
        subtitle: t.profile?.subtitle || "Manage Your Account Information",
        backToDashboard: t.profile?.backToDashboard || "Back to Dashboard",
        changePhoto: t.profile?.changePhoto || "Change Photo",
        photoFormat: t.profile?.photoFormat || "JPG, PNG Max 10MB",
        firstName: t.profile?.firstName || "First Name",
        lastName: t.profile?.lastName || "Last Name",
        email: t.profile?.email || "Email",
        phone: t.profile?.phone || "Phone",
        saveChanges: t.profile?.saveChanges || "Save Changes",
        cancel: t.profile?.cancel || "Cancel",
        updateSuccess: t.profile?.updateSuccess || "Profile updated successfully!"
    };

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size <= 10 * 1024 * 1024) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setProfilePhoto(event.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                alert('File size must be less than 10MB');
            }
        }
    };

    const handleSaveChanges = () => {
        alert(profileText.updateSuccess);
        onBack();
    };

    const handleCancel = () => {
        onBack();
    };

    return (
        <div className={`min-h-screen bg-orange-50 ${language === 'ur' ? 'font-noto-nastaliq text-right' : ''}`}>
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-md">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>
                            <div>
                                <span className="font-bold text-xl text-orange-500">Skin Intel</span>
                                <p className="text-xs text-gray-400">PetCare AI Platform</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <div className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold cursor-pointer">
                                {t.languageName} <ChevronDown size={16} />
                            </div>
                            {setLanguage && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                    <button onClick={() => setLanguage('en')} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 font-medium rounded-t-lg">English</button>
                                    <button onClick={() => setLanguage('es')} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 font-medium">Español</button>
                                    <button onClick={() => setLanguage('fr')} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 font-medium">Français</button>
                                    <button onClick={() => setLanguage('de')} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 font-medium">Deutsch</button>
                                    <button onClick={() => setLanguage('ur')} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 font-medium rounded-b-lg">اردو</button>
                                </div>
                            )}
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                            {profilePhoto ? (
                                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-6 h-6 text-gray-500" />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 font-medium"
                >
                    <ArrowLeft size={20} />
                    {profileText.backToDashboard}
                </button>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{profileText.title}</h1>
                        <p className="text-gray-500">{profileText.subtitle}</p>
                    </div>

                    {/* Profile Photo */}
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-900 mb-4">{profileText.changePhoto}</label>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {profilePhoto ? (
                                        <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-10 h-10 text-gray-400" />
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors">
                                    <Camera size={16} />
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/jpeg,image/png"
                                        onChange={handlePhotoChange}
                                    />
                                </label>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{profileText.photoFormat}</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">{profileText.firstName}</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                placeholder="John"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">{profileText.lastName}</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                placeholder="Smith"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">{profileText.email}</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                placeholder="email@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">{profileText.phone}</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                placeholder="+1 234 567 8900"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleSaveChanges}
                            className="px-8 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            {profileText.saveChanges}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-8 py-3 bg-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-400 transition-colors"
                        >
                            {profileText.cancel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

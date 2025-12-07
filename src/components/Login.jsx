import React, { useState } from 'react';
import { Mail, Lock, Facebook, User, Phone, ArrowLeft, FileText, Stethoscope } from 'lucide-react';

const Login = ({ onLogin, onHome }) => {
    const [role, setRole] = useState('owner'); // 'owner' or 'vet'
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'

    // Login State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Sign Up State
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [specialization, setSpecialization] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login/signup
        if (activeTab === 'login') {
            if (email && password) {
                onLogin(role);
            }
        } else {
            // Simulate signup validation
            if (role === 'owner') {
                if (fullName && email && phoneNumber && password) {
                    onLogin(role);
                }
            } else {
                if (fullName && email && licenseNumber && specialization && password) {
                    onLogin(role);
                }
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF7ED] p-4">

            {/* Header Section */}
            <div className="w-full max-w-md mb-6">
                <button
                    onClick={onHome}
                    className="flex items-center text-gray-600 hover:text-gray-900 font-medium mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </button>

                <div className="flex flex-col items-center justify-center gap-2 mb-2">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-md">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                    <div className="text-center">
                        <h1 className="font-bold text-2xl leading-none text-gray-800">Skin Intel</h1>
                        <span className="text-sm text-gray-500 leading-tight">PetCare AI Platform</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden mb-8">
                {/* Top Tabs */}
                <div className="flex bg-gray-100 p-1.5 m-6 rounded-xl">
                    <button
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'login' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'signup' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('signup')}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="px-8 pb-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-gray-500 mt-1">
                            {activeTab === 'login' ? 'Sign in to your account' : 'Join Skin Intel PetCare AI'}
                        </p>
                    </div>

                    {/* Role Toggle */}
                    <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                        <button
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${role === 'owner' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            onClick={() => setRole('owner')}
                        >
                            Pet Owner
                        </button>
                        <button
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${role === 'vet' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            onClick={() => setRole('vet')}
                        >
                            Veterinarian
                        </button>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {activeTab === 'signup' && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                                        placeholder={role === 'vet' ? "Dr. Your Name" : "Enter your full name"}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {activeTab === 'signup' && role === 'owner' && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'signup' && role === 'vet' && (
                            <>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">License Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FileText className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={licenseNumber}
                                            onChange={(e) => setLicenseNumber(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                                            placeholder="Enter license number"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Specialization</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Stethoscope className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={specialization}
                                            onChange={(e) => setSpecialization(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                                            placeholder="e.g., Dermatology, General Practice"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                                    placeholder={activeTab === 'signup' ? "Create a password" : "Enter your password"}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors shadow-orange-500/20"
                        >
                            {activeTab === 'login' ? 'Sign In' : `Create ${role === 'owner' ? 'Pet Owner' : 'Veterinarian'} Account`}
                        </button>
                    </form>

                    {activeTab === 'login' && (
                        <div className="mt-4 text-center">
                            <a href="#" className="text-sm font-bold text-orange-500 hover:text-orange-600">
                                Forgot Password?
                            </a>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default Login;

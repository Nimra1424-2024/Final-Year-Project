import React, { useState } from 'react';
import { X, Calendar, Clock, Video, MapPin, CheckCircle, User, Stethoscope } from 'lucide-react';
import { translations } from '../utils/translations';

const BookingModal = ({ isOpen, onClose, vetName, onConfirm, language = 'en' }) => {
    if (!isOpen) return null;

    const t = translations[language];
    const styles = {
        label: "block text-sm font-bold text-gray-700 mb-2",
        input: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all",
        radioCard: "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
        textarea: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none",
        checkbox: "flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:border-orange-300 transition-all"
    };

    const modalText = t.booking || {};

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('video');

    // Pet Information
    const [petAge, setPetAge] = useState('');
    const [petGender, setPetGender] = useState('');
    const [petBreed, setPetBreed] = useState('');

    // Symptoms
    const [symptoms, setSymptoms] = useState('');

    // Vet Specialty
    const [specialty, setSpecialty] = useState('dermatology');

    const specialties = [
        { id: 'dermatology', label: modalText.dermatology || 'Dermatology (Skin)', icon: '🔬' },
        { id: 'general', label: modalText.generalPractice || 'General Practice', icon: '🏥' },
        { id: 'internal', label: modalText.internalMedicine || 'Internal Medicine', icon: '💊' },
        { id: 'surgery', label: modalText.surgery || 'Surgery', icon: '🔪' },
        { id: 'emergency', label: modalText.emergency || 'Emergency Care', icon: '🚨' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm({
            vetName,
            date,
            time,
            type,
            price: type === 'video' ? '$45' : '$75',
            petAge,
            petGender,
            petBreed,
            symptoms,
            specialty
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-8">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-orange-50 to-orange-100">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{modalText.title || 'Book Consultation'}</h2>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                            {modalText.with || 'with'} <span className="font-bold text-orange-600">{vetName}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors bg-white p-2 rounded-full border border-gray-200">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Pet Information Section */}
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <User size={18} className="text-blue-600" />
                                {modalText.petInfo || 'Pet Information'}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className={styles.label}>{modalText.petAge || 'Pet Age'}</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g., 3 years"
                                        className={styles.input}
                                        value={petAge}
                                        onChange={(e) => setPetAge(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className={styles.label}>{modalText.petGender || 'Pet Gender'}</label>
                                    <select
                                        required
                                        className={styles.input}
                                        value={petGender}
                                        onChange={(e) => setPetGender(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="male">{modalText.male || 'Male'}</option>
                                        <option value="female">{modalText.female || 'Female'}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={styles.label}>{modalText.petBreed || 'Pet Breed'}</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g., Golden Retriever"
                                        className={styles.input}
                                        value={petBreed}
                                        onChange={(e) => setPetBreed(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Symptoms Section */}
                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Stethoscope size={18} className="text-yellow-600" />
                                {modalText.symptoms || 'Symptoms Description'}
                            </h3>
                            <textarea
                                required
                                rows="4"
                                className={styles.textarea}
                                placeholder={modalText.symptomsPlaceholder || "Please describe your pet's symptoms in detail..."}
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                            />
                        </div>

                        {/* Vet Specialty Section */}
                        <div>
                            <label className={styles.label}>{modalText.vetSpecialty || 'Vet Specialty Needed'}</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {specialties.map((spec) => (
                                    <div
                                        key={spec.id}
                                        className={`${styles.checkbox} ${specialty === spec.id ? 'border-orange-500 bg-orange-50' : ''}`}
                                        onClick={() => setSpecialty(spec.id)}
                                    >
                                        <span className="text-2xl">{spec.icon}</span>
                                        <span className="flex-1 font-medium text-gray-700">{spec.label}</span>
                                        {specialty === spec.id && <CheckCircle size={18} className="text-orange-500" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Consultation Type */}
                        <div>
                            <label className={styles.label}>{modalText.type || 'Consultation Type'}</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    className={`${styles.radioCard} ${type === 'video' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-200'}`}
                                    onClick={() => setType('video')}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === 'video' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <Video size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{modalText.video || 'Video Call'}</div>
                                        <div className="text-xs text-gray-500">$45</div>
                                    </div>
                                    {type === 'video' && <CheckCircle size={18} className="ml-auto text-orange-500" />}
                                </div>

                                <div
                                    className={`${styles.radioCard} ${type === 'clinic' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-200'}`}
                                    onClick={() => setType('clinic')}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === 'clinic' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{modalText.clinic || 'Clinic Visit'}</div>
                                        <div className="text-xs text-gray-500">$75</div>
                                    </div>
                                    {type === 'clinic' && <CheckCircle size={18} className="ml-auto text-orange-500" />}
                                </div>
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={styles.label}>{modalText.date || 'Date'}</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        required
                                        className={styles.input}
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                </div>
                            </div>
                            <div>
                                <label className={styles.label}>{modalText.time || 'Time'}</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        required
                                        className={styles.input}
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                    <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Summary Price */}
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl flex justify-between items-center border border-orange-200">
                            <span className="font-bold text-gray-700">Total Price</span>
                            <span className="font-bold text-2xl text-orange-600">{type === 'video' ? '$45' : '$75'}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                {modalText.cancel || 'Cancel'}
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-orange-500 text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
                            >
                                {modalText.confirm || 'Confirm Booking'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;

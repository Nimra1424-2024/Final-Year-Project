import React, { useState } from 'react';
import { X, Calendar, Clock, Video, MapPin, CheckCircle } from 'lucide-react';
import { translations } from '../utils/translations';

const BookingModal = ({ isOpen, onClose, vetName, onConfirm, language = 'en' }) => {
    if (!isOpen) return null;

    const t = translations[language];
    const styles = {
        label: "block text-sm font-bold text-gray-700 mb-2",
        input: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all",
        radioCard: "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all"
    };

    // Fallback translations
    const modalText = {
        title: t.booking?.title || "Book Consultation",
        with: t.booking?.with || "with",
        date: t.booking?.date || "Date",
        time: t.booking?.time || "Time",
        type: t.booking?.type || "Consultation Type",
        video: t.booking?.video || "Video Call",
        clinic: t.booking?.clinic || "Clinic Visit",
        confirm: t.booking?.confirm || "Confirm Booking",
        cancel: t.booking?.cancel || "Cancel",
        price: t.booking?.price || "Price"
    };

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('video'); // video or clinic

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm({
            vetName,
            date,
            time,
            type,
            price: type === 'video' ? '$45' : '$75' // Mock pricing
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{modalText.title}</h2>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            {modalText.with} <span className="font-bold text-orange-600">{vetName}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors bg-white p-2 rounded-full border border-gray-200">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Type Selection */}
                        <div>
                            <label className={styles.label}>{modalText.type}</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    className={`${styles.radioCard} ${type === 'video' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-200'}`}
                                    onClick={() => setType('video')}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === 'video' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <Video size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{modalText.video}</div>
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
                                        <div className="font-bold text-gray-900">{modalText.clinic}</div>
                                        <div className="text-xs text-gray-500">$75</div>
                                    </div>
                                    {type === 'clinic' && <CheckCircle size={18} className="ml-auto text-orange-500" />}
                                </div>
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={styles.label}>{modalText.date}</label>
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
                                <label className={styles.label}>{modalText.time}</label>
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
                        <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
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
                                {modalText.cancel}
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-orange-500 text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
                            >
                                {modalText.confirm}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;

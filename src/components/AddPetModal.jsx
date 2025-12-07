import React, { useState } from 'react';
import { X } from 'lucide-react';
import { translations } from '../utils/translations';

const AddPetModal = ({ isOpen, onClose, onAddPet, language = 'en' }) => {
    if (!isOpen) return null;

    const t = translations[language];
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        gender: 'Male'
    });

    // Fallback translations if not yet updated in translations.js
    const modalText = {
        title: t.modal?.addPet || "Add New Pet",
        name: t.modal?.petName || "Pet Name",
        namePlaceholder: t.modal?.enterName || "Enter pet name",
        breed: t.modal?.breed || "Breed",
        breedPlaceholder: t.modal?.enterBreed || "Enter breed",
        age: t.modal?.age || "Age",
        gender: t.modal?.gender || "Gender",
        male: t.modal?.male || "Male",
        female: t.modal?.female || "Female",
        submit: t.modal?.submit || "Add Pet",
        cancel: t.modal?.cancel || "Cancel"
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onAddPet) {
            onAddPet(formData);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">{modalText.title}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{modalText.name}</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={modalText.namePlaceholder}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{modalText.breed}</label>
                            <input
                                type="text"
                                required
                                value={formData.breed}
                                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                                placeholder={modalText.breedPlaceholder}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{modalText.age}</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    placeholder={modalText.age}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{modalText.gender}</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                >
                                    <option value="Male">{modalText.male}</option>
                                    <option value="Female">{modalText.female}</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                className="flex-1 bg-orange-500 text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
                            >
                                {modalText.submit}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                {modalText.cancel}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPetModal;

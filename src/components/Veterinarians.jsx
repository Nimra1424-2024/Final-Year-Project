import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Calendar, Navigation } from 'lucide-react';
import { translations } from '../utils/translations';
import BookingModal from './BookingModal';

const Veterinarians = ({ onBack, language = 'en', onBookAppointment }) => {
    const t = translations[language];
    const [selectedVet, setSelectedVet] = useState(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const handleBookClick = (vet) => {
        setSelectedVet(vet);
        setIsBookingOpen(true);
    };

    const handleBookingConfirm = (bookingData) => {
        onBookAppointment(bookingData);
        setIsBookingOpen(false);
    };

    // Fallback translations
    const vetsText = {
        title: t.veterinarians?.title || "Nearby Veterinarians",
        backToDashboard: t.veterinarians?.backToDashboard || "Back to Dashboard",
        mapTitle: t.veterinarians?.mapTitle || "Veterinarians Near You",
        listTitle: t.veterinarians?.listTitle || "Find Veterinarians Near You",
        available: t.veterinarians?.available || "Available",
        experience: t.veterinarians?.experience || "years experience",
        reviews: t.veterinarians?.reviews || "reviews",
        book: t.veterinarians?.book || "Book Consultation",
        directions: t.veterinarians?.directions || "Get Directions"
    };

    const vets = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            specialty: "Dermatology",
            rating: 4.9,
            experience: 8,
            reviewCount: 2,
            address: "123 Pet Care Ave, New York, NY",
            quote: "Excellent diagnosis and treatment for my dog's skin condition.",
            quoteAuthor: "John Doe",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            status: "Available"
        },
        {
            id: 2,
            name: "Dr. Michael Chen",
            specialty: "General Practice",
            rating: 4.7,
            experience: 12,
            reviewCount: 1,
            address: "456 Animal Hospital St, New York, NY",
            quote: "Great with nervous pets and very thorough.",
            quoteAuthor: "Lisa Brown",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            status: "Available"
        },
        {
            id: 3,
            name: "Dr. Emily Rodriguez",
            specialty: "Internal Medicine",
            rating: 4.8,
            experience: 6,
            reviewCount: 0,
            address: "789 Veterinary Blvd, Queens, NY",
            quote: null,
            quoteAuthor: null,
            image: "https://images.unsplash.com/photo-1594824476969-51c44d7eccca?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            status: "Unavailable"
        }
    ];

    return (
        <div className={`min-h-screen bg-gray-50 ${language === 'ur' ? 'font-noto-nastaliq text-right' : ''}`}>
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-6">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 text-sm font-medium border border-gray-200"
                    >
                        <ArrowLeft size={16} />
                        {vetsText.backToDashboard}
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">{vetsText.title}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Map Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-[600px] flex flex-col">
                            <h2 className="text-gray-700 font-medium mb-4 flex items-center gap-2">
                                <MapPin size={20} className="text-orange-500" />
                                {vetsText.mapTitle}
                            </h2>
                            {/* Mock Map */}
                            <div className="flex-1 bg-gray-100 rounded-xl relative overflow-hidden group cursor-pointer border border-gray-200">
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity"
                                    alt="Map"
                                />
                                <div className="absolute inset-0">
                                    {/* Pin 1 */}
                                    <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-white font-bold shadow-lg">1</div>
                                    </div>

                                    {/* Pin 3 (Center, Large) */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full flex flex-col items-center z-10">
                                        <MapPin size={48} className="text-orange-500 fill-white drop-shadow-xl" />
                                        <div className="absolute top-3 text-white font-bold text-lg">3</div>
                                    </div>

                                    {/* Pin 2 */}
                                    <div className="absolute top-1/2 right-1/4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-white font-bold shadow-lg">2</div>
                                    </div>

                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center w-full">
                                        <p className="font-bold text-gray-700 bg-white/90 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm text-sm border border-gray-100 mb-1">
                                            Interactive Map
                                        </p>
                                        <p className="text-xs text-gray-500 bg-white/50 px-2 py-0.5 rounded-md">Showing veterinarians in your area</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vets List */}
                    <div className="lg:col-span-1 space-y-6">
                        <h2 className="text-xl font-bold text-gray-900">{vetsText.listTitle}</h2>

                        {vets.map((vet) => (
                            <div key={vet.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="flex gap-4">
                                    <img
                                        src={vet.image}
                                        alt={vet.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">{vet.name}</h3>
                                                <p className="text-gray-500 text-sm">{vet.specialty}</p>
                                            </div>
                                            <span className={`text-xs font-bold px-2 py-1 rounded ${vet.status === 'Available' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                                                }`}>
                                                {vet.status === 'Available' ? vetsText.available : 'Unavailable'}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="font-bold text-gray-900">{vet.rating}</span>
                                            </div>
                                            <span>{vet.experience} {vetsText.experience}</span>
                                            <span>{vet.reviewCount} {vetsText.reviews}</span>
                                        </div>

                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                            <MapPin size={14} />
                                            {vet.address}
                                        </div>

                                        {vet.quote && (
                                            <div className="mt-4 bg-gray-50 p-3 rounded-xl border border-gray-100 italic text-sm text-gray-600">
                                                "{vet.quote}"
                                                <div className="not-italic text-xs text-gray-400 mt-1">- {vet.quoteAuthor}</div>
                                            </div>
                                        )}

                                        <div className="mt-6 flex gap-3">
                                            <button
                                                onClick={() => handleBookClick(vet)}
                                                disabled={vet.status !== 'Available'}
                                                className={`flex-1 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${vet.status === 'Available'
                                                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                                                    : 'bg-orange-200 text-white cursor-not-allowed'
                                                    }`}
                                            >
                                                <Calendar size={18} />
                                                {vetsText.book}
                                            </button>
                                            <button className="px-4 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                                                <Navigation size={18} />
                                                {vetsText.directions}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                vetName={selectedVet?.name}
                onConfirm={handleBookingConfirm}
                language={language}
            />
        </div>
    );
};

export default Veterinarians;

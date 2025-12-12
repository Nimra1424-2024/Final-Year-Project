import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import AIDiagnosis from './components/AIDiagnosis';
import Veterinarians from './components/Veterinarians';
import Consultation from './components/Consultation';
import MedicalHistory from './components/MedicalHistory';
import Profile from './components/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState('owner');
  const [language, setLanguage] = useState('en');

  const [myPets, setMyPets] = useState([
    {
      id: 1,
      name: "Buddy",
      details: "Golden Retriever • 3 years • male",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      breed: "Golden Retriever",
      age: "3 years",
      weight: "30 kg",
      gender: "Male"
    },
    {
      id: 2,
      name: "Luna",
      details: "Persian Cat • 2 years • female",
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      breed: "Persian Cat",
      age: "2 years",
      weight: "4 kg",
      gender: "Female"
    }
  ]);

  const [selectedPetId, setSelectedPetId] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleAddPet = (petData) => {
    const newPet = {
      id: myPets.length + 1,
      name: petData.name,
      details: `${petData.breed} • ${petData.age} • ${petData.gender.toLowerCase()}`,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      breed: petData.breed,
      age: petData.age,
      weight: "N/A", // Mock weight as it's not in the form yet
      gender: petData.gender
    };
    setMyPets([...myPets, newPet]);
  };

  const [appointments, setAppointments] = useState([
    {
      type: "Video Consultation",
      date: "2024-02-01 at 10:00",
      status: "confirmed",
      price: "$75",
      vetName: "Dr. Sarah Johnson"
    },
    {
      type: "Clinic Visit",
      date: "2024-02-05 at 14:30",
      status: "pending",
      price: "$120",
      vetName: "Dr. Michael Chen"
    }
  ]);

  const handleBooking = (bookingData) => {
    const newAppointment = {
      type: bookingData.type === 'video' ? 'Video Consultation' : 'Clinic Visit',
      date: `${bookingData.date} at ${bookingData.time}`,
      status: 'pending',
      price: bookingData.price,
      vetName: bookingData.vetName
    };
    setAppointments([...appointments, newAppointment]);
    setCurrentPage('dashboard');
  };

  const navigateToLogin = () => setCurrentPage('login');
  const navigateToHome = () => setCurrentPage('landing');

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const handleJoinCall = (appointment) => {
    if (appointment.status === 'confirmed') {
      setSelectedAppointment(appointment);
      setCurrentPage('consultation');
    }
  };

  const handleCancelAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  const handleAcceptAppointment = (index) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[index].status = 'confirmed';
    setAppointments(updatedAppointments);
  };

  if (currentPage === 'dashboard' && isLoggedIn) {
    return (
      <Dashboard
        onLogout={handleLogout}
        userName={userRole === 'vet' ? 'Dr. Smith' : 'Pet Owner'}
        language={language}
        setLanguage={setLanguage}
        onNavigate={(page) => setCurrentPage(page)}
        appointments={appointments}
        myPets={myPets}
        onAddPet={handleAddPet}
        onJoinCall={handleJoinCall}
        onCancelAppointment={handleCancelAppointment}
        onAcceptAppointment={handleAcceptAppointment}
      />
    );
  }

  if (currentPage === 'diagnosis' && isLoggedIn) {
    return (
      <AIDiagnosis
        onBack={() => setCurrentPage('dashboard')}
        language={language}
      />
    );
  }

  if (currentPage === 'veterinarians' && isLoggedIn) {
    return (
      <Veterinarians
        onBack={() => setCurrentPage('dashboard')}
        language={language}
        onBookAppointment={handleBooking}
      />
    );
  }

  if (currentPage === 'consultation' && isLoggedIn && selectedAppointment) {
    const activePet = myPets.find(p => p.id === selectedPetId) || myPets[0];
    return (
      <Consultation
        onBack={() => {
          setCurrentPage('dashboard');
          setSelectedAppointment(null);
        }}
        language={language}
        setLanguage={setLanguage}
        pet={activePet}
        appointment={selectedAppointment}
      />
    );
  }

  if (currentPage === 'medical-history' && isLoggedIn) {
    return (
      <MedicalHistory
        onBack={() => setCurrentPage('dashboard')}
        language={language}
      />
    );
  }

  if (currentPage === 'profile' && isLoggedIn) {
    return (
      <Profile
        onBack={() => setCurrentPage('dashboard')}
        language={language}
        setLanguage={setLanguage}
        userName={userRole === 'vet' ? 'Dr. Smith' : 'Pet Owner'}
      />
    );
  }

  if (currentPage === 'login') {
    return <Login onLogin={handleLogin} onHome={navigateToHome} />;
  }

  return (
    <div className="min-h-screen bg-[#FFF7ED]">
      <Navbar
        onGetStarted={navigateToLogin}
        onHome={navigateToHome}
        language={language}
        setLanguage={setLanguage}
      />
      <Hero
        onStart={navigateToLogin}
        language={language}
      />
      <Features language={language} />
      <AboutUs language={language} />
    </div>
  );
}

export default App;

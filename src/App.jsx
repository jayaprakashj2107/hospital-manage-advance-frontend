import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BridalPackages from './components/BridalPackages';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import FloatingButtons from './components/FloatingButtons';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';

function App() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleOpenAppointment = (serviceName = '') => {
    setSelectedService(serviceName);
    setAppointmentModalOpen(true);
  };

  const handleCloseAppointment = () => {
    setAppointmentModalOpen(false);
    setSelectedService('');
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <Navbar onOpenAppointment={() => handleOpenAppointment()} />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        <Hero onOpenAppointment={() => handleOpenAppointment()} />
        <About />
        <Services onSelectService={(serviceName) => handleOpenAppointment(serviceName)} />
        <BridalPackages onSelectPackage={(pkgTitle) => handleOpenAppointment(pkgTitle)} />
        <Gallery />
        <Reviews />
        <Contact />
      </main>

      {/* Sticky & Floating Actions */}
      <FloatingButtons onOpenAppointment={() => handleOpenAppointment()} />

      {/* Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={handleCloseAppointment}
        selectedService={selectedService}
      />
    </div>
  );
}

export default App;

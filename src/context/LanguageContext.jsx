import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    dashboard: 'Dashboard',
    patients: 'Patients',
    doctors: 'Doctors',
    appointments: 'Appointments',
    doctorFees: 'Doctor Fees',
    medicalRecords: 'Medical Records',
    prescriptions: 'Prescriptions',
    laboratory: 'Laboratory',
    pharmacy: 'Pharmacy',
    billing: 'Billing & Payments',
    insurance: 'Insurance Claims',
    monitoring: 'Patient Monitoring',
    reports: 'Reports & Analytics',
    previousRecords: 'Previous Records',
    settings: 'Settings',
    logout: 'Logout',
    welcomeBack: 'Welcome back to Hospital Management System',
    registerPatient: 'Register Patient',
    scheduleAppointment: 'Schedule Appointment',
    totalPatients: 'Total Patients',
    todayAppointments: "Today's Appointments",
    availableDoctors: 'Available Doctors',
    pendingBills: 'Pending Bills',
    labTests: 'Pending Lab Tests',
    lowStock: 'Pharmacy Stock Alerts',
  },
  ta: {
    dashboard: 'முகப்பு பலகை (Dashboard)',
    patients: 'நோயாளிகள் (Patients)',
    doctors: 'மருத்துவர்கள் (Doctors)',
    appointments: 'முன்பதிவுகள் (Appointments)',
    doctorFees: 'மருத்துவர் கட்டணங்கள்',
    medicalRecords: 'மருத்துவ ஆவணங்கள்',
    prescriptions: 'மருந்துச் சீட்டுகள்',
    laboratory: 'ஆய்வகம் (Laboratory)',
    pharmacy: 'மருந்தகம் (Pharmacy)',
    billing: 'கட்டணம் மற்றும் செலுத்துகைகள்',
    insurance: 'காப்பீட்டு கோரிக்கைகள்',
    monitoring: 'நோயாளி கண்காணிப்பு',
    reports: 'அறிக்கைகள் மற்றும் பகுப்பாய்வு',
    previousRecords: 'முந்தைய பதிவுகள்',
    settings: 'அமைப்புகள் (Settings)',
    logout: 'வெளியேறு (Logout)',
    welcomeBack: 'மருத்துவமனை மேலாண்மை அமைப்பிற்கு நல்வரவு',
    registerPatient: 'நோயாளி பதிவு செய்',
    scheduleAppointment: 'முன்பதிவு செய்',
    totalPatients: 'மொத்த நோயாளிகள்',
    todayAppointments: 'இன்றைய முன்பதிவுகள்',
    availableDoctors: 'இருப்பில் உள்ள மருத்துவர்கள்',
    pendingBills: 'நிலுவையில் உள்ள கட்டணங்கள்',
    labTests: 'ஆய்வக பரிசோதனைகள்',
    lowStock: 'மருந்து இருப்பு எச்சரிக்கைகள்',
  },
  hi: {
    dashboard: 'डैशबोर्ड (Dashboard)',
    patients: 'मरीजों की सूची (Patients)',
    doctors: 'डॉक्टर्स (Doctors)',
    appointments: 'अपॉइंटमेंट (Appointments)',
    doctorFees: 'डॉक्टर फीस',
    medicalRecords: 'मेडिकल रिकॉर्ड्स',
    prescriptions: 'प्रिस्क्रिप्शन',
    laboratory: 'प्रयोगशाला (Laboratory)',
    pharmacy: 'फार्मेसी (Pharmacy)',
    billing: 'बिलिंग एवं भुगतान',
    insurance: 'बीमा दावे (Insurance)',
    monitoring: 'मरीज निगरानी (Monitoring)',
    reports: 'रिपोर्ट एवं विश्लेषिकी',
    previousRecords: 'पिछले रिकॉर्ड',
    settings: 'सेटिंग्स (Settings)',
    logout: 'लॉगआउट (Logout)',
    welcomeBack: 'अस्पताल प्रबंधन प्रणाली में आपका स्वागत है',
    registerPatient: 'मरीज पंजीकृत करें',
    scheduleAppointment: 'अपॉइंटमेंट लें',
    totalPatients: 'कुल मरीज',
    todayAppointments: 'आज के अपॉइंटमेंट',
    availableDoctors: 'उपलब्ध डॉक्टर्स',
    pendingBills: 'बकाया बिल',
    labTests: 'लैब टेस्ट लंबित',
    lowStock: 'स्टॉक अलर्ट',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

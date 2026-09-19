const API_BASE_URL = 'http://127.0.0.1:8000/api';

const getHeaders = () => {
  const token = localStorage.getItem('hms_token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token && !token.startsWith('demo-jwt-token')) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || `API Error ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.warn(`[API Fetch Warning] ${endpoint}:`, err.message);
    throw err;
  }
};

export const api = {
  login: (credentials) => apiFetch('/auth/login/', { method: 'POST', body: JSON.stringify(credentials) }),
  getAnalytics: () => apiFetch('/reports/analytics/'),
  
  // Patients
  getPatients: (search = '') => apiFetch(`/patients/${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  getPatientById: (id) => apiFetch(`/patients/${id}/`),
  createPatient: (data) => apiFetch('/patients/', { method: 'POST', body: JSON.stringify(data) }),
  updatePatient: (id, data) => apiFetch(`/patients/${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
  
  // Vitals
  getVitals: () => apiFetch('/vitals/'),
  recordVitals: (data) => apiFetch('/vitals/', { method: 'POST', body: JSON.stringify(data) }),

  // Doctors
  getDoctors: (search = '') => apiFetch(`/doctors/${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  getDepartments: () => apiFetch('/departments/'),
  getDoctorFees: () => apiFetch('/doctor-fees/'),
  createDoctorFee: (data) => apiFetch('/doctor-fees/', { method: 'POST', body: JSON.stringify(data) }),

  // Appointments
  getAppointments: () => apiFetch('/appointments/'),
  createAppointment: (data) => apiFetch('/appointments/', { method: 'POST', body: JSON.stringify(data) }),
  updateAppointmentStatus: (id, status) => apiFetch(`/appointments/${id}/`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // EMR
  getMedicalRecords: () => apiFetch('/medical-records/'),
  createMedicalRecord: (data) => apiFetch('/medical-records/', { method: 'POST', body: JSON.stringify(data) }),
  getPatientTimeline: (patientId) => apiFetch(`/medical-records/timeline/${patientId}/`),

  // Prescriptions
  getPrescriptions: () => apiFetch('/prescriptions/'),
  createPrescription: (data) => apiFetch('/prescriptions/', { method: 'POST', body: JSON.stringify(data) }),

  // Laboratory
  getLabTests: () => apiFetch('/laboratory/tests/'),
  createLabTest: (data) => apiFetch('/laboratory/tests/', { method: 'POST', body: JSON.stringify(data) }),
  recordLabResult: (testId, data) => apiFetch(`/laboratory/tests/${testId}/record-result/`, { method: 'POST', body: JSON.stringify(data) }),

  // Pharmacy
  getMedicines: () => apiFetch('/pharmacy/medicines/'),
  createMedicine: (data) => apiFetch('/pharmacy/medicines/', { method: 'POST', body: JSON.stringify(data) }),
  dispenseMedicine: (medicineId, data) => apiFetch(`/pharmacy/medicines/${medicineId}/dispense/`, { method: 'POST', body: JSON.stringify(data) }),

  // Billing
  getBills: () => apiFetch('/billing/bills/'),
  createBill: (data) => apiFetch('/billing/bills/', { method: 'POST', body: JSON.stringify(data) }),
  addPayment: (billId, data) => apiFetch(`/billing/bills/${billId}/add-payment/`, { method: 'POST', body: JSON.stringify(data) }),

  // Insurance
  getClaims: () => apiFetch('/insurance/claims/'),
  createClaim: (data) => apiFetch('/insurance/claims/', { method: 'POST', body: JSON.stringify(data) }),
  updateClaimStatus: (id, status, approved_amount) => apiFetch(`/insurance/claims/${id}/`, { method: 'PATCH', body: JSON.stringify({ status, approved_amount }) }),

  // Audit Logs
  getAuditLogs: () => apiFetch('/audit-logs/'),
  getNotifications: () => apiFetch('/notifications/'),
};

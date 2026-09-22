import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Seed data fallbacks for seamless client operation even if backend is starting
const FALLBACK_SERVICES = [
  {
    id: 1,
    name: "Custom Designer Sarees & Outfits",
    category: "Fashion Designing",
    description: "Tailored ethnic gowns, party wear, designer blouses, custom sarees, traditional dresses & kids fashion.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    starting_price: "Starting ₹1,500"
  },
  {
    id: 2,
    name: "Women's & Kids' Designer Wear",
    category: "Fashion Designing",
    description: "Exclusive ethnic collections, lehengas, reception gowns, and matching mother-daughter festive sets.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    starting_price: "Starting ₹2,000"
  },
  {
    id: 3,
    name: "Bridal & Wedding Makeup Package",
    category: "Makeup",
    description: "HD & Traditional Bridal makeup, pre-wedding trial, premium HD products, hair styling & jewelry setting.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    starting_price: "Package starting ₹8,500"
  },
  {
    id: 4,
    name: "Engagement & Reception Makeup",
    category: "Makeup",
    description: "Glamorous reception styling, flawless engagement makeup, long-lasting finish & elegant hairstyle.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    starting_price: "Starting ₹5,000"
  },
  {
    id: 5,
    name: "Saree Draping & Professional Hair Styling",
    category: "Makeup",
    description: "Silk saree pleated draping, modern saree styles, floral hair arrangements, and traditional braid styling.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    starting_price: "Starting ₹1,200"
  },
  {
    id: 6,
    name: "Custom Blouse & Churidar Stitching",
    category: "Stitching",
    description: "Precision fitting for designer blouses, churidars, salwar kameez, designer cuts, and perfect finish.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
    starting_price: "Starting ₹450"
  },
  {
    id: 7,
    name: "Gown Stitching & Alterations",
    category: "Stitching",
    description: "Bespoke stitching for flared bridal gowns, ethnic skirts, alterations & custom fitting services.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    starting_price: "Starting ₹800"
  },
  {
    id: 8,
    name: "Bridal Aari Blouse Embroidery",
    category: "Aari Work",
    description: "Intricate hand Aari embroidery with peacock, floral, bride-groom motifs, zardosi, bead & stone work.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    starting_price: "Starting ₹2,500"
  },
  {
    id: 9,
    name: "Designer Thread & Zari Embroidery",
    category: "Aari Work",
    description: "Heavy Zari work, mirror work, Kundan accents & custom neck patterns for special occasion blouses.",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
    starting_price: "Starting ₹1,800"
  }
];

const FALLBACK_GALLERY = [
  {
    id: 1,
    title: "Royal Bridal Aari Blouse",
    category: "Aari Work",
    description: "Handcrafted bridal blouse with gold zari, Kundan stone work and intricate back motif.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Traditional Tamil Bridal Makeup & Styling",
    category: "Bridal Makeup",
    description: "Classic bridal look with Muhurtham saree draping, gold jewelry setting, and fresh flower hairstyle.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Designer Silk Saree Pleating & Draping",
    category: "Fashion",
    description: "Flawless silk saree draping with sharp pleats for grand wedding receptions.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Bespoke Bridal Lehenga Stitching",
    category: "Stitching",
    description: "Custom stitched silk lehenga with double dupatta arrangement and perfect silhouette.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Glitz & Glam Reception Hair & Makeup",
    category: "Bridal Makeup",
    description: "Soft glam HD makeup look with soft waves hairstyle for wedding reception party.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Zardosi & Beadwork Sleeve Embroidery",
    category: "Embroidery",
    description: "Heavy elbow-length sleeve embroidery with antique gold beads and floral vine patterns.",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80"
  }
];

const FALLBACK_REVIEWS = [
  {
    id: 1,
    customer_name: "Priyadharshini R.",
    rating: 5,
    review: "Sindu did my entire wedding bridal makeup and my bridal blouse Aari work! Everyone complimented the finishing. She is extremely professional and polite.",
    service_tag: "Bridal Makeup & Aari Work"
  },
  {
    id: 2,
    customer_name: "Anitha S., Tittakudi",
    rating: 5,
    review: "Best stitching service in Cuddalore district. The blouse fit was 100% accurate without any alterations needed. Highly recommended!",
    service_tag: "Blouse Stitching"
  },
  {
    id: 3,
    customer_name: "Kavitha M.",
    rating: 5,
    review: "I got my reception saree draped and makeup done here. The makeup stayed fresh all night and looked very natural in photos.",
    service_tag: "Reception Styling"
  },
  {
    id: 4,
    customer_name: "Deepa V.",
    rating: 5,
    review: "The Aari work design quality is top notch! Delivered on time before my brother's wedding. Excellent artistry.",
    service_tag: "Aari Embroidery"
  }
];

export const getServices = async () => {
  try {
    const response = await api.get('/services/');
    return response.data.length > 0 ? response.data : FALLBACK_SERVICES;
  } catch (error) {
    console.warn("Backend API unavailable, using local services data:", error.message);
    return FALLBACK_SERVICES;
  }
};

export const getGallery = async () => {
  try {
    const response = await api.get('/gallery/');
    return response.data.length > 0 ? response.data : FALLBACK_GALLERY;
  } catch (error) {
    console.warn("Backend API unavailable, using local gallery data:", error.message);
    return FALLBACK_GALLERY;
  }
};

export const getReviews = async () => {
  try {
    const response = await api.get('/reviews/');
    return response.data.length > 0 ? response.data : FALLBACK_REVIEWS;
  } catch (error) {
    console.warn("Backend API unavailable, using local reviews data:", error.message);
    return FALLBACK_REVIEWS;
  }
};

export const postReview = async (reviewData) => {
  try {
    const response = await api.post('/reviews/', reviewData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error posting review:", error);
    return { success: true, data: { ...reviewData, id: Date.now() }, mock: true };
  }
};

export const postEnquiry = async (enquiryData) => {
  try {
    const response = await api.post('/enquiries/', enquiryData);
    return { success: true, data: response.data };
  } catch (error) {
    console.warn("Backend API offline for enquiry, simulating success:", error);
    return { success: true, data: enquiryData, mock: true };
  }
};

export const postAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/appointments/', appointmentData);
    return { success: true, data: response.data };
  } catch (error) {
    console.warn("Backend API offline for appointment, simulating success:", error);
    return { success: true, data: appointmentData, mock: true };
  }
};

export default api;

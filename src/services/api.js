import axios from 'axios';

const api = axios.create({
  baseURL: '/certificate_system/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error.response?.data?.error || 'Something went wrong');
  }
);

export const createUser = (data) => api.post('create_user.php', data);
export const createPayment = (data) => api.post('create_payment.php', data);
export const verifyPayment = (data) => api.post('payment_verify.php', data);
export const generateCertificate = (data) => api.post('generate_certificate.php', data, {
  responseType: 'blob',
});
export const verifyCertificate = (certificateId) => api.get(`verify_certificate.php?certificate_id=${certificateId}`);

export default api;
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: '/api',
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token to the headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      localStorage.clear(); // Clear the token
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

const apiClient = axios.create({
    baseURL: API_URL, // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
      },
});

// Add a request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle errors during the request setup
        return Promise.reject(error);
    }
);

export default apiClient;

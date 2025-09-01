import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: '/api/users', // Base URL for all user endpoints
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token to all requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Or your token storage method
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            console.error('Unauthorized access - possibly missing or invalid token');
        } else if (error.response?.status === 403) {
            // Handle forbidden access (insufficient permissions)
            console.error('Forbidden - user does not have required role');
        }
        return Promise.reject(error);
    }
);

const userApi = {
    /**
     * Get all users (requires SuperAdmin or Admin role)
     * @returns {Promise} Array of user objects
     */
    getAllUsers: async () => {
        try {
            const response = await apiClient.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    /**
     * Get user by ID
     * @param {string|Guid} id - User ID
     * @returns {Promise} User object
     */
    getUserById: async (id) => {
        try {
            const response = await apiClient.get(`/${id}`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                console.error('User not found');
            } else {
                console.error('Error fetching user:', error);
            }
            throw error;
        }
    },

    /**
     * Create a new user (requires SuperAdmin or Admin role)
     * @param {Object} userData - User creation data
     * @param {string} userData.firstName - User's first name
     * @param {string} userData.lastName - User's last name
     * @param {string} userData.email - User's email
     * @param {string} userData.phoneNumber - User's phone number
     * @param {string} userData.role - User's role
     * @param {string} userData.password - User's password
     * @returns {Promise} Created user object
     */
    createUser: async (userData) => {
        try {
            const response = await apiClient.post('/', userData);
            return response.data;
        } catch (error) {
            if (error.response?.status === 400) {
                console.error('Bad request:', error.response.data);
            } else {
                console.error('Error creating user:', error);
            }
            throw error;
        }
    },

    /**
     * Update a user
     * @param {string|Guid} id - User ID
     * @param {Object} userData - User data to update
     * @returns {Promise}
     */
    updateUser: async (id, userData) => {
        try {
            const response = await apiClient.put(`/${id}`, userData);
            return response.data;
        } catch (error) {
            if (error.response?.status === 400) {
                console.error('Bad request: ID mismatch');
            } else if (error.response?.status === 404) {
                console.error('User not found');
            } else {
                console.error('Error updating user:', error);
            }
            throw error;
        }
    },

    /**
     * Delete a user (requires SuperAdmin or Admin role)
     * @param {string|Guid} id - User ID
     * @returns {Promise}
     */
    deleteUser: async (id) => {
        try {
            const response = await apiClient.delete(`/${id}`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                console.error('User not found');
            } else {
                console.error('Error deleting user:', error);
            }
            throw error;
        }
    },
};

export default userApi;
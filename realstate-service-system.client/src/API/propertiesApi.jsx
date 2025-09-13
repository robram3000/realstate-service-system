import axios from 'axios';


const apiClient = axios.create({
    baseURL: '/api/properties', 
    headers: {
        'Content-Type': 'application/json',
    },
});


apiClient.interceptors.request.use(
    (config) => {
        const anonymousEndpoints = ['/api/properties', '/api/properties/search'];
        const isAnonymous = anonymousEndpoints.some(endpoint =>
            config.url?.startsWith(endpoint) && config.method === 'get'
        );

        if (!isAnonymous) {
            const token = localStorage.getItem('authToken'); 
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized access - possibly missing or invalid token');
        } else if (error.response?.status === 403) {
            console.error('Forbidden - user does not have required role');
        }
        return Promise.reject(error);
    }
);

const propertiesApi = {
    /**
     * Get all properties (anonymous access allowed)
     * @returns {Promise} Array of property objects
     */
    getAllProperties: async () => {
        try {
            const response = await apiClient.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching properties:', error);
            throw error;
        }
    },

    /**
     * Get property by ID (anonymous access allowed)
     * @param {string|Guid} id - Property ID
     * @returns {Promise} Property object
     */
    getPropertyById: async (id) => {
        try {
            const response = await apiClient.get(`/${id}`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                console.error('Property not found');
            } else {
                console.error('Error fetching property:', error);
            }
            throw error;
        }
    },

    /**
     * Create a new property (requires SuperAdmin, Admin, or Agent role)
     * @param {Object} propertyData - Property data
     * @returns {Promise} Created property object
     */
    createProperty: async (propertyData) => {
        try {
            const response = await apiClient.post('/', propertyData);
            return response.data;
        } catch (error) {
            if (error.response?.status === 400) {
                console.error('Bad request:', error.response.data);
            } else {
                console.error('Error creating property:', error);
            }
            throw error;
        }
    },

    /**
     * Update a property (requires SuperAdmin, Admin, or Agent role)
     * @param {string|Guid} id - Property ID
     * @param {Object} propertyData - Property data to update
     * @returns {Promise}
     */
    updateProperty: async (id, propertyData) => {
        try {
            const response = await apiClient.put(`/${id}`, propertyData);
            return response.data;
        } catch (error) {
            if (error.response?.status === 400) {
                console.error('Bad request: ID mismatch');
            } else if (error.response?.status === 404) {
                console.error('Property not found');
            } else {
                console.error('Error updating property:', error);
            }
            throw error;
        }
    },

    /**
     * Delete a property (requires SuperAdmin or Admin role)
     * @param {string|Guid} id - Property ID
     * @returns {Promise}
     */
    deleteProperty: async (id) => {
        try {
            const response = await apiClient.delete(`/${id}`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                console.error('Property not found');
            } else {
                console.error('Error deleting property:', error);
            }
            throw error;
        }
    },

    /**
     * Search properties with filters (anonymous access allowed)
     * @param {Object} filters - Search filters
     * @param {string} filters.city - City filter
     * @param {number} filters.minPrice - Minimum price filter
     * @param {number} filters.maxPrice - Maximum price filter
     * @param {number} filters.bedrooms - Number of bedrooms filter
     * @param {string} filters.propertyType - Property type filter
     * @returns {Promise} Array of property objects matching the criteria
     */
    searchProperties: async (filters = {}) => {
        try {
            const params = new URLSearchParams();

            
            Object.keys(filters).forEach(key => {
                if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
                    params.append(key, filters[key]);
                }
            });

            const response = await apiClient.get(`/search?${params}`);
            return response.data;
        } catch (error) {
            console.error('Error searching properties:', error);
            throw error;
        }
    },
};

export default propertiesApi;
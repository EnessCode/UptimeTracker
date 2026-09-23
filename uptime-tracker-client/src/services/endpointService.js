import api from './api';

export const endpointService = {
    getAllEndpoints: async () => {
        const response = await api.get('/endpoints');
        return response.data;
    },

    createEndpoint: async (endpointData) => {
        const response = await api.post('/endpoints', endpointData);
        return response.data;
    },

    deleteEndpoint: async (id) => {
        const response = await api.delete(`/endpoints/${id}`);
        return response.data;
    },

    toggleActive: async (id) => {
        const response = await api.patch(`/endpoints/${id}/toggle`);
        return response.data;
    },

    getEndpointHistory: async (id) => {
        const response = await api.get(`/endpoints/${id}/history`);
        return response.data;
    }
};
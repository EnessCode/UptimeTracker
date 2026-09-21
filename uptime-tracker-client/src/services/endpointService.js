import api from './api';

export const endpointService = {
    // API'den tüm verileri çeker (CQRS: GetAllEndpointsQuery)
    getAllEndpoints: async () => {
        const response = await api.get('/endpoints');
        return response.data;
    },

    // Yeni bir izleme adresi ekler (CQRS: CreateEndpointCommand)
    createEndpoint: async (endpointData) => {
        /* endpointData örneği: { name: "Google", url: "https://google.com", checkIntervalInMinutes: 5 } */
        const response = await api.post('/endpoints', endpointData);
        return response.data;
    }
};
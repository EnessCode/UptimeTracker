import { useState, useEffect } from 'react';
import { endpointService } from '../services/endpointService';

const EndpointList = ({ refreshTrigger }) => {
    const [endpoints, setEndpoints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEndpoints = async () => {
            try {
                const data = await endpointService.getAllEndpoints();
                setEndpoints(data);
            } catch (error) {
                console.error("Veriler çekilirken bir hata oluştu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEndpoints();
    }, [refreshTrigger]);

    if (loading) {
        return <div className="text-center mt-4">Veriler yükleniyor...</div>;
    }

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-white">
                <h5 className="mb-0">Takip Edilen Servisler</h5>
            </div>
            <div className="card-body p-0">
                <table className="table table-hover mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Servis Adı</th>
                            <th>URL</th>
                            <th>Kontrol Aralığı</th>
                            <th>Durum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {endpoints.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-3 text-muted">
                                    Henüz sistemde kayıtlı bir servis bulunmuyor.
                                </td>
                            </tr>
                        ) : (
                            endpoints.map((endpoint) => (
                                <tr key={endpoint.id}>
                                    <td>{endpoint.name}</td>
                                    <td>
                                        <a href={endpoint.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                            {endpoint.url}
                                        </a>
                                    </td>
                                    <td>{endpoint.checkIntervalInMinutes} Dakika</td>
                                    <td>
                                        <span className={`badge ${endpoint.status === 'Online' ? 'bg-success' :
                                            endpoint.status === 'Offline' ? 'bg-danger' :
                                                'bg-warning text-dark'
                                            }`}>
                                            {endpoint.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EndpointList;
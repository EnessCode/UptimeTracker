import { useState, useEffect } from 'react';
import { endpointService } from '../services/endpointService';
import PingHistoryModal from './PingHistoryModal';

const EndpointList = ({ refreshTrigger }) => {
    const [endpoints, setEndpoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEndpointForHistory, setSelectedEndpointForHistory] = useState(null);

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

    const handleDelete = async (id) => {
        if (window.confirm("Bu servisi silmek istediğinize emin misiniz?")) {
            try {
                await endpointService.deleteEndpoint(id);
                window.location.reload();
            } catch (error) {
                alert("Silme işlemi başarısız oldu.");
                console.error(error);
            }
        }
    };

    if (loading) {
        return <div className="text-center mt-4">Veriler yükleniyor...</div>;
    }

    return (
        <>
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
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {endpoints.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-3 text-muted">
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
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-info me-2"
                                                onClick={() => setSelectedEndpointForHistory(endpoint)}
                                            >
                                                Geçmiş
                                            </button>

                                            <button
                                                className={`btn btn-sm me-2 ${endpoint.isActive ? 'btn-outline-warning' : 'btn-outline-success'}`}
                                                onClick={async () => {
                                                    try {
                                                        await endpointService.toggleActive(endpoint.id);
                                                    } catch (error) {
                                                        alert("Durum değiştirilirken bir hata oluştu.");
                                                        console.error(error);
                                                    }
                                                }}
                                            >
                                                {endpoint.isActive ? 'Duraklat' : 'Başlat'}
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(endpoint.id)}
                                            >
                                                Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedEndpointForHistory && (
                <PingHistoryModal
                    endpoint={selectedEndpointForHistory}
                    onClose={() => setSelectedEndpointForHistory(null)}
                />
            )}
        </>
    );
};

export default EndpointList;
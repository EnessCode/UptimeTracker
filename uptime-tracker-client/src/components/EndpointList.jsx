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

    // YENİ EKLENEN KISIM: Silme işlemini tetikleyen fonksiyon
    const handleDelete = async (id) => {
        if (window.confirm("Bu servisi silmek istediğinize emin misiniz?")) {
            try {
                await endpointService.deleteEndpoint(id);
                // İşlem başarılı olursa tabloyu yenilemek için sayfayı yeniden yüklüyoruz
                window.location.reload();
            } catch (error) {
                alert("Silme işlemi başarısız oldu.");
                console.error(error);
            }
        }
    };
    // YENİ EKLENEN KISIM BİTİŞ

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
                            {/* YENİ EKLENEN KISIM: Tablo başlığı */}
                            <th>İşlemler</th>
                            {/* YENİ EKLENEN KISIM BİTİŞ */}
                        </tr>
                    </thead>
                    <tbody>
                        {endpoints.length === 0 ? (
                            <tr>
                                {/* YENİ EKLENEN KISIM: Yeni sütun eklendiği için colSpan="4" değeri "5" yapıldı */}
                                <td colSpan="5" className="text-center py-3 text-muted">
                                    Henüz sistemde kayıtlı bir servis bulunmuyor.
                                </td>
                                {/* YENİ EKLENEN KISIM BİTİŞ */}
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
                                    {/* YENİ EKLENEN KISIM: Silme butonu hücresi */}
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(endpoint.id)}
                                        >
                                            Sil
                                        </button>
                                    </td>
                                    {/* YENİ EKLENEN KISIM BİTİŞ */}
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
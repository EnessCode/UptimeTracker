import { useState, useEffect, useCallback } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { endpointService } from '../services/endpointService';
import PingHistoryModal from './PingHistoryModal';
import EndpointRow from './EndpointRow';
import DashboardStats from './DashboardStats';

const EndpointList = () => {
    const [endpoints, setEndpoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEndpointForHistory, setSelectedEndpointForHistory] = useState(null);

    const fetchEndpoints = useCallback(async () => {
        try {
            const data = await endpointService.getAllEndpoints();
            setEndpoints(data);
        } catch (error) {
            console.error("Veriler çekilirken bir hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEndpoints();

        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:5052/uptime-hub")
            .configureLogging(LogLevel.Information)
            .build();

        connection.start()
            .then(() => {
                console.log("⚡ SignalR Bağlantısı Başarılı!");

                connection.on("ReceiveUpdate", () => {
                    console.log("🔄 Arka planda durum değişti, tablo yenileniyor...");
                    fetchEndpoints();
                });
            })
            .catch(err => console.error("SignalR Bağlantı Hatası: ", err));

        return () => {
            connection.stop();
        };
    }, [fetchEndpoints]);

    const handleDelete = async (id) => {
        if (window.confirm("Bu servisi silmek istediğinize emin misiniz?")) {
            try {
                await endpointService.deleteEndpoint(id);
                fetchEndpoints();
            } catch (error) {
                alert("Silme işlemi başarısız oldu.");
            }
        }
    };

    if (loading) return <div className="text-center mt-5 spinner-border text-primary" role="status"></div>;

    return (
        <>
            <DashboardStats endpoints={endpoints} />

            <div className="card shadow border-0 rounded-4 mt-4 overflow-hidden">
                <div className="card-header bg-white border-bottom-0 pt-4 pb-2 px-4">
                    <h5 className="mb-0 fw-bold text-dark">Takip Edilen Servisler</h5>
                </div>
                <div className="card-body p-0">
                    <table className="table table-borderless mb-0">
                        <thead className="bg-light text-secondary" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <tr>
                                <th className="px-4 py-3">Servis Adı</th>
                                <th className="py-3">URL</th>
                                <th className="py-3">Aralık</th>
                                <th className="py-3">Durum</th>
                                <th className="py-3">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {endpoints.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        Henüz sistemde kayıtlı bir servis bulunmuyor.
                                    </td>
                                </tr>
                            ) : (
                                endpoints.map((endpoint) => (
                                    <EndpointRow
                                        key={endpoint.id}
                                        endpoint={endpoint}
                                        onShowHistory={setSelectedEndpointForHistory}
                                        onDelete={handleDelete}
                                    />
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
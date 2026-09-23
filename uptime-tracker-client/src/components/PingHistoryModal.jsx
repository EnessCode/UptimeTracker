import { useEffect, useState } from 'react';
import { endpointService } from '../services/endpointService';

const PingHistoryModal = ({ endpoint, onClose }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await endpointService.getEndpointHistory(endpoint.id);
                setHistory(data);
            } catch (error) {
                console.error("Geçmiş çekilirken hata:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [endpoint.id]);

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header bg-light">
                        <h5 className="modal-title">{endpoint.name} - Ping Geçmişi</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body p-0">
                        {loading ? (
                            <div className="text-center py-4">Veriler yükleniyor...</div>
                        ) : history.length === 0 ? (
                            <div className="text-center py-4 text-muted">Henüz geçmiş kaydı bulunmuyor.</div>
                        ) : (
                            <table className="table table-striped table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>Tarih / Saat</th>
                                        <th>Durum</th>
                                        <th>Tepki Süresi</th>
                                        <th>HTTP Kod</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((record, index) => (
                                        <tr key={index}>
                                            <td>{new Date(record.checkedAt).toLocaleString('tr-TR')}</td>
                                            <td>
                                                <span className={`badge ${record.isSuccess ? 'bg-success' : 'bg-danger'}`}>
                                                    {record.isSuccess ? 'Başarılı' : 'Hata'}
                                                </span>
                                            </td>
                                            <td>{record.responseTime} ms</td>
                                            <td>{record.statusCode}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Kapat</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PingHistoryModal;
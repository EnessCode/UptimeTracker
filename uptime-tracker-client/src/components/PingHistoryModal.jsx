import { useState, useEffect } from 'react';
import { endpointService } from '../services/endpointService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PingHistoryModal = ({ endpoint, onClose }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await endpointService.getEndpointHistory(endpoint.id);

                console.log("Backend'den Gelen Geçmiş Verisi:", data);

                const chartData = data.reverse().map(item => {
                    const pingValue = item.responseTimeInMilliseconds
                        ?? item.responseTimeInMs
                        ?? item.ResponseTimeInMilliseconds
                        ?? item.responseTime
                        ?? 0;

                    return {
                        time: new Date(item.checkedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        ping: pingValue,
                        isSuccess: item.isSuccess
                    };
                });

                setHistory(chartData);
            } catch (error) {
                console.error("Geçmiş verisi alınamadı:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [endpoint.id]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border rounded p-3 shadow-sm">
                    <p className="mb-1 fw-bold text-secondary">{label}</p>
                    <p className="mb-0 text-primary fw-bold" style={{ fontSize: '1.1rem' }}>
                        Gecikme: {payload[0].value} ms
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(3px)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                    <div className="modal-header bg-light border-bottom-0 pt-4 px-4">
                        <div>
                            <h5 className="modal-title fw-bold text-dark mb-1">{endpoint.name}</h5>
                            <span className="text-muted" style={{ fontSize: '0.85rem' }}>Son 50 Ping Kaydı</span>
                        </div>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body p-4 pt-2">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : history.length === 0 ? (
                            <div className="text-center py-5 text-muted">
                                Henüz bu servis için toplanmış ping verisi bulunmuyor.
                            </div>
                        ) : (
                            <div style={{ width: '100%', height: 350 }}>
                                <ResponsiveContainer>
                                    <LineChart data={history} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                        <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                                        <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line
                                            type="monotone"
                                            dataKey="ping"
                                            stroke="#0d6efd"
                                            strokeWidth={3}
                                            dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#0d6efd' }}
                                            activeDot={{ r: 7, fill: '#0d6efd', stroke: '#fff', strokeWidth: 2 }}
                                            animationDuration={1000}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PingHistoryModal;
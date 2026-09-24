import { endpointService } from '../services/endpointService';

const EndpointRow = ({ endpoint, onShowHistory, onDelete }) => {
    const getStatusBadgeClass = (status) => {
        if (status === 'Online') return 'status-pulse-success badge rounded-pill px-3 py-2';
        if (status === 'Offline') return 'status-pulse-danger badge rounded-pill px-3 py-2';
        return 'badge bg-warning text-dark rounded-pill px-3 py-2';
    };

    const handleToggle = async () => {
        try {
            await endpointService.toggleActive(endpoint.id);
        } catch (error) {
            alert("Durum değiştirilirken hata oluştu.");
        }
    };

    return (
        <tr className="modern-row align-middle">
            <td className="fw-bold px-4">{endpoint.name}</td>
            <td>
                <a href={endpoint.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-muted">
                    {endpoint.url}
                </a>
            </td>
            <td><span className="badge bg-light text-dark border">{endpoint.checkIntervalInMinutes} Dk.</span></td>
            <td>
                <span className={getStatusBadgeClass(endpoint.status)}>
                    {endpoint.status}
                </span>
            </td>
            <td className="py-3">
                <button
                    className="btn btn-sm btn-light border-secondary text-secondary me-2 rounded-pill px-3 fw-medium"
                    onClick={() => onShowHistory(endpoint)}
                >
                    Geçmiş
                </button>
                <button
                    className={`btn btn-sm me-2 rounded-pill px-3 fw-medium ${endpoint.isActive ? 'btn-outline-warning' : 'btn-outline-success'}`}
                    onClick={handleToggle}
                >
                    {endpoint.isActive ? 'Duraklat' : 'Başlat'}
                </button>
                <button
                    className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-medium"
                    onClick={() => onDelete(endpoint.id)}
                >
                    Sil
                </button>
            </td>
        </tr>
    );
};

export default EndpointRow;
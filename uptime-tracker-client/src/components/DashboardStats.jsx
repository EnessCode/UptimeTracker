const DashboardStats = ({ endpoints }) => {
    const total = endpoints.length;

    const onlineCount = endpoints.filter(e => {
        const s = e.status?.toString().toLowerCase();
        return s === 'online' || s === '1';
    }).length;

    const offlineCount = endpoints.filter(e => {
        const s = e.status?.toString().toLowerCase();
        return s === 'offline' || s === '2';
    }).length;

    const pendingCount = total - (onlineCount + offlineCount);

    return (
        <div className="row g-3 mb-4">
            <div className="col-md-3">
                <div className="card shadow-sm border-0 bg-primary text-white rounded-4 h-100">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center py-4">
                        <h6 className="text-uppercase fw-bold text-white-50 mb-2" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Toplam Servis</h6>
                        <h2 className="mb-0 display-5 fw-bold">{total}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm border-0 bg-success text-white rounded-4 h-100">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center py-4">
                        <h6 className="text-uppercase fw-bold text-white-50 mb-2" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Online (Aktif)</h6>
                        <h2 className="mb-0 display-5 fw-bold">{onlineCount}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm border-0 bg-danger text-white rounded-4 h-100">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center py-4">
                        <h6 className="text-uppercase fw-bold text-white-50 mb-2" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Offline (Hatalı)</h6>
                        <h2 className="mb-0 display-5 fw-bold">{offlineCount}</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card shadow-sm border-0 bg-warning text-dark rounded-4 h-100">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center py-4">
                        <h6 className="text-uppercase fw-bold text-dark-50 mb-2 opacity-75" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Bekliyor</h6>
                        <h2 className="mb-0 display-5 fw-bold">{pendingCount}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
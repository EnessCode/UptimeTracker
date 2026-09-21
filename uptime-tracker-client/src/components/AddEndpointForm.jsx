import { useState } from 'react';
import { endpointService } from '../services/endpointService';

const AddEndpointForm = ({ onEndpointAdded }) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [checkIntervalInMinutes, setCheckIntervalInMinutes] = useState(5);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await endpointService.createEndpoint({
                name,
                url,
                checkIntervalInMinutes: Number(checkIntervalInMinutes)
            });

            setName('');
            setUrl('');
            setCheckIntervalInMinutes(5);

            if (onEndpointAdded) onEndpointAdded();

        } catch (error) {
            console.error("Endpoint eklenirken hata oluştu:", error);
            alert("Kayıt sırasında bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-white">
                <h5 className="mb-0">Yeni Servis Ekle</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Servis Adı</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Örn: Google API"
                        />
                    </div>
                    <div className="col-md-5">
                        <label className="form-label">URL</label>
                        <input
                            type="url"
                            className="form-control"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                            placeholder="https://api.google.com"
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Aralık (Dk)</label>
                        <input
                            type="number"
                            className="form-control"
                            value={checkIntervalInMinutes}
                            onChange={(e) => setCheckIntervalInMinutes(e.target.value)}
                            required
                            min="1"
                        />
                    </div>
                    <div className="col-12 text-end">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Ekleniyor...' : 'Kaydet'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEndpointForm;
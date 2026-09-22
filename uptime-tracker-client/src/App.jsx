import { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import 'bootstrap/dist/css/bootstrap.min.css';
import EndpointList from './components/EndpointList';
import AddEndpointForm from './components/AddEndpointForm';

function App() {
  const [refreshCount, setRefreshCount] = useState(0);

  const handleEndpointAdded = () => {
    setRefreshCount(prev => prev + 1);
  };

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5052/uptime-hub")
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveUpdate", () => {
      console.log("Arka plandan yeni ping sonucu geldi! Tablo güncelleniyor...");
      setRefreshCount(prev => prev + 1);
    });

    connection.start()
      .then(() => console.log("SignalR bağlantısı başarıyla kuruldu!"))
      .catch(err => console.error("SignalR bağlantı hatası:", err));

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-4">Uptime Tracker Panosu</h1>

      <AddEndpointForm onEndpointAdded={handleEndpointAdded} />

      <EndpointList refreshTrigger={refreshCount} />
    </div>
  );
}

export default App;
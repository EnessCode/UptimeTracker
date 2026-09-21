import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EndpointList from './components/EndpointList';
import AddEndpointForm from './components/AddEndpointForm';

function App() {
  const [refreshCount, setRefreshCount] = useState(0);

  const handleEndpointAdded = () => {
    setRefreshCount(prev => prev + 1);
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-4">Uptime Tracker Panosu</h1>

      <AddEndpointForm onEndpointAdded={handleEndpointAdded} />

      <EndpointList refreshTrigger={refreshCount} />
    </div>
  );
}

export default App;
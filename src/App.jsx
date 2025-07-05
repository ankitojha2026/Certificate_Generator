import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Certificate from './components/Certificate';
import Verify from './components/Verify';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </div>
  );
}

export default App;
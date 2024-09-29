import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import TopPage from './pages/TopPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import StampRallyPage from './pages/StampRallyPage';
import GenerateRoutePage from './pages/GenerateRoutePage';
import SpotListPage from './pages/SpotListPage';
import SpotDetailPage from './pages/SpotDetailPage';
import QRCodeScanPage from './pages/QRCodeScanPage';
import PastStampRalliesPage from './pages/PastStampRalliesPage';
import StampRallyDetailPage from './pages/StampRallyDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} /> 
          <Route path="/stamp_rally" element={<StampRallyPage />} />
          <Route path="/generate_route" element={<GenerateRoutePage />} />
          <Route path="/spots" element={<SpotListPage />} />
          <Route path="/spot_detail/:spotId" element={<SpotDetailPage />} />
          <Route path="/qr-scan" element={<QRCodeScanPage />} />
          <Route path="/past_stamp_rally" element={<PastStampRalliesPage />} />
          <Route path="/stamp-rally/:id" element={<StampRallyDetailPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

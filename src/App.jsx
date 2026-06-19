import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import CustomerView from './pages/CustomerView';
import KitchenView from './pages/KitchenView';
import AdminView from './pages/AdminView';
import SimulatorView from './pages/SimulatorView';
import TvDisplayView from './pages/TvDisplayView';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/customer" element={<CustomerView defaultTable={5} isEmbedded={false} />} />
          <Route path="/kitchen" element={<KitchenView />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/simulator" element={<SimulatorView />} />
          <Route path="/tv-display" element={<TvDisplayView />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

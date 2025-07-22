// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; 
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { EnvironmentProvider, useEnvironment } from './environments/EnvironmentContext';
import EnvironmentSwitcherButton from './components/EnvironmentSwitcherButton';

const AppContent: React.FC = () => {
  const { currentEnvironment } = useEnvironment();


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Añade más rutas aquí según necesites */}
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        transition={Slide}
        limit={10}
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        closeButton
      />
      {}
      <EnvironmentSwitcherButton />
    </>
  );
};

function App() {
  return (
    <EnvironmentProvider>
      <AppContent />
    </EnvironmentProvider>
  );
}

export default App;
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Debug from './pages/Debug.jsx';
import { AuthProvider, useAuth } from './auth/AuthContext.jsx';
import './styles.css';

function Guard({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="loading-shell">
        <div className="loading-spinner" />
        <p>Зареждане...</p>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function Root() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Guard><App /></Guard>} />
          <Route path="/login" element={<Login />} />
          <Route path="/debug" element={<Debug />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

createRoot(document.getElementById('root')).render(<Root />);

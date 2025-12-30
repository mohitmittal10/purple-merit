import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Button from './components/UI/Button';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-light min-h-screen flex items-center justify-center px-4">
      <div style={{ textAlign: 'center', maxWidth: '32rem' }}>
        {user ? (
          <>
            <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(135deg, #7c3aed, #6366f1)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Welcome, {user.full_name}!
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem' }}>
              You're logged in to Purple Merit
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/profile">
                <Button variant="primary">
                  Go to Profile
                </Button>
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin">
                  <Button variant="secondary">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(135deg, #7c3aed, #6366f1)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Welcome to Purple Merit
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '1rem' }}>
              A comprehensive user management platform
            </p>
            <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
              Manage users efficiently with our powerful admin dashboard
            </p>
            <Link to="/login">
              <Button variant="primary" style={{ fontSize: '1rem' }}>
                Get Started
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes - Authenticated Users */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected Routes - Admin Only */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Home Route */}
          <Route 
            path="/" 
            element={<Home />}
          />

          {/* Error Routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
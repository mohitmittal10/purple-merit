import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span>👑</span>
          Purple Merit
        </Link>
        
        <div className="navbar-menu">
          {user ? (
            <>
              {hasRole('admin') && (
                <span className="navbar-badge">ADMIN</span>
              )}
              
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                {hasRole('admin') && (
                  <Link to="/admin" className="navbar-link">
                    <span>📊</span>
                    Dashboard
                  </Link>
                )}
                
                <Link to="/profile" className="navbar-link">
                  <span>👤</span>
                  Profile
                </Link>
              </div>

              <div className="navbar-dropdown">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="btn-secondary"
                  style={{ color: 'white', backgroundColor: '#9333ea', borderColor: '#9333ea' }}
                >
                  {user.full_name}
                  <span>▼</span>
                </button>

                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <p style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{user.full_name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>{user.email}</p>
                      <p style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 'bold', marginTop: '0.5rem' }}>Role: {user.role}</p>
                    </div>
                    
                    <Link 
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      👤 My Profile
                    </Link>

                    {hasRole('admin') && (
                      <Link 
                        to="/admin"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        📊 Admin Dashboard
                      </Link>
                    )}
                    
                    <button 
                      onClick={handleLogout}
                      className="dropdown-item"
                      style={{ color: '#ef4444', borderTop: '1px solid #e5e7eb' }}
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/signup" className="btn-primary">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
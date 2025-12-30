import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const UserProfile = () => {
  const [user, setUser] = useState({ full_name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/profile').then(res => {
      setUser({ ...res.data, password: '' });
      setLoading(false);
    });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', user);
      toast.success("Profile updated!");
      setUser({ ...user, password: '' });
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if(loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-light">
      <div style={{ textAlign: 'center' }}>
        <div className="spinner"></div>
        <p style={{ marginTop: '1rem', color: '#6b7280', fontWeight: '500' }}>Loading your profile...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-light min-h-screen py-12 px-4">
      <div className="container" style={{ maxWidth: '32rem' }}>
        <div className="card">
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>My Profile</h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Update your account information</p>
          
          <form onSubmit={handleUpdate}>
            <Input 
              type="text"
              label="Full Name"
              value={user.full_name} 
              onChange={e => setUser({...user, full_name: e.target.value})}
            />
            
            <Input 
              type="email"
              label="Email"
              value={user.email} 
              onChange={e => setUser({...user, email: e.target.value})}
            />
            
            <div className="form-group">
              <label>New Password</label>
              <p className="hint-text">Leave blank to keep your current password</p>
              <input 
                type="password"
                placeholder="••••••••"
                value={user.password} 
                onChange={e => setUser({...user, password: e.target.value})}
              />
            </div>
            
            <button type="submit" className="btn-primary btn-lg w-full" style={{ marginTop: '2rem' }}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
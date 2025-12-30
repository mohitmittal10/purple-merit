import { useState } from 'react';
import api from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const Signup = () => {
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword) return toast.error("Passwords do not match");
    if(formData.password.length < 6) return toast.error("Password too weak (min 6 chars)");

    try {
      await api.post('/auth/signup', formData);
      toast.success("Signup Successful! Please login.");
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="bg-gradient-light min-h-screen flex justify-center items-center py-12 px-4">
      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: '28rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Create Account</h2>
          <p style={{ color: '#6b7280' }}>Join our community today</p>
        </div>
        
        <div>
          <Input 
            type="text" 
            placeholder="John Doe" 
            required 
            label="Full Name"
            onChange={e => setFormData({...formData, full_name: e.target.value})}
          />
          
          <Input 
            type="email" 
            placeholder="your@email.com" 
            required 
            label="Email"
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          
          <Input 
            type="password" 
            placeholder="••••••••" 
            required 
            label="Password"
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
          
          <Input 
            type="password" 
            placeholder="••••••••" 
            required 
            label="Confirm Password"
            onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
          />
        </div>
        
        <button type="submit" className="btn-primary btn-lg w-full" style={{ marginTop: '2rem' }}>
          Create Account
        </button>
        
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#7c3aed', fontWeight: '600' }}>Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
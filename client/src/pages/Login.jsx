import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast.success("Login Successful");
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-gradient-light min-h-screen flex justify-center items-center py-12 px-4">
      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: '28rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p style={{ color: '#6b7280' }}>Sign in to your account</p>
        </div>
        
        <div>
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
        </div>
        
        <button type="submit" className="btn-primary btn-lg w-full" style={{ marginTop: '2rem' }}>
          Sign In
        </button>
        
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#7c3aed', fontWeight: '600' }}>Create one</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
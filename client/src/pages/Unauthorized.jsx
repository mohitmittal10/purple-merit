import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Unauthorized = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
        <div className="text-6xl">🔒</div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Unauthorized</h1>
          <p className="text-gray-600">
            You don't have permission to access this resource.
          </p>
        </div>

        {user && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-left">
            <p className="text-gray-700">
              <span className="font-semibold">Current Role:</span> {user.role}
            </p>
          </div>
        )}

        <div className="space-y-3 pt-4">
          <Link 
            to="/" 
            className="block w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            Return to Home
          </Link>
          
          {user && (
            <Link 
              to="/profile" 
              className="block w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              View Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

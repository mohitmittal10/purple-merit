import { useEffect, useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import Pagination from '../components/UI/Pagination';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/users/admin/users?page=${page}&limit=10`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => { fetchUsers(); }, [page]);

  const handleToggleStatus = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const confirmToggleStatus = async () => {
    const newStatus = selectedUser.status === 'active' ? 'inactive' : 'active';
    try {
      await api.put(`/users/admin/users/${selectedUser.user_id}/status`, { status: newStatus });
      toast.success(`User updated to ${newStatus}`);
      fetchUsers();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="bg-gradient-light min-h-screen py-12 px-4">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Admin Dashboard</h1>
          <p className="section-subtitle">Manage all users and their status</p>
        </div>
        
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map(u => (
                  <tr key={u.user_id}>
                    <td style={{ fontWeight: '500' }}>{u.email}</td>
                    <td>{u.full_name}</td>
                    <td>
                      <span className={`badge ${u.role === 'admin' ? 'badge-warning' : 'badge-info'}`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                        {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {u.role !== 'admin' && (
                        <button 
                          onClick={() => handleToggleStatus(u)}
                          className={u.status === 'active' ? 'btn-destructive' : 'btn-primary'}
                          style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}
                        >
                          {u.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      )}
                      {u.role === 'admin' && (
                        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Admin</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmToggleStatus}
        title="Confirm Status Change"
        message={`Are you sure you want to make ${selectedUser?.full_name} ${selectedUser?.status === 'active' ? 'inactive' : 'active'}?`}
      />
    </div>
  );
};

export default AdminDashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SubscriptionForm from '../components/SubscriptionForm'; // Adjust path as needed
import AddUser from '../components/AddUser'; // Adjust path as needed

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', plan: '', status: '' });

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1e 0%, #141c2e 100%)',
      color: 'white',

      padding: '100px 24px 24px 24px',

      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '20px',
      width: 'fit-content'
    },
    title: {
      fontSize: '32px',
      fontWeight: '800',
      margin: '0 0 24px 0',
      background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      paddingBottom: '16px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    healthCard: {
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '28px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      marginTop: '20px'
    },
    healthTitle: {
      fontSize: '20px',
      fontWeight: '700',
      margin: '0 0 20px 0',
      color: '#f1f5f9',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    healthGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '30px'
    },
    adminHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '20px',
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(10px)',
      padding: '20px',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    },
    adminActions: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    },
    adminBtn: (color) => ({
      background: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.1)`,
      border: `1px solid ${color}40`,
      color: color,
      padding: '12px 20px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }),
    userTable: {
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '24px',
      marginTop: '30px',
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '16px 0',
      textAlign: 'left',
      color: '#94a3b8',
      fontWeight: '600',
      fontSize: '14px'
    },
    tableRow: {
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'background 0.3s ease'
    },
    tableCell: {
      padding: '16px 0',
      color: '#e2e8f0',
      fontSize: '14px'
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-block'
    },
    activeStatus: {
      background: 'rgba(34, 197, 94, 0.15)',
      color: '#22c55e',
      border: '1px solid rgba(34, 197, 94, 0.3)'
    },
    inactiveStatus: {
      background: 'rgba(239, 68, 68, 0.15)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.3)'
    },
    premiumBadge: {
      background: 'rgba(139, 92, 246, 0.15)',
      color: '#8b5cf6',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
    },
    basicBadge: {
      background: 'rgba(59, 130, 246, 0.15)',
      color: '#3b82f6',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600'
    }
  };

  const statsData = [
    { title: "Total Users", value: "1,542", change: "+12%", icon: "👥" },
    { title: "Active Alerts", value: "4,892", change: "+8%", icon: "🔔" },
    { title: "Alerts Triggered", value: "2,345", change: "+24%", icon: "⚡" },
    { title: "API Requests", value: "1.2M", change: "+15%", icon: "🔄" }
  ];


  const [usersData, setUsersData] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", plan: "Premium", alerts: 12, status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", plan: "Basic", alerts: 5, status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", plan: "Premium", alerts: 18, status: "Inactive" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", plan: "Premium", alerts: 25, status: "Active" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", plan: "Basic", alerts: 3, status: "Active" }
  ]);


  const handleEditUser = () => {
    if (!selectedUser) {
      toast.error('Please select a user first', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setEditFormData({ name: selectedUser.name, email: selectedUser.email, plan: selectedUser.plan, status: selectedUser.status });
    setShowEditModal(true);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) {
      toast.error('Please select a user first', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setShowDeleteModal(true);
  };

  const handleSaveEdit = () => {

    setUsersData(prev => prev.map(user =>
      user.id === selectedUser.id
        ? { ...user, ...editFormData }
        : user
    ));
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    setUsersData(prev => prev.filter(user => user.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const adminActions = [

    {
      label: 'Add Subscription Plan',
      action: () => setShowSubscriptionForm(true),
      icon: '📋',
      color: '#10b981'
    },
    // { 
    //   label: 'Add User', 
    //   action: () => setShowAddUserForm(true),
    //   icon: '👤',
    //   color: '#3b82f6'
    // },
    // { 
    //   label: 'Refresh', 
    //   action: () => alert('Refreshing...'),
    //   icon: '🔄',
    //   color: '#f59e0b'
    // },

    {
      label: 'Edit User',
      action: handleEditUser,
      icon: '✏️',
      color: '#3b82f6'
    },
    {
      label: 'Delete User',
      action: handleDeleteUser,
      icon: '🗑️',
      color: '#ef4444'
    },
  ];

  return (
    <>
      <NavBar />
      <div style={styles.container}>


        {/* Header */}
        <div style={styles.adminHeader}>
          <div>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>
              Monitor system performance and manage users
            </p>
          </div>
          <div style={styles.adminActions}>
            {adminActions.map((btn, index) => (
              <button
                key={index}
                style={styles.adminBtn(btn.color)}
                onClick={btn.action}
                onMouseEnter={(e) => {
                  e.target.style.background = `${btn.color}20`;
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 8px 20px ${btn.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = `rgba(${parseInt(btn.color.slice(1, 3), 16)}, ${parseInt(btn.color.slice(3, 5), 16)}, ${parseInt(btn.color.slice(5, 7), 16)}, 0.1)`;
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <span>{btn.icon}</span>
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* STAT CARDS */}
        <div style={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '24px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  {stat.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0' }}>{stat.title}</p>
                  <p style={{
                    fontSize: '32px',
                    fontWeight: '800',
                    margin: '4px 0 0 0',
                    background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {stat.value}
                  </p>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: '600',
                padding: '4px 12px',
                borderRadius: '20px',
                background: 'rgba(34, 197, 94, 0.15)',
                color: '#22c55e',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                width: 'fit-content'
              }}>
                <span>↗</span>
                <span>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>



        {/* USER MANAGEMENT TABLE */}
        <div style={styles.userTable}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={styles.healthTitle}>User Management</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Search users..."
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  minWidth: '200px'
                }}
              />
              <select
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Plans</option>
                <option value="premium">Premium</option>
                <option value="basic">Basic</option>
              </select>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Name</th>
                  <th style={styles.tableHeader}>Email</th>
                  <th style={styles.tableHeader}>Plan</th>
                  <th style={styles.tableHeader}>Alerts</th>
                  <th style={styles.tableHeader}>Status</th>

                </tr>
              </thead>
              <tbody>
                {usersData.map((user) => (
                  <tr
                    key={user.id}
                    style={{
                      ...styles.tableRow,
                      background: selectedUser?.id === user.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedUser(user)}
                    onMouseEnter={(e) => {
                      if (selectedUser?.id !== user.id) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedUser?.id !== user.id) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <td style={styles.tableCell}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '600'
                        }}>
                          {user.name.charAt(0)}
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td style={styles.tableCell}>{user.email}</td>
                    <td style={styles.tableCell}>
                      <span style={user.plan === 'Premium' ? styles.premiumBadge : styles.basicBadge}>
                        {user.plan}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{ fontWeight: '600' }}>{user.alerts}</span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{
                        ...styles.statusBadge,
                        ...(user.status === 'Active' ? styles.activeStatus : styles.inactiveStatus)
                      }}>
                        {user.status}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        </div>

        {/* Modals - USING YOUR EXTERNAL COMPONENTS */}
        {showSubscriptionForm && (
          <SubscriptionForm
            onClose={() => setShowSubscriptionForm(false)}
            onSubmit={(plan) => {
              console.log('New plan created:', plan);
              setShowSubscriptionForm(false);
              toast.success('Subscription plan created successfully!', {
                theme: "dark"
              });
            }}
          />
        )}

        {/* Edit User Modal */}
        {showEditModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '30px',
              width: '450px',
              maxWidth: '90vw'
            }}>
              <h3 style={{ margin: '0 0 20px 0', color: 'white', fontSize: '20px', fontWeight: '700' }}>Edit User</h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '14px' }}>Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '14px' }}>Email</label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, email: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '14px' }}>Plan</label>
                <select
                  value={editFormData.plan}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, plan: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#94a3b8', fontSize: '14px' }}>Status</label>
                <select
                  value={editFormData.status}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, status: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowEditModal(false)}
                  style={{
                    padding: '10px 20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '20px',
              padding: '30px',
              width: '400px',
              maxWidth: '90vw',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
              <h3 style={{ margin: '0 0 12px 0', color: 'white', fontSize: '20px', fontWeight: '700' }}>Delete User</h3>
              <p style={{ margin: '0 0 24px 0', color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>
                Are you sure you want to delete <strong style={{ color: 'white' }}>{selectedUser?.name}</strong>? This action cannot be undone.
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  style={{
                    padding: '10px 20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer />

    </>
  );
}
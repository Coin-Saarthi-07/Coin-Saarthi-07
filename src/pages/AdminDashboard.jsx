
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SubscriptionForm from '../components/SubscriptionForm'; // Adjust path as needed
import AddUser from '../components/AddUser'; // Adjust path as needed

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
      padding: '24px',
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

  const healthData = [
    { label: "Price API", status: "Active", isHealthy: true },
    { label: "Email Service", status: "Active", isHealthy: true },
    { label: "SMS Service", status: "Active", isHealthy: true },
    { label: "Alert Engine", status: "Active", isHealthy: true },
    { label: "Database", status: "Active", isHealthy: true },
    { label: "Server Load", status: "Normal", isHealthy: true }
  ];

  const [usersData, setUsersData] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", plan: "Premium", alerts: 12, status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", plan: "Basic", alerts: 5, status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", plan: "Premium", alerts: 18, status: "Inactive" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", plan: "Premium", alerts: 25, status: "Active" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", plan: "Basic", alerts: 3, status: "Active" }
  ]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditFormData({ name: user.name, email: user.email, plan: user.plan, status: user.status });
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
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
      label: 'Export Data', 
      action: () => alert('Exporting...'),
      icon: '📊',
      color: '#8b5cf6'
    }
  ];

  return (
    <>
      <NavBar />
      <div style={styles.container}>
      {/* Back Button */}
      <button 
        style={{...styles.backButton, marginTop: '80px'}}
        onClick={() => navigate('/')}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Dashboard
      </button>

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

      {/* SYSTEM HEALTH & USER MANAGEMENT */}
      <div style={styles.healthGrid}>
        {/* System Health */}
        <div style={styles.healthCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <h2 style={styles.healthTitle}>System Health</h2>
          </div>
          
          {healthData.map((item, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                marginBottom: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: item.isHealthy ? '#22c55e' : '#ef4444',
                  boxShadow: item.isHealthy ? '0 0 8px rgba(34, 197, 94, 0.5)' : '0 0 8px rgba(239, 68, 68, 0.5)'
                }}></div>
                <span style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>{item.label}</span>
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                padding: '4px 12px',
                borderRadius: '20px',
                background: item.isHealthy ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: item.isHealthy ? '#22c55e' : '#ef4444',
                border: `1px solid ${item.isHealthy ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
              }}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div style={styles.healthCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 style={styles.healthTitle}>Recent Activity</h2>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            {[
              { time: '2 min ago', activity: 'User "John Doe" created alert for BTC @ $65,000', type: 'alert' },
              { time: '15 min ago', activity: 'New user registered: alice@example.com', type: 'user' },
              { time: '30 min ago', activity: 'Alert triggered: ETH reached $3,700', type: 'trigger' },
              { time: '1 hour ago', activity: 'User upgraded to Premium plan', type: 'upgrade' },
              { time: '2 hours ago', activity: 'System backup completed successfully', type: 'system' }
            ].map((item, index) => (
              <div 
                key={index}
                style={{
                  padding: '16px',
                  marginBottom: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  borderLeft: `4px solid ${
                    item.type === 'alert' ? '#3b82f6' :
                    item.type === 'user' ? '#8b5cf6' :
                    item.type === 'trigger' ? '#ef4444' :
                    item.type === 'upgrade' ? '#22c55e' : '#f59e0b'
                  }`
                }}
              >
                <p style={{ fontSize: '14px', color: '#e2e8f0', margin: '0 0 4px 0' }}>{item.activity}</p>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0' }}>{item.time}</p>
              </div>
            ))}
          </div>
        </div>
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
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr 
                  key={user.id} 
                  style={styles.tableRow}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
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
                  <td style={styles.tableCell}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleEditUser(user)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                          e.target.style.borderColor = '#3b82f6';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                          color: '#ef4444',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                          e.target.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <span style={{ fontSize: '14px', color: '#94a3b8' }}>
            Showing 1-5 of 1,542 users
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              ← Previous
            </button>
            <button 
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                border: 'none',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Modals - USING YOUR EXTERNAL COMPONENTS */}
      {showSubscriptionForm && (
        <SubscriptionForm
          onClose={() => setShowSubscriptionForm(false)}
          onSubmit={(plan) => {
            console.log('New plan created:', plan);
            setShowSubscriptionForm(false);
            alert('Subscription plan created successfully!');
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
    </>
  );
}
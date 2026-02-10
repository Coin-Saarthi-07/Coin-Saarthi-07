// PaperTradingDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaExchangeAlt, FaChartPie, FaHistory, FaChartLine, FaStar, FaArrowLeft, FaWallet } from 'react-icons/fa';
import PaperTrading from './PaperTrading';
import PortfolioDetail from './PortfolioDetail';
import TransactionHistory from './TransactionHistory';
// import './PaperTradingDashboard.css'; // Removed external CSS

const PaperTradingDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  // Styles Definition
  const styles = {
    dashboard: {
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0b0f1a 0%, #0e1529 100%)',
      position: 'relative',
      fontFamily: "'Segoe UI', sans-serif",
      color: '#fff',
    },
    sidebar: {
      width: '280px',
      background: '#0b0f1a',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 100,
      transition: 'transform 0.3s ease',
      transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
      boxShadow: isMobile ? '4px 0 20px rgba(0, 0, 0, 0.4)' : 'none',
    },
    logo: {
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      borderBottom: '1px solid #334155',
      color: '#fff',
    },
    logoIcon: {
      fontSize: '24px',
      color: '#3b82f6',
    },
    logoH2: {
      fontSize: '20px',
      margin: 0,
      fontWeight: '700',
      background: 'linear-gradient(to right, #60a5fa, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    nav: {
      padding: '24px 16px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    navLink: (active) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '12px 16px',
      color: active ? 'white' : '#94a3b8',
      borderRadius: '8px',
      fontWeight: '500',
      textDecoration: 'none',
      background: active ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'transparent',
      boxShadow: active ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
      transition: 'all 0.2s ease',
    }),
    divider: {
      height: '1px',
      background: '#334155',
      margin: '16px 0',
    },
    backLink: {
      color: '#94a3b8',
    },
    accountSummary: {
      padding: '24px',
      borderTop: '1px solid #334155',
      background: 'rgba(255, 255, 255, 0.02)',
    },
    accountBalance: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '12px',
    },
    balanceLabel: {
      fontSize: '12px',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '4px',
    },
    balanceAmount: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#fff',
    },
    accountPnl: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
    },
    pnlLabel: {
      color: '#94a3b8',
    },
    pnlAmount: {
      fontWeight: '600',
      color: '#10b981',
    },
    mainContent: {
      flex: 1,
      marginLeft: isMobile ? '0' : '280px',
      padding: isMobile ? '80px 16px 16px 16px' : '32px',
      background: '#0f172a',
      minHeight: '100vh',
      width: isMobile ? '100%' : 'calc(100% - 280px)',
    },
    mobileHeader: {
      display: isMobile ? 'flex' : 'none',
      background: '#1e293b',
      padding: '16px',
      alignItems: 'center',
      gap: '16px',
      borderBottom: '1px solid #334155',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 90,
    },
    menuToggle: {
      background: 'none',
      border: 'none',
      color: '#fff',
      fontSize: '24px',
      cursor: 'pointer',
      padding: '4px',
      display: 'flex',
    },
    mobileHeaderH3: {
      margin: 0,
      fontSize: '18px',
      background: 'linear-gradient(to right, #60a5fa, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    sidebarOverlay: {
      display: isMobile ? 'block' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      zIndex: 95,
      backdropFilter: 'blur(4px)',
    },
  };

  return (
    <div style={styles.dashboard}>
      {/* Mobile Header */}
      <div style={styles.mobileHeader}>
        <button style={styles.menuToggle} onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h3 style={styles.mobileHeaderH3}>Paper Trading</h3>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && <div style={styles.sidebarOverlay} onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <FaWallet style={styles.logoIcon} />
          <h2 style={styles.logoH2}>Paper Trading</h2>
        </div>


        <nav style={styles.nav}>
          <Link
            to="/paper-trading/trade"
            style={styles.navLink(isActive('/trade'))}
            onClick={closeSidebar}
          >
            <FaExchangeAlt style={{ fontSize: '18px' }} />
            <span>Trade</span>
          </Link>

          <Link
            to="/paper-trading/portfolio"
            style={styles.navLink(isActive('/portfolio'))}
            onClick={closeSidebar}
          >
            <FaChartPie style={{ fontSize: '18px' }} />
            <span>Portfolio</span>
          </Link>

          <Link
            to="/paper-trading/transactions"
            style={styles.navLink(isActive('/transactions'))}
            onClick={closeSidebar}
          >
            <FaHistory style={{ fontSize: '18px' }} />
            <span>Transactions</span>
          </Link>

          <div style={styles.divider}></div>

          <Link
            to="/dashboard"
            style={{ ...styles.navLink(false), ...styles.backLink }}
          >
            <FaArrowLeft style={{ fontSize: '18px' }} />
            <span>Back to Dashboard</span>
          </Link>
        </nav>

        {/* Account Summary */}
        <div style={styles.accountSummary}>
          <div style={styles.accountBalance}>
            <span style={styles.balanceLabel}>Virtual Balance</span>
            <span style={styles.balanceAmount}>$1,00,000.00</span>
          </div>
          <div style={styles.accountPnl}>
            <span style={styles.pnlLabel}>Total P&L</span>
            <span style={styles.pnlAmount}>+$8,456.23</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Navigate to="trade" replace />} />
          <Route path="trade" element={<PaperTrading />} />
          <Route path="portfolio" element={<PortfolioDetail />} />
          <Route path="transactions" element={<TransactionHistory />} />
          <Route path="*" element={<Navigate to="trade" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default PaperTradingDashboard;

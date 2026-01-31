import { useState } from 'react';

export default function AlertPanel() {
  const [selectedCrypto, setSelectedCrypto] = useState('btc');
  const [alertType, setAlertType] = useState('low');
  const [targetPrice, setTargetPrice] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const styles = {
    container: {
      background: 'rgba(30, 41, 59, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '28px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      minWidth: '320px'
    },
    title: {
      fontSize: '22px',
      fontWeight: '700',
      marginBottom: '24px',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    label: {
      display: 'block',
      color: '#94a3b8',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '8px'
    },
    select: {
      width: '100%',
      background: 'rgba(15, 23, 42, 0.8)',
      color: '#ffffff',
      padding: '14px',
      borderRadius: '12px',
      border: '2px solid #334155',
      marginBottom: '20px',
      fontSize: '15px',
      outline: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    input: {
      width: '100%',
      background: 'rgba(15, 23, 42, 0.8)',
      color: '#ffffff',
      padding: '14px',
      borderRadius: '12px',
      border: '2px solid #334155',
      marginBottom: '24px',
      fontSize: '15px',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
      color: '#ffffff',
      padding: '16px',
      borderRadius: '12px',
      border: 'none',
      fontWeight: '600',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    icon: {
      width: '20px',
      height: '20px'
    },
    helperText: {
      fontSize: '12px',
      color: '#64748b',
      marginTop: '12px',
      textAlign: 'center'
    },
    focusEffect: {
      borderColor: '#8b5cf6',
      boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.2)'
    },
    activeAlertType: {
      low: {
        background: 'rgba(239, 68, 68, 0.2)',
        borderColor: '#ef4444',
        color: '#fca5a5'
      },
      high: {
        background: 'rgba(34, 197, 94, 0.2)',
        borderColor: '#22c55e',
        color: '#86efac'
      }
    }
  };

  const handleFocus = (e) => {
    Object.assign(e.target.style, styles.focusEffect);
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '#334155';
    e.target.style.boxShadow = 'none';
  };

  const handleCreateAlert = () => {
    if (!targetPrice) {
      alert('Please enter a target price');
      return;
    }
    
    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Alert created! You'll be notified when ${selectedCrypto.toUpperCase()} reaches $${targetPrice}`);
      setIsCreating(false);
      setTargetPrice('');
    }, 1000);
  };

  const handleMouseEnter = (e) => {
    if (!isCreating) {
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 10px 25px rgba(139, 92, 246, 0.3)';
    }
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = 'none';
  };

  const cryptoOptions = [
    { value: 'btc', label: 'Bitcoin (BTC)', icon: '₿' },
    { value: 'eth', label: 'Ethereum (ETH)', icon: 'Ξ' },
    { value: 'sol', label: 'Solana (SOL)', icon: '◎' },
    { value: 'ada', label: 'Cardano (ADA)', icon: 'A' },
    { value: 'doge', label: 'Dogecoin (DOGE)', icon: 'Ð' }
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        Create Price Alert
      </h2>

      <div>
        <label style={styles.label}>Select Cryptocurrency</label>
        <select 
          style={styles.select}
          value={selectedCrypto}
          onChange={(e) => setSelectedCrypto(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={(e) => e.target.style.borderColor = '#475569'}
          onMouseLeave={(e) => e.target.style.borderColor = '#334155'}
        >
          {cryptoOptions.map((crypto) => (
            <option 
              key={crypto.value} 
              value={crypto.value}
              style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
            >
              {crypto.icon} {crypto.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={styles.label}>Alert Type</label>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <button
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: '2px solid',
              background: alertType === 'low' ? styles.activeAlertType.low.background : 'transparent',
              borderColor: alertType === 'low' ? styles.activeAlertType.low.borderColor : '#334155',
              color: alertType === 'low' ? styles.activeAlertType.low.color : '#94a3b8',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setAlertType('low')}
          >
            Low Price Alert
          </button>
          <button
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: '2px solid',
              background: alertType === 'high' ? styles.activeAlertType.high.background : 'transparent',
              borderColor: alertType === 'high' ? styles.activeAlertType.high.borderColor : '#334155',
              color: alertType === 'high' ? styles.activeAlertType.high.color : '#94a3b8',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setAlertType('high')}
          >
            High Price Alert
          </button>
        </div>
      </div>

      <div>
        <label style={styles.label}>Target Price (USD)</label>
        <input
          type="number"
          placeholder="Enter target price (e.g., 65000)"
          style={styles.input}
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={(e) => e.target.style.borderColor = '#475569'}
          onMouseLeave={(e) => e.target.style.borderColor = '#334155'}
        />
      </div>

      <button 
        style={{
          ...styles.button,
          opacity: isCreating ? 0.7 : 1,
          cursor: isCreating ? 'not-allowed' : 'pointer'
        }}
        onClick={handleCreateAlert}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={isCreating}
      >
        {isCreating ? (
          <>
            <svg style={{ ...styles.icon, animation: 'spin 1s linear infinite' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Alert...
          </>
        ) : (
          <>
            <svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Create Alert
          </>
        )}
      </button>

      <p style={styles.helperText}>
        You'll receive a notification when the price reaches your target
      </p>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
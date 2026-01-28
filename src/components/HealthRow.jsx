export function HealthRow({ label, status, isHealthy = true }) {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      marginBottom: '8px',
      background: 'rgba(15, 23, 42, 0.4)',
      borderRadius: '12px',
      transition: 'all 0.3s ease'
    },
    label: {
      fontSize: '14px',
      color: '#e2e8f0',
      fontWeight: '500'
    },
    status: {
      fontSize: '14px',
      fontWeight: '600',
      padding: '4px 12px',
      borderRadius: '20px'
    },
    healthy: {
      background: 'rgba(34, 197, 94, 0.15)',
      color: '#22c55e',
      border: '1px solid rgba(34, 197, 94, 0.3)'
    },
    warning: {
      background: 'rgba(245, 158, 11, 0.15)',
      color: '#f59e0b',
      border: '1px solid rgba(245, 158, 11, 0.3)'
    },
    critical: {
      background: 'rgba(239, 68, 68, 0.15)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.3)'
    }
  };

  const getStatusStyle = () => {
    if (isHealthy === true) return styles.healthy;
    if (isHealthy === 'warning') return styles.warning;
    return styles.critical;
  };

  return (
    <div 
      style={styles.container}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(15, 23, 42, 0.4)';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      <span style={styles.label}>{label}</span>
      <span style={{ ...styles.status, ...getStatusStyle() }}>
        {status}
      </span>
    </div>
  );
}
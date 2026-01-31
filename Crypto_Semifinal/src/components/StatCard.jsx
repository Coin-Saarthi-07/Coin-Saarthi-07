export function StatCard({ title, value, icon, trend }) {
  const styles = {
    container: {
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '20px',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    },
    title: {
      fontSize: '14px',
      color: '#94a3b8',
      margin: '0 0 12px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    value: {
      fontSize: '32px',
      fontWeight: '800',
      margin: '0',
      background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    trend: {
      fontSize: '12px',
      fontWeight: '600',
      padding: '4px 8px',
      borderRadius: '12px',
      marginTop: '8px',
      display: 'inline-block'
    }
  };

  const getTrendStyle = () => {
    if (trend > 0) {
      return {
        ...styles.trend,
        background: 'rgba(34, 197, 94, 0.15)',
        color: '#22c55e',
        border: '1px solid rgba(34, 197, 94, 0.3)'
      };
    } else if (trend < 0) {
      return {
        ...styles.trend,
        background: 'rgba(239, 68, 68, 0.15)',
        color: '#ef4444',
        border: '1px solid rgba(239, 68, 68, 0.3)'
      };
    }
    return {
      ...styles.trend,
      background: 'rgba(148, 163, 184, 0.15)',
      color: '#94a3b8',
      border: '1px solid rgba(148, 163, 184, 0.3)'
    };
  };

  return (
    <div 
      style={styles.container}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <p style={styles.title}>
        {icon && <span>{icon}</span>}
        {title}
      </p>
      <p style={styles.value}>{value}</p>
      {trend !== undefined && (
        <div style={getTrendStyle()}>
          {trend > 0 ? '↗' : trend < 0 ? '↘' : '→'} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}
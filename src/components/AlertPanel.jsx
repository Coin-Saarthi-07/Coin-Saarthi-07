import { useState, useEffect } from 'react';
import api from "../services/api";
import authService from "../services/authService";


export default function AlertPanel({ coin, onSaved, onClose }) {

  const [selectedCrypto, setSelectedCrypto] = useState('btc');
  const [alertType, setAlertType] = useState('buy');
  const [alertCreated, setAlertCreated] = useState(false);

  const [targetPrice, setTargetPrice] = useState('');
  const [duration, setDuration] = useState('2'); // Default to 2 based on user request example
  const [isCreating, setIsCreating] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (coin) setSelectedCrypto(coin.symbol.toLowerCase());
  }, [coin]);

  const styles = {
    container: {
      position: 'relative',
      background: 'linear-gradient(145deg, rgba(30,41,59,.9), rgba(15,23,42,.9))',
      backdropFilter: 'blur(22px)',
      border: '1px solid rgba(255,255,255,.12)',
      borderRadius: 24,
      padding: 30,
      boxShadow: '0 35px 60px rgba(0,0,0,.55)',
      minWidth: 380,
      animation: 'fadeIn .4s ease'
    },
    closeBtn: {
      position: 'absolute',
      top: 18,
      right: 18,
      width: 34,
      height: 34,
      borderRadius: '50%',
      border: '1px solid rgba(255,255,255,.15)',
      background: 'rgba(2,6,23,.9)',
      color: '#fff',
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: 24,
      fontWeight: 800,
      marginBottom: 26,
      color: '#fff',
      letterSpacing: '.4px'
    },
    label: {
      color: '#94a3b8',
      fontSize: 13,
      fontWeight: 600,
      marginBottom: 8
    },
    select: {
      width: '100%',
      background: 'rgba(2,6,23,.9)',
      color: '#fff',
      padding: '15px 16px',
      borderRadius: 14,
      border: '1px solid rgba(255,255,255,.15)',
      marginBottom: 10,
      fontSize: 15
    },
    input: {
      width: '100%',
      background: 'rgba(2,6,23,.9)',
      color: '#fff',
      padding: '15px 16px',
      borderRadius: 14,
      border: '1px solid rgba(255,255,255,.15)',
      marginBottom: 10,
      fontSize: 15
    },
    alertTypeWrap: {
      display: 'flex',
      gap: 14,
      marginBottom: 10
    },
    typeBtn: (active, color) => ({
      flex: 1,
      padding: 13,
      borderRadius: 12,
      border: `1px solid ${active ? color : 'rgba(255,255,255,.15)'}`,
      background: active ? `${color}22` : 'transparent',
      color: active ? color : '#94a3b8',
      fontWeight: 600,
      cursor: 'pointer'
    }),
    button: {
      width: '100%',
      background: 'linear-gradient(135deg,#8b5cf6,#3b82f6)',
      color: '#fff',
      padding: 16,
      borderRadius: 16,
      border: 'none',
      fontWeight: 700,
      fontSize: 16,
      cursor: 'pointer',
      boxShadow: '0 15px 30px rgba(99,102,241,.4)',
      marginTop: 14
    },
    helperText: {
      fontSize: 12,
      color: '#64748b',
      marginTop: 14,
      textAlign: 'center'
    },
    error: {
      color: '#f87171',
      fontSize: 12,
      marginBottom: 12
    }
  };

  const handleCreateAlert = async () => {
    const newErrors = {};

    if (!coin?.id) newErrors.crypto = "Invalid cryptocurrency";
    if (!alertType) newErrors.type = "Please select alert type";
    if (!targetPrice) newErrors.price = "Please enter target price";
    else if (isNaN(targetPrice) || Number(targetPrice) <= 0)
      newErrors.price = "Target price must be a valid positive number";

    if (!duration) newErrors.duration = "Please enter duration";
    else if (isNaN(duration) || Number(duration) <= 0)
      newErrors.duration = "Duration must be a valid positive number";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsCreating(true);

    try {
      const payload = {
        userId: authService.getUserId(),       // ✅ JWT user
        cryptoId: coin.cryptoId,               // ✅ DB cryptoId
        duration: Number(duration),
        targetPrice: Number(targetPrice),
        alert_condition: alertType === "buy" ? "Buy" : "Sell",
        type: "App"
      };

      await api.post("/api/alerts", payload);
      setAlertCreated(true);
      setTargetPrice("");
      //onSaved(); // refresh parent
    } catch (err) {
      console.error(err);
      alert("Failed to create alert");
    } finally {
      setIsCreating(false);
    }
  };


  return (
    <div style={styles.container}>

      <button style={styles.closeBtn} onClick={onClose}>✕</button>

      <h2 style={styles.title}>Create Price Alert</h2>

      <label style={styles.label}>Selected Cryptocurrency</label>
      <div style={{
        ...styles.select,
        background: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        color: '#3b82f6',
        fontWeight: '600',
        cursor: 'default'
      }}>
        {coin ? `${coin.name} (${coin.symbol})` : 'No coin selected'}
      </div>
      {errors.crypto && <div style={styles.error}>{errors.crypto}</div>}

      <label style={styles.label}>Alert Type</label>
      <div style={styles.alertTypeWrap}>
        <button style={styles.typeBtn(alertType === 'buy', '#ef4444')} onClick={() => setAlertType('buy')}>Buy Alert</button>
        <button style={styles.typeBtn(alertType === 'sell', '#22c55e')} onClick={() => setAlertType('sell')}>Sell Alert</button>
      </div>
      {errors.type && <div style={styles.error}>{errors.type}</div>}
      <label style={styles.label}>Duration</label>
      <input
        style={styles.input}
        value={duration}
        onChange={e => setDuration(e.target.value)}
        placeholder="Enter Duration"
        type="number"
      />
      {errors.duration && <div style={styles.error}>{errors.duration}</div>}

      <label style={styles.label}>Target Price</label>
      <input style={styles.input} value={targetPrice} onChange={e => setTargetPrice(e.target.value)} placeholder="Enter target price" />
      {errors.price && <div style={styles.error}>{errors.price}</div>}
      <select value="Select Notification Method" style={styles.select} onChange={() => { }}>
        <option value="SMS">SMS</option>
        <option value="Email">Email</option>
        <option value="Whatsapp">Whatsapp</option>
        <option value="In App">In App</option>
      </select>

      {!alertCreated ? (
        <button
          style={styles.button}
          onClick={handleCreateAlert}
          disabled={isCreating}
        >
          {isCreating ? "Creating Alert..." : "Create Alert"}
        </button>
      ) : (
        <div
          style={{
            marginTop: 14,
            padding: 14,
            borderRadius: 14,
            background: "rgba(34,197,94,.15)",
            border: "1px solid rgba(34,197,94,.4)",
            color: "#22c55e",
            fontWeight: 600,
            textAlign: "center"
          }}
        >
          Alert set: <b>{alertType.toUpperCase()}</b> at <b>{targetPrice}</b>
        </div>
      )}


      <p style={styles.helperText}>You'll receive a notification when the price reaches your target.</p>

      <style>{`
        @keyframes fadeIn{
          from{opacity:0;transform:translateY(12px);}
          to{opacity:1;transform:translateY(0);}
        }
      `}</style>
    </div>
  );
}

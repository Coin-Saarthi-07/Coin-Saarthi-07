// import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AlertPanel from "../components/AlertPanel";
import PriceChart from "../components/PriceChart";
import { getMyWatchlist, deleteWatch } from "../services/watchlistService";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";


const UserDashboard = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertCoin, setAlertCoin] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [alertsByCrypto, setAlertsByCrypto] = useState({});


  const user = JSON.parse(localStorage.getItem("user"));


  //   // const loadWatchlist = async () => {
  //   //   const res = await getMyWatchlist(user.userId);
  //   //   setWatchlist(res.data.map(w => ({
  //   //     id: w.watchListId,
  //   //     cryptoId: w.cryptoId,
  //   //     name: w.currencyName,
  //   //     symbol: w.symbol,
  //   //     price: `$${w.currentPrice}`,
  //   //     change: "+0.0%",
  //   //     isPositive: true,
  //   //     isWatching: true,
  //   //     starred: true
  //   //   })));
  //   // };
  //   const loadWatchlist = async () => {
  //   const userId = authService.getUserId();

  //   if (!userId) {
  //     console.warn("User ID missing. Skipping watchlist call.");
  //     return;
  //   }

  //   const res = await api.get(`/api/WatchList/user/${userId}`);
  //   setWatchlist(res.data);
  // };

  //   useEffect(() => {
  //   const userId = authService.getUserId();
  //   if (userId) {
  //     loadWatchlist();
  //   }
  // }, []);

  const loadWatchlist = async () => {
    const res = await getMyWatchlist(user.userId);
    setWatchlist(res.data.map(w => ({
      id: w.watchListId,
      cryptoId: w.cryptoId,
      name: w.currencyName,
      symbol: w.symbol,
      price: `$${w.currentPrice}`,
      change: "+0.0%",
      isPositive: true,
      isWatching: true,
      starred: true
    })));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await loadWatchlist();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleConfirmRemove = async () => {
    await deleteWatch(itemToRemove.id);
    setShowRemoveModal(false);
    loadWatchlist();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <NavBar />
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a0f1e,#141c2e)", padding: 24, paddingTop: 100, color: "white" }}>
        <h1 style={{ textAlign: "center", marginBottom: 40, fontWeight: 800, fontSize: '36px', background: 'linear-gradient(to right, #60a5fa, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>My Watchlist</h1>

        <div style={{ maxWidth: '1400px', margin: '0 auto', display: "flex", gap: 24, flexDirection: showChart ? 'row' : 'column' }}>
          <div style={{ width: showChart ? "55%" : "100%", transition: 'width 0.3s' }}>
            <div style={{
              background: 'linear-gradient(145deg, #0f172a, #020617)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,.6)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              {/* Header Row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1.5fr",
                padding: "16px",
                color: "#94a3b8",
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: "1px solid rgba(255,255,255,.1)"
              }}>
                <span>Currency</span>
                <span>Symbol</span>
                <span>Price</span>
                <span>24h Change</span>
                <span style={{ textAlign: 'right' }}>Actions</span>
              </div>

              {watchlist.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                  Your watchlist is empty. Go to Home to add coins!
                </div>
              ) : (
                watchlist.map(item => (
                  <div key={item.id}
                    onClick={() => {
                      if (selectedCoin?.id === item.id) {
                        setShowChart(false);
                        setSelectedCoin(null);
                      } else {
                        setSelectedCoin(item);
                        setShowChart(true);
                      }
                    }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1.5fr",
                      padding: "20px 16px",
                      borderBottom: "1px solid rgba(255,255,255,.05)",
                      cursor: "pointer",
                      alignItems: 'center',
                      transition: 'background 0.2s',
                      ':hover': { background: 'rgba(255,255,255,0.02)' }
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >

                    <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#fbbf24' }}>{item.starred && "★"}</span>
                      {item.name}
                    </div>
                    <div style={{ color: "#94a3b8", fontWeight: 500 }}>{item.symbol}</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '15px' }}>{item.price}</div>
                    <div style={{ color: "#22c55e", fontWeight: 600 }}>{item.change}</div>

                    <div style={{ display: "flex", gap: 10, justifyContent: 'flex-end' }}>
                      {alertsByCrypto[item.cryptoId] ? (
                        <div
                          style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "1px solid #22c55e",
                            background: "rgba(34,197,94,.1)",
                            color: "#22c55e",
                            fontWeight: 600,
                            fontSize: 12,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          ✓ {alertsByCrypto[item.cryptoId].type.toUpperCase()} @ {alertsByCrypto[item.cryptoId].price}
                        </div>
                      ) : (
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setAlertCoin(item);
                            setShowAlertModal(true);
                          }}
                          style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "none",
                            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: '13px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                            transition: 'transform 0.2s'
                          }}
                          onMouseDown={e => e.target.style.transform = 'scale(0.95)'}
                          onMouseUp={e => e.target.style.transform = 'scale(1)'}
                        >
                          Set Alert
                        </button>
                      )}

                      <button
                        onClick={e => { e.stopPropagation(); setItemToRemove(item); setShowRemoveModal(true); }}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "8px",
                          border: "1px solid rgba(239,68,68,0.5)",
                          background: "rgba(239,68,68,0.1)",
                          color: "#ef4444",
                          fontWeight: 600,
                          fontSize: '13px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => { e.target.style.background = '#ef4444'; e.target.style.color = 'white'; }}
                        onMouseLeave={e => { e.target.style.background = 'rgba(239,68,68,0.1)'; e.target.style.color = '#ef4444'; }}
                      >
                        Remove
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>

          {showChart && selectedCoin && (
            <div style={{ width: "45%", display: 'flex', flexDirection: 'column' }}>
              <div style={{
                background: 'linear-gradient(145deg, #0f172a, #020617)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,.6)',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'sticky',
                top: '100px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ margin: 0, fontSize: '20px' }}>{selectedCoin.symbol} Analysis</h3>
                  <button onClick={() => setShowChart(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '20px' }}>×</button>
                </div>
                <PriceChart symbol={selectedCoin.symbol} />
              </div>
            </div>
          )}
        </div>

        {showAlertModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: 'blur(4px)',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000
            }}
          >
            <div style={{ width: 420 }}>
              <AlertPanel
                coin={alertCoin}
                onSaved={(alertData) => {
                  setAlertsByCrypto((prev) => ({
                    ...prev,
                    [alertCoin.cryptoId || alertCoin.id]: alertData
                  }));
                  setShowAlertModal(false);
                }}
                onClose={() => setShowAlertModal(false)}
              />
            </div>
          </div>
        )}


        {showRemoveModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'linear-gradient(145deg, #1e293b, #0f172a)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px', width: '400px', maxWidth: '90vw', textAlign: 'center', color: 'white', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '22px', fontWeight: '700' }}>Confirm Removal</h3>
              <p style={{ margin: '0 0 32px 0', color: '#94a3b8', fontSize: '15px', lineHeight: '1.6' }}>
                Are you sure you want to remove <strong style={{ color: 'white' }}>{itemToRemove?.name}</strong> from your watchlist?
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={() => setShowRemoveModal(false)} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '8px', color: '#cbd5e1', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Cancel</button>
                <button onClick={handleConfirmRemove} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: '600', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}>Remove Coin</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;

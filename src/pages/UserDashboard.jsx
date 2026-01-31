// import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AlertPanel from "../components/AlertPanel";
import PriceChart from "../components/PriceChart";
import { getMyWatchlist, deleteWatch } from "../services/watchlistService";
import React, { useEffect, useState } from "react";


const UserDashboard = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertCoin, setAlertCoin] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [alertsByCrypto, setAlertsByCrypto] = useState({});


  const user = JSON.parse(localStorage.getItem("user"));

  // const loadWatchlist = async () => {
  //   const res = await getMyWatchlist(user.userId);
  //   setWatchlist(res.data.map(w => ({
  //     id: w.watchListId,
  //     cryptoId: w.cryptoId,
  //     name: w.currencyName,
  //     symbol: w.symbol,
  //     price: `$${w.currentPrice}`,
  //     change: "+0.0%",
  //     isPositive: true,
  //     isWatching: true,
  //     starred: true
  //   })));
  // };
  const loadWatchlist = async () => {
  const userId = authService.getUserId();

  if (!userId) {
    console.warn("User ID missing. Skipping watchlist call.");
    return;
  }

  const res = await api.get(`/api/WatchList/user/${userId}`);
  setWatchlist(res.data);
};

  useEffect(() => {
  const userId = authService.getUserId();
  if (userId) {
    loadWatchlist();
  }
}, []);



  const handleConfirmRemove = async () => {
    await deleteWatch(itemToRemove.id);
    setShowRemoveModal(false);
    loadWatchlist();
  };

  return (
    <>
      <NavBar />
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a0f1e,#141c2e)", padding: 24, paddingTop: 80, color: "white" }}>
        <h1 style={{ textAlign: "center", marginBottom: 24, fontWeight: 800 }}>My Watchlist</h1>

        <div style={{ display: "flex", gap: 24 }}>
          <div style={{ width: showChart ? "45%" : "100%" }}>
            {/* Header Row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1.2fr",
              padding: "10px 16px",
              color: "#64748b",
              fontSize: 12,
              fontWeight: 600,
              borderBottom: "1px solid rgba(255,255,255,.1)"
            }}>
              <span>Currency</span>
              <span>Symbol</span>
              <span>Price</span>
              <span>24h Change</span>
              <span>Actions</span>
            </div>

            {watchlist.map(item => (
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
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1.2fr",
                  padding: "14px 16px",
                  borderBottom: "1px solid rgba(255,255,255,.05)",
                  cursor: "pointer"
                }}>

                <div style={{ fontWeight: 600 }}>{item.starred && "⭐ "}{item.name}</div>
                <div style={{ color: "#94a3b8" }}>{item.symbol}</div>
                <div>{item.price}</div>
                <div style={{ color: "#22c55e" }}>{item.change}</div>

                <div style={{ display: "flex", gap: 8 }}>
                  {alertsByCrypto[item.cryptoId] ? (
                    <div
                      style={{
                        padding: "6px 14px",
                        borderRadius: 999,
                        border: "1px solid #22c55e",
                        background: "rgba(34,197,94,.2)",
                        color: "#22c55e",
                        fontWeight: 600,
                        fontSize: 13
                      }}
                    >
                      {alertsByCrypto[item.cryptoId].type.toUpperCase()} @ ₹
                      {alertsByCrypto[item.cryptoId].price}
                    </div>
                  ) : (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setAlertCoin(item);
                        setShowAlertModal(true);
                      }}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 999,
                        border: "1px solid #3b82f6",
                        background: "rgba(59,130,246,.2)",
                        color: "#3b82f6"
                      }}
                    >
                      Add Alert
                    </button>
                  )}

                  <button
                    onClick={e => { e.stopPropagation(); setItemToRemove(item); setShowRemoveModal(true); }}
                    style={{ padding: "6px 14px", borderRadius: 999, border: "1px solid #ef4444", background: "rgba(239,68,68,.2)", color: "#ef4444" }}
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          {showChart && selectedCoin && (
            <div style={{ width: "55%", background: "rgba(15,23,42,.7)", borderRadius: 16, padding: 24 }}>
              <h3>{selectedCoin.symbol}/INR Chart</h3>
              <PriceChart symbol={selectedCoin.symbol} />
            </div>
          )}
        </div>

        {showAlertModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.8)",
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
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '20px', padding: '30px', width: '400px', maxWidth: '90vw', textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '700' }}>Remove from Watchlist</h3>
              <p style={{ margin: '0 0 24px 0', color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>
                Are you sure you want to remove <strong style={{ color: 'white' }}>{itemToRemove?.name}</strong> from your watchlist?
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={() => setShowRemoveModal(false)} style={{ padding: '10px 20px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
                <button onClick={handleConfirmRemove} style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>Remove</button>
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

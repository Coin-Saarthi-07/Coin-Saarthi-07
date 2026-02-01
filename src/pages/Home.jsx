import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import authService from '../services/authService';
import "./Home.css";
import "../components/NavBar.css";
import HomeCarousel from '../components/HomeCarousel';
import { addToWatchlist, getMyWatchlist } from "../services/watchlistService";


const Home = () => {
  const navigate = useNavigate();

  const [liveCoins, setLiveCoins] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [cryptoList, setCryptoList] = useState([]);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(15);
  const [previousPrices, setPreviousPrices] = useState({});
  const [watchlistItems, setWatchlistItems] = useState(new Set());
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  useEffect(() => {
    fetchAllData();

    const interval = setInterval(() => {
      fetchAllData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadUserWatchlist = async () => {
      const user = authService.getCurrentUser();
      if (!user) return;

      try {
        const res = await getMyWatchlist(user.userId);


        const ids = new Set(
          res.data.map(w => w.cryptoCurrency.cryptoId)
        );

        setWatchlistItems(ids);
      } catch (err) {
        console.error("Failed to load watchlist", err);
      }

    };

    loadUserWatchlist();
  }, []);

  const fetchAllData = () => {
    fetchLive();
    fetchGainers();
    fetchLosers();
    fetchCryptoList();
  };

  useEffect(() => {
    const map = {};
    cryptoList.forEach(c => {
      map[c.cryptoId] = c.currencyPrice;
    });
    setPreviousPrices(map);
  }, [cryptoList]);

  const fetchLive = async () => {
    try {
      const res = await api.get("/crypto/crypto-currency/live");

      const data = Array.isArray(res.data) ? res.data : [];
      const mapped = data.map(c => ({
        cryptoId: c.cryptoId,
        currencySymbol: c.symbol,
        currencyPrice: c.price,
        lastUpdated: new Date().toISOString()
      }));

      setLiveCoins(mapped);
    } catch (err) {
      console.error("Live prices error", err);
    }
  };


  const fetchGainers = async () => {
    try {
      const res = await api.get("/crypto/crypto-currency/top-gainers");
      setTopGainers(Array.isArray(res.data) ? res.data : []); // ✅ FIX
    } catch (err) {
      console.error("Top gainers error", err);
    }
  };


  const fetchLosers = async () => {
    try {
      const res = await api.get("/crypto/crypto-currency/top-losers");
      setTopLosers(Array.isArray(res.data) ? res.data : []); // ✅ FIX
    } catch (err) {
      console.error("Top losers error", err);
    }
  };

  const fetchCryptoList = async () => {
    try {
      const res = await api.get("/crypto/crypto-currency");

      const flatList = Array.isArray(res.data)
        ? res.data.map(c => ({
          cryptoId: c.cryptoId,
          currencyName: c.currencyName,
          currencySymbol: c.currencySymbol,
          currencyPrice: c.currencyPrice
        }))
        : [];

      setCryptoList(flatList);
    } catch (err) {
      console.error("Crypto list error", err);
      setCryptoList([]);
    }
  };



  const mergeWithLive = (list) =>
    list.map(item => {
      const coin = liveCoins.find(c => c.cryptoId === item.cryptoId);
      return {
        cryptoId: item.cryptoId,
        symbol: coin?.currencySymbol ?? "NA",
        price: coin?.currencyPrice ?? 0,
        updated: coin?.lastUpdated,
        priceChange: item.priceChange
      };
    });

  const hotCoins = liveCoins.slice(0, 3);
  const gainers = mergeWithLive(topGainers).slice(0, 3);
  const losers = mergeWithLive(topLosers).slice(0, 3);
  const volume = hotCoins;


  const filteredCoins = cryptoList.filter(c => {
    const name = String(c.currencyName || "").toLowerCase();
    const symbol = String(c.currencySymbol || "").toLowerCase();
    return name.includes(search.toLowerCase()) || symbol.includes(search.toLowerCase());
  });


  const visibleCoins = filteredCoins.slice(0, visibleCount);

  const handleAddToWatchlist = async (coin) => {
    const user = authService.getCurrentUser();
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await addToWatchlist({
        userId: user.userId,
        cryptoId: coin.cryptoId
      });



      setWatchlistItems(prev => new Set([...prev, coin.cryptoId]));
    } catch (err) {
      alert(err.response?.data || "Already added to watchlist");

    }
  };

  const getCoinIcon = (symbol) => {
    const icons = {
      'BTC': '₿', 'ETH': 'Ξ', 'SOL': '◎', 'ADA': '₳', 'DOT': '●',
      'AVAX': '▲', 'MATIC': '◆', 'LINK': '⬡', 'BNB': 'B', 'XRP': 'X',
      'USDT': 'T', 'USDC': 'U'
    };
    return icons[symbol?.toUpperCase()] || symbol?.charAt(0) || '?';
  };

  const formatPrice = (price) => {
    if (typeof price !== "number" || isNaN(price)) return "—";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };


  const formatVolume = (value) => {
    if (typeof value !== "number" || isNaN(value)) return "—";
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toFixed(2)}`;
  };

  return (
    <>
      <NavBar />

      <div className="home" style={{ paddingTop: '80px', backgroundColor: '#0b111eff', minHeight: '100vh' }}>

        {/* New Hero Carousel Section */}
        <HomeCarousel />
        {/* Market Cards */}
        <section className="market-section container-fluid">
          <div className="row">
            <MarketCard
              title="Hot"
              header={["Name", "Price", "Updated"]}
              data={hotCoins.map(c => ({
                key: c.cryptoId,
                cols: [
                  `⭐ ${c.currencySymbol}`,
                  `$${c.currencyPrice}`,
                  new Date(c.lastUpdated).toLocaleTimeString()
                ],
                positive: true
              }))}
            />

            <MarketCard
              title="Top Gainer"
              header={["Name", "Price", "Change"]}
              data={gainers.map(c => ({
                key: c.cryptoId,
                cols: [
                  c.symbol,
                  `$${c.price}`,
                  `+${c.priceChange?.toFixed(2)}`
                ],
                positive: true
              }))}
            />

            <MarketCard
              title="Top Loser"
              header={["Name", "Price", "Change"]}
              data={losers.map(c => ({
                key: c.cryptoId,
                cols: [
                  c.symbol,
                  `$${c.price}`,
                  c.priceChange?.toFixed(2)
                ],
                positive: false
              }))}
            />

            <MarketCard
              title="Top Volume"
              header={["Name", "Price", "Updated"]}
              data={volume.map(c => ({
                key: c.cryptoId,
                cols: [
                  c.currencySymbol,
                  `$${c.currencyPrice}`,
                  new Date(c.lastUpdated).toLocaleTimeString()
                ],
                positive: true
              }))}
            />

          </div>
        </section>

        {/* Crypto List */}
        {/* Crypto List Section */}
        <section className="container-fluid mt-5">
          <h3 className="mb-3">All Cryptocurrencies</h3>

          {/* Search */}
          <input
            type="text"
            className="form-control mb-3 search-input"
            placeholder="Search by name or symbol..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(15);
            }}
          />

          <div className="crypto-table">
            <div className="crypto-header">
              <span></span>
              <span>Id</span>
              <span>Coin</span>
              <span>Price</span>
              <span>1h</span>
              <span>24h</span>
              <span>7d</span>
              <span>24h Volume</span>
              <span>Market Cap</span>
              <span>Watchlist</span>
            </div>

            {visibleCoins.map((c, index) => {
              const prev = previousPrices[c.cryptoId];
              const movement =
                typeof c.currencyPrice !== "number" || typeof prev !== "number"
                  ? "—"
                  : c.currencyPrice > prev
                    ? "up"
                    : c.currencyPrice < prev
                      ? "down"
                      : "same";

              console.log("CRYPTO LIST:", cryptoList);
              console.log("VISIBLE COINS:", visibleCoins);

              return (
                <div className="crypto-row" key={c.cryptoId}>

                  <span className="star-icon">
                    {watchlistItems.has(c.cryptoId) ? "⭐" : "☆"}
                  </span>
                  <span className="muted">{index + 1}</span>

                  <div className="coin-info">
                    <div className={`coin-icon ${c.currencySymbol?.toLowerCase()}`} style={{
                      background: c.currencySymbol === 'BTC' ? '#f7931a' :
                        c.currencySymbol === 'ETH' ? '#627eea' :
                          c.currencySymbol === 'BNB' ? '#f3ba2f' :
                            c.currencySymbol === 'XRP' ? '#23292f' :
                              c.currencySymbol === 'ADA' ? '#0033ad' :
                                c.currencySymbol === 'SOL' ? '#14f195' :
                                  c.currencySymbol === 'USDT' ? '#26a17b' :
                                    c.currencySymbol === 'USDC' ? '#2775ca' : '#6366f1'
                    }}>
                      {getCoinIcon(c.currencySymbol)}
                    </div>
                    <div className="coin-details">
                      <div className="coin-name">{c.currencyName}</div>
                      <div className="coin-symbol">{c.currencySymbol}</div>
                    </div>
                  </div>

                  <div className="price-value">{formatPrice(c.currencyPrice)}</div>

                  <span className={`percentage-change ${movement === "up" ? "positive" : movement === "down" ? "negative" : "muted"
                    }`}>
                    {movement === "up" && "▲ 0.1%"}
                    {movement === "down" && "▼ 0.2%"}
                    {movement === "same" && "—"}
                  </span>

                  <span className={`percentage-change ${Math.random() > 0.5 ? "negative" : "positive"
                    }`}>
                    {Math.random() > 0.5 ? "▼ 2.6%" : "▲ 0.1%"}
                  </span>

                  <span className={`percentage-change ${Math.random() > 0.5 ? "positive" : "negative"
                    }`}>
                    {Math.random() > 0.5 ? "▲ 0.0%" : "▼ 1.2%"}
                  </span>

                  <div style={{ color: '#ffffff', opacity: 0.9 }}>{formatVolume(c.currencyPrice * 1000000)}</div>
                  <div style={{ color: '#ffffff', opacity: 0.9 }}> {formatVolume(c.currencyPrice * 10000000)}</div>

                  <div>
                    <button
                      className="watchlist-btn"
                      disabled={watchlistItems.has(c.cryptoId)}
                      onClick={() => handleAddToWatchlist(c)}
                    >
                      {watchlistItems.has(c.cryptoId) ? "✓ Added" : "Watchlist"}
                    </button>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More */}
          {visibleCount < filteredCoins.length && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <button
                style={{
                  padding: '8px 20px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,.15)',
                  background: 'transparent',
                  color: '#94a3b8',
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setVisibleCount(v => v + 15)}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(59,130,246,.2)';
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.color = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = 'rgba(255,255,255,.15)';
                  e.target.style.color = '#94a3b8';
                }}
              >
                Load More
              </button>
            </div>
          )}
        </section>

      </div>

      <Footer />
    </>
  );
};

const MarketCard = ({ title, header, data }) => (
  <div className="col-lg-3 col-md-6 col-sm-12">
    <div className="market-card">
      <div className="market-header">
        <h4>{title}</h4>
        <span className="more">More ›</span>
      </div>

      <div className="market-row header">
        {header.map(h => <span key={h}>{h}</span>)}
      </div>

      {data.length > 0 ? (
        data.map(row => (
          <div className="market-row" key={row.key}>
            {row.cols.map((c, i) => (
              <span
                key={i}
                className={i === row.cols.length - 1 ? (row.positive ? "positive" : "negative") : ""}
              >
                {c}
              </span>
            ))}
          </div>
        ))
      ) : (
        <div className="market-row" style={{ display: 'flex', justifyContent: 'center', padding: '20px', color: '#64748b' }}>
          <span>No Data Available</span>
        </div>
      )}
    </div>
  </div>
);

export default Home;

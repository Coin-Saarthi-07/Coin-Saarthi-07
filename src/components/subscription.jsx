
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import Footer from './Footer';
import { fetchAllPlans, subscribeUserToPlan } from "../services/subscriptionService";
import authService from "../services/authService";
import { createOrder, verifyPayment } from "../services/subscriptionPaymentService";
import axios from "axios";

export default function SubscriptionPage() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscribedPlans, setSubscribedPlans] = useState(new Set());
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const user = authService.getCurrentUser();
  const userId = user?.userId;
  const token = authService.getToken();
  const navigate = useNavigate();

  // Fetch plans from backend
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetchAllPlans();

        const mappedPlans = res.data.map(p => ({
          planId: p.planId,
          name: p.planName,
          price: p.planPrice,
          period: `${p.duration} days`,
          features: p.features.split(","), // backend string → UI array
          premium: true
        }));

        setPlans(mappedPlans);
        setSelectedPlan(mappedPlans[0]?.id || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  // Hide toast after 3 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Check for subscribed plans from localStorage
  useEffect(() => {
    const savedSubscribedPlans = localStorage.getItem('subscribedPlans');
    if (savedSubscribedPlans) {
      setSubscribedPlans(new Set(JSON.parse(savedSubscribedPlans)));
    }
  }, []);
  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 20px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '60px'
    },
    title: {
      fontSize: '48px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '16px'
    },
    subtitle: {
      color: '#94a3b8',
      fontSize: '18px',
      maxWidth: '600px',
      margin: '0 auto'
    },
    plansContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      marginBottom: '60px'
    },
    planCard: {
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '32px',
      display: 'flex',
      alignItems: 'center',
      gap: '40px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    selectedCard: {
      border: '2px solid #667eea',
      transform: 'scale(1.02)',
      boxShadow: '0 25px 50px rgba(102, 126, 234, 0.2)'
    },
    planInfo: {
      flex: '1',
      minWidth: '300px'
    },
    planName: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '8px',
      color: '#ffffff'
    },
    planPrice: {
      fontSize: '42px',
      fontWeight: '800',
      color: '#667eea',
      marginBottom: '16px'
    },
    planPeriod: {
      fontSize: '16px',
      color: '#94a3b8',
      marginLeft: '8px'
    },
    planDescription: {
      color: '#cbd5e1',
      fontSize: '16px',
      lineHeight: '1.6'
    },
    featuresGrid: {
      flex: '2',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#e2e8f0',
      fontSize: '14px'
    },
    checkIcon: {
      color: '#10b981',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    planActions: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      minWidth: '200px'
    },
    badge: {
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      color: 'white',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    popularBadge: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
    },
    premiumBadge: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)'
    },
    selectButton: {
      padding: '14px 32px',
      borderRadius: '12px',
      border: 'none',
      fontWeight: '600',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'white',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minWidth: '140px'
    },
    selectedButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      fontSize: '18px',
      color: '#94a3b8'
    }
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };
  const startPayment = async (plan) => {
    try {
      if (!userId) {
        alert("Please login to continue");
        return;
      }

      // ✅ 1. FIRST get response
      const res = await axios.post(
        "http://localhost:8080/api/payments/subscription/order",
        null,
        {
          params: {
            userId: userId,
            planId: plan.planId,
            paymentMethod: "UPI",
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ 2. THEN use res
      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: res.data.currency,
        name: "CoinSaarthi",
        description: plan.name,
        order_id: res.data.razorpayOrderId,

        handler: async function (response) {
          await axios.post(
            "http://localhost:8080/api/payments/subscription/verify",
            {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          const storedUser = JSON.parse(localStorage.getItem("user"));
          const paymentId = res.data.paymentId;
          if (storedUser) {
            storedUser.role = res.data.role || "SUBSCRIBER";
            localStorage.setItem("user", JSON.stringify(storedUser));
          }

          setSubscribedPlans(prev => {
            const newSet = new Set([...prev, plan.planId]);
            localStorage.setItem('subscribedPlans', JSON.stringify([...newSet]));
            return newSet;
          });
          setToast({ show: true, message: "Payment verified & subscription activated 🎉", type: 'success' });
          // setTimeout(() => {
          //   //('/invoice', { state: { plan } });
          //   navigate("/invoice", {
          //     state: { paymentId }
          //   });
          // }, 2000);
        }
        ,

        theme: {
          color: "#667eea",
        },
      };

      // ✅ 3. FINALLY open Razorpay
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };



  return (
    <>
      <NavBar />
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0a0f1e,#141c2e)', padding: window.innerWidth <= 768 ? 12 : 24, paddingTop: window.innerWidth <= 768 ? 68 : 80, color: 'white' }}>
        <style>
          {`
            @keyframes slideIn {
              from {
                transform: translateX(100%);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }
          `}
        </style>
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.header}>
            <h1 style={styles.title}>Choose Your Plan</h1>
            <p style={styles.subtitle}>Upgrade to unlock premium features and maximize your crypto trading potential</p>
          </div>

          {/* Horizontal Plan Cards */}
          <div style={styles.plansContainer}>
            {plans.map((plan) => (
              <div
                key={plan.id}
                style={{
                  ...styles.planCard,
                  ...(selectedPlan === plan.id ? styles.selectedCard : {})
                }}
                onClick={() => handlePlanSelect(plan.id)}
                onMouseEnter={(e) => {
                  if (selectedPlan !== plan.id) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPlan !== plan.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {/* Plan Info */}
                <div style={styles.planInfo}>
                  <h2 style={styles.planId}>{plan.planId}</h2>
                  <h3 style={styles.planName}>{plan.name}</h3>
                  <div>
                    <span style={styles.planPrice}>${plan.price}</span>
                    <span style={styles.planPeriod}>/{plan.period}</span>
                  </div>
                  <p style={styles.planDescription}>
                    {plan.id === 'basic' ? 'Perfect for getting started with crypto tracking' : 'Advanced features for serious crypto traders'}
                  </p>
                </div>

                {/* Features Grid */}
                <div style={styles.featuresGrid}>
                  {plan.features.map((feature, index) => (
                    <div key={index} style={styles.feature}>
                      <span style={styles.checkIcon}>✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Plan Actions */}
                <div style={styles.planActions}>
                  {plan.popular && (
                    <span style={{ ...styles.badge, ...styles.popularBadge }}>Popular</span>
                  )}

                  <button
                    style={{
                      ...styles.selectButton,
                      ...(subscribedPlans.has(plan.planId) ? styles.selectedButton : {})
                    }}
                    disabled={subscribedPlans.has(plan.planId)}
                    onClick={(e) => {
                      e.stopPropagation();
                      startPayment(plan);
                    }}
                  >
                    {subscribedPlans.has(plan.planId) ? "Subscribed" : "Upgrade"}
                  </button>

                  {subscribedPlans.has(plan.planId) && (
                    <Link
                      to="/invoice"
                      state={{plan}}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: '#3b82f6',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '14px'
                      }}
                    >
                      View Invoice
                    </Link>
                  )}
                  {/* <button
                    style={{
                      ...styles.selectButton,
                      ...(subscribedPlans.has(plan.planId) ? styles.selectedButton : {})
                    }}
                    disabled={subscribedPlans.has(plan.planId)}
                    onClick={(e) => {
                      e.stopPropagation();
                      startPayment(plan);
                    }}
                    onMouseEnter={(e) => {
                      if (!subscribedPlans.has(plan.planId)) {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {subscribedPlans.has(plan.planId) ? "Subscribed" : "Upgrade"}
                  </button> */}

                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />

        {/* Toast Notification */}
        {toast.show && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: toast.type === 'success' ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            zIndex: 1001,
            fontSize: '16px',
            fontWeight: '600',
            animation: 'slideIn 0.3s ease-out'
          }}>
            {toast.message}
          </div>
        )}

        {/* Payment Success Modal */}
        {showPaymentSuccess && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'linear-gradient(145deg, rgba(30,41,59,.95), rgba(15,23,42,.95))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '20px',
              padding: '40px',
              width: '400px',
              maxWidth: '90vw',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
              <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: '700', color: '#22c55e' }}>Payment Successful!</h2>
              <p style={{ marginBottom: '30px', color: '#94a3b8' }}>Your subscription has been activated successfully.</p>
              <button
                onClick={handlePaymentSuccess}
                style={{
                  padding: '12px 30px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
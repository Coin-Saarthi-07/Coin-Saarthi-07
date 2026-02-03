import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';
import NavBar from './NavBar';

import { fetchAllPlans, subscribeUserToPlan } from "../services/subscriptionService";
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
  const { updateUser } = useAuth();

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
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
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
      margin: '0 auto',
      lineHeight: '1.6'
    },
    plansContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      marginBottom: '60px'
    },
    planCard: {
      background: 'linear-gradient(145deg, #0f172a, #020617)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '24px',
      padding: '40px',
      display: 'flex',
      //flexDirection: isMobile ? 'column' : 'row',
      //alignItems: isMobile ? 'stretch' : 'center',
      justifyContent: 'space-between',
      //gap: isMobile ? '24px' : '48px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      //textAlign: isMobile ? 'center' : 'left'
    },
    selectedCard: {
      border: '1px solid #667eea',
      boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15)',
      transform: 'translateY(-4px)'
    },
    planHeader: {
      //marginBottom: isMobile ? '24px' : '0',
      //textAlign: isMobile ? 'center' : 'left',
      position: 'relative',
      // minWidth: isMobile ? 'auto' : '200px',
      // borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.1)',
      // paddingRight: isMobile ? '0' : '32px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    planName: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '8px',
      color: '#ffffff',
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    },
    planPrice: {
      display: 'flex',
      //justifyContent: isMobile ? 'center' : 'flex-start',
      alignItems: 'baseline',
      gap: '4px',
      color: '#white'
    },
    priceAmount: {
      fontSize: '48px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    planPeriod: {
      fontSize: '16px',
      color: '#64748b',
    },
    featuresList: {
      flex: 1,
      display: 'grid',
      //gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '16px',
      // marginBottom: isMobile ? '24px' : '0',
      // paddingRight: isMobile ? '0' : '24px'
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      //justifyContent: isMobile ? 'center' : 'flex-start',
      gap: '12px',
      color: '#cbd5e1',
      fontSize: '15px'
    },
    checkIcon: {
      color: '#10b981',
      background: 'rgba(16, 185, 129, 0.1)',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      flexShrink: 0
    },
    selectButton: {
      //width: isMobile ? '100%' : '200px',
      padding: '16px',
      borderRadius: '12px',
      border: 'none',
      fontWeight: '700',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'white',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      border: '1px solid rgba(255,255,255,0.1)',
      //alignSelf: isMobile ? 'stretch' : 'center'
    },
    selectedButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      boxShadow: '0 10px 20px rgba(118, 75, 162, 0.4)'
    },
    successBtn: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      border: 'none',
      boxShadow: '0 10px 20px rgba(16, 185, 129, 0.4)'
    },
    badge: {
      position: 'absolute',
      // top: isMobile ? '-16px' : '20px',
      // right: isMobile ? 'auto' : '20px',
      // left: isMobile ? '50%' : 'auto',
      // transform: isMobile ? 'translateX(-50%)' : 'none',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: 'white',
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
      zIndex: 2
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

          // CRITICAL: Update Auth Context to reflect new role immediately
          const storedUser = authService.getCurrentUser();
          if (storedUser) {
            const updatedUser = { ...storedUser, role: res.data.role || "SUBSCRIBER" };
            updateUser(updatedUser); // Update Context & LocalStorage via Context
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

  //// Handle Payment Success //////

  // const handlePaymentSuccess = () => {
  //   setShowPaymentSuccess(false);
  //   localStorage.setItem('paymentSuccess', 'true');
  //   navigate('/invoice', {
  //     state: {
  //       plan: currentPlan,
  //       paymentDetails: {
  //         razorpayPaymentId: `pay_${Math.random().toString(36).substr(2, 9)}`,
  //         razorpayOrderId: `order_${Math.random().toString(36).substr(2, 9)}`,
  //         razorpaySignature: `sig_${Math.random().toString(36).substr(2, 20)}`
  //       }
  //     }
  //   });
  // };



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
        {/* this is nandini */}
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0a0f1e,#141c2e)', padding: window.innerWidth <= 768 ? 12 : 24, paddingTop: window.innerWidth <= 768 ? 68 : 100, color: 'white' }}>
          {/* this is nandini */}
          <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
              <h1 style={styles.title}>Choose Your Plan</h1>
              <p style={styles.subtitle}>Unlock value-added features to enhance your crypto journey</p>
            </div>

            {/* Vertical Cards Grid */}
            <div style={styles.plansContainer}>
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  style={{
                    ...styles.planCard,
                    ...(selectedPlan === plan.id ? styles.selectedCard : {})
                  }}
                  onClick={() => handlePlanSelect(plan.id)}
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
                        <div style={styles.checkIcon}>✓</div>
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
                        state={{ plan }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontWeight: '600',
                          display: 'block',
                          textAlign: 'center',
                          width: '80%',
                          marginTop: '8px'
                        }}
                      >
                        Invoice
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
              backdropFilter: 'blur(5px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <div style={{
                background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                borderRadius: '24px',
                padding: '48px',
                width: '420px',
                maxWidth: '90vw',
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
              }}>
                <div style={{ width: '80px', height: '80px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
                  <span style={{ fontSize: '40px' }}>✅</span>
                </div>
                <h2 style={{ marginBottom: '16px', fontSize: '28px', fontWeight: '800', color: 'white' }}>Success!</h2>
                <p style={{ marginBottom: '32px', color: '#94a3b8', fontSize: '16px', lineHeight: '1.6' }}>
                  Your <span style={{ color: '#22c55e', fontWeight: 600 }}>{currentPlan?.name}</span> subscription has been activated successfully.
                </p>
                <button
                  onClick={handlePaymentSuccess}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    color: 'white',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '16px',
                    boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
                  }}
                >
                  Continue to Invoice
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
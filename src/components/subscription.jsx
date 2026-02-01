// import { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";

// export default function SubscriptionPage() {
//   const [selectedPlan, setSelectedPlan] = useState('pro');

//   const plans = {
//     basic: {
//       name: 'Basic Plan',
//       price: '$9.99',
//       period: 'month',
//       features: [
//         'Up to 5 crypto alerts',
//         'Email notifications',
//         'Basic price charts',
//         '24-hour support',
//         'BTC, ETH, SOL tracking'
//       ],
//       color: 'bg-blue-500'
//     },
//     pro: {
//       name: 'Pro Plan',
//       price: '$29.99',
//       period: 'month',
//       features: [
//         'Unlimited crypto alerts',
//         'Email + SMS notifications',
//         'Advanced price charts',
//         'Real-time alerts',
//         'All major cryptocurrencies',
//         'Technical indicators',
//         'Priority support',
//         'API access'
//       ],
//       color: 'bg-gradient-to-r from-purple-600 to-pink-500'
//     }
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-10">
//           <Link href="/user-dashboard" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 mb-6">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//             </svg>
//             Back to Dashboard
//           </Link>
//           <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
//           <p className="text-gray-300">Upgrade to unlock premium features and maximize your crypto trading potential</p>
//         </div>

//         {/* Toggle Switch */}
//         <div className="flex justify-center mb-12">
//           <div className="glass-effect p-1 rounded-xl flex">
//             <button
//               onClick={() => setSelectedPlan('basic')}
//               className={`px-8 py-3 rounded-lg transition-all ${selectedPlan === 'basic' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
//             >
//               Basic Plan
//             </button>
//             <button
//               onClick={() => setSelectedPlan('pro')}
//               className={`px-8 py-3 rounded-lg transition-all ${selectedPlan === 'pro' ? 'gradient-bg-premium' : 'hover:bg-gray-700'}`}
//             >
//               Pro Plan
//             </button>
//           </div>
//         </div>

//         {/* Plan Cards */}
//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Basic Plan */}
//           <div className={`glass-effect rounded-2xl p-8 transition-all ${selectedPlan === 'basic' ? 'ring-2 ring-blue-500 scale-105' : 'opacity-80'}`}>
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <h3 className="text-2xl font-bold mb-2">Basic Plan</h3>
//                 <div className="flex items-baseline">
//                   <span className="text-4xl font-bold">$9.99</span>
//                   <span className="text-gray-400 ml-2">/month</span>
//                 </div>
//               </div>
//               <span className="px-4 py-1 bg-blue-500 rounded-full text-sm">Popular</span>
//             </div>
//             <ul className="space-y-3 mb-8">
//               {plans.basic.features.map((feature, index) => (
//                 <li key={index} className="flex items-center gap-3">
//                   <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//             <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all">
//               Get Started
//             </button>
//           </div>

//           {/* Pro Plan */}
//           <div className={`glass-effect rounded-2xl p-8 transition-all ${selectedPlan === 'pro' ? 'ring-2 ring-purple-500 scale-105' : 'opacity-80'}`}>
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
//                 <div className="flex items-baseline">
//                   <span className="text-4xl font-bold">$29.99</span>
//                   <span className="text-gray-400 ml-2">/month</span>
//                 </div>
//               </div>
//               <span className="px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-sm">Premium</span>
//             </div>
//             <ul className="space-y-3 mb-8">
//               {plans.pro.features.map((feature, index) => (
//                 <li key={index} className="flex items-center gap-3">
//                   <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//             <button className="w-full py-3 gradient-bg-premium hover:opacity-90 rounded-lg font-semibold transition-all transform hover:-translate-y-1">
//               Upgrade to Pro
//             </button>
//           </div>
//         </div>

//         {/* Features Comparison */}
//         <div className="glass-effect rounded-2xl p-8 mt-12">
//           <h2 className="text-2xl font-bold mb-6">Plan Comparison</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-700">
//                   <th className="text-left py-4">Features</th>
//                   <th className="text-center py-4">Basic</th>
//                   <th className="text-center py-4">Pro</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b border-gray-800">
//                   <td className="py-4">Number of Alerts</td>
//                   <td className="text-center py-4">Up to 5</td>
//                   <td className="text-center py-4">Unlimited</td>
//                 </tr>
//                 <tr className="border-b border-gray-800">
//                   <td className="py-4">Notification Types</td>
//                   <td className="text-center py-4">Email Only</td>
//                   <td className="text-center py-4">Email + SMS</td>
//                 </tr>
//                 <tr className="border-b border-gray-800">
//                   <td className="py-4">Real-time Updates</td>
//                   <td className="text-center py-4">❌</td>
//                   <td className="text-center py-4">✅</td>
//                 </tr>
//                 <tr className="border-b border-gray-800">
//                   <td className="py-4">API Access</td>
//                   <td className="text-center py-4">❌</td>
//                   <td className="text-center py-4">✅</td>
//                 </tr>
//                 <tr>
//                   <td className="py-4">Priority Support</td>
//                   <td className="text-center py-4">❌</td>
//                   <td className="text-center py-4">✅</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import Footer from './Footer';

export default function SubscriptionPage() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch plans from backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/subscription-plans');
        if (response.ok) {
          const data = await response.json();
          setPlans(data);
          setSelectedPlan(data[0]?.id || null);
        } else {
          // Fallback to static data if API fails
          const fallbackPlans = [
            {
              id: 'basic',
              name: 'Basic Plan',
              price: 9.99,
              period: 'month',
              popular: true,
              features: [
                'Up to 5 crypto alerts',
                'Email notifications',
                'Basic price charts',
                '24-hour support',
                'BTC, ETH, SOL tracking'
              ]
            },
            {
              id: 'pro',
              name: 'Pro Plan',
              price: 29.99,
              period: 'month',
              popular: false,
              premium: true,
              features: [
                'Unlimited crypto alerts',
                'Email + SMS notifications',
                'Advanced price charts',
                'Real-time alerts',
                'All major cryptocurrencies',
                'Technical indicators',
                'Priority support',
                'API access'
              ]
            }
          ];
          setPlans(fallbackPlans);
          setSelectedPlan('basic');
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        // Use fallback data
        const fallbackPlans = [
          {
            id: 'basic',
            name: 'Basic Plan',
            price: 9.99,
            period: 'month',
            popular: true,
            features: [
              'Up to 5 crypto alerts',
              'Email notifications',
              'Basic price charts',
              '24-hour support',
              'BTC, ETH, SOL tracking'
            ]
          },
          {
            id: 'pro',
            name: 'Pro Plan',
            price: 29.99,
            period: 'month',
            popular: false,
            premium: true,
            features: [
              'Unlimited crypto alerts',
              'Email + SMS notifications',
              'Advanced price charts',
              'Real-time alerts',
              'All major cryptocurrencies',
              'Technical indicators',
              'Priority support',
              'API access'
            ]
          }
        ];
        setPlans(fallbackPlans);
        setSelectedPlan('basic');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
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

  const handleSubscribe = (plan) => {
    setCurrentPlan(plan);
    setShowPaymentForm(true);
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handlePayment = () => {
    setShowPaymentForm(false);
    setShowPaymentSuccess(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentSuccess(false);
    localStorage.setItem('paymentSuccess', 'true');
    navigate('/invoice', { state: { plan: currentPlan } });
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0a0f1e,#141c2e)', paddingTop: 80 }}>
          <div style={styles.loading}>
            <div>Loading subscription plans...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0a0f1e,#141c2e)', padding: window.innerWidth <= 768 ? 12 : 24, paddingTop: window.innerWidth <= 768 ? 68 : 80, color: 'white' }}>
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
                  {plan.premium && (
                    <span style={{ ...styles.badge, ...styles.premiumBadge }}>Premium</span>
                  )}
                  <button
                    style={{
                      ...styles.selectButton,
                      ...(selectedPlan === plan.id ? styles.selectedButton : {})
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe(plan);
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />

        {/* Payment Form Modal */}
        {showPaymentForm && (
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
              border: '1px solid rgba(255,255,255,.1)',
              borderRadius: '20px',
              padding: '40px',
              width: '500px',
              maxWidth: '90vw',
              color: 'white'
            }}>
              <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '700' }}>Payment Details</h2>
              <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#60a5fa' }}>{currentPlan?.name}</h3>
                <p style={{ margin: '0', fontSize: '28px', fontWeight: '700' }}>${currentPlan?.price}<span style={{ fontSize: '16px', color: '#94a3b8' }}>/{currentPlan?.period}</span></p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8' }}>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,.2)',
                  background: 'rgba(0,0,0,.3)',
                  color: 'white',
                  fontSize: '16px'
                }} />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8' }}>Expiry</label>
                  <input type="text" placeholder="MM/YY" style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,.2)',
                    background: 'rgba(0,0,0,.3)',
                    color: 'white',
                    fontSize: '16px'
                  }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8' }}>CVV</label>
                  <input type="text" placeholder="123" style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,.2)',
                    background: 'rgba(0,0,0,.3)',
                    color: 'white',
                    fontSize: '16px'
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
                <button
                  onClick={() => setShowPaymentForm(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,.2)',
                    background: 'transparent',
                    color: '#94a3b8',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  style={{
                    flex: 2,
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Process Payment
                </button>
              </div>
            </div>
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
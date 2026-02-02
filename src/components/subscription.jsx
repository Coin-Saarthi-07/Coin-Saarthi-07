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
              name: 'Basic',
              price: 9.99,
              period: 'month',
              popular: true,
              features: [
                '5 Crypto Alerts',
                'Email Notifications',
                'Basic Charts',
                '24/7 Support',
                'Major Coins Tracking'
              ]
            },
            {
              id: 'pro',
              name: 'Pro',
              price: 29.99,
              period: 'month',
              popular: false,
              premium: true,
              features: [
                'Unlimited Alerts',
                'Email + SMS',
                'Advanced Technical Charts',
                'Real-time Updates',
                'All 500+ Coins',
                'Priority Support',
                'API Access'
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
            name: 'Basic',
            price: 9.99,
            period: 'month',
            popular: true,
            features: [
              '5 Crypto Alerts',
              'Email Notifications',
              'Basic Charts',
              '24/7 Support',
              'Major Coins Tracking'
            ]
          },
          {
            id: 'pro',
            name: 'Pro',
            price: 29.99,
            period: 'month',
            popular: false,
            premium: true,
            features: [
              'Unlimited Alerts',
              'Email + SMS',
              'Advanced Technical Charts',
              'Real-time Updates',
              'All 500+ Coins',
              'Priority Support',
              'API Access'
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
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '32px',
      marginBottom: '60px'
    },
    planCard: {
      background: 'linear-gradient(145deg, #0f172a, #020617)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '24px',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    },
    selectedCard: {
      border: '1px solid #667eea',
      boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15)',
      transform: 'translateY(-8px)'
    },
    planHeader: {
      marginBottom: '32px',
      textAlign: 'center',
      position: 'relative'
    },
    planName: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '16px',
      color: '#ffffff',
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    },
    planPrice: {
      display: 'flex',
      justifyContent: 'center',
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
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginBottom: '40px'
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
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
      width: '100%',
      padding: '16px',
      borderRadius: '12px',
      fontWeight: '700',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'white',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      border: '1px solid rgba(255,255,255,0.1)'
    },
    selectedButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      boxShadow: '0 10px 20px rgba(118, 75, 162, 0.4)'
    },
    badge: {
      position: 'absolute',
      top: '-56px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: 'white',
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
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
    navigate('/invoice', {
      state: {
        plan: currentPlan,
        paymentDetails: {
          razorpayPaymentId: `pay_${Math.random().toString(36).substr(2, 9)}`,
          razorpayOrderId: `order_${Math.random().toString(36).substr(2, 9)}`,
          razorpaySignature: `sig_${Math.random().toString(36).substr(2, 20)}`
        }
      }
    });
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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0a0f1e,#141c2e)', padding: window.innerWidth <= 768 ? 12 : 24, paddingTop: window.innerWidth <= 768 ? 68 : 100, color: 'white' }}>
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
                {plan.popular || plan.premium ? (
                  <div style={styles.badge}>
                    {plan.premium ? 'Best Value' : 'Most Popular'}
                  </div>
                ) : null}

                <div style={styles.planHeader}>
                  <h3 style={styles.planName}>{plan.name} Plan</h3>
                  <div style={styles.planPrice}>
                    <span style={{ fontSize: '24px', color: '#64748b', alignSelf: 'start', marginTop: '8px' }}>$</span>
                    <span style={styles.priceAmount}>{Math.floor(plan.price)}</span>
                    <span style={{ fontSize: '24px', fontWeight: '700', color: 'white', alignSelf: 'start', marginTop: '8px' }}>{(plan.price % 1).toFixed(2).substring(1)}</span>
                    <span style={styles.planPeriod}>/{plan.period}</span>
                  </div>
                </div>

                <div style={styles.featuresList}>
                  {plan.features.map((feature, index) => (
                    <div key={index} style={styles.feature}>
                      <div style={styles.checkIcon}>✓</div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  style={{
                    ...styles.selectButton,
                    ...(selectedPlan === plan.id ? styles.selectedButton : {})
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubscribe(plan);
                  }}
                >
                  {selectedPlan === plan.id ? 'Get Started Now' : 'Select Plan'}
                </button>
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
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'linear-gradient(145deg, #1e293b, #0f172a)',
              border: '1px solid rgba(255,255,255,.1)',
              borderRadius: '24px',
              padding: '40px',
              width: '500px',
              maxWidth: '90vw',
              color: 'white',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
            }}>
              <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '800' }}>Payment Details</h2>
              <div style={{ marginBottom: '32px', padding: '24px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '4px' }}>Total Amount</div>
                  <div style={{ fontWeight: '700', fontSize: '24px' }}>${currentPlan?.price}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '4px' }}>Plan</div>
                  <div style={{ color: '#60a5fa', fontWeight: '600' }}>{currentPlan?.name}</div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px', fontWeight: '500' }}>Card Number</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" placeholder="0000 0000 0000 0000" style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,.1)',
                    background: 'rgba(0,0,0,.3)',
                    color: 'white',
                    fontSize: '16px',
                    fontFamily: 'monospace'
                  }} />
                  <span style={{ position: 'absolute', right: '14px', top: '14px', fontSize: '18px' }}>💳</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px', fontWeight: '500' }}>Expiry</label>
                  <input type="text" placeholder="MM/YY" style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,.1)',
                    background: 'rgba(0,0,0,.3)',
                    color: 'white',
                    fontSize: '16px'
                  }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px', fontWeight: '500' }}>CVV</label>
                  <input type="password" placeholder="123" style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,.1)',
                    background: 'rgba(0,0,0,.3)',
                    color: 'white',
                    fontSize: '16px'
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => setShowPaymentForm(false)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,.1)',
                    background: 'transparent',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '15px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  style={{
                    flex: 1.5,
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '15px',
                    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  Pay Now
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
    </>
  );
}
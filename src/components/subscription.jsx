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
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import Footer from './Footer';

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const navigate = useNavigate();

  const plans = {
    basic: {
      name: 'Basic Plan',
      price: '$9.99',
      period: 'month',
      features: [
        'Up to 5 crypto alerts',
        'Email notifications',
        'Basic price charts',
        '24-hour support',
        'BTC, ETH, SOL tracking'
      ]
    },
    pro: {
      name: 'Pro Plan',
      price: '$29.99',
      period: 'month',
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
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white',
      padding: '24px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '40px'
    },
    backLink: {
      color: '#60a5fa',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '24px',
      fontSize: '14px',
      transition: 'color 0.3s ease'
    },
    title: {
      fontSize: '36px',
      fontWeight: '700',
      marginBottom: '12px'
    },
    subtitle: {
      color: '#94a3b8',
      fontSize: '16px'
    },
    toggleContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '48px'
    },
    toggleWrapper: {
      background: 'rgba(30, 41, 59, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '4px',
      borderRadius: '12px',
      display: 'flex',
      gap: '4px'
    },
    toggleButton: {
      padding: '12px 32px',
      borderRadius: '8px',
      border: 'none',
      background: 'transparent',
      color: '#94a3b8',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px'
    },
    activeToggle: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    plansGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '32px',
      marginBottom: '48px'
    },
    planCard: {
      background: 'rgba(30, 41, 59, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '32px',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    highlightedCard: {
      transform: 'scale(1.05)',
      border: '2px solid',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    },
    planHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px'
    },
    planTitle: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '8px'
    },
    priceContainer: {
      display: 'flex',
      alignItems: 'baseline',
      marginBottom: '8px'
    },
    price: {
      fontSize: '36px',
      fontWeight: '700'
    },
    period: {
      color: '#94a3b8',
      fontSize: '16px',
      marginLeft: '8px'
    },
    badge: {
      padding: '4px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      color: 'white'
    },
    basicBadge: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
    },
    proBadge: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)'
    },
    featuresList: {
      listStyle: 'none',
      padding: '0',
      marginBottom: '32px'
    },
    featureItem: {
      padding: '8px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: '#e2e8f0'
    },
    checkIcon: {
      color: '#10b981',
      minWidth: '20px'
    },
    planButton: {
      width: '100%',
      padding: '16px',
      borderRadius: '12px',
      border: 'none',
      fontWeight: '600',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'white'
    },
    basicButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
    },
    proButton: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)'
    },
    comparison: {
      background: 'rgba(30, 41, 59, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '32px',
      marginTop: '48px'
    },
    comparisonTitle: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '24px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      borderBottom: '1px solid #334155',
      padding: '16px 0',
      textAlign: 'left',
      color: '#94a3b8',
      fontWeight: '600'
    },
    tableRow: {
      borderBottom: '1px solid #1e293b'
    },
    tableCell: {
      padding: '16px 0',
      color: '#e2e8f0'
    },
    centerCell: {
      textAlign: 'center'
    },
    check: {
      color: '#10b981',
      fontWeight: 'bold'
    },
    cross: {
      color: '#ef4444',
      fontWeight: 'bold'
    }
  };

  const handleSubscribe = (plan) => {
    setCurrentPlan(plans[plan]);
    setShowPaymentForm(true);
  };

  const handlePayment = () => {
    setShowPaymentForm(false);
    setShowPaymentSuccess(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentSuccess(false);
    localStorage.setItem('paymentSuccess', 'true');
    navigate('/dashboard');
  };

  const handleMouseEnter = (e) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = 'none';
  };

  const handleButtonHover = (e, isBasic) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = isBasic 
      ? '0 10px 25px rgba(59, 130, 246, 0.3)'
      : '0 10px 25px rgba(139, 92, 246, 0.3)';
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = 'none';
  };

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

        {/* Toggle Switch */}
        {/* <div style={styles.toggleContainer}>
          <div style={styles.toggleWrapper}>
            <button
              onClick={() => setSelectedPlan('basic')}
              style={{
                ...styles.toggleButton,
                ...(selectedPlan === 'basic' ? styles.activeToggle : {})
              }}
              onMouseEnter={(e) => {
                if (selectedPlan !== 'basic') {
                  e.target.style.background = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPlan !== 'basic') {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              Basic Plan
            </button>
            <button
              onClick={() => setSelectedPlan('pro')}
              style={{
                ...styles.toggleButton,
                ...(selectedPlan === 'pro' ? styles.activeToggle : {})
              }}
              onMouseEnter={(e) => {
                if (selectedPlan !== 'pro') {
                  e.target.style.background = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPlan !== 'pro') {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              Pro Plan
            </button>
          </div>
        </div> */}

        {/* Plan Cards */}
        <div style={styles.plansGrid}>
          {/* Basic Plan */}
          <div 
            style={{
              ...styles.planCard,
              ...(selectedPlan === 'basic' ? { ...styles.highlightedCard, borderColor: '#3b82f6' } : {}),
              opacity: selectedPlan === 'basic' ? 1 : 0.8
            }}
            onMouseEnter={(e) => {
              if (selectedPlan !== 'basic') {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedPlan !== 'basic') {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <div style={styles.planHeader}>
              <div>
                <h3 style={styles.planTitle}>Basic Plan</h3>
                <div style={styles.priceContainer}>
                  <span style={styles.price}>$9.99</span>
                  <span style={styles.period}>/month</span>
                </div>
              </div>
              <span style={{ ...styles.badge, ...styles.basicBadge }}>Popular</span>
            </div>
            
            <ul style={styles.featuresList}>
              {plans.basic.features.map((feature, index) => (
                <li key={index} style={styles.featureItem}>
                  <span style={styles.checkIcon}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <button 
              style={{ ...styles.planButton, ...styles.basicButton }}
              onClick={() => handleSubscribe('basic')}
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={handleButtonLeave}
            >
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div 
            style={{
              ...styles.planCard,
              ...(selectedPlan === 'pro' ? { ...styles.highlightedCard, borderColor: '#8b5cf6' } : {}),
              opacity: selectedPlan === 'pro' ? 1 : 0.8
            }}
            onMouseEnter={(e) => {
              if (selectedPlan !== 'pro') {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedPlan !== 'pro') {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <div style={styles.planHeader}>
              <div>
                <h3 style={styles.planTitle}>Pro Plan</h3>
                <div style={styles.priceContainer}>
                  <span style={styles.price}>$29.99</span>
                  <span style={styles.period}>/month</span>
                </div>
              </div>
              <span style={{ ...styles.badge, ...styles.proBadge }}>Premium</span>
            </div>
            
            <ul style={styles.featuresList}>
              {plans.pro.features.map((feature, index) => (
                <li key={index} style={styles.featureItem}>
                  <span style={styles.checkIcon}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <button 
              style={{ ...styles.planButton, ...styles.proButton }}
              onClick={() => handleSubscribe('pro')}
              onMouseEnter={(e) => handleButtonHover(e, false)}
              onMouseLeave={handleButtonLeave}
            >
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* Features Comparison */}
        <div style={styles.comparison}>
          <h2 style={styles.comparisonTitle}>Plan Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Features</th>
                  <th style={{ ...styles.tableHeader, textAlign: 'center' }}>Basic</th>
                  <th style={{ ...styles.tableHeader, textAlign: 'center' }}>Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell}>Number of Alerts</td>
                  <td style={{ ...styles.tableCell, ...styles.centerCell }}>Up to 5</td>
                  <td style={{ ...styles.tableCell, ...styles.centerCell }}>Unlimited</td>
                </tr>
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell}>Notification Types</td>
                  <td style={{ ...styles.tableCell, ...styles.centerCell }}>Email Only</td>
                  <td style={{ ...styles.tableCell, ...styles.centerCell }}>Email + SMS</td>
                </tr>
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell}>Real-time Updates</td>
                  <td style={{ ...styles.tableCell, ...styles.centerCell, ...styles.cross }}>✗</td>
                  <td style={{ ...styles.tableCell, ...styles.centerCell, ...styles.check }}>✓</td>
                </tr>
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell}>API Access</td>
                  <td style={{ ...styles.tableCell, ...styles.centerCell, ...styles.cross }}>✗</td>
                  <td style={{ ...styles.tableCell, ...styles.centerCell, ...styles.check }}>✓</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Priority Support</td>
                  <td style={{ ...styles.tableCell, ...styles.centerCell, ...styles.cross }}>✗</td>
                  <td style={{ ...styles.tableCell, ...styles.centerCell, ...styles.check }}>✓</td>
                </tr>
              </tbody>
            </table>
          </div>
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
              <p style={{ margin: '0', fontSize: '28px', fontWeight: '700' }}>{currentPlan?.price}<span style={{ fontSize: '16px', color: '#94a3b8' }}>/{currentPlan?.period}</span></p>
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
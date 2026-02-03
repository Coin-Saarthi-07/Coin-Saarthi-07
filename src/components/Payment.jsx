import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Footer from './Footer';
import { FaLock, FaCreditCard, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { plan: statePlan } = location.state || {};

    // Mock plan for direct access / testing
    const defaultPlan = {
        name: "Pro Plan (Mock)",
        price: "$49.99",
        period: "Monthly",
        features: ["Feature 1", "Feature 2", "Feature 3"]
    };

    const plan = statePlan || defaultPlan;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // useEffect(() => {
    //     if (!plan) {
    //         navigate('/subscription'); // Redirect if no plan selected
    //     }
    // }, [plan, navigate]);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true);
        setError('');

        const res = await loadRazorpayScript();

        if (!res) {
            setLoading(false);
            setError('Razorpay SDK failed to load. Are you online?');
            return;
        }

        try {
            // 1. Create Order on Backend
            // Replace with your actual backend endpoint
            const result = await axios.post('/api/payment/create-order', {
                amount: parseFloat(plan.price.replace('$', '')) * 100, // Amount in paise (assuming INR for Razorpay, or handle currency conversion)
                currency: 'INR', // Adjust currency as needed
                planId: plan.name
            });

            const { amount, id: order_id, currency } = result.data;

            const options = {
                key: 'YOUR_RAZORPAY_KEY_ID', // Enter the Key ID generated from the Dashboard
                amount: amount.toString(),
                currency: currency,
                name: 'Crypto Endgame',
                description: `Subscription for ${plan.name}`,
                image: '/assets/logo.png', // Optional logo
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    // 2. Verify Payment on Backend
                    const result = await axios.post('/api/payment/verify', data);

                    if (result.data.success) {
                        navigate('/invoice', {
                            state: {
                                plan: plan,
                                paymentDetails: {
                                    razorpayPaymentId: response.razorpay_payment_id,
                                    razorpayOrderId: response.razorpay_order_id,
                                    razorpaySignature: response.razorpay_signature
                                }
                            }
                        });
                    } else {
                        setError('Payment verification failed.');
                    }
                },
                prefill: {
                    name: 'User Name', // You can fetch this from auth context
                    email: 'user@example.com',
                    contact: '9999999999',
                },
                notes: {
                    address: 'Crypto Endgame Corporate Office',
                },
                theme: {
                    color: '#3b82f6',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (err) {
            console.error('Payment Error:', err);
            // For demo purposes, let's simulate success if backend fails (since we don't have a real backend responding here yet)
            // Remove this in production!
            // alert('Backend payment API not reachable. Simulating success for UI testing.');
            // navigate('/dashboard', { state: { paymentSuccess: true } });
            setError('Failed to initiate payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!plan) return null;

    const styles = {
        page: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: 'white',
            fontFamily: "'Segoe UI', sans-serif",
            paddingTop: '80px',
        },
        container: {
            maxWidth: '800px',
            margin: '0 auto',
            padding: '24px',
        },
        card: {
            background: 'linear-gradient(180deg, #1a1f26, #141922)',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            border: 'none',
        },
        header: {
            textAlign: 'center',
            marginBottom: '40px',
        },
        title: {
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '10px',
            background: 'linear-gradient(to right, #60a5fa, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        },
        subtitle: {
            color: '#94a3b8',
            fontSize: '16px',
        },
        summaryGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '24px',
            marginBottom: '40px',
        },
        summaryItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
        },
        itemLabel: {
            color: '#94a3b8',
            fontSize: '16px',
        },
        itemValue: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#fff',
        },
        totalRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            marginTop: '20px',
        },
        totalLabel: {
            fontSize: '20px',
            fontWeight: '600',
        },
        totalValue: {
            fontSize: '32px',
            fontWeight: '700',
            color: '#10b981',
        },
        payBtn: {
            width: '100%',
            padding: '18px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'all 0.3s ease',
            opacity: loading ? 0.7 : 1,
        },
        secureBadge: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#94a3b8',
            fontSize: '14px',
            marginTop: '24px',
        },
        error: {
            color: '#ef4444',
            textAlign: 'center',
            marginBottom: '20px',
            padding: '10px',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
        }
    };

    return (
        <>
            <NavBar />
            <div style={styles.page}>
                <div style={styles.container}>
                    <div style={styles.card}>
                        <div style={styles.header}>
                            <h1 style={styles.title}>Confirm Subscription</h1>
                            <p style={styles.subtitle}>Secure checkout powered by Razorpay</p>
                        </div>

                        <div style={styles.summaryGrid}>
                            <div style={styles.summaryItem}>
                                <span style={styles.itemLabel}>Selected Plan</span>
                                <span style={styles.itemValue}>{plan.name}</span>
                            </div>
                            <div style={styles.summaryItem}>
                                <span style={styles.itemLabel}>Billing Period</span>
                                <span style={styles.itemValue}>{plan.period}</span>
                            </div>
                            <div style={styles.summaryItem}>
                                <span style={styles.itemLabel}>Features</span>
                                <span style={{ fontSize: '14px', color: '#cbd5f5', textAlign: 'right' }}>
                                    {plan.features.length} Premium Features Included
                                </span>
                            </div>
                        </div>

                        <div style={styles.totalRow}>
                            <span style={styles.totalLabel}>Total Amount</span>
                            <span style={styles.totalValue}>{plan.price}</span>
                        </div>

                        {error && <div style={styles.error}>{error}</div>}

                        <button
                            style={styles.payBtn}
                            onClick={handlePayment}
                            disabled={loading}
                        >
                            {loading ? (
                                'Processing...'
                            ) : (
                                <>
                                    <FaLock /> Pay Securely
                                </>
                            )}
                        </button>

                        <div style={styles.secureBadge}>
                            <FaShieldAlt />
                            <span>256-bit SSL Encrypted Payment</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Payment;

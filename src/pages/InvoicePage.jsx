import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import authService from '../services/authService';

export default function InvoicePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const user = authService.getCurrentUser();

    const [invoiceData, setInvoiceData] = useState(null);

    useEffect(() => {
        if (!location.state?.plan && !location.state?.paymentId) {
            navigate("/subscription");
            return;
        }

        // If plan data is passed directly, use it for display
        if (location.state?.plan) {
            const plan = location.state.plan;
            setInvoiceData({
                invoiceId: 1703123456789,
                createdAt: new Date().toISOString(),
                amount: plan.price,
                userSubscription: {
                    subscriptionPlan: {
                        planName: plan.name,
                        duration: plan.period.replace(' days', ''),
                        features: plan.features
                    }
                },
                paymentId: 1703123457789
            });
            return;
        }

        // Fetch invoice data if paymentId is provided
        const fetchInvoice = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8080/crypto/admin/invoices/payment/${location.state.paymentId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setInvoiceData(res.data);

            } catch (err) {
                console.error(err);
                navigate("/subscription");
            }
        };

        fetchInvoice();
    }, []);



    if (!invoiceData) return null;

    const styles = {
        page: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: 'white',
            paddingTop: '100px',
            paddingBottom: '40px',
            fontFamily: "'Inter', sans-serif"
        },
        container: {
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 24px'
        },
        invoiceCard: {
            background: 'white',
            color: '#1e293b',
            borderRadius: '16px',
            padding: '48px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            marginBottom: '48px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '24px'
        },
        logo: {
            fontSize: '24px',
            fontWeight: '800',
            color: '#3b82f6',
            marginBottom: '8px'
        },
        companyInfo: {
            color: '#64748b',
            fontSize: '14px',
            lineHeight: '1.5'
        },
        invoiceDetails: {
            textAlign: 'right'
        },
        label: {
            color: '#64748b',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '4px'
        },
        value: {
            fontSize: '16px',
            fontWeight: '600',
            color: '#0f172a',
            marginBottom: '16px'
        },
        billTo: {
            marginBottom: '40px'
        },
        table: {
            width: '100%',
            marginBottom: '40px',
            borderCollapse: 'collapse'
        },
        th: {
            textAlign: 'left',
            padding: '12px 0',
            borderBottom: '1px solid #e2e8f0',
            color: '#64748b',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        },
        td: {
            padding: '16px 0',
            borderBottom: '1px solid #e2e8f0',
            color: '#0f172a',
            fontSize: '14px'
        },
        totalRow: {
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: '16px'
        },
        totalLabel: {
            marginRight: '32px',
            fontSize: '24px',
            fontWeight: '800',
            color: '#3b82f6'
        },
        totalAmount: {
            fontSize: '24px',
            fontWeight: '800',
            color: '#3b82f6'
        },
        actions: {
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '40px'
        },
        button: {
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '14px'
        },
        primaryBtn: {
            background: '#3b82f6',
            color: 'white',
            border: 'none'
        },
        secondaryBtn: {
            background: 'transparent',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)'
        }
    };

    return (
        <>
            <NavBar />
            <div style={styles.page}>
                <div style={styles.container}>
                    <div style={styles.invoiceCard} id="invoice">
                        {/* Header */}
                        <div style={styles.header}>
                            <div>
                                <div style={styles.logo}>COINSaarthi</div>
                                <div style={styles.companyInfo}>
                                    123 Crypto Street<br />
                                    Blockchain City, BC 10101
                                </div>
                            </div>
                            <div style={styles.invoiceDetails}>
                                <div style={styles.label}>Invoice Number</div>
                                <div style={styles.value}>#{String(invoiceData.invoiceId).slice(-5)}</div>
                                <div style={styles.label}>Date</div>
                                <div style={styles.value}>
                                    {new Date(invoiceData.createdAt).toLocaleDateString()}
                                </div>

                                <div style={styles.label}>Transaction ID</div>
                                <div style={styles.value}>
                                    {invoiceData.payment?.razorpayPaymentId || invoiceData.paymentId}
                                </div>

                            </div>
                        </div>

                        {/* Bill To */}
                        <div style={styles.billTo}>
                            <div style={styles.label}>Bill To</div>
                            <div style={{ ...styles.value, fontSize: '18px' }}>{user?.userName || 'Valued Customer'}</div>
                        </div>

                        {/* Items Table */}
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Description</th>
                                    <th style={styles.th}>Billing Period</th>
                                    <th style={{ ...styles.th, textAlign: 'right' }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ ...styles.td, fontWeight: '600' }}>
                                        {invoiceData.userSubscription?.subscriptionPlan?.planName} Subscription
                                        {invoiceData.userSubscription?.subscriptionPlan?.features && (
                                            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                                                {invoiceData.userSubscription.subscriptionPlan.features.join(', ')}
                                            </div>
                                        )}
                                    </td>

                                    <td style={styles.td}>
                                        {invoiceData.userSubscription?.subscriptionPlan?.duration} days
                                    </td>

                                    <td style={{ ...styles.td, textAlign: 'right', fontWeight: '600' }}>
                                        ₹{invoiceData.amount}
                                    </td>

                                </tr>
                            </tbody>
                        </table>

                        {/* Total */}
                        <div style={styles.totalRow}>
                            <span style={styles.totalLabel}>Total</span>
                            <span style={styles.totalAmount}>₹{invoiceData.amount}</span>

                        </div>

                        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px', textAlign: 'center' }}>
                            Thank you for your business! If you have any questions, please contact support@COINSaarthi.com
                        </div>
                    </div>

                    <div style={styles.actions}>
                        <button
                            style={{ ...styles.button, ...styles.secondaryBtn }}
                            onClick={() => navigate('/subscription')}
                        >
                            Back to Dashboard
                        </button>
                        <button
                            style={{ ...styles.button, ...styles.primaryBtn }}
                            onClick={() => window.print()}
                        >
                            Print Invoice
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

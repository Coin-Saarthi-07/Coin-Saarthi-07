import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import invoiceService from '../services/invoiceService';
import { toast } from 'react-toastify';

export default function InvoicePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [invoiceData, setInvoiceData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (location.state && location.state.plan) {
            setInvoiceData({
                plan: location.state.plan,
                paymentDetails: location.state.paymentDetails || {}, // Get payment details
                date: new Date().toLocaleDateString(),
                invoiceNumber: `INV-${Math.floor(Math.random() * 1000000)}`,
                transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
            });
        } else {
            // Fallback for testing or direct access
            setInvoiceData({
                plan: { name: 'Pro Plan', price: '$29.99', period: 'month' },
                paymentDetails: {
                    razorpayPaymentId: "mock_pay_id",
                    razorpayOrderId: "mock_order_id",
                    razorpaySignature: "mock_sig"
                },
                date: new Date().toLocaleDateString(),
                invoiceNumber: `INV-${Math.floor(Math.random() * 1000000)}`,
                transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
            });
        }
    }, [location]);

    const handleSaveInvoice = async () => {
        if (!invoiceData) return;

        setIsSaving(true);
        try {
            const amount = parseFloat(invoiceData.plan.price.toString().replace(/[^0-9.]/g, ''));
            const now = new Date();
            const nextMonth = new Date(now);
            nextMonth.setMonth(now.getMonth() + 1);

            const payload = {
                invoiceId: 0,
                payment: {
                    paymentId: 0,
                    razorpayOrderId: invoiceData.paymentDetails.razorpayOrderId || "N/A",
                    razorpayPaymentId: invoiceData.paymentDetails.razorpayPaymentId || "N/A",
                    razorpaySignature: invoiceData.paymentDetails.razorpaySignature || "N/A",
                    paymentMethod: "UPI",
                    amount: amount,
                    status: "SUCCESS", // Assuming success
                    currencyCode: "USD",
                    transactionId: invoiceData.transactionId,
                    paymentTime: now.toISOString()
                },
                userSubscription: {
                    userSubscriptionId: 0,
                    startDate: now.toISOString().split('T')[0],
                    endDate: nextMonth.toISOString().split('T')[0],
                    status: "ACTIVE",
                    invoices: []
                },
                amount: amount,
                invoicePaymentStatus: "SUCCESS",
                createdAt: now.toISOString()
            };

            await invoiceService.createInvoice(payload);
            toast.success('Invoice saved successfully!');
        } catch (error) {
            console.error('Failed to save invoice:', error);
            toast.error('Failed to save invoice.');
        } finally {
            setIsSaving(false);
        }
    };

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
            fontSize: '18px',
            fontWeight: '600',
            color: '#0f172a'
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
        },
        successBtn: {
            background: '#10b981',
            color: 'white',
            border: 'none'
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
                                <div style={styles.value}>#{invoiceData.invoiceNumber}</div>
                                <div style={styles.label}>Date</div>
                                <div style={styles.value}>{invoiceData.date}</div>
                                <div style={styles.label}>Transaction ID</div>
                                <div style={styles.value}>{invoiceData.transactionId}</div>
                            </div>
                        </div>

                        {/* Bill To */}
                        <div style={styles.billTo}>
                            <div style={styles.label}>Bill To</div>
                            <div style={{ ...styles.value, fontSize: '18px' }}>Valued Customer</div>
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
                                    <td style={{ ...styles.td, fontWeight: '600' }}>{invoiceData.plan.name} Subscription</td>
                                    <td style={styles.td}>1 {invoiceData.plan.period}</td>
                                    <td style={{ ...styles.td, textAlign: 'right', fontWeight: '600' }}>{invoiceData.plan.price}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Total */}
                        <div style={styles.totalRow}>
                            <span style={styles.totalLabel}>Total</span>
                            <span style={styles.totalAmount}>{invoiceData.plan.price}</span>
                        </div>

                        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', color: '#64748b', fontSize: '13px', textAlign: 'center' }}>
                            Thank you for your business! If you have any questions, please contact support@COINSaarthi.com
                        </div>
                    </div>

                    <div style={styles.actions}>
                        <button
                            style={{ ...styles.button, ...styles.secondaryBtn }}
                            onClick={() => navigate('/dashboard')}
                        >
                            Back to Dashboard
                        </button>
                        <button
                            style={{ ...styles.button, ...styles.successBtn }}
                            onClick={handleSaveInvoice}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Invoice'}
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

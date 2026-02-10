import React, { useState } from 'react';

const SubscriptionForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    planName: '',
    planPrice: '',
    duration: '30',
    features: ''
  });

  const [errors, setErrors] = useState({});

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modal: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '32px',
      maxWidth: '450px',
      width: '90%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#f1f5f9',
      margin: 0
    },
    closeBtn: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#94a3b8',
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      color: '#e2e8f0',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      background: 'rgba(15, 23, 42, 0.6)',
      border: '1px solid #334155',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '10px',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    textarea: {
      width: '100%',
      background: 'rgba(15, 23, 42, 0.6)',
      border: '1px solid #334155',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '10px',
      fontSize: '14px',
      minHeight: '100px',
      resize: 'vertical',
      transition: 'all 0.3s ease',
      outline: 'none',
      fontFamily: 'inherit'
    },
    select: {
      width: '100%',
      background: 'rgba(15, 23, 42, 0.6)',
      border: '1px solid #334155',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '10px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    error: {
      color: '#ef4444',
      fontSize: '12px',
      marginTop: '4px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      marginTop: '24px'
    },
    submitBtn: {
      flex: 1,
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      border: 'none',
      color: 'white',
      padding: '14px',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    cancelBtn: {
      flex: 1,
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      color: '#ef4444',
      padding: '14px',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    charCount: {
      fontSize: '12px',
      color: '#94a3b8',
      textAlign: 'right',
      marginTop: '4px'
    },
    required: {
      color: '#ef4444',
      marginLeft: '2px'
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Plan Name validation (letters and spaces only)
    if (!formData.planName.trim()) {
      newErrors.planName = 'Plan name is required';
    } else if (!/^[A-Za-z ]+$/.test(formData.planName)) {
      newErrors.planName = 'Plan name must contain letters and spaces only';
    }

    // Plan Price validation (0-500)
    if (!formData.planPrice) {
      newErrors.planPrice = 'Plan price is required';
    } else {
      const price = parseFloat(formData.planPrice);
      if (isNaN(price) || price < 0 || price > 500) {
        newErrors.planPrice = 'Plan price must be between ₹0 and ₹500';
      }
    }

    // Duration validation (1-365)
    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
    } else {
      const durationNum = parseInt(formData.duration);
      if (isNaN(durationNum) || durationNum < 1 || durationNum > 365) {
        newErrors.duration = 'Duration must be between 1 and 365 days';
      }
    }

    // Features validation (20-100 characters)
    if (!formData.features.trim()) {
      newErrors.features = 'Features are required';
    } else if (formData.features.length < 20) {
      newErrors.features = 'Features must contain at least 20 characters';
    } else if (formData.features.length > 100) {
      newErrors.features = 'Features must contain less than 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const subscriptionPlan = {
  planName: formData.planName.trim(),
  planPrice: Number(formData.planPrice),
  duration: Number(formData.duration),
  features: formData.features.trim()
};


  onSubmit(subscriptionPlan); // ✅ let parent handle API

  // reset only after successful submit
  setFormData({
    planName: '',
    planPrice: '',
    duration: '30',
    features: ''
  });

  setErrors({});
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Add New Subscription Plan</h2>
          <button 
            style={styles.closeBtn}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Plan Name */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Plan Name<span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="planName"
              value={formData.planName}
              onChange={handleChange}
              placeholder="e.g., Basic Plan, Pro Plan"
              style={{
                ...styles.input,
                borderColor: errors.planName ? '#ef4444' : '#334155'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.planName ? '#ef4444' : '#334155';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.planName && <div style={styles.error}>{errors.planName}</div>}
          </div>

          {/* Plan Price */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Plan Price (₹)<span style={styles.required}>*</span>
            </label>
            <input
              type="number"
              name="planPrice"
              value={formData.planPrice}
              onChange={handleChange}
              placeholder="e.g., 9.99"
              min="0"
              max="500"
              step="0.01"
              style={{
                ...styles.input,
                borderColor: errors.planPrice ? '#ef4444' : '#334155'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.planPrice ? '#ef4444' : '#334155';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.planPrice && <div style={styles.error}>{errors.planPrice}</div>}
          </div>

          {/* Duration */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Duration (Days)<span style={styles.required}>*</span>
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              style={{
                ...styles.select,
                borderColor: errors.duration ? '#ef4444' : '#334155'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.duration ? '#ef4444' : '#334155';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Select duration</option>
              <option value="7">7 days (Weekly)</option>
              <option value="30">30 days (Monthly)</option>
              <option value="90">90 days (Quarterly)</option>
              <option value="180">180 days (Half Yearly)</option>
              <option value="365">365 days (Yearly)</option>
            </select>
            {errors.duration && <div style={styles.error}>{errors.duration}</div>}
          </div>

          {/* Features */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Features<span style={styles.required}>*</span>
            </label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Describe the features of this plan (20-100 characters)"
              style={{
                ...styles.textarea,
                borderColor: errors.features ? '#ef4444' : '#334155'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.features ? '#ef4444' : '#334155';
                e.target.style.boxShadow = 'none';
              }}
            />
            <div style={styles.charCount}>
              {formData.features.length}/100 characters
            </div>
            {errors.features && <div style={styles.error}>{errors.features}</div>}
          </div>

          {/* Submit Buttons */}
          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={styles.submitBtn}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Create Plan
            </button>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
// import React, { useState } from 'react';

// const AddUser = ({ onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     plan: 'basic',
//     status: 'active',
//     alertsLimit: '5'
//   });

//   const [errors, setErrors] = useState({});

//   const styles = {
//     overlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: 'rgba(0, 0, 0, 0.7)',
//       backdropFilter: 'blur(5px)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 1000,
//       padding: '20px'
//     },
//     modal: {
//       background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
//       border: '1px solid rgba(255, 255, 255, 0.1)',
//       borderRadius: '20px',
//       padding: '32px',
//       maxWidth: '500px',
//       width: '100%',
//       maxHeight: '90vh',
//       overflowY: 'auto',
//       boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
//     },
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '24px'
//     },
//     title: {
//       fontSize: '24px',
//       fontWeight: '700',
//       color: '#f1f5f9',
//       margin: 0
//     },
//     closeBtn: {
//       background: 'rgba(255, 255, 255, 0.05)',
//       border: '1px solid rgba(255, 255, 255, 0.1)',
//       color: '#94a3b8',
//       width: '36px',
//       height: '36px',
//       borderRadius: '10px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease'
//     },
//     formGroup: {
//       marginBottom: '20px'
//     },
//     label: {
//       display: 'block',
//       color: '#e2e8f0',
//       fontSize: '14px',
//       fontWeight: '500',
//       marginBottom: '8px'
//     },
//     input: {
//       width: '100%',
//       background: 'rgba(15, 23, 42, 0.6)',
//       border: '1px solid #334155',
//       color: 'white',
//       padding: '12px 16px',
//       borderRadius: '10px',
//       fontSize: '14px',
//       transition: 'all 0.3s ease',
//       outline: 'none'
//     },
//     select: {
//       width: '100%',
//       background: 'rgba(15, 23, 42, 0.6)',
//       border: '1px solid #334155',
//       color: 'white',
//       padding: '12px 16px',
//       borderRadius: '10px',
//       fontSize: '14px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       outline: 'none'
//     },
//     radioGroup: {
//       display: 'flex',
//       gap: '20px',
//       marginTop: '8px'
//     },
//     radioLabel: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       cursor: 'pointer',
//       fontSize: '14px',
//       color: '#e2e8f0'
//     },
//     radioInput: {
//       width: '18px',
//       height: '18px',
//       accentColor: '#3b82f6',
//       cursor: 'pointer'
//     },
//     error: {
//       color: '#ef4444',
//       fontSize: '12px',
//       marginTop: '4px'
//     },
//     buttonGroup: {
//       display: 'flex',
//       gap: '12px',
//       marginTop: '32px'
//     },
//     submitBtn: {
//       flex: 1,
//       background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
//       border: 'none',
//       color: 'white',
//       padding: '14px',
//       borderRadius: '10px',
//       fontSize: '16px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease'
//     },
//     cancelBtn: {
//       flex: 1,
//       background: 'rgba(255, 255, 255, 0.05)',
//       border: '1px solid rgba(255, 255, 255, 0.1)',
//       color: '#94a3b8',
//       padding: '14px',
//       borderRadius: '10px',
//       fontSize: '16px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease'
//     },
//     required: {
//       color: '#ef4444',
//       marginLeft: '2px'
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Name validation
//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     }

//     // Email validation
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     // Phone validation
//     if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
//       newErrors.phone = 'Please enter a valid 10-digit phone number';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       const userData = {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone || null,
//         plan: formData.plan,
//         status: formData.status,
//         alertsLimit: parseInt(formData.alertsLimit),
//         createdAt: new Date().toISOString()
//       };
      
//       // Here you would typically make an API call
//       console.log('Creating user:', userData);
      
//       if (onSubmit) {
//         onSubmit(userData);
//       }
      
//       // Reset form
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         plan: 'basic',
//         status: 'active',
//         alertsLimit: '5'
//       });
//       setErrors({});
      
//       if (onClose) {
//         onClose();
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   return (
//     <div style={styles.overlay} onClick={onClose}>
//       <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
//         <div style={styles.header}>
//           <h2 style={styles.title}>Add New User</h2>
//           <button 
//             style={styles.closeBtn}
//             onClick={onClose}
//             onMouseEnter={(e) => {
//               e.target.style.background = 'rgba(255, 255, 255, 0.1)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = 'rgba(255, 255, 255, 0.05)';
//             }}
//           >
//             ✕
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {/* Name */}
//           <div style={styles.formGroup}>
//             <label style={styles.label}>
//               Full Name<span style={styles.required}>*</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter full name"
//               style={{
//                 ...styles.input,
//                 borderColor: errors.name ? '#ef4444' : '#334155'
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = '#8b5cf6';
//                 e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = errors.name ? '#ef4444' : '#334155';
//                 e.target.style.boxShadow = 'none';
//               }}
//             />
//             {errors.name && <div style={styles.error}>{errors.name}</div>}
//           </div>

//           {/* Email */}
//           <div style={styles.formGroup}>
//             <label style={styles.label}>
//               Email Address<span style={styles.required}>*</span>
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter email address"
//               style={{
//                 ...styles.input,
//                 borderColor: errors.email ? '#ef4444' : '#334155'
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = '#8b5cf6';
//                 e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = errors.email ? '#ef4444' : '#334155';
//                 e.target.style.boxShadow = 'none';
//               }}
//             />
//             {errors.email && <div style={styles.error}>{errors.email}</div>}
//           </div>

//           {/* Phone */}
//           <div style={styles.formGroup}>
//             <label style={styles.label}>
//               Phone Number (Optional)
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Enter 10-digit phone number"
//               style={{
//                 ...styles.input,
//                 borderColor: errors.phone ? '#ef4444' : '#334155'
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = '#8b5cf6';
//                 e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = errors.phone ? '#ef4444' : '#334155';
//                 e.target.style.boxShadow = 'none';
//               }}
//             />
//             {errors.phone && <div style={styles.error}>{errors.phone}</div>}
//           </div>

//           {/* Subscription Plan */}
//           <div style={styles.formGroup}>
//             <label style={styles.label}>
//               Subscription Plan<span style={styles.required}>*</span>
//             </label>
//             <select
//               name="plan"
//               value={formData.plan}
//               onChange={handleChange}
//               style={styles.select}
//             >
//               <option value="basic">Basic Plan</option>
//               <option value="pro">Pro Plan</option>
//               <option value="enterprise">Enterprise Plan</option>
//               <option value="trial">Trial</option>
//             </select>
//           </div>

//           {/* Status */}
//           <div style={styles.formGroup}>
//             <label style={styles.label}>
//               Account Status<span style={styles.required}>*</span>
//             </label>
//             <div style={styles.radioGroup}>
//               <label style={styles.radioLabel}>
//                 <input
//                   type="radio"
//                   name="status"
//                   value="active"
//                   checked={formData.status === 'active'}
//                   onChange={handleChange}
//                   style={styles.radioInput}
//                 />
//                 <span>Active</span>
//               </label>
//               <label style={styles.radioLabel}>
//                 <input
//                   type="radio"
//                   name="status"
//                   value="inactive"
//                   checked={formData.status === 'inactive'}
//                   onChange={handleChange}
//                   style={styles.radioInput}
//                 />
//                 <span>Inactive</span>
//               </label>
//               <label style={styles.radioLabel}>
//                 <input
//                   type="radio"
//                   name="status"
//                   value="suspended"
//                   checked={formData.status === 'suspended'}
//                   onChange={handleChange}
//                   style={styles.radioInput}
//                 />
//                 <span>Suspended</span>
//               </label>
//             </div>
//           </div>

//           {/* Alerts Limit */}
//           <div style={styles.formGroup}>
//             <label style={styles.label}>
//               Alerts Limit<span style={styles.required}>*</span>
//             </label>
//             <select
//               name="alertsLimit"
//               value={formData.alertsLimit}
//               onChange={handleChange}
//               style={styles.select}
//             >
//               <option value="3">3 alerts</option>
//               <option value="5">5 alerts (Basic)</option>
//               <option value="10">10 alerts</option>
//               <option value="20">20 alerts</option>
//               <option value="50">50 alerts (Pro)</option>
//               <option value="9999">Unlimited (Enterprise)</option>
//             </select>
//           </div>

//           {/* Submit Buttons */}
//           <div style={styles.buttonGroup}>
//             <button
//               type="submit"
//               style={styles.submitBtn}
//               onMouseEnter={(e) => {
//                 e.target.style.transform = 'translateY(-2px)';
//                 e.target.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.3)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.transform = 'translateY(0)';
//                 e.target.style.boxShadow = 'none';
//               }}
//             >
//               Create User
//             </button>
//             <button
//               type="button"
//               style={styles.cancelBtn}
//               onClick={onClose}
//               onMouseEnter={(e) => {
//                 e.target.style.transform = 'translateY(-2px)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.transform = 'translateY(0)';
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddUser;


import React, { useState } from 'react';

const AddUser = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'basic',
    status: 'active',
    alertsLimit: '5'
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
      width: '90%', // Changed from 100% to 90%
      maxWidth: '450px', // Reduced from 500px
      maxHeight: '85vh', // Reduced from 90vh
      overflowY: 'auto',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
      margin: 'auto' // Center horizontally
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
    radioGroup: {
      display: 'flex',
      gap: '20px',
      marginTop: '8px',
      flexWrap: 'wrap' // Added for better responsiveness
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#e2e8f0',
      marginBottom: '4px' // Added spacing
    },
    radioInput: {
      width: '18px',
      height: '18px',
      accentColor: '#3b82f6',
      cursor: 'pointer'
    },
    error: {
      color: '#ef4444',
      fontSize: '12px',
      marginTop: '4px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      marginTop: '32px'
    },
    submitBtn: {
      flex: 1,
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#94a3b8',
      padding: '14px',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    required: {
      color: '#ef4444',
      marginLeft: '2px'
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        plan: formData.plan,
        status: formData.status,
        alertsLimit: parseInt(formData.alertsLimit),
        createdAt: new Date().toISOString()
      };
      
      // Here you would typically make an API call
      console.log('Creating user:', userData);
      
      if (onSubmit) {
        onSubmit(userData);
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        plan: 'basic',
        status: 'active',
        alertsLimit: '5'
      });
      setErrors({});
      
      if (onClose) {
        onClose();
      }
    }
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
          <h2 style={styles.title}>Add New User</h2>
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
          {/* Name */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Full Name<span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              style={{
                ...styles.input,
                borderColor: errors.name ? '#ef4444' : '#334155'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.name ? '#ef4444' : '#334155';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.name && <div style={styles.error}>{errors.name}</div>}
          </div>

          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Email Address<span style={styles.required}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              style={{
                ...styles.input,
                borderColor: errors.email ? '#ef4444' : '#334155'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email ? '#ef4444' : '#334155';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.email && <div style={styles.error}>{errors.email}</div>}
          </div>

          {/* Phone */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              style={{
                ...styles.input,
                borderColor: errors.phone ? '#ef4444' : '#334155'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.phone ? '#ef4444' : '#334155';
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.phone && <div style={styles.error}>{errors.phone}</div>}
          </div>

          {/* Subscription Plan */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Subscription Plan<span style={styles.required}>*</span>
            </label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="basic">Basic Plan</option>
              <option value="pro">Pro Plan</option>
              <option value="enterprise">Enterprise Plan</option>
              <option value="trial">Trial</option>
            </select>
          </div>

          {/* Status */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Account Status<span style={styles.required}>*</span>
            </label>
            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === 'active'}
                  onChange={handleChange}
                  style={styles.radioInput}
                />
                <span>Active</span>
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === 'inactive'}
                  onChange={handleChange}
                  style={styles.radioInput}
                />
                <span>Inactive</span>
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="status"
                  value="suspended"
                  checked={formData.status === 'suspended'}
                  onChange={handleChange}
                  style={styles.radioInput}
                />
                <span>Suspended</span>
              </label>
            </div>
          </div>

          {/* Alerts Limit */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Alerts Limit<span style={styles.required}>*</span>
            </label>
            <select
              name="alertsLimit"
              value={formData.alertsLimit}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="3">3 alerts</option>
              <option value="5">5 alerts (Basic)</option>
              <option value="10">10 alerts</option>
              <option value="20">20 alerts</option>
              <option value="50">50 alerts (Pro)</option>
              <option value="9999">Unlimited (Enterprise)</option>
            </select>
          </div>

          {/* Submit Buttons */}
          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={styles.submitBtn}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Create User
            </button>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
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

export default AddUser;
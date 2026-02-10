import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Subscription from "./components/subscription";

import InvoicePage from "./pages/InvoicePage";
import AdminRoute from "./routes/AdminRoute";
import PaperTradingDashboard from "./components/PaperTradingDashboard";
import PaperTrading from "./components/PaperTrading";
import PortfolioDetail from "./components/PortfolioDetail";
import TransactionHistory from "./components/TransactionHistory";
import Payment from "./components/Payment";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import RoleRoute from "./routes/RoleRoute";
import ChatBot from "./components/ChatBot";
import { useAuth } from "./context/AuthContext";

import Layout from "./components/Layout";

function App() {
  const { user } = useAuth();
  // Check if user is subscriber or admin for ChatBot visibility
  const showChatBot = user?.role?.toUpperCase() === 'SUBSCRIBER' || user?.role?.toUpperCase() === 'ADMIN';

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/invoice" element={<InvoicePage />} />

          {/* 🔐 User Dashboard */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />
          {/* Paper Trading Routes */}
          <Route path="/paper-trading/dashboard" element={
            <ProtectedRoute>
              <PaperTradingDashboard />
            </ProtectedRoute>
          } />

          <Route path="/paper-trading/trade" element={
            <ProtectedRoute>
              <PaperTrading />
            </ProtectedRoute>
          } />

          <Route path="/paper-trading/portfolio" element={
            <ProtectedRoute>
              <PortfolioDetail />
            </ProtectedRoute>
          } />

          <Route path="/paper-trading/transactions" element={
            <TransactionHistory />
          } />
          <Route path="/payment" element={
            <Payment />
          } />

          {/* 🔐 Admin Dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* 🔐 Subscription */}
          <Route path="/subscription" element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          } />


          {/* 🔐 Invoice */}
          <Route path="/invoice" element={<InvoicePage />} />
        </Route>



        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>
      {showChatBot && <ChatBot />}
    </Router>
  );
}

export default App;

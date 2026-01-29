import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Subscription from "./components/subscription";
import AdminRoute from "./routes/AdminRoute";
import PaperTradingDashboard from "./components/PaperTradingDashboard";
import PaperTrading from "./components/PaperTrading";
import PortfolioDetail from "./components/PortfolioDetail";
import TransactionHistory from "./components/TransactionHistory";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        {/* 🔐 User Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        {/* Paper Trading Routes */}
        <Route path="/paper-trading/dashboard" element={

          <PaperTradingDashboard />

        } />

        <Route path="/paper-trading/trade" element={

          <PaperTrading />

        } />

        <Route path="/paper-trading/portfolio" element={

          <PortfolioDetail />

        } />

        <Route path="/paper-trading/transactions" element={

          <TransactionHistory />

        } />

        {/* 🔐 Admin Dashboard */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <RoleRoute role="Admin">
              <AdminDashboard />
            </RoleRoute>
          </ProtectedRoute>
        } />

        {/* 🔐 Subscription */}
        <Route path="/subscription" element={
          <ProtectedRoute>
            <Subscription />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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

        <Route path="/invoice" element={<InvoicePage />} />

        {/* 🔐 User Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        {/* 🔐 Admin Dashboard */}
        {/* <Route path="/admin/dashboard" element={
>>>>>>> 1bf93c58d7cfc0df9de5ce791442f6b74cd6f0f6
          <ProtectedRoute>
            <RoleRoute role="Admin">
              <AdminDashboard />
            </RoleRoute>
          </ProtectedRoute>

        } /> */}

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* 🔐 Subscription */}
        <Route path="/subscription" element={
          <ProtectedRoute>
            <Subscription />
          </ProtectedRoute>
        } />


        {/* 🔐 Invoice
        <Route path="/invoice" element={
          <ProtectedRoute>
            <InvoicePage />
          </ProtectedRoute>
        } /> */}
        <Route path="/invoice" element={<InvoicePage />} />

        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>
    </Router>
  );
}

export default App;

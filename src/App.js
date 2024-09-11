// CSS IMPORT
import "./assets/CSS/style.css";
import "./assets/CSS/responsive.css";
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { HomeAdminDashboard, Login, UserBilling, UserListing } from "./screens";
import { PrivateRoute, ScrollToTop } from "./components";
import { useSelector } from "react-redux";


const App = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<PrivateRoute element={HomeAdminDashboard} />} />
        <Route path="/user-listing" element={<PrivateRoute element={UserListing} />} />
        <Route path="/user-billing" element={<PrivateRoute element={UserBilling} />} />
      </Routes>
    </>
  )
}

export default App
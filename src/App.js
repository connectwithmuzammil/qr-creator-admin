// CSS IMPORT
import "./assets/CSS/style.css";
import "./assets/CSS/responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  HomeAdminDashboard,
  Login,
  UserAnalytics,
  UserBilling,
  UserListing,
  UserSubscription,
} from "./screens";
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
        <Route
          path="/dashboard"
          element={<PrivateRoute element={HomeAdminDashboard} />}
        />
        <Route
          path="/user-listing"
          element={<PrivateRoute element={UserListing} />}
        />
        <Route
          path="/user-billing"
          element={<PrivateRoute element={UserBilling} />}
        />
        <Route
          path="/user-finance"
          element={<PrivateRoute element={UserSubscription} />}
        />
        <Route
          path="/user-analytics"
          element={<PrivateRoute element={UserAnalytics} />}
        />
      </Routes>
    </>
  );
};

export default App;

// const App = () => {
//   return (
//     <div style={{ height: "100vh", paddingInline: "40px", display: "flex", alignItems: "center" }}>
//       <h2 style={{fontFamily:"poppins",color:"red",textAlign:"center"}}>Development on this project has been paused because the developer has not been compensated. Please make the pending payment to resume work and regain access to the full functionality of the website.</h2>
//     </div>
//   )
// }

// export default App

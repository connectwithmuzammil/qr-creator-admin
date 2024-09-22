import React from "react";
import { Sidebar } from "../components";
import {
  FaUser,
  FaEnvelope,
  FaBell,
  FaRegCreditCard,
  FaQrcode,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";
import apis from "../services";
import { useQuery } from "@tanstack/react-query";

const HomeAdminDashboard = () => {
  const {
    isLoading,
    error,
    data: { data: getAllUserCount } = {},
  } = useQuery({
    queryKey: ["allUserCount"],
    queryFn: () => apis.allUserCount(),
    onError: (error) => {
      console.error("Error geting Order History:", error);
      // toast.error("Failed to fetch products. Please try again later.");
    },
  });
  console.log("getAllUserCount", getAllUserCount);
  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <div className="loaderr" />
      </div>
    );
  }
  return (
    <div className="qr-main-page">
      <div className="userDashboard">
        <Sidebar />
        <div className="content-page">
          <h1>ADMIN DASHBOARD</h1>
          <div className="cards-container">
            <div className="cardd">
              <FaUser className="card-icon" />
              <h3>Total Users</h3>
              <p>
                {getAllUserCount?.total_users
                  ? getAllUserCount?.total_users
                  : "0"}
              </p>
            </div>
            <div className="cardd">
              <FaUserCheck className="card-icon" />
              <h3>Subscribe Users</h3>
              <p>
                {getAllUserCount?.sub_users ? getAllUserCount?.sub_users : "0"}
              </p>
            </div>
            <div className="cardd">
              <FaUserTimes className="card-icon" />
              <h3>UnSubscribe Users</h3>
              <p>
                {getAllUserCount?.unsub_users
                  ? getAllUserCount?.unsub_users
                  : "0"}
              </p>
            </div>
            {/* <div className="cardd">
              <FaEnvelope className="card-icon" />
              <h3>Subscribed Users</h3>
              <p>{getAllUserCount?.active_users}</p>
            </div> */}
            {/* <div className="cardd ">
              <FaBell className="card-icon" />
              <h3>Unsubscribed Users</h3>
              <p>{getAllUserCount?.inactive_users}</p>
            </div> */}
            <div className="cardd ">
              <FaRegCreditCard className="card-icon" />
              <h3>Total Subscription</h3>
              <p>
                {getAllUserCount?.total_subscription
                  ? getAllUserCount?.total_subscription
                  : "0"}
              </p>
            </div>
            <div className="cardd full-width">
              <FaQrcode className="card-icon" />
              <h3>Total QR-Scan</h3>
              <p>
                {getAllUserCount?.total_qr_scan
                  ? getAllUserCount?.total_qr_scan
                  : "0"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdminDashboard;
// import React from "react";
// import {Sidebar} from "../components";

// const HomeAdminDashboard = () => {
//   return (
//     <div className="qr-main-page">
//       <div className="userDashboard">
//         <Sidebar />
//         <div className="content-page">
//             <h1>ADMIN DASHBOARD</h1>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeAdminDashboard;

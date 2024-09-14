import React from "react";
import { Sidebar } from "../components";
import apis from "../services";
import { useQuery } from "@tanstack/react-query";

const UserSubscription = () => {
  const {
    isLoading,
    error,
    data: { data: getUserSubscription } = {},
  } = useQuery({
    queryKey: ["getUserSubscription"],
    queryFn: () => apis.getUserSubscription(),
    onError: (error) => {
      console.error("Error geting Order History:", error);
      // toast.error("Failed to fetch products. Please try again later.");
    },
  });
  console.log("getUserSubscription", getUserSubscription);
  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <div className="loaderr" />
      </div>
    );
  }
  return (
    <div className="qr-main-page user-billing-page">
      <div className="userDashboard">
        <Sidebar />
        <div className="content-page">
          <h1>User Finance</h1>
          <table className="billing-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subscription ID</th>
                <th>Subscription Expiration Date</th>
                <th>Subscription Plan</th>
              </tr>
            </thead>
            <tbody>
              {getUserSubscription?.data?.length > 0 ? (
                getUserSubscription.data.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {user?.first_name && user?.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : "-"}
                    </td>
                    <td>{user.email ? user.email : "-"}</td>
                    <td>
                      {user?.userSubscriptionId ? user.userSubscriptionId : "-"}
                    </td>
                    <td>{user?.subscription_expiry}</td>
                    <td>{user?.subscription_plan}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserSubscription;

import React from "react";
import { Sidebar } from "../components";
import apis from "../services";
import { useQuery } from "@tanstack/react-query";

const UserBilling = () => {
  const {
    isLoading,
    error,
    data: { data: getUserBilling } = {},
  } = useQuery({
    queryKey: ["getUserBilling"],
    queryFn: () => apis.getUserBilling(),
    onError: (error) => {
      console.error("Error geting Order History:", error);
      // toast.error("Failed to fetch products. Please try again later.");
    },
  });
  console.log("getUserBilling", getUserBilling);
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
          <h1>User Billing</h1>
          <table className="billing-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subscription ID</th>
                <th>Expiration Date</th>
                <th>Subscription Package</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {getUserBilling?.users?.length > 0 ? (
                getUserBilling.users.map((billing) => (
                  <tr key={billing.id}>
                    <td>
                      {billing?.first_name && billing?.last_name
                        ? `${billing.first_name} ${billing.last_name}`
                        : "-"}
                    </td>
                    <td>{billing.email ? billing.email : "-"}</td>
                    <td>
                      {billing?.userSubscriptionId
                        ? billing.userSubscriptionId
                        : "-"}
                    </td>
                    <td>
                      {billing.is_subscribed == 1
                        ? billing?.subscription_expiry
                        : "-"}
                    </td>
                    <td>
                      {billing.is_subscribed ? (
                        <button className="subscribe-btn" disabled>
                          Subscribed
                        </button>
                      ) : (
                        <button className="unsubscribe-btn">
                          UnSubscribed
                        </button>
                      )}
                    </td>
                    <td>{billing?.active_status}</td>
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

export default UserBilling;

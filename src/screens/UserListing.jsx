import React from "react";
import { Sidebar } from "../components";
import { BsThreeDotsVertical } from "react-icons/bs";
import apis from "../services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const UserListing = () => {
  const handleActionClick = (user_id, status) => {
    console.log(`User ID: ${user_id} | status: ${status}`);
    mutateChangeUserStatus({ user_id, status });
    refetch();
  };

  const {
    isLoading,
    error,
    refetch,
    data: { data: getAllUserList } = {},
  } = useQuery({
    queryKey: ["allUserList"],
    queryFn: () => apis.getAllUserList(),
    onError: (error) => {
      console.error("Error geting Order History:", error);
      // toast.error("Failed to fetch products. Please try again later.");
    },
  });
  console.log("getAllUserCount", getAllUserList);

  const { mutate: mutateChangeUserStatus, isPending: isLoadingUserStatus } =
    useMutation({
      mutationFn: apis.changeUserStatus,
      onError: function (error) {
        // console.log("error", error);
        toast.error(error?.message);
      },
      onSuccess: ({ data: changeUserStatus, status }) => {
        console.log("changeUserStatus!!:", changeUserStatus);
        toast.success(changeUserStatus?.message);
      },
    });
  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <div className="loaderr" />
      </div>
    );
  }

  return (
    <div className="qr-main-page user-listing-page">
      <div className="userDashboard">
        <Sidebar />
        <div className="content-page">
          <h1>User Listing</h1>
          <table className="user-table-listing">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getAllUserList?.data?.length > 0 ? (
                getAllUserList.data.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {user?.first_name && user?.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : "-"}
                    </td>
                    <td>{user?.email ? user?.email : "-"}</td>
                    <td
                      className={
                        user.active_status == 1 ? "active" : "inactive"
                      }
                    >
                      {user?.active_status == 1 ? "Active" : "Inactive"}
                    </td>
                    <td>
                      <div className="action-dropdown">
                        <BsThreeDotsVertical className="action-icon" />
                        <div className="dropdown-content">
                          <button
                            disabled={isLoadingUserStatus}
                            onClick={() => handleActionClick(user?.id, 1)}
                          >
                            Activate
                          </button>
                          <button
                            disabled={isLoadingUserStatus}
                            onClick={() => handleActionClick(user.id, 0)}
                          >
                            Deactivate
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <tr>
                    <td colSpan="5">No Data Found</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserListing;

import React, { useState } from "react";
import { Sidebar, UserModal } from "../components";
import { BsThreeDotsVertical } from "react-icons/bs";
import apis from "../services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserListing = () => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedSingleUser, setSelectedSingleUser] = useState(null);
  const navigate = useNavigate();
  

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
  console.log("getAllUserList", getAllUserList);

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

  const handleActionClick = (user_id, status) => {
    console.log(`User ID: ${user_id} | status: ${status}`);
    // mutateChangeUserStatus({ user_id, status });
    // refetch();
    mutateChangeUserStatus(
      { user_id, status },
      {
        onSuccess: () => {
          // Refetch the user list after successfully changing the user status
          refetch();
        },
      }
    );
  };

  //GET SINGLE USER
  const handleShowUserModal = (userId) => {
    console.log("USERIDD", userId);
    apis
      .getSingleUser(userId)
      .then((response) => {
        setSelectedSingleUser(response?.data?.data);
        setShowUserModal(true);
      })
      .catch((error) => {
        console.error("Error fetching single user:", error);
      });
  };

  //UPDATE SINGLE USER
  const handleUpdateUser = (updatedUser) => {
    // Call the updateSingleUser API
    apis
      .updateSingleUser(updatedUser)
      .then((response) => {
        console.log("User updated successfully:", response);
        if (response?.data?.success) toast.success(response?.data?.message);
        // Optionally close the modal and refresh the user list
        setShowUserModal(false);
        // You can refresh the user list here or update the UI accordingly
        refetch();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error(error?.message);
      });
  };

  // DELETE SINGLE USER
  const handleDeleteUser = async (userId) => {
    try {
      if (window.confirm("Are you sure you want to delete this user?")) {
        const response = await apis.deleteSingleUser(userId);
        console.log("responseDeleteUser", response);
        if (response?.data?.success) toast.success(response?.data?.message);
        refetch();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      // Optionally, show an error message
      // toast.error("Failed to delete user.");
    }
  };

  //VIEW EACH QR CODE
  const handleViewQRCode = async(userId) =>{
    console.log("userId",userId);
    let userQrRes = await apis.getEachUserQR(userId);
    console.log("userQR",userQrRes?.data)

    let userQrData = userQrRes.data;
    // console.log("qrDataEdit", qrData);
    navigate(`/qr-list`, { state: { userQrData } });
  }

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <div className="loaderr" />
      </div>
    );
  }

  return (
    <>
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
                        <FaEye
                          style={{ marginRight: "40px", cursor: "pointer" }}
                          onClick={() => handleShowUserModal(user?.id)}
                        />

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
                            <button onClick={() => handleDeleteUser(user?.id)}>
                              Delete
                            </button>
                            <button onClick={() => handleViewQRCode(user?.id)}>
                              View QR 
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
      <UserModal
        setShowUserModal={setShowUserModal}
        showUserModal={showUserModal}
        singleUser={selectedSingleUser}
        handleUpdateUser={handleUpdateUser}
      />
    </>
  );
};

export default UserListing;

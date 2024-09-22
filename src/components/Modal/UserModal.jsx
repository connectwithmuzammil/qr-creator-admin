import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./modal.css";

const UserModal = ({
  showUserModal,
  setShowUserModal,
  singleUser,
  handleUpdateUser,
}) => {
  const [formData, setFormData] = useState({
    first_name: singleUser?.first_name || "",
    last_name: singleUser?.last_name || "",
    email: singleUser?.email || "",
  });

  console.log("singleUser", singleUser);

  useEffect(() => {
    setFormData({
      first_name: singleUser?.first_name || "",
      last_name: singleUser?.last_name || "",
      email: singleUser?.email || "",
    });
  }, [singleUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      id: singleUser?.id, // Include the user ID for the update request
      ...formData, // Spread the formData object
    };
    handleUpdateUser(updatedUser);
  };

  return (
    <Modal
      show={showUserModal}
      onHide={() => setShowUserModal(false)}
      centered
      size="lg"
      className="usermodal"
      // backdrop="static"
      // keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>User Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="input-wrap">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrap">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrap">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="btn-wrap">
            <button type="submit">Submit</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;

import React from "react";
import { Modal } from "react-bootstrap";
import "./modal.css";

const UserModal = ({ showUserModal, setShowUserModal }) => {
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
        <form>
          <div className="input-wrap">
            <label>First Name</label>
            <input type="text" name="" id="" placeholder="FirstName" />
          </div>
          <div className="input-wrap">
            <label>Last Name</label>
            <input type="text" name="" id="" placeholder="FirstName" />
          </div>
          <div className="input-wrap">
            <label>Email</label>
            <input type="email" name="" id="" placeholder="FirstName" />
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

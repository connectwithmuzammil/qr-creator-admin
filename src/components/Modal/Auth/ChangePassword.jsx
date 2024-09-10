import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import Button from "../../Button";

const ChangePassword = ({ newPassword, setNewPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <Modal
      show={newPassword}
      onHide={() => setNewPassword(false)}
      centered
      size="lg"
      className="changePassword"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create a new password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form">
          <div className="input-wrap">
            <label>New password</label>
            <div className="wrap">
              <input
                type={showPassword ? "text" : "password"}
                name=""
                id=""
                placeholder="Type your new password"
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="input-wrap">
            <label>Confirm new password</label>
            <div className="wrap">
              <input
                type={showNewPassword ? "text" : "password"}
                name=""
                id=""
                placeholder="Re-enter your new password"
              />
              <span onClick={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          <div className="btn-wrapper">
            <Button title={"Accept New password"} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePassword;

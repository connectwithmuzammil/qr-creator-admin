import React from "react";
import { Modal } from "react-bootstrap";

const Forgot = ({ showForgot, setShowForgot, onSwitchToLogin }) => {
  return (
    <Modal
      show={showForgot}
      onHide={() => setShowForgot(false)}
      centered
      size="lg"
      className="loginModal forgot"
      // backdrop="static"
      // keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Forgot your password?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-container">
          <p className="forgot-txt">
            Enter the email address you used to create your account. We’ll send
            you an email to reset your password.
          </p>
          <div className="input-wrap forgot">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="youremail@domain.com"
            />
          </div>
          <div className="btn-wrapper">
            <button type="submit" style={{ background: "#00af63" }}>
              Reset password
            </button>
          </div>
          <div className="btn-wrapper">
            <button type="submit" onClick={onSwitchToLogin}>
              Cancel
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Forgot;

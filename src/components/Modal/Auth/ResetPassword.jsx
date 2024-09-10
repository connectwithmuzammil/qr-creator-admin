import React from "react";
import { Modal } from "react-bootstrap";
import Button from "../../Button";
import { useSelector } from "react-redux";

const ResetPassword = ({
  resetPassword,
  setResetPassword,
  sendResetEmailMutate,
  isLoading,
}) => {
  const { user } = useSelector((store) => store.user);
  // console.log("USER EMAUIL", user);
  const userEmail = user?.user?.email || user?.email;
  const handleSubmit = () => {
    sendResetEmailMutate({
      email: userEmail,
    });
  };
  return (
    <Modal
      show={resetPassword}
      onHide={() => setResetPassword(false)}
      centered
      size="lg"
      className="resetPassword"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="content">
          <img src="/assets/images/resetPassImg.png" alt="resetPassImg" />
          <h3>Want to change your password?</h3>
          <p>We’ll send you an email to reset your password.</p>

          <Button title={"Reset password"} onClick={handleSubmit} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ResetPassword;

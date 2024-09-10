import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "../modal.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { loginSchema } from "../../../Helper/ValidationSchema.js";


const Login = ({
  showLoginModal,
  setShowLoginModal,
  mutateLogin,
  isPending,
  
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = (values, actions) => {
    // console.log("Login values:", values);
    if (values) {
      mutateLogin(values, {
        onSuccess: () => {
          actions.resetForm();
       
        },
      });
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={handleLoginSubmit}
    >
      {({ errors, touched }) => (
        <Modal
          show={showLoginModal}
          onHide={() => setShowLoginModal(false)}
          centered
          size="lg"
          className="loginModal"
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Welcome back!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="form-container">
              <div className="input-wrap">
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="youremail@domain.com"
                  className={`${
                    errors.email && touched.email ? "input-error" : ""
                  }`}
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="input-wrap ">
                <label>Pasword</label>
                <div className="wrap">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className={`${
                      errors.password && touched.password ? "input-error" : ""
                    }`}
                  />
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              {/* <div className="forgot-con">
                <p onClick={onSwitchToForgot}>
                  Forgot your password? <span>Click here</span>
                </p>
              </div> */}
              <div className="btn-wrapper">
                <button type="submit" disabled={isPending} >
                  {isPending ? "Loading..." : "Log In"}
                </button>
              </div>
              {/* <div className="line-container">
                <hr className="line" />
                <span className="text">or</span>
                <hr className="line" />
              </div>
              <div className="google-con">
                <FcGoogle />
                <p>Continue with Google</p>
              </div> */}
              {/* <div className="signup-con">
                <p>
                  Don't have an account yet?{" "}
                  <span onClick={onSwitchToSignUp}>Sign up!</span>
                </p>
              </div> */}
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default Login;

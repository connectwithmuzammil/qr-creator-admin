import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apis from "../services";
import { toast } from "react-toastify";
import { setUser } from "../redux/slice/userSlice";
import { LoginModal } from "../components";

const Login = () => {
  const [showLoginModal, setShowLoginModal] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //LOGIN API CALL
  const { mutate: mutateLogin, isPending: isloadingLogin } = useMutation({
    mutationFn: apis.login,
    onError: function (error) {
      // console.log("error", error);
      toast.error(error?.message);
    },
    onSuccess: ({ data: loginSucess, status }) => {
      console.log("loginSucessfully!!:", loginSucess);
      if (loginSucess?.data?.user?.role === "admin") {
        toast.success(loginSucess?.message);
        setShowLoginModal(false);
        navigate("/dashboard");
        dispatch(setUser(loginSucess?.data));
        localStorage.setItem("token", loginSucess?.token);
      }else{
        toast.error("Access denied. Only admins can access this section.");
      }
    },
  });
  return (
    <LoginModal
      showLoginModal={showLoginModal}
      setShowLogin={setShowLoginModal}
      isPending={isloadingLogin}
      mutateLogin={mutateLogin}
    />
  );
};

export default Login;

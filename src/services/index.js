import axios from "axios";

const createBackendServer = (baseURL) => {
  // console.log("BASEURL", baseURL);
  const api = axios.create({
    baseURL: `${baseURL}`,
    withCredentials: false,
    headers: {
      Accept: "application/json",
    },
    timeout: 60 * 1000,
  });

  //Interceptor
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Change 'your_token_key' to the actual key used in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error?.response?.data?.message;
      error.message = message ?? error.message;
      if (error?.response?.data?.errors)
        error.errors = error?.response?.data?.errors;
      if (error?.response?.status === 401) {
        // window.location.href = "/logout";
      }

      return Promise.reject(error);
    }
  );

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  /*==========    GET REQUESTS    ==========*/

  const getProfile = async (id) => await api.get(`/api/user/${id}`);

  /*==========    POST REQUESTS JTC   ==========*/
  const authLogin = async (body) => api.post("ecomuser/login", body);

  const authLogout = async (body) => api.post("logout", body);

  const authVerify = async (body) => api.post("ecomuser/otp-verify", body);
  const authResend = (body) => api.post("ecomuser/resend-otp", body);
  const authForget = async (body) =>
    api.post("ecomuser/sendPasswordResetLinkEmailEcom", body);
  const authResetPassword = async (body) =>
    api.post("ecomuser/resetPasswordEcom", body);
  const authChangePassword = async (body) =>
    api.post("ecomuser/change-password", body);


  const removeProductFromCart = async (body) =>
    api.post("ecomuser/remove-cart", body);

  // const updateProfile = async (body) =>
  //   api.post("ecommerceProfile/updateProfileEcom", body);



  const authResendForgot = async (body) =>
    api.post("ecomuser/resend-otp-not-valid", body);




  /*==========    GET REQUESTS  JTC ==========*/

  const getAllProductWithCategory = async (id) =>
    await api.get(`getProductCategory?userId=${id}`);
  const getProductDetails = async (id, userId) =>
    await api.get(`product/product/${id}?user_id=${userId}`);


  const authRegisterReferral = ({ body, code }) =>
    api.post(`auth/register?referralCode=${code}`, body);
  const updateUser = ({ id, body }) => api.put(`user/update/${id}`, body);


  const getStoreDetails = async (id) => api.get(`store/slug/${id}?type=store`);


  const getStoreSlot = ({ id, duration, staff_Id }) =>
    api.get(`store/slots/${id}?duration=${duration}&staff_Id=${staff_Id}`);

  const getStoreSlotwithoutStaff = ({ id, duration }) =>
    api.get(`store/slots/${id}?duration=${duration}
    `);
  const addFavorite = (body) => api.post(`user/favourite-add`, body);


  const getOrderDetails = (id) => api.get(`/getSalesApp/${id}`);


  // ---------------------------------------------------------------------------------------

  /*========== POST REQUESTS  ==========*/
  const signup = (body) => api.post("signup", body);
  const login = (body) => api.post("login", body);
  const logout = (body) => api.post("logout", body);

  const generateQrCode = (body) => api.post("generate", body)
  const validateQrCode = (type) => api.get(`validations/${type}`)
  const updateProfile = (body) => api.post(`update-name`, body);
  const updateEmail = (body) => api.post(`update-email`, body);
  const sendPasswordResetEmail = (body) => api.post(`restpassword`, body);
  const scanQrCode = (body) => api.post(`qr_scan`, body);
  const QRCount = () => api.get(`qr_count`);
  const GETAllQrCode = () => api.get(`user_qr`);

  //Returning all the API
  return {
    signup,
    login,
    logout,
    generateQrCode,
    validateQrCode,
    updateProfile,
    updateEmail,
    sendPasswordResetEmail,
    QRCount,
    GETAllQrCode,
    scanQrCode
  };
};

const apis = createBackendServer(process.env.REACT_APP_SERVER_URL);

export default apis;
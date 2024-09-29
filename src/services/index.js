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
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  /*==========    GET REQUESTS  JTC ==========*/

  // ---------------------------------------------------------------------------------------

  /*========== POST REQUESTS  ==========*/
  const signup = (body) => api.post("signup", body);
  const login = (body) => api.post("login", body);
  const logout = (body) => api.post("logout", body);

  // ADMIN API
  const getUserBilling = () => api.get(`admin/connectedusers`);
  const allUserCount = () => api.get(`admin/activeusers`);
  const getAllUserList = () => api.get(`admin/getalluserlist`);
  const getUserSubscription = () => api.get(`admin/getallsubdetails`);
  const changeUserStatus = (body) => api.post(`admin/updatestatus`, body);
  const getSingleUser = (id) => api.get(`admin/getuser/${id}`);
  const updateSingleUser = (body) => api.post(`admin/updateuser`, body);
  const deleteSingleUser = (id) => api.delete(`admin/canceluser/${id}`);
  const getQrList = () => api.get(`admin/qrlist`);
  const getSingleQr = (id) => api.get(`admin/Get_qr/${id}`);
  const getEachUserQR = (id) => api.get(`admin/user-qr/${id}`);
  const generateQrCode = (body) => api.post("generate", body);
  // const generateQrCode = (body) =>
  //   api.post("generate", body, {
  //     headers: {
  //       Authorization: null,
  //     },
  //   });

  // ANALYTICS
  const getQrStats = () => api.get(`admin/qr_stats_system`);
  const getQrScanActivity = (filter) =>
    api.get(`admin/qr_stats?filter=${filter}`);
  const getQrCount = () => api.get(`admin/analytics`);

  //EACH USER STATS
  const getEachUserQRStat = (id) => api.get(`admin/each_analytics/${id}`);
  const getEachUserQRSystem = (id) => api.get(`admin/qr_stats_system_each/${id}`);
  const getEachUserQRScanActivity = (id) => api.get(`admin/qr_stats_each/${id}`);


  //Returning all the API
  return {
    signup,
    login,
    logout,
    getUserBilling,
    allUserCount,
    getAllUserList,
    changeUserStatus,
    getUserSubscription,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    getQrStats,
    getQrList,
    getQrScanActivity,
    getQrCount,
    getSingleQr,
    generateQrCode,
    getEachUserQR,
    getEachUserQRStat,
    getEachUserQRSystem,
    getEachUserQRScanActivity
  };
};

const apis = createBackendServer(process.env.REACT_APP_SERVER_URL);

export default apis;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
    email_for_verification: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setEmail: (state, action) => {
      state.email_for_verification = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
  //   extraReducers: {
  //     [reduxApis.userLogin.pending]: (state) => {
  //       state.loading = true;
  //     },
  //     [reduxApis.userLogin.fulfilled]: (state, action) => {
  //       const message = action.payload.data.message;

  //       state.loading = false;
  //       state.user = action.payload.data.user;
  //     },
  //     [reduxApis.userLogin.rejected]: (state, action) => {
  //       //   toast.error(action.error.message);
  //       state.loading = false;
  //       state.error = action.error.message;
  //     },
  //   },
});

export const { logout, setUser, setUserType, setEmail } = userSlice.actions;

export default userSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

let name = null;
const nameItem = localStorage.getItem("name");

if (nameItem !== null) {
    try {
        name = JSON.parse(nameItem);
    } catch (e) {
        console.error("Error parsing JSON data:", e);
    }
}

// const name = localStorage.getItem("name") !== undefined ? JSON.parse(localStorage.getItem("name")) : null

const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  user: {
    name: "",
    email: "",
    id: "",
    appliedPlans: [],
    status: "",
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload)); // This might be redundant now with redux-persist
      state.name = action.payload;
    },
    SET_USER(state, action) {
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.id = action.payload._id;
      state.user.appliedPlans = action.payload.appliedPlans;
      state.user.status = action.payload.status;
    }
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;

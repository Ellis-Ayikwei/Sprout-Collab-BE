import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
	isLoggedIn: false,
	loading: false,
	role: "",
	myData: {},
	error: null,
};
// Create a slice for Login functionality
const logInSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		resetLogin: (state) => {
			state.isLoggedIn = false;
			state.error = null;
		},
		SetloginData: (state, action) => {
			state.isLoggedIn = true;
			state.myData = action.payload;
			localStorage.setItem("userid", action.payload.id);
		},
	},
});

// Export the action creators
export const { resetLogin, SetloginData } = logInSlice.actions;

// Export the reducer to be used in the store
export default logInSlice.reducer;

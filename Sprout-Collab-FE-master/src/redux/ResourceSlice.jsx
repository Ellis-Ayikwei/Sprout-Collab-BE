import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../helpers/fetcher";

// Thunk to fetch resource for a specific goal
export const fetchResource = createAsyncThunk(
	"resource/fetchResource",
	async (collabId) => {
		const response = await fetcher(`collaborations/${collabId}/resources`);
		return response;
	}
);

const resourceSlice = createSlice({
	name: "resource",
	initialState: {
		resourceList: [],
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchResource.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchResource.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.resourceList = action.payload;
				console.log("the resource slice", action.payload);
			})
			.addCase(fetchResource.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default resourceSlice.reducer;

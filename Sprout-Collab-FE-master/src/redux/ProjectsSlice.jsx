import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../helpers/fetcher";

// Thunk to fetch projects for a specific goal
export const fetchProjects = createAsyncThunk(
	"projects/fetchProjects",
	async (collabId) => {
		const response = await fetcher(`collaborations/${collabId}/projects`);
		return response;
	}
);

const projectsSlice = createSlice({
	name: "projects",
	initialState: {
		projectList: [],
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProjects.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchProjects.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.projectList = action.payload;
				console.log("the project slice", action.payload);
			})
			.addCase(fetchProjects.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default projectsSlice.reducer;

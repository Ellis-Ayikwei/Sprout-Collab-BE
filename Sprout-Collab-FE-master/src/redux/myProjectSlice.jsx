import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetcher from '../helpers/fetcher';

const userId = localStorage.getItem("userid");

export const fetchMyProjects = createAsyncThunk('projects/fetchMyProjects', async () => {
  const response = await fetcher(`project/myprojects/${userId}`);
  return response; // Directly return the response as it is an array
});

const myProjectSlice = createSlice({
  name: 'myprojects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchMyProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default myProjectSlice.reducer;

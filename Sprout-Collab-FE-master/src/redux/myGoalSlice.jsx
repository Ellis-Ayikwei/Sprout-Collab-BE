import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetcher from '../helpers/fetcher';
import axiosInstance from '../helpers/configEndpoints';


const userId = localStorage.getItem("userid")
//const userId = "1857a37b-0afe-4ceb-a05f-867fa9918de7";
export const fetchMyGoals = createAsyncThunk('goals/fetchMyGoals', async () => {
  console.log("the fetch my goals....")
  const response = await fetcher(`/goals/mygoals/${userId}`);
  console.log("Fetched data:", response); 
  return response;
});



const mygoalsSlice = createSlice({
  name: 'mygoals',
  initialState: {
    mygoalsList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyGoals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyGoals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.mygoalsList = action.payload;
      })
      .addCase(fetchMyGoals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    //   .addCase(addGoal.fulfilled, (state, action) => {
    //     state.goalsList.push(action.payload);
    //   });
  },
});

export default mygoalsSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetcher from '../helpers/fetcher';
import axiosInstance from '../helpers/configEndpoints';

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  const response = await fetcher('/goals');
  return response;
});

export const addGoal = createAsyncThunk('goals/addGoal', async (goalData) => {
    const response = await axiosInstance.post('/goals', goalData);
    return response.data;
  });



const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    goalsList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.goalsList = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.goalsList.push(action.payload);
      });
  },
});

export default goalsSlice.reducer;

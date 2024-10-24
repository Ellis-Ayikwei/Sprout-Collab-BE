import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetcher from '../helpers/fetcher';

export const fetchGoalTypes = createAsyncThunk('goalTypes/fetchGoalTypes', async () => {
  const response = await fetcher('/goal_types');
  return response;
});

const goalTypesSlice = createSlice({
  name: 'goalTypes',
  initialState: {
    typesList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoalTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoalTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.typesList = action.payload;
      })
      .addCase(fetchGoalTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default goalTypesSlice.reducer;

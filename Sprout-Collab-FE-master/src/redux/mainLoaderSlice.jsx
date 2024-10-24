import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    load: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    load: (state, action) => {
        state.load = action.payload
      },
  },

});

export const { load } = loadingSlice.actions
export default loadingSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetcher from '../helpers/fetcher';

const userId = localStorage.getItem("userid");

export const fetchtasks = createAsyncThunk('tasks/fetchtasks', async (projectID) => {
  const response = await fetcher(`projects/${projectID}/tasks`);
  console.log("Full API Response for task: ", response);
  return response; 
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    taskList: [],
    status: 'idle',
    error: null,
    taskData: null,
  },
  reducers: {
    setTaskData: (state, action) => {
      state.taskData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchtasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchtasks.fulfilled, (state, action) => {
        console.log("Fulfilled action fetchtask: ", action.payload);
        state.status = 'succeeded';
        state.taskList = action.payload;
      })
      .addCase(fetchtasks.rejected, (state, action) => {
        console.log("Rejected action error: ", action.error.message);
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setTaskData} = taskSlice.actions;
export default taskSlice.reducer;

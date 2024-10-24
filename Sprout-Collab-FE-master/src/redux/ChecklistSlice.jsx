import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetcher from '../helpers/fetcher';
import axios from 'axios';
import axiosInstance from '../helpers/configEndpoints';

const userId = localStorage.getItem("userid");

export const fetchtaskCheckList = createAsyncThunk('taskCheckList/fetchtaskCheckList', async (taskId, { dispatch }) => {
  const response = await fetcher(`/task/${taskId}/checklist`);
  dispatch(setTaskId(taskId));  
  dispatch(fetchtaskMembers(taskId));
  return response; 
});

export const fetchtaskMembers = createAsyncThunk('taskCheckList/fetchtaskMembers', async (taskId) => {
  const response = await fetcher(`/tasks/${taskId}/task_members`); 
  return response; 
});

export const submitLink = createAsyncThunk('link/taskmlink', async ({ taskMemberId, link }, { dispatch }) => {
  const response = await axiosInstance.put(`task_members/${taskMemberId}`, { link });
  return response; 
});

const taskCheckListSlice = createSlice({
  name: 'taskCheckList',
  initialState: {
    checkList: [],
    status: 'idle',
    error: null,
    taskMData: null,
    task_id: null,
    taskMembers: [],
    taskMemberlink: null,
  },
  reducers: {
    setTaskMData: (state, action) => {
      state.taskMData = action.payload;
    },
    setTaskId: (state, action) => {
      state.task_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchtaskCheckList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchtaskCheckList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.checkList = action.payload;
      })
      .addCase(fetchtaskCheckList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchtaskMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchtaskMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.taskMembers = action.payload;
      })
      .addCase(fetchtaskMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(submitLink.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitLink.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.taskMemberlink = action.payload.link;
      })
      .addCase(submitLink.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setTaskMData, setTaskId, setTaskLink } = taskCheckListSlice.actions;

export default taskCheckListSlice.reducer;

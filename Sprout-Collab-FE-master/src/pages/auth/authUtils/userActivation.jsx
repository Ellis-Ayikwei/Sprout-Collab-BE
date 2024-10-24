import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import axiosInstance from '../../../helper/axiosInstance';
import { GetUserData } from '../../../store/usersSlice';

const handleUserActivation = async (payload: any, dispatch: Dispatch<AnyAction>) => {
    const putdata = { is_active: !payload.is_active, username: payload.username };
    console.log('the put data', JSON.stringify(putdata));
    const response = await axiosInstance.put('/users', putdata);
    if (response.status === 200) {
        dispatch(GetUserData() as any);
    }
    return response;
};

export default handleUserActivation;

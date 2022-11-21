import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {UserType} from '../../api/authApi';
import {GridSelectionModel} from '@mui/x-data-grid';
import {UpdateUsersValueType, usersApi} from '../../api/usersApi';
import {logoutThunk} from './authReducer';

export type UsersInitialStateType = {
    data: UserType[]
}
export const usersInitialState: UsersInitialStateType = {
    data: []
};
export const updateUsersThunk = createAsyncThunk('update-users', async (arg: UpdateUsersValueType, thunkAPI) => {
    try {
        await usersApi.updateUsers(arg);
        thunkAPI.dispatch(getAllUserThunk());
    } catch (e) {
        throw e;
    }
});
export const deleteUsersThunk = createAsyncThunk('delete-users', async (arg: GridSelectionModel, thunkAPI) => {
    try {
        await usersApi.deleteUsers(arg);
        thunkAPI.dispatch(getAllUserThunk());
    } catch (e) {
        throw e;
    }
});
export const getUserThunk = createAsyncThunk('get-user', async (arg: { id: number }, thunkAPI) => {
    try {
        const user = await usersApi.getUser(arg.id);
        if (user.data.isBlocked) thunkAPI.dispatch(logoutThunk(arg));
    } catch (e) {
        throw e;
    }
});
export const getAllUserThunk = createAsyncThunk('get-all-user', async (arg, thunkAPI) => {
    try {
        const users = await usersApi.getAllUser();
        thunkAPI.dispatch(getAllUser(users.data));
    } catch (e) {
        throw e;
    }
});
const usersReducer = createSlice({
    name: 'users',
    initialState: usersInitialState,
    reducers: {
        getAllUser(state, action) {
            state.data = action.payload;
        },
    }
});

export const {getAllUser} = usersReducer.actions;
export default usersReducer.reducer;
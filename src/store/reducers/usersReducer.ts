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
    const res = await usersApi.updateUsers(arg);
    if (!!res.data.message) {
        alert(res.data.message);
        throw res.data.message;
    } else {
        thunkAPI.dispatch(getAllUserThunk());
    }
});
export const deleteUsersThunk = createAsyncThunk('delete-users', async (arg: GridSelectionModel, thunkAPI) => {
    const res = await usersApi.deleteUsers(arg);
    if (!!res.data.message) {
        alert(res.data.message);
        throw res.data.message;
    } else {
        thunkAPI.dispatch(getAllUserThunk());
    }
});
export const getUserThunk = createAsyncThunk('get-user', async (arg: { id: number }, thunkAPI) => {
    const user = await usersApi.getUser(arg.id);
    if (!!user.data.message) {
        alert(user.data.message);
        throw user.data.message;
    }
    if (user.data.isBlocked) thunkAPI.dispatch(logoutThunk(arg));
});
export const getAllUserThunk = createAsyncThunk('get-all-user', async (arg, thunkAPI) => {
    const users = await usersApi.getAllUser();
    if (!!users.data.message) {
        alert(users.data.message);
        throw users.data.message;
    } else {
        thunkAPI.dispatch(setUsers(users.data));
    }
});
const usersReducer = createSlice({
    name: 'users',
    initialState: usersInitialState,
    reducers: {
        setUsers(state, action) {
            state.data = action.payload;
        },
    }
});

export const {setUsers} = usersReducer.actions;
export default usersReducer.reducer;
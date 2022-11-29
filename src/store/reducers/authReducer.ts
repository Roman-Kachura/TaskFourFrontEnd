import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authApi, AuthUserType, LoginValueType, RegistrationValueType} from '../../api/authApi';
import {setUsers} from './usersReducer';

export type AuthReducerStateType = {
    isAuth: boolean
    user: AuthUserType
}

export const AuthReducerInitialState: AuthReducerStateType = {
    isAuth: false,
    user: {} as AuthUserType
}

export const registrationThunk = createAsyncThunk('registration', async (arg: RegistrationValueType, thunkAPI) => {
    const user = await authApi.registration(arg);
    if (!!user.data.message) {
        alert(user.data.message);
        throw user.data.message;
    } else {
        thunkAPI.dispatch(loginAction(user.data));
    }
});

export const loginThunk = createAsyncThunk('login', async (arg: LoginValueType, thunkAPI) => {
    const user = await authApi.login(arg);
    if (!!user.data.message) {
        alert(user.data.message);
        throw user.data.message;
    } else {
        thunkAPI.dispatch(loginAction(user.data));
    }
});

export const logoutThunk = createAsyncThunk('logout', async (arg: { id: number }, thunkAPI) => {
    const res = await authApi.logout(arg.id);
    if (!!res.data.message) {
        alert(res.data.message);
        throw res.data.message;
    } else {
        thunkAPI.dispatch(setUsers([]));
        thunkAPI.dispatch(logoutAction());
    }
});

export const authReducer = createSlice({
    name: 'auth',
    initialState: AuthReducerInitialState,
    reducers: {
        loginAction: (state, action) => {
            state.user = action.payload
            state.isAuth = true;
        },
        logoutAction: (state) => {
            state.isAuth = false;
            state.user = {} as AuthUserType;
        }
    }
});

export const {loginAction, logoutAction} = authReducer.actions;

export default authReducer.reducer;
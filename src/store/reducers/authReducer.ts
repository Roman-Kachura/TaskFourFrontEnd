import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authApi, LoginValueType, RegistrationValueType, AuthUserType} from '../../api/authApi';

export interface AuthReducerState {
    isAuth: boolean
    user: AuthUserType
}

const initialState: AuthReducerState = {
    isAuth: false,
    user: {} as AuthUserType
}

export const registrationThunk = createAsyncThunk('registration', async (arg: RegistrationValueType, thunkAPI) => {
    try {
        const user = await authApi.registration(arg);
        thunkAPI.dispatch(loginAction(user.data));
    } catch (e) {
        throw e;
    }
});

export const loginThunk = createAsyncThunk('login', async (arg: LoginValueType, thunkAPI) => {
    try {
        const user = await authApi.login(arg);
        thunkAPI.dispatch(loginAction(user.data));
    } catch (e) {
        throw e;
    }
});

export const logoutThunk = createAsyncThunk('logout', async (arg:{id:number}, thunkAPI) => {
    try {
        await authApi.logout(arg.id);
        thunkAPI.dispatch(logoutAction());
    } catch (e) {
        throw e;
    }
});

export const authReducer = createSlice({
    name: 'auth',
    initialState,
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
import React, {useEffect} from 'react';
import {AppBar, Button, Toolbar} from '@material-ui/core';
import {RootState, useAppDispatch} from '../store/store';
import {logoutThunk} from '../store/reducers/authReducer';
import {useSelector} from 'react-redux';
import {AuthUserType, UserType} from '../api/authApi';
import {getUserThunk} from '../store/reducers/usersReducer';

export const Header: React.FC = () => {
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const user = useSelector<RootState, AuthUserType>(state => state.auth.user);
    const allUsers = useSelector<RootState, UserType[]>(state => state.users.data);
    const token = useSelector<RootState, string>(state => state.auth.user.token);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isAuth && token) {
            dispatch(getUserThunk({id: user.id}))
        }
    }, [dispatch, allUsers, token]);
    const logout = () => dispatch(logoutThunk({id: user.id}));
    return (
        <AppBar position="fixed" color={'primary'}>
            <Toolbar>
                {isAuth && <Button color={'inherit'} onClick={logout}>logout</Button>}
            </Toolbar>
        </AppBar>
    )
}
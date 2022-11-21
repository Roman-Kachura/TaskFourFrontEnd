import React, {useEffect} from 'react';
import {AppBar, Button, Toolbar} from '@material-ui/core';
import {RootState, useAppDispatch} from '../store/store';
import {logoutThunk} from '../store/reducers/authReducer';
import {useSelector} from 'react-redux';
import {AuthUserType} from '../api/authApi';
import {getUserThunk} from '../store/reducers/usersReducer';

export const Header: React.FC = () => {
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const user = useSelector<RootState, AuthUserType>(state => state.auth.user);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isAuth) dispatch(getUserThunk({id: user.id}))
    }, [dispatch, isAuth, user.id]);
    const logout = () => dispatch(logoutThunk({id: user.id}));
    return (
        <AppBar position="fixed" color={'primary'}>
            <Toolbar>
                {isAuth && <Button color={'inherit'} onClick={logout}>logout</Button>}
            </Toolbar>
        </AppBar>
    )
}
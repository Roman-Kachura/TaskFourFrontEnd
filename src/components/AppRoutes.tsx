import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Registration} from './auth/Registration';
import {Login} from './auth/Login';
import {AppTable} from './table/AppTable';

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path={'/registration'} element={<Registration/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/table'} element={<AppTable/>}/>
            <Route path={'*'} element={<Navigate to={'/table'}/>}/>
        </Routes>
    )
}
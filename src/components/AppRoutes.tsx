import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Registration} from './Registration';
import {Login} from './Login';
import {AppTable} from './AppTable';

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
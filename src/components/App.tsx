import React from 'react';
import {Header} from './Header';
import {AppRoutes} from './AppRoutes';

export const App: React.FC = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '100px'}}>
            <Header/>
            <AppRoutes/>
        </div>
    )
};


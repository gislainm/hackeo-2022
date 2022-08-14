import React from 'react';
import { Navigate } from 'react-router-dom';
import Globals from './Utils/globalstate';

export default function DefaultPage(globals: any) : JSX.Element
{
    if(Globals.isAuthenticated)
        return <Navigate to="/home" />;
    
    return <Navigate to="/login" />;
}
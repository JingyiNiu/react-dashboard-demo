import React, { useEffect } from 'react';
import { checkToken } from '../hooks/useAuth';

const DashboardPage = () => {
    useEffect(()=>{
        checkToken()
    },[])
    
    return (
        <div className="mx-auto w-full max-w-sm my-16 text-center">
            <h1 className="text-xl poppins-bold mb-4">Dashboard</h1>
            <p>content</p>
        </div>
    );
};

export default DashboardPage;

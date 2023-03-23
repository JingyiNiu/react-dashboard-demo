import React from 'react';
import { Link } from 'react-router-dom';
import LogoSvg from './logo';

const Sidebar = () => {
    return (
        <div className="bg-neutral-100 p-4">
            <div className="mt-4 mb-8">
                <Link to="/dashboard" className="flex justify-center">
                    <LogoSvg />
                </Link>
            </div>

            <Link to="/articles">Articles</Link>
        </div>
    );
};

export default Sidebar;

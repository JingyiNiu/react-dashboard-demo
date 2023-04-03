import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SidebarContext } from '../../contexts/sidebar-context';

interface CustomLinkInterface {
    path: string;
    text: string;
    icon?: React.ReactNode;
}

const SidebarLink = ({ path, text, icon }: CustomLinkInterface) => {
    const toggleSidebar = useContext(SidebarContext);

    return (
        <li className={`mb-8 hover:underline ${toggleSidebar && 'flex justify-center'}`}>
            <Link to={path} className="flex flex-nowrap whitespace-nowrap overflow-hidden">
                <span title={text} className={toggleSidebar ? '' : 'mr-2'}>
                    {icon}
                </span>
                {!toggleSidebar && text}
            </Link>
        </li>
    );
};

export default SidebarLink;

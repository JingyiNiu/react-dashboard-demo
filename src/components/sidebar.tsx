import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CommentOutlined,
    FileTextOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TagOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import LogoSvg from './logo';
import SidebarLink from './custom/sidebar-link';
import { SidebarContext } from '../contexts/sidebar-context';

const Sidebar = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false);

    return (
        <SidebarContext.Provider value={toggleSidebar}>
            <div
                className={`relative bg-neutral-100 transition-all duration-300 ease-in ${
                    toggleSidebar ? 'w-20 min-w-20' : 'w-56 min-w-56'
                }`}
            >
                {/* Toggle button */}
                <button
                    className="absolute bg-neutral-100 w-12 h-12 right-0 translate-x-12"
                    onClick={() => setToggleSidebar(!toggleSidebar)}
                >
                    {toggleSidebar ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </button>

                {/* Logo */}
                <div className="my-12">
                    <Link to="/dashboard" className="flex justify-center">
                        <LogoSvg className={`${toggleSidebar ? 'w-8' : 'w-12'}`} />
                    </Link>
                </div>

                {/* Nav list */}
                <ul className={` p-4 ${toggleSidebar ? '' : 'mr-4'}`}>
                    <SidebarLink path="/intro" icon={<HomeOutlined />} text="Intros" />
                    <SidebarLink path="/articles" icon={<FileTextOutlined />} text="Articles" />
                    <SidebarLink path="/tags" icon={<TagOutlined />} text="Tags" />
                    <SidebarLink path="/users" icon={<TeamOutlined />} text="Users" />
                    <SidebarLink path="/contacts" icon={<CommentOutlined />} text="Contacts" />
                </ul>
            </div>
        </SidebarContext.Provider>
    );
};

export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';
import { CommentOutlined, FileTextOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';
import LogoSvg from './logo';

interface CustomLinkInterface {
    path: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

const CustomLink = ({ path, icon, children }: CustomLinkInterface) => {
    return (
        <li className="mb-8 hover:underline">
            <Link to={path}>
                <span className="mr-2">{icon}</span>
                {children}
            </Link>
        </li>
    );
};

const Sidebar = () => {
    return (
        <div className="bg-neutral-100 p-4 min-w-56">
            <div className="mt-4 mb-16">
                <Link to="/dashboard" className="flex justify-center">
                    <LogoSvg />
                </Link>
            </div>

            <ul className='mr-4'>
                <CustomLink path="/intro" icon={<HomeOutlined />}>
                    Homepage Intro
                </CustomLink>
                <CustomLink path="/articles" icon={<FileTextOutlined />}>
                    Articles
                </CustomLink>
                <CustomLink path="/users" icon={<TeamOutlined />}>
                    Users
                </CustomLink>
                <CustomLink path="/contacts" icon={<CommentOutlined />}>
                    Contacts
                </CustomLink>
            </ul>
        </div>
    );
};

export default Sidebar;

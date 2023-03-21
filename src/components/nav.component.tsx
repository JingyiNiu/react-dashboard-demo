import React from 'react';
import { removeItemFromLocalStorage } from '../utils/utils';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import LogoSvg from './logo';

const Nav = () => {
    const TOKEN_KEY = process.env.REACT_APP_LOCAL_TOKEN || 'token';

    const { confirm } = Modal;

    const onLogout = () => {
        confirm({
            title: 'Do you Want to Logout?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                removeItemFromLocalStorage(TOKEN_KEY);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            },
            onCancel() {
                return;
            },
        });
    };

    return (
        <div className="bg-neutral-100 py-2 px-8">
            <div className="flex justify-between">
                <a href="/dashboard">
                    <LogoSvg />
                </a>
                <button onClick={onLogout} className="hover:underline hover:underline-offset-2">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Nav;

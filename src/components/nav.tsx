import React from 'react';
import { removeItemFromLocalStorage, TOKEN_KEY } from '../utils/utils';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';

const Nav = () => {
    const { confirm } = Modal;

    const onLogout = () => {
        confirm({
            title: 'Are you sure to log out?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
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
        <div className="bg-neutral-50 py-4 px-8">
            <div className="flex justify-end">
                <button onClick={onLogout} className="text-primary-900 hover:underline hover:underline-offset-2">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Nav;

import React from 'react';
import { Modal } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { ExclamationCircleFilled, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { removeItemFromLocalStorage, TOKEN_KEY } from '../utils/utils';

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

    const settingDropdowns: MenuProps['items'] = [
        {
            label: (
                <button onClick={onLogout} className="text-primary-800">
                    <LogoutOutlined /> Log out
                </button>
            ),
            key: '3',
        },
    ];

    return (
        <div className="py-4 px-8">
            <div className="flex justify-end">
                <Dropdown menu={{ items:settingDropdowns }} trigger={['click']}>
                    <SettingOutlined />
                </Dropdown>
            </div>
        </div>
    );
};

export default Nav;

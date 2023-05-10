import React from 'react';
import { Modal } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { CommentOutlined, ExclamationCircleFilled, FileTextOutlined, HomeOutlined, LogoutOutlined, MenuOutlined, SettingOutlined, TagOutlined, TeamOutlined } from '@ant-design/icons';
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

    const menuDropdowns: MenuProps['items'] = [
        {
            label: (<><HomeOutlined /> Intros</>),
            key: '1',
        },
        {
            label: (<><FileTextOutlined /> Articles</>),
            key: '2',
        },
        {
            label: (<><TagOutlined /> Tags</>),
            key: '3',
        },
        {
            label: (<><TeamOutlined /> Users</>),
            key: '4',
        },
        {
            label: (<><CommentOutlined /> Contacts</>),
            key: '5',
        },
    ];

    return (
        <div className="py-4 px-8">
            <div className="flex justify-between">
                <Dropdown menu={{ items:menuDropdowns }} trigger={['click']}>
                    <MenuOutlined />
                </Dropdown>
                <Dropdown menu={{ items:settingDropdowns }} trigger={['click']}>
                    <SettingOutlined />
                </Dropdown>
            </div>
        </div>
    );
};

export default Nav;

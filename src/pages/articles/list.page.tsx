import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import axiosClient from '../../axios.config';
import AntdTable from '../../components/antd-table';

const ListAllArticlesPage = () => {
    const API_END_POINT = '/api/admin/article';
    const { confirm } = Modal;

    const [data, setData] = useState([]);

    useEffect(() => {
        axiosClient
            .get(API_END_POINT)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    const handleDelete = (id: string) => {
        confirm({
            title: `Are you sure to delete article ${id}?`,
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            onOk() {
                console.log('delete', id);
            },
            onCancel() {
                return;
            },
        });
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-8">List All Articles</h2>
            <Link
                to="/articles/create"
                className="p-2 inline-block mb-4 rounded-md bg-primary-500 text-white hover:bg-primary-800"
            >
                New Article
            </Link>
            <AntdTable data={data} onDelete={handleDelete} />
        </div>
    );
};

export default ListAllArticlesPage;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import axiosClient from '../../axios.config';
import AntdTable from '../../components/antd-table';
import CustomButton from '../../components/custom/button';
import H2Title from '../../components/custom/h2title';

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
                console.log(err);
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
            <H2Title>List All Articles</H2Title>
            <Link to="/articles/create">
                <CustomButton className='mb-4'>New Article</CustomButton>
            </Link>
            <AntdTable data={data} onDelete={handleDelete} />
        </div>
    );
};

export default ListAllArticlesPage;

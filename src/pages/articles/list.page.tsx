import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Select } from 'antd';
import { DeleteOutlined, ExclamationCircleFilled, FormOutlined } from '@ant-design/icons';

import axiosClient from '../../axios.config';
import AntdTable from '../../components/antd-table';
import CustomButton from '../../components/custom/button';
import H2Title from '../../components/custom/h2title';
import { checkToken } from '../../hooks/useAuth';
import { capitalizeText, formatDate, showTextLength } from '../../utils/utils';

const ListAllArticlesPage = () => {
    useEffect(() => {
        checkToken();
    }, []);

    const API_END_POINT = '/api/admin/article';
    const { confirm } = Modal;

    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [tableHeader, setTableHeader] = useState<any>([]);

    const handleDelete = useCallback(
        (item: any) => {
            confirm({
                title: `Are you sure to delete - ${item.title}?`,
                icon: <ExclamationCircleFilled />,
                okText: 'Yes',
                onOk() {
                    console.log('delete', item.id);
                },
                onCancel() {
                    return;
                },
            });
        },
        [confirm]
    );

    const formatDataForTable = (data: any) => {
        const tableData = data.map((item: any) => ({
            ...item,
            key: item.id,
            created_at: item.created_at ? formatDate(item.created_at) : '',
            updated_at: item.updated_at ? formatDate(item.updated_at) : '',
        }));

        setTableData(tableData);
    };

    const formatHeaderForTable = (data: any) => {
        const updatedColumns = data.map((item: any) => {
            if (item.key === 'is_public') {
                return {
                    ...item,
                    render: (text: any) => (text ? <span className="text-green-500">Yes</span> : <span>No</span>),
                };
            }
            if (item.key === 'content') {
                return {
                    ...item,
                    render: (text: any) => showTextLength(text, 30),
                };
            }
            return item;
        });
        setTableHeader(updatedColumns);
    };

    const addActionColumn = useCallback(
        (data: any) => {
            const actionColumn = {
                key: 'action',
                title: 'Action',
                dataIndex: 'action',
                render: (_: any, item: any) => (
                    <>
                        <Link to={`/articles/edit/${item.key}`}>
                            <button className="w-6 h-6 rounded-sm bg-primary-500 text-white hover:text-white hover:bg-primary-800 mr-2">
                                <FormOutlined />
                            </button>
                        </Link>
                        <button
                            onClick={() => handleDelete(item)}
                            className="w-6 h-6 rounded-sm bg-red-500 text-white hover:bg-red-600"
                        >
                            <DeleteOutlined />
                        </button>
                    </>
                ),
            };
            setTableHeader([...data, actionColumn]);
            formatHeaderForTable([...data, actionColumn]);
        },
        [handleDelete]
    );

    const generateTableHeader = useCallback(
        (data: any) => {
            const headerColumns: any = Object.keys(data[0]).map((key) => {
                return {
                    key,
                    title: capitalizeText(key.replace('_', ' ')),
                    dataIndex: key,
                    sorter: (a: any, b: any) => a[key].toString().localeCompare(b[key].toString()),
                };
            });
            addActionColumn(headerColumns);
        },
        [addActionColumn]
    );

    const handleFilterData = (value: number) => {
        switch (value) {
            case 0:
                formatDataForTable(data)
                break;
            case 1:
                formatDataForTable(data.filter((item:any)=>item.is_public === 1))
                break;
            case 2:
                formatDataForTable(data.filter((item:any)=>item.is_public === 0))
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        axiosClient
            .get(API_END_POINT)
            .then((res) => {
                setData(res.data.data);
                formatDataForTable(res.data.data);
                generateTableHeader(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [generateTableHeader]);

    return (
        <div>
            <H2Title>List All Articles</H2Title>
            <Link to="/articles/create">
                <CustomButton className="mb-4">New Article</CustomButton>
            </Link>
            <Select
                className="block mb-2"
                placeholder="Filter Table"
                style={{ width: 120 }}
                onChange={handleFilterData}
                options={[
                    { value: 1, label: 'Public' },
                    { value: 2, label: 'Non-public' },
                    { value: 0, label: 'All' },
                ]}
            />
            <AntdTable tableData={tableData} tableHeader={tableHeader} pageSize={15} />
        </div>
    );
};

export default ListAllArticlesPage;

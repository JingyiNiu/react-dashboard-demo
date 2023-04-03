import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import axiosClient from '../../axios.config';
import AntdTable from '../../components/antd-table';
import CustomButton from '../../components/custom/button';
import H2Title from '../../components/custom/h2title';
import { checkToken } from '../../hooks/useAuth';
import { capitalizeText, formatDate, showTextLength } from '../../utils/utils';
import CustomLink from '../../components/custom/link';

const ListAllArticlesPage = () => {
    useEffect(() => {
        checkToken();
    }, []);

    const API_END_POINT = '/api/admin/article';

    const [data, setData] = useState([]);

    const [tableData, setTableData] = useState([]);
    const [tableHeader, setTableHeader] = useState<any>([]);

    const [filterIndex, setFilterIndex] = useState(NaN);
    const [searchText, setSearchText] = useState('0');

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
            const actionColumn = [
                {
                    key: 'preview',
                    title: 'Preview',
                    dataIndex: 'preview',
                    render: (_: any, item: any) => (
                        <>
                            <CustomLink to={`/articles/preview/${item.key}`} target="_blank">
                                View
                            </CustomLink>
                        </>
                    ),
                },
                {
                    key: 'action',
                    title: 'Action',
                    dataIndex: 'action',
                    render: (_: any, item: any) => (
                        <>
                            <Link to={`/articles/edit/${item.key}`}>
                                <button className="w-6 h-6 rounded-sm bg-primary-800 text-white hover:text-white hover:bg-primary-900 mr-2">
                                    <FormOutlined />
                                </button>
                            </Link>
                        </>
                    ),
                },
            ];
            setTableHeader([...data, ...actionColumn]);
            formatHeaderForTable([...data, ...actionColumn]);
        },
        []
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

    const handleFilterAndSearch = (value: number, searchText: string) => {
        const filteredData = data.filter((item: any) => {
            if (value === 1 && !item.is_public) {
                return false;
            }
            if (value === 2 && item.is_public) {
                return false;
            }
            if (searchText && item.title.indexOf(searchText) === -1) {
                return false;
            }
            return true;
        });
        formatDataForTable(filteredData);
    };

    const handleFilter = (value: number) => {
        setFilterIndex(value);
        handleFilterAndSearch(value, searchText);
    };

    const handleSearch = (searchText: string) => {
        setSearchText(searchText);
        handleFilterAndSearch(filterIndex, searchText);
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
            <div className="flex">
                <Select
                    className="block mb-2 mr-2"
                    placeholder="Filter Table"
                    style={{ width: 120 }}
                    onChange={handleFilter}
                    defaultValue={0}
                    options={[
                        { value: 0, label: 'All' },
                        { value: 1, label: 'Public' },
                        { value: 2, label: 'Non-public' },
                    ]}
                />
                <Input.Search placeholder={`Search title`} allowClear onSearch={handleSearch} className="w-60" />
            </div>
            <AntdTable tableData={tableData} tableHeader={tableHeader} pageSize={15} />
        </div>
    );
};

export default ListAllArticlesPage;

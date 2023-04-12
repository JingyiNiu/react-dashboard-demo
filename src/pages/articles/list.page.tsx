import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Tag } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import axiosClient from '../../axios.config';
import AntdTable from '../../components/antd-table';
import CustomButton from '../../components/custom/button';
import H2Title from '../../components/custom/h2title';
import { checkToken } from '../../hooks/useAuth';
import { capitalizeText } from '../../utils/utils';
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

    const formatData = (data: any) => {
        const tableData = data.map((item: any) => ({
            ...item,
            key: item.id,
            is_public: item.is_public ? <span className="text-green-500">Yes</span> : <span>No</span>,
        }));
        setTableData(tableData);
    };

    const filterTableColumns = (data: any) => {
        const updatedColumns = data.filter(
            ({ key }: { key: string }) => !['content', 'created_at', 'updated_at'].includes(key)
        );
        setTableHeader(updatedColumns);
    };

    const formatTableColumns = useCallback((data: any) => {
        const formatedColumns = data.map((column: any) => {
            if (column.key === 'tags') {
                return {
                    ...column,
                    render: (tags: any) => (
                        <span>
                            {tags.map((tag: any) => {
                                return <Tag key={tag.id}>{tag.name}</Tag>;
                            })}
                        </span>
                    ),
                };
            }
            return column;
        });
        const extraColumns = [
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
        filterTableColumns([...formatedColumns, ...extraColumns]);
    }, []);

    const generateTableColumns = useCallback(
        (data: any) => {
            const allColumns: any = Object.keys(data[0]).map((key) => {
                return {
                    key,
                    title: capitalizeText(key.replace('_', ' ')),
                    dataIndex: key,
                    sorter: (a: any, b: any) => a[key].toString().localeCompare(b[key].toString()),
                };
            });

            formatTableColumns(allColumns);
        },
        [formatTableColumns]
    );

    const handleFilterAndSearch = (value: number, searchText: string) => {
        console.log("Public: ", value, "; Search text: ", searchText)
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
        formatData(filteredData);
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
                setData(res.data);
                formatData(res.data);
                generateTableColumns(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [generateTableColumns]);

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

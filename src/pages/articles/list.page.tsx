import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Tag } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import axiosClient from '../../axios.config';
import AntdTable from '../../components/antd-table';
import CustomButton from '../../components/custom/button';
import H2Title from '../../components/custom/h2title';
import { checkToken } from '../../hooks/useAuth';
import CustomLink from '../../components/custom/link';
import { TableColumnInterface } from '../../interfaces/TableColumnInterface';

const ArticlesListPage = () => {
    useEffect(() => {
        checkToken();
    }, []);

    const [data, setData] = useState([]);

    const [tableData, setTableData] = useState([]);
    const [tableHeader, setTableHeader] = useState<TableColumnInterface[]>([]);

    const [filterIndex, setFilterIndex] = useState(NaN);
    const [searchText, setSearchText] = useState('');

    const generateData = (data: any) => {
        const tableData = data.map((item: any) => ({
            ...item,
            key: item.id,
        }));
        setTableData(tableData);
    };

    const generateColumns = useCallback(() => {
        const columns = [
            {
                key: 'id',
                title: 'ID',
                dataIndex: 'id',
                sorter: (a: any, b: any) => a.id - b.id,
            },
            {
                key: 'sort_order',
                title: 'Sort Order',
                dataIndex: 'sort_order',
                width: 50,
                sorter: (a: any, b: any) => a.sort_order - b.sort_order,
            },
            {
                key: 'is_public',
                title: 'Is Public',
                dataIndex: 'is_public',
                width: 50,
                sorter: (a: any, b: any) => a.is_public - b.is_public,
                render: (text: any) => {
                    if (text) {
                        return <span className="text-green-500">Yes</span>;
                    }
                    return <span>No</span>;
                },
            },
            {
                key: 'slug',
                title: 'Slug',
                dataIndex: 'slug',
                sorter: (a: any, b: any) => a.slug.toString().localeCompare(b.slug.toString()),
            },
            {
                key: 'title',
                title: 'Title',
                dataIndex: 'title',
                render: (_: any, item: any) => (
                    <>
                        <p>{item.title}</p>
                        <p>{item.title_zh}</p>
                    </>
                ),
            },
            {
                key: 'tags',
                title: 'Tags',
                dataIndex: 'tags',
                width: 50,
                render: (tags: any) => (
                    <span>
                        {tags.map((tag: any) => {
                            return <Tag key={tag.id}>{tag.name}</Tag>;
                        })}
                    </span>
                ),
            },
            {
                key: 'view_count',
                title: 'View Count',
                dataIndex: 'view_count',
            },
            {
                key: 'preview',
                title: 'Preview',
                dataIndex: 'preview',
                render: (_: any, item: any) => (
                    <>
                        <CustomLink to={`/articles/preview/${item.key}`} target="_blank">
                            English
                        </CustomLink>
                        <CustomLink to={`/articles/preview-zh/${item.key}`} target="_blank">
                            Chinese
                        </CustomLink>
                    </>
                ),
            },
            {
                key: 'action',
                title: 'Action',
                dataIndex: 'action',
                width: 50,
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

        setTableHeader(columns);
    }, []);

    useEffect(() => {
        const API_END_POINT = '/api/admin/article';
        axiosClient
            .get(API_END_POINT)
            .then((res) => {
                setData(res.data);
                generateData(res.data);
                generateColumns();
            })
            .catch((err) => {
                console.warn(err);
            });
    }, [generateColumns]);

    const handleFilter = (filterIndex: number) => {
        setFilterIndex(filterIndex);
        handleFilterAndSearch(filterIndex, searchText);
    };

    const handleSearch = (searchText: string) => {
        setSearchText(searchText);
        handleFilterAndSearch(filterIndex, searchText);
    };

    const handleFilterAndSearch = (filterIndex: number, searchText: string) => {
        const filteredData = data.filter((item: any) => {
            if (filterIndex === 1 && !item.is_public) {
                return false;
            }
            if (filterIndex === 2 && item.is_public) {
                return false;
            }
            if (searchText && item.title.indexOf(searchText) === -1) {
                return false;
            }
            return true;
        });
        generateData(filteredData);
    };

    return (
        <>
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
            <div>
                <AntdTable tableData={tableData} tableHeader={tableHeader} pageSize={10} />
            </div>
        </>
    );
};

export default ArticlesListPage;

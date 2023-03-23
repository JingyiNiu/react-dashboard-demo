import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import { formatDate } from '../utils/utils';
import { Link } from 'react-router-dom';

const AntdTable = ({ data, onDelete }: any) => {
    const [tableData, setTableData] = useState([]);
    const [tableHeader, setTableHeader] = useState([]);

    const formatDataForTable = (data: any) => {
        const tableData = data.map((item: any) => ({
            ...item,
            key: item.id,
            created_at: item.created_at ? formatDate(item.created_at) : '',
            updated_at: item.updated_at ? formatDate(item.updated_at) : '',
        }));

        setTableData(tableData);
    };

    const formatHeaderForTable = useCallback(
        (data: any) => {
            const tableHeader: any = [];

            for (const key in data[0]) {
                tableHeader.push({
                    key: key,
                    title: key.replace('_', ' '),
                    dataIndex: key,
                    sorter: (a: any, b: any) => a[key].toString().localeCompare(b[key].toString()),
                });
            }
            tableHeader.push({
                key: 'Action',
                title: 'action',
                dataIndex: 'action',
                render: (_: any, item: any) => (
                    <div>
                        <Link
                            to={`/articles/edit/${item.key}`}
                            className="px-2 rounded-sm bg-primary-500 text-white hover:text-white hover:bg-primary-800 mr-2"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => onDelete(item.key)}
                            className="px-2 rounded-sm bg-red-500 text-white hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ),
            });

            setTableHeader(tableHeader);
        },
        [onDelete]
    );

    useEffect(() => {
        formatDataForTable(data);
        formatHeaderForTable(data);
    }, [data, formatHeaderForTable]);

    return <Table dataSource={tableData} columns={tableHeader} pagination={{ pageSize: 15 }} />;
};

export default AntdTable;

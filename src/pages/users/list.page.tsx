import { useCallback, useEffect, useState } from 'react';
import { checkToken } from '../../hooks/useAuth';
import axiosClient from '../../axios.config';
import H2Title from '../../components/custom/h2title';
import AntdTable from '../../components/antd-table';
import { ContactInterface } from '../../interfaces/ContactInterface';
import { TableColumnInterface } from '../../interfaces/TableColumnInterface';
import { capitalizeText } from '../../utils/utils';
import { Tag } from 'antd';

const UsersListPage = () => {
    const [tableData, setTableData] = useState<ContactInterface[]>([]);
    const [tableHeader, setTableHeader] = useState<TableColumnInterface[]>([]);

    useEffect(() => {
        checkToken();
    }, []);

    const formatColumns = useCallback((data: any) => {
        const formatedColumns = data.map((column: any) => {
            if (column.key === 'role') {
                return {
                    ...column,
                    render: (role: any, index: number) => <Tag key={index}>{role.name}</Tag>,
                };
            }
            return column;
        });
        setTableHeader([...formatedColumns]);
    }, []);

    const generateData = (data: ContactInterface[]) => {
        const tableData = data.map((item: any) => ({
            ...item,
            key: item.id,
        }));
        setTableData(tableData);
    };

    const generateColumns = useCallback(
        (data: ContactInterface[]) => {
            const allColumns: any = Object.keys(data[0]).map((key) => {
                return {
                    key,
                    title: capitalizeText(key.replace('_', ' ')),
                    dataIndex: key,
                };
            });

            formatColumns(allColumns);
        },
        [formatColumns]
    );

    const getApiData = useCallback(() => {
        const API_END_POINT = '/api/admin/user';

        axiosClient
            .get(API_END_POINT)
            .then((res) => {
                generateData(res.data);
                generateColumns(res.data);
            })
            .catch((err) => {
                console.warn(err);
            });
    }, [generateColumns]);

    useEffect(() => {
        getApiData();
    }, [getApiData]);

    return (
        <>
            <H2Title>User</H2Title>
            <AntdTable tableData={tableData} tableHeader={tableHeader} pageSize={15} />
        </>
    );
};

export default UsersListPage;

import { useCallback, useEffect, useState } from 'react';
import H2Title from '../../components/custom/h2title';
import { checkToken } from '../../hooks/useAuth';
import axiosClient from '../../axios.config';
import { ContactInterface } from '../../interfaces/ContactInterface';
import { TableColumnInterface } from '../../interfaces/TableColumnInterface';
import { formatDate } from '../../utils/utils';
import AntdTable from '../../components/antd-table';

const ContactsListPage = () => {
    const [tableData, setTableData] = useState<ContactInterface[]>([]);
    const [tableHeader, setTableHeader] = useState<TableColumnInterface[]>([]);

    useEffect(() => {
        checkToken();
    }, []);

    const generateData = (data: ContactInterface[]) => {
        const tableData = data.map((item: any) => ({
            ...item,
            key: item.id,
        }));
        setTableData(tableData);
    };

    const generateColumns = useCallback(() => {
        const columns = [
            { key: 'id', title: 'ID', dataIndex: 'id' },
            { key: 'name', title: 'Name', dataIndex: 'name' },
            { key: 'email', title: 'Email', dataIndex: 'email' },
            { key: 'created_at', title: 'Created At', dataIndex: 'created_at', render: (text: string) => formatDate(text) },
        ];

        setTableHeader(columns);
    }, []);

    const getApiData = useCallback(() => {
        const API_END_POINT = '/api/admin/contact';

        axiosClient
            .get(API_END_POINT)
            .then((res) => {
                generateData(res.data);
                generateColumns();
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
            <H2Title>Contacts</H2Title>
            <AntdTable tableData={tableData} tableHeader={tableHeader} pageSize={15} />
        </>
    );
};

export default ContactsListPage;

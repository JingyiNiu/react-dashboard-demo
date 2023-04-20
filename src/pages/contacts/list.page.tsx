import { useCallback, useEffect, useState } from 'react';
import H2Title from '../../components/custom/h2title';
import { checkToken } from '../../hooks/useAuth';
import axiosClient from '../../axios.config';
import { ContactInterface } from '../../interfaces/ContactInterface';
import { TableColumnInterface } from '../../interfaces/TableColumnInterface';
import { capitalizeText } from '../../utils/utils';
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

    const generateColumns = useCallback((data: ContactInterface[]) => {
        const allColumns: any = Object.keys(data[0]).map((key) => {
            return {
                key,
                title: capitalizeText(key.replace('_', ' ')),
                dataIndex: key,
            };
        });

        setTableHeader(allColumns);
    }, []);

    const getApiData = useCallback(() => {
        const API_END_POINT = '/api/admin/contact';

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
            <H2Title>Contacts</H2Title>
            <AntdTable tableData={tableData} tableHeader={tableHeader} pageSize={15} />
        </>
    );
};

export default ContactsListPage;

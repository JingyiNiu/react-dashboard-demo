import { Table } from 'antd';

const AntdTable = ({ tableData, tableHeader, pageSize }: any) => {
    return <Table dataSource={tableData} columns={tableHeader} pagination={{ pageSize: pageSize }} />;
};

export default AntdTable;

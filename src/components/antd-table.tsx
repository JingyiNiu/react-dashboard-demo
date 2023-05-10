import { Table } from 'antd';

const AntdTable = ({ tableData, tableHeader, pageSize }: any) => {
    return <Table 
        dataSource={tableData} 
        columns={tableHeader} 
        pagination={{ pageSize: pageSize }} 
        // scroll={{ x: 1300 }} 
    />;
};

export default AntdTable;

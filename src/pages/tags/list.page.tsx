import { useCallback, useEffect, useState } from 'react';
import { Modal } from 'antd';
import axiosClient from '../../axios.config';
import AntdTable from '../../components/antd-table';
import H2Title from '../../components/custom/h2title';
import { TableColumnInterface } from '../../interfaces/TableColumnInterface';
import { capitalizeText } from '../../utils/utils';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { TagInterface } from '../../interfaces/TagInterface';
import TagEditDialog from './edit.dialog';
import { checkToken } from '../../hooks/useAuth';
import CustomButton from '../../components/custom/button';

const TagsListPage = () => {
    useEffect(() => {
        checkToken();
    }, []);

    const { confirm } = Modal;

    const [tableData, setTableData] = useState<TagInterface[]>([]);
    const [tableHeader, setTableHeader] = useState<TableColumnInterface[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentTag, setCurrentTag] = useState<TagInterface | null>(null);

    const handleCloseModal = () => {
        setCurrentTag(null);
        setIsModalOpen(false);
    };

    const handleEdit = (data: any) => {
        setCurrentTag(data);
        setIsModalOpen(true);
    };

    const handleDelete = useCallback(
        (data: TagInterface) => {
            confirm({
                title: `Do you want to delete the following tag?`,
                content: `${data.id} - ${data.name} - ${data.description}`,
                onOk() {
                    console.log('delete', data.id);
                },
                onCancel() {},
            });
        },
        [confirm]
    );

    const generateData = (data: TagInterface[]) => {
        const tableData = data.map((item: any) => ({
            ...item,
            key: item.id,
        }));
        setTableData(tableData);
    };

    const formatColumns = useCallback(
        (columns: TableColumnInterface[]) => {
            const extraColumns = [
                {
                    key: 'action',
                    title: 'Action',
                    dataIndex: 'action',
                    render: (_: any, item: any) => (
                        <>
                            <button
                                className="w-6 h-6 rounded-sm bg-primary-800 text-white hover:text-white hover:bg-primary-900 mr-2"
                                onClick={() => handleEdit(item)}
                            >
                                <FormOutlined />
                            </button>
                            <button
                                className="w-6 h-6 rounded-sm bg-red-400 text-white hover:text-white hover:bg-red-500 mr-2"
                                onClick={() => handleDelete(item)}
                            >
                                <DeleteOutlined />
                            </button>
                        </>
                    ),
                },
            ];
            setTableHeader([...columns, ...extraColumns]);
        },
        [handleDelete]
    );

    const generateColumns = useCallback(
        (data: TagInterface[]) => {
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
        const API_END_POINT = '/api/admin/tag';

        axiosClient
            .get(API_END_POINT)
            .then((res) => {
                generateData(res.data);
                generateColumns(res.data);
            })
            .catch((err) => {
                console.warn(err.response);
            });
    }, [generateColumns]);

    const [submitError, setSubmitError] = useState('');

    const handleSubmit = (values: any) => {
        if (currentTag) {
            updateTag(values, currentTag);
        } else {
            createTag(values);
        }
    };

    const createTag = (data: any) => {
        const API_END_POINT = `/api/admin/tag`;
        axiosClient
            .post(API_END_POINT, data)
            .then((res) => {
                handleCloseModal();
                getApiData();
            })
            .catch((err) => {
                setSubmitError(err.response.data.message ? err.response.data.message : 'Error, please try again later');
            });
    };

    const updateTag = (data: any, currentTag: TagInterface) => {
        const API_END_POINT = `/api/admin/tag/${currentTag.id}`;
        axiosClient
            .put(API_END_POINT, data)
            .then((res) => {
                handleCloseModal();
                getApiData();
            })
            .catch((err) => {
                setSubmitError(err.response.data.message ? err.response.data.message : 'Error, please try again later');
            });
    };

    useEffect(() => {
        getApiData();
    }, [getApiData]);

    return (
        <>
            <H2Title>Tags</H2Title>
            <CustomButton className="mb-4" onClick={() => handleEdit(null)}>
                New Tag
            </CustomButton>
            <AntdTable tableData={tableData} tableHeader={tableHeader} pageSize={15} />
            <TagEditDialog isOpen={isModalOpen} data={currentTag} error={submitError} onClose={handleCloseModal} onSubmit={handleSubmit} />
        </>
    );
};

export default TagsListPage;

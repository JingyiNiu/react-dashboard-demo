import { useEffect, useState } from 'react';
import H2Title from '../../components/custom/h2title';
import axiosClient from '../../axios.config';
import { TagInterface } from '../../interfaces/TagInterface';
import { Input, List } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const TagsListPage = () => {
    const [tags, setTags] = useState<TagInterface[]>([]);

    useEffect(() => {
        const getTags = () => {
            const API_END_POINT = '/api/admin/tag';
            axiosClient
                .get(`${API_END_POINT}`)
                .then((res) => {
                    setTags(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getTags();
    }, []);

    return (
        <>
            <H2Title>Tags</H2Title>
            <List
                header={
                    <List.Item className='text-center font-bold'>
                        <span className="mr-4 w-10">Id</span>
                        <span className="w-40">Name</span>
                        <span className="w-40">Slug</span>
                        <span className="w-full">Description</span>
                        <span className="w-20">Actions</span>

                    </List.Item>
                }
                dataSource={tags}
                renderItem={(item, index) => (
                    <List.Item>
                        <span className="text-center mr-4 w-10">{item.id}</span>
                        <Input value={item.name} className="mr-2 w-40" />
                        <Input value={item.slug} className="mr-2 w-40" />
                        <Input value={item.description} className="mr-2" />
                        <button className="w-10 h-6 rounded-sm bg-primary-800 text-white hover:text-white hover:bg-primary-900 mr-2">
                            <CheckOutlined />
                        </button>
                        <button className="w-10 h-6 rounded-sm bg-red-400 text-white hover:text-white hover:bg-red-500 mr-2">
                            <CloseOutlined />
                        </button>
                    </List.Item>
                )}
            />
        </>
    );
};

export default TagsListPage;

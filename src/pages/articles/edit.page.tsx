import React, { useEffect, useState } from 'react';
import { Button, Input, Form, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import H2Title from '../../components/custom/h2title';
import TinyMceEditor from '../../components/tinymce-editor';
import axiosClient from '../../axios.config';
import { ArticleInterface, initialArticleData } from '../../interfaces/ArticleInterface';
import { checkToken } from '../../hooks/useAuth';
import { TagInterface } from '../../interfaces/TagInterface';

const EditArticlePage = () => {
    useEffect(() => {
        checkToken();
    }, []);

    const navigate = useNavigate();
    const { id } = useParams();

    const [form] = Form.useForm();
    const [slug, setSlug] = useState('');
    const [article, setArticle] = useState<ArticleInterface>(initialArticleData);
    const [tagOption, setTagOption] = useState<TagInterface[]>([]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        const newSlug = newTitle
            .toLowerCase()
            .replace(/[^\w\s]/gi, '')
            .replace(/\s+/g, '-');
        setSlug(newSlug);
        form.setFieldsValue({ slug: newSlug });
    };

    const createArticle = (data: any) => {
        const API_END_POINT = '/api/admin/article';
        axiosClient
            .post(API_END_POINT, data)
            .then((res) => {
                navigate('/articles');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateArticle = (data: any) => {
        const API_END_POINT = `/api/admin/article/${id}`;
        axiosClient
            .put(API_END_POINT, data)
            .then((res) => {
                navigate('/articles');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onSubmit = (values: any) => {
        id ? updateArticle(values) : createArticle(values);
    };

    const onSubmitFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        form.setFieldsValue(initialArticleData);
        const getArticleContent = () => {
            const API_END_POINT = '/api/admin/article';
            axiosClient
                .get(`${API_END_POINT}/${id}`)
                .then((res) => {
                    setArticle(res.data.data[0]);
                    form.setFieldsValue(res.data.data[0]);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getArticleContent();
    }, [id, form]);

    useEffect(() => {
        const getTags = () => {
            const API_END_POINT = '/api/admin/tag';
            axiosClient
                .get(`${API_END_POINT}`)
                .then((res) => {
                    setTagOption(res.data.data.map((tag: TagInterface) => ({ value: tag.id, label: tag.name })));
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getTags();
    }, []);

    return (
        <>
            <H2Title>{id ? 'Edit Article' : 'Create New Article'}</H2Title>
            <Form
                form={form}
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                onFinishFailed={onSubmitFailed}
            >
                <Form.Item name="title" label="Title" rules={[{ required: true }]} className="mb-8">
                    <Input placeholder="Title" size="large" onChange={handleTitleChange} />
                </Form.Item>

                <Form.Item name="slug" label="Slug" rules={[{ required: true }]} className="mb-8">
                    <Input placeholder="slug" size="large" value={slug} />
                </Form.Item>

                <Form.Item name="is_public" label="Is public" rules={[{ required: true }]} className="mb-8">
                    <Select
                        options={[
                            { value: 0, label: 'No' },
                            { value: 1, label: 'Yes' },
                        ]}
                    />
                </Form.Item>

                <Form.Item name="sort_order" label="Sort order" rules={[{ required: true }]} className="mb-8">
                    <Input placeholder="Sort order" size="large" type="number"/>
                </Form.Item>

                <Form.Item name="tags" label="Tag (Multiple selection)" rules={[{ required: true }]} className="mb-8">
                    <Select mode="multiple" options={tagOption} />
                </Form.Item>

                <Form.Item name="content" label="Content" rules={[{ required: true }]} className="mb-8">
                    <TinyMceEditor editorData={article && article.content} />
                </Form.Item>

                <Button type="primary" size="large" block className="bg-primary-800 font-medium" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default EditArticlePage;

import React, { useEffect, useState } from 'react';
import { Button, Input, Form, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import H2Title from '../../components/custom/h2title';
import TinyMceEditor from '../../components/tinymce-editor';
import axiosClient from '../../axios.config';
import { ArticleInterface } from '../../interfaces/ArticleInterface';

const EditArticlePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const initialArticleData: ArticleInterface = {
        title: '',
        slug: '',
        content: '',
        is_public: 0,
    };

    const [form] = Form.useForm();
    const [slug, setSlug] = useState('');
    const [currentArticle, setCurrentArticle] = useState<ArticleInterface>(initialArticleData);

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
                console.log(res);
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
                console.log(res);
                navigate('/articles');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onSubmit = (values: any) => {
        console.log(values);
        id ? updateArticle(values) : createArticle(values);
    };

    const onSubmitFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const getArticleContent = () => {
            const API_END_POINT = '/api/admin/article';
            axiosClient
                .get(`${API_END_POINT}/${id}`)
                .then((res) => {
                    setCurrentArticle(res.data.data[0]);
                    form.setFieldsValue(res.data.data[0]);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getArticleContent();
    }, [id, form]);

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

                <Form.Item name="content" label="Content" rules={[{ required: true }]} className="mb-8">
                    <TinyMceEditor editorData={currentArticle && currentArticle.content} />
                </Form.Item>

                <Button type="primary" size="large" block className="bg-primary-800 font-medium" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default EditArticlePage;

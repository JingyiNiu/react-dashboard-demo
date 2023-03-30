import { Modal, Button, Input, Form } from 'antd';
import { useState } from 'react';
import { FormOutlined } from '@ant-design/icons';
import { HomeIntroInterface } from '../interfaces/HomeIntroInterface';
import TinyMceEditor from './tinymce-editor';
import axiosClient from '../axios.config';

interface HomeIntroDialogProps {
    data: HomeIntroInterface;
}

const HomeIntroDialog = ({ data }: HomeIntroDialogProps) => {

    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();

    const showModal = () => {
        setOpen(true);
        form.setFieldsValue(data);
    };

    const handleOk = () => {
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onSubmit = (values: any) => {
        const API_END_POINT = `/api/admin/home/${data.id}`;

        axiosClient
            .put(API_END_POINT, values)
            .then((res) => {
                setOpen(false);
            })
            .catch((err) => {
                console.log(err)
            });
    };

    const onSubmitFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <button
            onClick={showModal}
            className="mx-2 w-8 h-8 rounded-lg bg-primary-500 text-white hover:text-white hover:bg-primary-800"
        >
            <FormOutlined className="w-4" />
        </button>
            <Modal
                open={open}
                title={`Edit`}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}
                width={800}
                centered
            >
                <Form
                form={form}
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                onFinishFailed={onSubmitFailed}
            >
                <Form.Item name="title" label="Title" rules={[{ required: true }]} className="mb-8">
                    <Input placeholder="Title" size="large"/>
                </Form.Item>


                <Form.Item name="content" label="Content" rules={[{ required: true }]} className="mb-8">
                    <TinyMceEditor editorData={data && data.content} />
                </Form.Item>

                <Button type="primary" size="large" block className="bg-primary-800 font-medium" htmlType="submit">
                    Submit
                </Button>
            </Form>
            </Modal>
        </>
    );
};

export default HomeIntroDialog;

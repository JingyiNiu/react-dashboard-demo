import { Button, Form, Input, Modal } from 'antd';
import { TagInterface } from '../../interfaces/TagInterface';
import { useEffect } from 'react';

type Props = {
    isOpen: boolean;
    data: TagInterface | null;
    error: string;
    onClose: () => void;
    onSubmit: (values: any) => void;
};

const TagEditDialog = ({ isOpen, data, error, onClose, onSubmit }: Props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(data);
    }, [data, form]);

    const handleOk = () => {
        onClose();
    };

    const handleCancel = () => {
        onClose();
        form.resetFields();
    };

    const onFinish = (values: any) => {
        onSubmit(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.warn('Failed:', errorInfo);
    };

    return (
        <Modal
            title={data ? `Edit Tag ${data.id}` : 'Create Tag'}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>
                    Submit
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                {data && (
                    <Form.Item name="id" label="ID" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                )}
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
            {error && <div className="text-rose-500 bg-rose-100 p-4 rounded-lg">{error}</div>}
        </Modal>
    );
};

export default TagEditDialog;

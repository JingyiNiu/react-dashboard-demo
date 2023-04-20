import { Button, Form, Input, Modal } from 'antd';
import { TagInterface } from '../../interfaces/TagInterface';
import { useEffect } from 'react';

type Props = {
    isOpen: boolean;
    data: TagInterface | null;
    onClose: () => void;
    onSubmit: (values: any) => void;
};

const TagEditDialog = ({ isOpen, data, onClose, onSubmit }: Props) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(data);
    }, [data, form]);

    const handleOk = () => {
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    const onFinish = (values: any) => {
        onSubmit(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.warn('Failed:', errorInfo);
    };

    return (
        <Modal
            title={data ? `Edit Tag ${data.id}` : ''}
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
        </Modal>
    );
};

export default TagEditDialog;

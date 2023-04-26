import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import axiosClient from '../../axios.config';
import H2Title from '../../components/custom/h2title';

const UpdatePasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const onSubmit = (values: any) => {
        const data = { password: values.password, newPassword: values.newPassword };
        const API_END_POINT = '/api/user/update-password';

        axiosClient
            .put(API_END_POINT, data)
            .then((res) => {
                setSuccessMessage("Password Updated Successfully")
            })
            .catch((err) => {
                setErrorMessage(err.response.data.error || err.message);
            });
    };

    const onSubmitFailed = (errorInfo: any) => {
        console.warn('Failed:', errorInfo);
    };
    return (
        <>
            <H2Title>Update Password</H2Title>
            <Form name="update-password-form" initialValues={{ remember: true }} onFinish={onSubmit} onFinishFailed={onSubmitFailed} style={{ maxWidth: 400 }}>
                <Form.Item name="password" rules={[{ required: true, message: 'Please enter old password' }]}>
                    <Input.Password size="large" placeholder="Old Password" />
                </Form.Item>

                <Form.Item name="newPassword" rules={[{ required: true, message: 'Please enter new password' }]}>
                    <Input.Password size="large" placeholder="New Password" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Please enter confirm password' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Confirm password does not match new password'));
                            },
                        }),
                    ]}
                >
                    <Input.Password size="large" placeholder="Confirm Password" />
                </Form.Item>

                <Button type="primary" size="large" block className="bg-primary-800 font-medium" htmlType="submit">
                    Submit
                </Button>

                {successMessage && (
                    <div className={`my-4 text-green-500 rounded-md p-4 bg-green-50`}>
                        <p>{successMessage}</p>
                    </div>
                )}

                {errorMessage && (
                    <div className={`my-4 text-rose-500 rounded-md p-4 bg-rose-50`}>
                        <p>{errorMessage}</p>
                    </div>
                )}
            </Form>
        </>
    );
};

export default UpdatePasswordPage;

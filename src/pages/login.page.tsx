import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import axiosClient from '../axios.config';
import { removeItemFromLocalStorage, setItemInLocalStorage } from '../utils/utils';

const LoginPage = () => {
    const API_END_POINT = '/api/login';
    const TOKEN_KEY = process.env.REACT_APP_LOCAL_TOKEN || 'token';

    const [loginError, setLoginError] = useState<string>('');

    const onSubmit = (values: any) => {
        axiosClient
            .post(API_END_POINT, values)
            .then((res) => {
                setItemInLocalStorage(TOKEN_KEY, res.data);
                setLoginError('');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((err) => {
                setLoginError(err.response.data.error || err.message);
                removeItemFromLocalStorage(TOKEN_KEY);
            });
    };

    const onSubmitFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="mx-auto w-full max-w-sm mt-32">
            <h1 className="text-xl poppins-bold mb-8 text-primary-800 text-center">Please Login</h1>
            <Form name="basic" initialValues={{ remember: true }} onFinish={onSubmit} onFinishFailed={onSubmitFailed}>
                <Form.Item name="email" rules={[{ required: true }]} className="mb-8">
                    <Input placeholder="Email" size="large" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true }]} className="mb-8">
                    <Input.Password placeholder="Password" size="large" />
                </Form.Item>

                <Button type="primary" size="large" block className="bg-primary-800 font-medium" htmlType="submit">
                    Submit
                </Button>
            </Form>

            {loginError && (
                <div className={`my-4 text-rose-500 rounded-md p-4 w-full max-w-lg bg-rose-50`}>
                    <p>{loginError}</p>
                </div>
            )}
        </div>
    );
};

export default LoginPage;

import React, { useEffect, useState } from 'react';
import { checkToken } from '../hooks/useAuth';
import axiosClient from '../axios.config';

interface DashboardData {
    articles: number;
    tags: number;
    users: number;
    contacts: {
        '7days_ago': number;
        now: number;
    };
}
const DashboardPage = () => {
    useEffect(() => {
        checkToken();
    }, []);

    const basicBox = `rounded-md py-4`;

    const box1 = `bg-primary-800 text-white`;
    const box2 = `border-2 border-primary-500 text-primary-800`;
    const box3 = `bg-primary-800 text-white md:border-2 md:bg-white md:border-primary-500 md:text-primary-800`;
    const box4 = `border-2 border-primary-500 text-primary-800 md:bg-primary-800 md:text-white`;

    const [data, setData] = useState<DashboardData | null>(null);

    useEffect(() => {
        const API_END_POINT = '/api/admin/dashboard';

        axiosClient
            .get(API_END_POINT)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.warn(err);
            });
    }, []);

    return (
        <div className="mx-auto w-full max-w-sm my-16 text-center">
            <h1 className="text-xl poppins-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`${basicBox} ${box1}`}>
                    <div className="font-bold uppercase">articles</div>
                    <div className="a">{data && data.articles}</div>
                </div>
                <div className={`${basicBox} ${box2}`}>
                    <div className="font-bold uppercase">tags</div>
                    <div className="a">{data && data.tags}</div>
                </div>
                <div className={`${basicBox} ${box3}`}>
                    <div className="font-bold uppercase">users</div>
                    <div className="a">{data && data.users}</div>
                </div>
                <div className={`${basicBox} ${box4}`}>
                    <div className="font-bold uppercase">contacts</div>
                    <div className="a">Last 7 days: {data && data.contacts['7days_ago']} &rarr; {data && data.contacts.now}</div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;

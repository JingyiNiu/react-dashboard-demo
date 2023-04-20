import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import axiosClient from '../../axios.config';
import H2Title from '../../components/custom/h2title';
import { checkToken } from '../../hooks/useAuth';
import { HomeIntroInterface } from '../../interfaces/HomeIntroInterface';
import HomeIntroDialog from '../../components/home-intro-dialog';

const IntrosListPage = () => {
    const API_END_POINT = '/api/admin/intro';

    const [homeData, setHomeData] = useState<HomeIntroInterface[]>([]);

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        axiosClient
            .get(API_END_POINT)
            .then((res) => {
                setHomeData(res.data);
            })
            .catch((err) => {
                console.warn(err);
            });
    }, []);

    return (
        <>
            <H2Title>
                English Version
                <HomeIntroDialog data={homeData[0]}/>
            </H2Title>
            <HomeIntroCard data={homeData[0]} />
            <H2Title>
                中文版简介
                <HomeIntroDialog data={homeData[1]}/>
            </H2Title>
            <HomeIntroCard data={homeData[1]} />
        </>
    );
};

export default IntrosListPage;

function HomeIntroCard({ data }: { data: HomeIntroInterface }) {
    return (
        <div className="border rounded-lg p-4 mb-8">
            <h3 className="font-bold text-lg my-4">{data && data.title}</h3>
            <div>{parse(data ? data.content : '')}</div>
        </div>
    );
}

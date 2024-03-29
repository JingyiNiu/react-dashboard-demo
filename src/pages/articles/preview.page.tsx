import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { checkToken } from '../../hooks/useAuth';
import axiosClient from '../../axios.config';
import { ArticleInterface, initialArticleData } from '../../interfaces/ArticleInterface';
import { formatDateToLocale } from '../../utils/utils';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

const ArticlePreviewPage = () => {
    useEffect(() => {
        checkToken();
        getUrl();
    }, []);

    const [chinesePreview, setChinesePreview] = useState(false);

    const getUrl = () => {
        const path = window.location.pathname;
        const url = path.split('/')[2];
        if (url === 'preview-zh') {
            setChinesePreview(true);
        }
    };
    const { id } = useParams();

    const [article, setArticle] = useState<ArticleInterface>(initialArticleData);

    useEffect(() => {
        const getArticleContent = () => {
            const API_END_POINT = '/api/admin/article';
            axiosClient
                .get(`${API_END_POINT}/${id}`)
                .then((res) => {
                    setArticle(res.data[0]);
                    Prism.highlightAll();
                })
                .catch((err) => {
                    console.warn(err);
                });
        };

        getArticleContent();
    }, [id]);

    return (
        <div className="bg-neutral-100 border-b-4 border-b-primary-500 p-4 md:pt-10 md:pb-16 md:px-20 m-8">
            <h2 className="my-4 text-2xl font-bold">{chinesePreview ? parse(article.title_zh) : parse(article.title)}</h2>
            <h4 className="my-4 text-neutral-400 text-sm">
                {chinesePreview ? '发布于' : 'Published at'} {article.updated_at && formatDateToLocale(article.updated_at)}
            </h4>
            <>{chinesePreview ? parse(article.content_zh) : parse(article.content)}</>
        </div>
    );
};

export default ArticlePreviewPage;

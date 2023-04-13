import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { getItemInLocalStorage, TOKEN_KEY } from './utils/utils';

import Sidebar from './components/sidebar';
import Nav from './components/nav';

import LoginPage from './pages/login.page';
import DashboardPage from './pages/dashboard.page';
import IntrosListPage from './pages/intros/list.page';
import ArticlesListPage from './pages/articles/list.page';
import ArticleEditPage from './pages/articles/edit.page';
import ArticlePreviewPage from './pages/articles/preview.page';
import TagsListPage from './pages/tags/list.page';
import UsersListPage from './pages/users/list.page';
import ContactsListPage from './pages/contacts/list.page';

import './styles/app.css';

function App() {
    const isToken = getItemInLocalStorage(TOKEN_KEY);

    const routes = [
        { path: '/dashboard', component: <DashboardPage /> },
        { path: '/articles', component: <ArticlesListPage /> },
        { path: '/articles/create', component: <ArticleEditPage /> },
        { path: '/articles/edit/:id', component: <ArticleEditPage /> },
        { path: '/articles/preview/:id', component: <ArticlePreviewPage /> },
        { path: '/tags', component: <TagsListPage /> },
        { path: '/intro', component: <IntrosListPage /> },
        { path: '/users', component: <UsersListPage /> },
        { path: '/contacts', component: <ContactsListPage /> },
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#65bdc4',
                },
            }}
        >
            <Router>
                <div className="min-h-screen flex">
                    {isToken && <Sidebar />}
                    <div className="flex-grow">
                        {isToken && <Nav />}
                        <div className="p-4">
                            <Routes>
                                <Route
                                    path="/login"
                                    element={isToken ? <Navigate to="/dashboard" /> : <LoginPage />}
                                />
                                {routes.map((route) => (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={isToken ? route.component : <Navigate to="/login" />}
                                    />
                                ))}
                                <Route path="*" element={isToken ? <DashboardPage /> : <Navigate to="/login" />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </ConfigProvider>
    );
}

export default App;

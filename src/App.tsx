import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { getItemInLocalStorage, TOKEN_KEY } from './utils/utils';

import Sidebar from './components/sidebar';
import Nav from './components/nav';

import LoginPage from './pages/login.page';
import DashboardPage from './pages/dashboard.page';
import ListAllArticlesPage from './pages/articles/list.page';
import EditArticlePage from './pages/articles/edit.page';
import PreviewArticlePage from './pages/articles/preview.page';
import ListHomeIntroPage from './pages/home-intro/list.page';
import ListUsersPage from './pages/users/list.page';
import ListContactsPage from './pages/contact/list.page';

import './styles/app.css';

function App() {
    const isToken = getItemInLocalStorage(TOKEN_KEY);

    const routes = [
        { path: '/dashboard', component: <DashboardPage /> },
        { path: '/articles', component: <ListAllArticlesPage /> },
        { path: '/articles/create', component: <EditArticlePage /> },
        { path: '/articles/edit/:id', component: <EditArticlePage /> },
        { path: '/articles/preview/:id', component: <PreviewArticlePage /> },
        { path: '/intro', component: <ListHomeIntroPage /> },
        { path: '/contacts', component: <ListContactsPage /> },
        { path: '/users', component: <ListUsersPage /> },
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

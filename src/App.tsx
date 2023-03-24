import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import Sidebar from './components/sidebar';
import Nav from './components/nav';
import LoginPage from './pages/login.page';
import DashboardPage from './pages/dashboard.page';
import CreateArticlePage from './pages/articles/create.page';
import EditArticlePage from './pages/articles/edit.page';
import ListAllArticlesPage from './pages/articles/list.page';
import { getItemInLocalStorage, TOKEN_KEY } from './utils/utils';

import './App.css';

function App() {    
    const isToken = getItemInLocalStorage(TOKEN_KEY);

    const routes = [
        { path: '/dashboard', component: <DashboardPage /> },
        { path: '/articles', component: <ListAllArticlesPage /> },
        { path: '/articles/create', component: <CreateArticlePage /> },
        { path: '/articles/edit/:id', component: <EditArticlePage /> },
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

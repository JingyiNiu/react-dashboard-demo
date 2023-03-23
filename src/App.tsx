import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useAuth } from './hooks/useAuth';

import Sidebar from './components/sidebar';
import Nav from './components/nav';

import LoginPage from './pages/login.page';
import DashboardPage from './pages/dashboard.page';
import CreateArticlePage from './pages/articles/create.page';
import EditArticlePage from './pages/articles/edit.page';
import ListAllArticlesPage from './pages/articles/list.page';

import './App.css';

function App() {
    const isLoggedIn = useAuth();

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
                    {isLoggedIn && <Sidebar />}
                    <div className="flex-grow">
                        {isLoggedIn && <Nav />}
                        <div className="p-4">
                            <Routes>
                                <Route path="/login" element={isLoggedIn ? <Navigate to='/dashboard' /> : <LoginPage />} />
                                {routes.map((route) => (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={isLoggedIn ? route.component : <Navigate to='/login' />}
                                    />
                                ))}
                                <Route path="*" element={isLoggedIn ? <DashboardPage /> : <Navigate to='/login' />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </ConfigProvider>
    );
}

export default App;

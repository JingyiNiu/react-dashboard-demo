import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/login.page';
import DashboardPage from './pages/dashboard.page';
import './App.css';
import Nav from './components/nav.component';

function App() {
    const isLoggedIn = useAuth();

    const routes = [{ path: '/dashboard', component: <DashboardPage /> }];

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#65bdc4',
                },
            }}
        >
            <Router>
                {isLoggedIn && <Nav/>}
                <Routes>
                    <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />} />
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={isLoggedIn ? route.component : <Navigate to="/login" />}
                        />
                    ))}
                    <Route path="*" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                </Routes>
            </Router>
        </ConfigProvider>
    );
}

export default App;

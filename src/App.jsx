import { Routes, Route, Link, useNavigate, } from "react-router-dom";
import Login from './pages/login';
import Home from './pages/home';
import Appointment from './pages/appointment';
import MyAppointments from './pages/myAppointments';
import Results from './pages/results';
import ProtectedRoute from './components/ProtectedRoute';
import { Button, Layout, Menu } from "antd";
import { useAuth } from './components/AuthContext';
import './index.css';

const { Header, Content, Footer} = Layout

export const App = () => {
    const { isLoggedIn, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

    return (
    <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}> 
                <div className="logo" style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
                 <Link to="/" >Диспансеризация Онлайн</Link>
                </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1, minWidth: 0 }}>
                <Menu.Item key="home">
                    <Link to="/">Главная</Link>
                </Menu.Item>
          {isLoggedIn && ( 
            <>
              <Menu.Item key="my-appointments">
                <Link to="/my-appointments">Мои записи</Link>
              </Menu.Item>
              <><Menu.Item key="appointment">
                <Link to="/appointment">Записаться</Link>
              </Menu.Item></>
              <Menu.Item key="results">
                <Link to="/results">Результаты</Link>
              </Menu.Item>
            </> 
          )}
        </Menu>
        <div>
          {isLoggedIn ? (
            <Button type="primary" danger onClick={handleLogout}>
              Выйти
            </Button>
          ) : (
            <Button type="primary">
              <Link to="/login" style={{ color: 'white'}}>Войти</Link>
            </Button>
          )}
        </div>
        </Header>

        <Content style={{ padding: '0 50px', marginTop: 64}}> 
        <div style={{ background: '#fff', padding: 24, minHeight: 'calc(100vh - 170px)' }}> 
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/my-appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
                <Route path="/appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
                <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
            </Routes>
        </div>
        </Content>
    <Footer style={{ textAlign: 'center' }}>
        Диспансеризация Онлайн ©{new Date().getFullYear()} Created by redddeerr
    </Footer>
    </Layout>
    )
}
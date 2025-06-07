import { Routes, Route, Link, useNavigate, } from "react-router-dom";
import Login from './pages/login';
import Home from './pages/home';
import Appointment from './pages/appointment';
import MyAppointments from './pages/myAppointments';
import Results from './pages/results';
import ProtectedRoute from './components/ProtectedRoute';
import { Button, Drawer, Layout, Menu } from "antd";
import { useAuth } from './components/AuthContext';
import './index.css';
import { MenuOutlined } from '@ant-design/icons';
import { Desktop, Mobile } from './responsive';
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';


const { Header, Content, Footer} = Layout

export const App = () => {
  const { isLoggedIn, logout } = useAuth(); 
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 }); 
  const [drawerVisible, setDrawerVisible] = useState(false); 

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const renderMenuItems = (mode, menuTheme) => (
    <Menu theme={menuTheme} mode={mode} defaultSelectedKeys={['1']}>
      <Menu.Item key="home" onClick={onCloseDrawer}>
        <Link to="/">Главная</Link>
      </Menu.Item>
      {isLoggedIn && (
        <>
          <Menu.Item key="my-appointments" onClick={onCloseDrawer}>
            <Link to="/my-appointments">Мои записи</Link>
          </Menu.Item>
          <Menu.Item key="appointment" onClick={onCloseDrawer}>
            <Link to="/appointment">Записаться</Link>
          </Menu.Item>
          <Menu.Item key="results" onClick={onCloseDrawer}>
            <Link to="/results">Результаты</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
    
  );

  const contentPadding = isMobile ? '0 10px' : '0 50px';

    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <div className="logo" style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Диспансеризация Онлайн</Link>
        </div>

        <Desktop>
           {renderMenuItems("horizontal", "dark")}
          <div style={{ marginLeft: 'auto'}}>
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
        </Desktop>

        <Mobile>
          <Button type="primary" icon={<MenuOutlined />} onClick={showDrawer} />
          <Drawer
            title="Меню"
            placement="right"
            onClose={onCloseDrawer}
            open={drawerVisible}
            style={{ padding: 0 }}
          >
            {renderMenuItems("vertical", "light")}
            {isLoggedIn ? (
              <Button type="primary" danger onClick={handleLogout} style={{ width: '100%', marginTop: '20px' }}>
                Выйти
              </Button>
            ) : (
              <Button type="primary" style={{ width: '100%', marginTop: '20px' }}>
                <Link to="/login" style={{ color: 'white'}} onClick={onCloseDrawer}>Войти</Link>
              </Button>
            )}
          </Drawer>
        </Mobile>
      </Header>

        <Content style={{ marginTop: 64 }}> 
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
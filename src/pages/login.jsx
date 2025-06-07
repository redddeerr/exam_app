import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Card, Typography, message } from 'antd'; 
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../components/AuthContext'; 

const { Title } = Typography;

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 


  const onFinish = (values) => {
    console.log('Received values of form: ', values);


    if (values.username === 'test' && values.password === 'password') {
      login();
      message.success('Вход выполнен успешно!'); 
      navigate('/'); 
    } else {
      message.error('Неверный логин или пароль.'); 
    }
  };

 
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Пожалуйста, введите логин и пароль.'); 
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 128px)' }}>
      <Card style={{ width: 400, padding: '20px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>Авторизация</Title>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}     
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Пожалуйста, введите ваш логин!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="" style={{ float: 'right' }}>
              Забыли пароль?
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} size="large">
              Войти
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            Или <a href="">зарегистрироваться сейчас!</a>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Login;

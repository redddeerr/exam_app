import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { Button, Card, Col, Row, Typography } from 'antd';

const { Title, Paragraph } = Typography;

function Home(){ 
  const { isLoggedIn } = useAuth();

 return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: 'blue' }}>
        Добро пожаловать!
      </Title>

      <Paragraph style={{ textAlign: 'center', fontSize: '16px', marginBottom: '60px' }}>
        Наше приложение призвано упростить взаимодействие с медицинскими услугами, предоставляя удобный доступ к записям, результатам исследований и информации о здоровье.
      </Paragraph>

  <Title level={3} style={{ marginBottom: '30px' }}>Преимущества Диспонсеризации Онлайн:</Title>
      <Row gutter={[16, 16]}> 
        <Col xs={24} sm={12} md={8}> 
          <Card title="Вход в систему" bordered={false} hoverable>
            <Paragraph>Получите доступ к вашим персональным данным, истории записей и результатам исследований.</Paragraph>
            {!isLoggedIn && (
              <Link to="/login"><Button type="primary">Перейти ко входу</Button></Link>
            )}
            {isLoggedIn && (
                 <Paragraph type="secondary">Вы авторизованы.</Paragraph>
            )}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Запись на прием" bordered={false} hoverable>
            <Paragraph>Легко записывайтесь к врачам и на процедуры диспансеризации онлайн.</Paragraph>
            <Link to="/appointment"><Button color="primary" variant="outlined">Записаться сейчас</Button></Link>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Результаты исследований" bordered={false} hoverable>
            <Paragraph>Просматривайте и скачивайте результаты ваших анализов и исследований в любое удобное время.</Paragraph>
            <Link to="/results"><Button color="primary" variant="outlined">Просмотреть результаты</Button></Link>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Мои записи" bordered={false} hoverable>
            <Paragraph>Следите за вашими текущими и прошлыми записями, изменяйте или отменяйте их при необходимости.</Paragraph>
            <Link to="/my-appointments"><Button color="primary" variant="outlined"> Мои записи</Button></Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
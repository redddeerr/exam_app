import { Button, Card, List, message, Modal, Typography } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 

const { Title, Text } = Typography;

function MyAppointments() {

  const [appointments, setAppointments] = useState([
    { id: 1, type: 'Прием терапевта', date: '2025-06-10', time: '10:00', status: 'upcoming' },
    { id: 2, type: 'Диспансеризация', date: '2025-06-25', time: '14:30', status: 'upcoming' },
    { id: 3, type: 'Прием кардиолога', date: '2025-05-15', time: '11:00', status: 'past' },
  ]);

   const cancelAppointment = (id) => {
    Modal.confirm({
      title: 'Подтверждение отмены',
      content: 'Вы уверены, что хотите отменить эту запись?',
      okText: 'Да',
      cancelText: 'Нет',
      onOk() {
        setTimeout(() => {
          const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
          setAppointments(updatedAppointments);
          message.success('Запись успешно отменена.');
        }, 500); 
      },
      onCancel() {
        message.info('Отмена записи отменена.');
      },
    });
  };

  const upcomingAppointments = appointments.filter(app => app.status === 'upcoming');
  const pastAppointments = appointments.filter(app => app.status === 'past');

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>Мои записи</Title>

      <Card title="Предстоящие записи" style={{ marginBottom: '20px' }}>
        {upcomingAppointments.length === 0 ? (
          <p>У вас пока нет предстоящих записей.</p>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={upcomingAppointments}
            renderItem={appointment => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    danger
                    onClick={() => cancelAppointment(appointment.id)}
                  >
                    Отменить
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={`${appointment.type}`}
                  description={`${appointment.date}, ${appointment.time}`}
                />
              </List.Item>
            )}
          />
        )}
      </Card>

      <Card title="Прошедшие записи">
        {pastAppointments.length === 0 ? (
          <p>У вас пока нет прошедших записей.</p>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={pastAppointments}
            renderItem={appointment => (
              <List.Item>
                <List.Item.Meta
                  title={`${appointment.type}`}
                  description={`${appointment.date}, ${appointment.time}`}
                />
              </List.Item>
            )}
          />
        )}
      </Card>

      <Link to="/" style={{ display: 'block', marginTop: '20px', textAlign: 'center' }}>
        <Button type="link">Вернуться на главную</Button>
      </Link>
    </div>
  );
}

export default MyAppointments;
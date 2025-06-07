import { Button, Card, DatePicker, Form, message, Select, TimePicker, Typography, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useAuth } from '../components/AuthContext'; 

const { Option } = Select;
const { Title } = Typography;

function Appointment() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { addAppointment } = useAuth();

 const onFinish = (values) => {
    const { date, time, specialty } = values;

    const formattedDate = date ? date.format('YYYY-MM-DD') : '';
    const formattedTime = time ? time.format('HH:mm') : '';

    const newAppointment = {
      type: `Прием у ${specialty}`,
      date: formattedDate,
      time: formattedTime,
    };

    addAppointment(newAppointment); 
    message.success(`Вы записаны на ${formattedDate} в ${formattedTime} к ${specialty}.`);
    form.resetFields(); 
    navigate('/my-appointments'); 
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Пожалуйста, заполните все обязательные поля.');
  };

  return (
  <div style={{ padding: '20px', maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
      <Title level={2} style={{ marginBottom: '30px' }}>Запись на прием</Title>

      <Card style={{ padding: '20px' }}>
        <Form
          form={form}
          name="appointmentForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          initialValues={{ 
            date: dayjs(),
            time: dayjs().hour(10).minute(0).second(0),
          }}
        >
          <Form.Item
            label="Дата"
            name="date"
            rules={[{ required: true, message: 'Выберите дату!' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              disabledDate={current => current && current < dayjs().startOf('day')} 
            />
          </Form.Item>

          <Form.Item
            label="Время"
            name="time"
            rules={[{ required: true, message: 'Выберите время!' }]}
          >
            <TimePicker
              style={{ width: '100%' }}
              format="HH:mm"
              minuteStep={15} 
              hideDisabledOptions 
            />
          </Form.Item>

          <Form.Item
            label="Специальность врача"
            name="specialty"
            rules={[{ required: true, message: 'Выберите специальность!' }]}
          >
            <Select placeholder="Выберите специальность">
              <Option value="Терапевт">Терапевт</Option>
              <Option value="Кардиолог">Кардиолог</Option>
              <Option value="Дерматолог">Дерматолог</Option>
              <Option value="Окулист">Окулист</Option>
              <Option value="Стоматолог">Стоматолог</Option>
              <Option value="Хирург">Хирург</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
              Записаться
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Appointment;
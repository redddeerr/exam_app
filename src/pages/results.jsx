import React, { useState, useEffect } from 'react';
import { Button, List, Typography, Card, Space, Tag, Empty, Modal, message, Spin } from 'antd';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);


  useEffect(() => {
    const fetchResults = () => {
      setLoading(true);
      setTimeout(() => {
        setResults([
          {
            id: 1,
            type: 'Общий анализ крови',
            date: '2025-05-20',
            status: 'Новый',
            details: 'Гемоглобин: 140 г/л, Эритроциты: 4.5 * 10^12/л, Лейкоциты: 7.2 * 10^9/л. Все показатели в норме.',
            fileUrl: '/path/to/blood_test_1.pdf', 
          },
          {
            id: 2,
            type: 'Биохимический анализ крови',
            date: '2025-05-18',
            status: 'Просмотрен',
            details: 'Глюкоза: 5.1 ммоль/л, Холестерин: 4.8 ммоль/л. Есть небольшое повышение ЛПНП.',
            fileUrl: '/path/to/biochem_test_2.pdf',
          },
          {
            id: 3,
            type: 'Заключение УЗИ брюшной полости',
            date: '2025-05-10',
            status: 'Новый',
            details: 'Печень: не увеличена, однородная. Желчный пузырь: без камней. Заключение: без патологий. Дополнительные сведения: пациент жаловался на легкий дискомфорт в правом подреберье, что не подтвердилось на УЗИ. Рекомендовано соблюдение диеты.',
            fileUrl: '/path/to/uzi_report_3.pdf',
          },
          {
            id: 4,
            type: 'Рентген грудной клетки',
            date: '2025-04-25',
            status: 'Просмотрен',
            details: 'Легочные поля без очаговых и инфильтративных изменений. Корни структурны. Диафрагма четкая. Синусы свободны. Сердце в пределах нормы.',
            fileUrl: '/path/to/xray_report_4.pdf',
          },
        ]);
        setLoading(false);
      }, 1000); 
    };

    fetchResults();
  }, []);

  const showResultDetails = (result) => {
    setCurrentResult(result);
    setIsModalVisible(true);
    setResults(prevResults =>
      prevResults.map(r => (r.id === result.id && r.status === 'Новый' ? { ...r, status: 'Просмотрен' } : r))
    );
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setCurrentResult(null);
  };

  const handleDownload = (fileUrl, fileName) => {
    message.loading({ content: 'Загрузка файла...', key: 'downloading' });
    setTimeout(() => {
      message.success({ content: `Файл "${fileName}" успешно загружен!`, key: 'downloading', duration: 2 });
    }, 1500);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '40px auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>Мои результаты исследований</Title>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" tip="Загрузка результатов..." />
        </div>
      ) : (
        <>
          {results.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="У вас пока нет результатов исследований."
            >
              <Paragraph>Если вы недавно сдавали анализы, результаты могут появиться позже.</Paragraph>
              <Link to="/appointment"><Button type="primary">Записаться на обследование</Button></Link>
            </Empty>
          ) : (
            <List
              grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
              dataSource={results}
              renderItem={item => (
                <List.Item>
                  <Card
                    title={item.type}
                    extra={
                      <Tag color={item.status === 'Новый' ? 'blue' : 'green'}>
                        {item.status}
                      </Tag>
                    }
                    actions={[
                      <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => showResultDetails(item)}
                      >
                        Просмотр
                      </Button>,
                      <Button
                        type="text"
                        icon={<DownloadOutlined />}
                        onClick={() => handleDownload(item.fileUrl, `${item.type}_${item.date}.pdf`)}
                        disabled={!item.fileUrl} 
                      >
                        Скачать
                      </Button>,
                    ]}
                    hoverable
                  >
                    <Paragraph>
                      <Text strong>Дата:</Text> {item.date}
                    </Paragraph>
                    <Paragraph ellipsis={{ rows: 2, expandable: false, tooltip: item.details }}>
                      <Text strong>Кратко:</Text> {item.details}
                    </Paragraph>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </>
      )}

      <Modal
        title={currentResult?.type}
        open={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Закрыть
          </Button>,
          currentResult?.fileUrl && (
            <Button
              key="download"
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => handleDownload(currentResult.fileUrl, `${currentResult.type}_${currentResult.date}.pdf`)}
            >
              Скачать
            </Button>
          ),
        ]}
      >
        {currentResult ? (
          <>
            <Paragraph><Text strong>Дата:</Text> {currentResult.date}</Paragraph>
            <Paragraph><Text strong>Статус:</Text> <Tag color={currentResult.status === 'Новый' ? 'blue' : 'green'}>{currentResult.status}</Tag></Paragraph>
            <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{currentResult.details}</Paragraph> 
          </>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных для просмотра." />
        )}
      </Modal>

      <Link to="/" style={{ display: 'block', marginTop: '40px', textAlign: 'center' }}>
        <Button type="link">Вернуться на главную</Button>
      </Link>
    </div>
  );
}

export default Results;


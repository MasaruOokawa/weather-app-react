// WeatherApp.jax
import React, { useEffect, useState } from 'react';
import { Container, Button, InputGroup, FormControl, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import WeatherInfo from './WeatherInfo';
import { getDayOfWeek } from './utils';
import WeatherBackground from './WeatherBackground';

const apiKey = "d3f3a83ea3b8a4eb6de18f4810d5c3cc";

const WeatherApp = () => {
  const [currentDate, setCurrentDate] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");

  const fetchWeatherData = async (apiUrl) => {
    try {
      const response = await axios.get(apiUrl);
      if (response && response.status === 200) {
        const data = response.data;
        setWeatherData(data);
        const currentDateTime = new Date(data.dt * 1000);
        const formattedDate = `${currentDateTime.getMonth() + 1}/${currentDateTime.getDate()} (${getDayOfWeek(currentDateTime.getDay())})`;
        const formattedTime = `${currentDateTime.getHours()}:${currentDateTime.getMinutes()}`;
        setCurrentDate({ formattedDate, formattedTime });
      } else {
        throw new Error('APIからのレスポンスが失敗しました');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') getWeatherByLocation();
  };

  const getWeatherByLocation = () => {
    if (!location.trim()) {
      setError("地名を入力してください");
      return;
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&lang=ja&units=metric`;
    fetchWeatherData(apiUrl);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=ja&units=metric`;
        fetchWeatherData(apiUrl);
      });
    }
  }, []);

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <div style={{ width: '800px' }}>
        <Row className="justify-content-center">
          <Col xs={12}>
            {error && <Alert variant="danger">エラー：{error}</Alert>}
            {loading ? <div>読み込み中...</div> : <WeatherInfo weatherData={weatherData} currentDate={currentDate} />}
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                className="form-control"
                value={location}
                onChange={e => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="地名を入力してください"
              />
              <Button variant="outline-secondary" onClick={getWeatherByLocation}>検索</Button>
            </InputGroup>
          </Col>
        </Row>
      </div>
      <WeatherBackground location={weatherData?.name} />
    </Container>
  );
};

export default WeatherApp;


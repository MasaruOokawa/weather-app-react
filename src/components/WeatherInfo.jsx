import React from 'react';
import { Image } from 'react-bootstrap';
import { convertWeatherToJapanese } from './utils';

const WeatherInfo = ({ weatherData, currentDate }) => {
    if (!weatherData || !weatherData.main) return <div>読み込み中...</div>;
    return (
        <div className="text-center shadow-lg bg-gradient pt-4">
            {currentDate && (
                <div className="justify-content-center mb-5">
                    <h1>{currentDate.formattedDate}</h1>
                </div>
            )}
            <div className="d-flex justify-content-center mb-3">
                <div className="temperature">
                    <div className="degree-section d-flex justify-content-center">
                        <h2 className="me-3">{weatherData.main.temp.toFixed(1)}°C</h2>
                        <h3 className="temperature-description align-self-center fw-bold">
                            {convertWeatherToJapanese(weatherData.weather[0].main)}
                            <span className="ms-3">{convertWeatherToJapanese(weatherData.weather[0].description)}</span>
                        </h3>
                    </div>
                    <div className="justify-content-center">
                        <Image
                            className="icon mb-3"
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                            alt={weatherData.weather[0].icon}
                        />
                    </div>
                    <div className="justify-content-end">
                        <small className="location-name row justify-content-end">現在地 : {weatherData?.name}</small>
                        <small className="row justify-content-end">更新 {currentDate.formattedTime}</small>
                    </div>
                    <div className="d-flex justify-content-center fw-bold fs-3">
                        <p xs="auto" className="temp-max text-danger m-1">
                            {weatherData.main.temp_max.toFixed(1)}°C
                        </p><span xs="auto" className="m-1">/</span>
                        <p xs="auto" className="temp-min text-primary m-1">
                            {weatherData.main.temp_min.toFixed(1)}°C
                        </p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p xs="auto" className="rainfall m-3">降水 : {weatherData.rain?.['1h'] || 0} mm</p>
                        <p xs="auto" className="humidity m-3">湿度 : {weatherData.main.humidity}%</p>
                        <p xs="auto" className="wind-speed m-3">風 : {weatherData.wind.speed} m/s</p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p xs="auto" className="m-3">
                            体感温度 : <span className="">{weatherData.main?.feels_like}°C</span>
                        </p>
                        <p xs="auto" className="m-3">
                            雲の割合 : <span className="">{weatherData.clouds?.all}%</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherInfo;

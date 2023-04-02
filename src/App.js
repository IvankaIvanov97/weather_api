import {useState} from "react";
import axios from "axios";

function App() {
    const [value, setValue] = useState("")
    const [validate, setValidate] = useState(null)
    const [weather, setWeather] = useState(null)
    // let w = {
    //     request: {
    //         type: 'City',
    //         query: 'Moscow, Russia',
    //         language: 'en',
    //         unit: 'm',
    //     },
    //     location: {
    //         name: 'Moscow',
    //         country: 'Russia',
    //         region: 'Moscow City',
    //         lat: '55.752',
    //         lon: '37.616',
    //         timezone_id: 'Europe/Moscow',
    //         localtime: '2023-04-01 17:11',
    //         localtime_epoch: 1680369060,
    //         utc_offset: '3.0',
    //     },
    //     current: {
    //         observation_time: '02:11 PM',
    //         temperature: 7,
    //         weather_code: 116,
    //         weather_icons: [
    //             'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png',
    //         ],
    //         weather_descriptions: ['Partly cloudy'],
    //         wind_speed: 19,
    //         wind_degree: 160,
    //         wind_dir: 'SSE',
    //         pressure: 1005,
    //         precip: 0,
    //         humidity: 61,
    //         cloudcover: 75,
    //         feelslike: 4,
    //         uv_index: 1,
    //         visibility: 10,
    //         is_day: 'yes',
    //     },
    // };

    function getWeather() {
        if (value !== "") {
            setValidate(null)
            axios({
                method: 'get',
                url:
                    'http://api.weatherstack.com/current?access_key=72c6e8d00df5ed1831452be71306f96c&query=' + value,
                headers: { 'Content-Type': 'application/json' },
            })
                .then(function (response) {
                    setWeather(response.data);
                })
                .catch(function (error) {
                    // обработка ошибок
                    console.log(error);
                });
        }
        else {
            setValidate("Заполните поле")
        }
    }

    return (
        <>
            <h1>Сервис погодных условий</h1>
            {validate && <p className="error">{validate}</p>}
            <label>
              <input onChange={(e) => setValue(e.target.value)}/>
              <button onClick={() => getWeather()}>Узнать погоду</button>
            </label>
            {weather && <div className="weather">
                {console.log(weather.location.country)}
                <div className="left">
                    <p>Страна: {weather.location.country}</p>
                    <p>Регион: {weather.location.region}</p>
                    <p>Город: {weather.location.name}</p>
                </div>
                <div className="right">
                    <p>Температура: {weather.current.temperature}°C</p>
                    <p>{weather.current.weather_descriptions[0]}</p>
                    <img alt="weather" src={weather.current.weather_icons[0]} />
                </div>
            </div>}
          </>
    );
}

export default App;

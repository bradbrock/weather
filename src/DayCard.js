import React from 'react';
var moment = require('moment');

const DayCard = ({ reading, degreeType }) => {
    let newDate = new Date();
    const weekday = reading.dt * 1000
    newDate.setTime(weekday)

    const kelvin = reading.main.temp
    const fahrenheit = Math.round((kelvin - 273.15) * 9/5 + 32)
    const celsius = Math.round(kelvin - 273.15)
    const iconUrl = `http://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`

    return (
        <div className="col pl-0 pr-0">
            <div className="card">
                <div className="card-body pl-1 pr-1">
                    <p className="card-body__day h5 mb-0">{moment(newDate).format('dddd')}</p>
                    <img src={iconUrl} alt="icon" className="card-body__icon order-md-2" />
                    <p className="card-body__temp h2 mb-0">{degreeType === "celsius" ? celsius + "°" : fahrenheit + "°"}</p>
                </div>
            </div>
        </div>
    )
}

export default DayCard;
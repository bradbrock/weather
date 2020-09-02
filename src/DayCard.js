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
                <div className="card-body pl-1 pr-1 d-flex d-md-block flex-md-row justify-content-center align-items-center">
                    <p className="font-weight-bold mb-0 order-md-1 mr-3 mr-md-0">{moment(newDate).format('dddd')}</p>
                    <img src={iconUrl} alt="icon" className="order-md-2 order-3" />
                    <p className="h5 mb-0 order-md-3">{degreeType === "celsius" ? celsius + "°" : fahrenheit + "°"}</p>
                </div>
            </div>
        </div>
    )
}

export default DayCard;
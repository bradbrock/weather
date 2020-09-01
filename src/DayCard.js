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
            <div className="card rounded-0">
                <div className="card-body">
                    <p className="font-weight-bold mb-0">{moment(newDate).format('dddd')}</p>
                    <img src={iconUrl} alt="icon" />
                    <p className="h3">{degreeType === "celsius" ? celsius + "°C" : fahrenheit + "°F"}</p>
                </div>
            </div>
        </div>
    )
}

export default DayCard;
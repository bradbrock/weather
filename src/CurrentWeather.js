import React from 'react';

const CurrentWeather = ({degreeType, currentTemp, icon, desc, wind }) => {
    const kelvin = currentTemp
    const fahrenheit = Math.round((kelvin - 273.15) * 9/5 + 32)
    const celsius = Math.round(kelvin - 273.15)
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

    return (
        <React.Fragment>
            <div className="h1 mb-0">{degreeType === "celsius" ? celsius + "°" : fahrenheit + "°"}</div>
            <img src={iconUrl} alt="icon" className="ow-icon" />
            <div className="text-left">
                <p className="mb-0">{desc}</p>
                <p className="mb-0">{Math.round(wind)} mph</p>
            </div>
        </React.Fragment>
    )
}

export default CurrentWeather;
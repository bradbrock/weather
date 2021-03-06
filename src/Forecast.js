import React from 'react';
import ForecastLocation from './ForecastLocation';
import DayCard from './DayCard';
import DegreeSwitch from './DegreeSwitch';
import CurrentWeather from './CurrentWeather';
import cloud from './cloud.svg';


class Forecast extends React.Component {
    state = {
        fullData: [],
        dailyData: [],
        degreeType: "fahrenheit"
    }

    componentDidMount = () => {
        const forecastTodayUrl = "https://community-open-weather-map.p.rapidapi.com/weather?&q=dallas"
        const forecastWeekURL = "https://community-open-weather-map.p.rapidapi.com/forecast?q=dallas&cnt=40"

        fetch(forecastTodayUrl, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "e392b0f21emsh6c184cb02588600p1227d3jsndc379560ad89"
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                currentConditionIcon: data.weather[0].id,
                currentConditionOwIcon: data.weather[0].icon,
                currentTemp: data.main.temp,
                currentDesc: data.weather[0].description,
                currentWind: data.wind.speed
            })
        })

        fetch(forecastWeekURL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "e392b0f21emsh6c184cb02588600p1227d3jsndc379560ad89"
            }
        })
        .then(res => res.json())
        .then(data => {
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
            this.setState({
                fullData: data.list,
                dailyData: dailyData
            })
        })
    }

    updateForecastDegree = event => {
        this.setState({
            degreeType: event.target.value
        })
        return this.state.degreeType
    }

    currentOwIcon = () => {
        const icon = `http://openweathermap.org/img/wn/${this.state.currentConditionOwIcon}@2x.png`
        return icon
    }

    formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} degreeType={this.state.degreeType} />)
    }

    switchValue = event => {
        if (this.state.degreeType === "fahrenheit") {
            this.setState({
                degreeType: "celsius"
            })
        } else {
            this.setState({
                degreeType: "fahrenheit"
            })
        }
        return this.state.degreeType
    }

    render() {

        return (
            <div className="container">
                <ForecastLocation />
                <div className="row current-weather">
                    <div className="current-weather__readings col d-flex flex-wrap align-items-center">
                        <CurrentWeather
                            degreeType={this.state.degreeType}
                            currentTemp={this.state.currentTemp}
                            icon={this.state.currentConditionOwIcon}
                            desc={this.state.currentDesc}
                            wind={this.state.currentWind}
                        />
                    </div>
                    <div className="current-weather__switch col d-flex justify-content-end">
                        {/* <DegreeToggle degreeType={this.state.degreeType} updateForecastDegree={this.updateForecastDegree} /> */}
                        <DegreeSwitch  degreeType={this.state.degreeType} switchValue={this.switchValue} />
                    </div>
                    <img src={cloud} alt="cloud" className="cloud-img cloud-img--1" />
                    <img src={cloud} alt="cloud" className="cloud-img cloud-img--2" />
                </div>
                <div className="weekly-forecast row">
                    {this.formatDayCards()}
                </div>
            </div>
        )
    }
}

export default Forecast;
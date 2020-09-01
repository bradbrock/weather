import React from 'react';
import ForecastLocation from './ForecastLocation';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';
import Icon from './Icon';


class Forecast extends React.Component {
    state = {
        fullData: [],
        dailyData: [],
        degreeType: "fahrenheit"
    }

    componentDidMount = () => {
        const forecastTodayUrl = "https://community-open-weather-map.p.rapidapi.com/weather?units=imperial&q=dallas"
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
            console.log(data)
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

    currentConditionIcon = () => {
        const icon = `owf owf-${this.state.currentConditionIcon} owf-3x`
        return icon;
    }

    currentOwIcon = () => {
        const icon = `http://openweathermap.org/img/wn/${this.state.currentConditionOwIcon}@2x.png`
        return icon
    }

    formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} degreeType={this.state.degreeType} />)
    }

    render() {

        return (
            <div className="container pt-5">
                <ForecastLocation />
                <div className="row current-weather text-white outline">
                    <div className="col">
                        <div className="row">
                            <div className="h1 mb-0">{this.state.currentTemp}</div>
                            {/* <i className={this.currentConditionIcon()}></i> */}
                            {/* <Icon code={this.state.currentConditionOwIcon} /> */}
                            <img src={this.currentOwIcon()} alt="icon" />
                            {/* <img src=`http://openweathermap.org/img/wn/${}@2x.png` alt="icon"/> */}
                            <div className="text-left text-capitalize">{this.state.currentDesc}<br />{this.state.currentWind}</div>
                        </div>
                    </div>
                    <div className="col text-right">
                        <DegreeToggle degreeType={this.state.degreeType} updateForecastDegree={this.updateForecastDegree} />
                    </div>
                </div>
                <div className="row justify-content-center outline">
                    {this.formatDayCards()}
                </div>
            </div>
        )
    }
}

export default Forecast;
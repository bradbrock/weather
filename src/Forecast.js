import React from 'react';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';


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

    formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} degreeType={this.state.degreeType} />)
    }

    render() {

        return (
            <div className="container pt-5">
                <h5 className="display-5 text-muted">Dallas, TX</h5>
                <div className="current-weather">
                    {this.state.currentTemp} {this.state.currentDesc} {this.state.currentWind}
                </div>
                <DegreeToggle degreeType={this.state.degreeType} updateForecastDegree={this.updateForecastDegree} />
                <div className="row justify-content-center">
                    {this.formatDayCards()}
                </div>
            </div>
        )
    }
}

export default Forecast;
import React from 'react';
var moment = require('moment');

const ForecastHeader = () => {
    let newDate = new Date();

    return (
        <header className="location text-white mb-3">
            <h5 className="display-5 mb-0">Dallas, TX</h5>
            <span>{moment(newDate).format('dddd')}, </span>
            <span>{moment(newDate).format('MMMM Do')}, </span>
            <span>{moment(newDate).format('YYYY')}</span>
        </header>
    )
}

export default ForecastHeader;
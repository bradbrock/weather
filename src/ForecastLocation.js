import React from 'react';
var moment = require('moment');

const ForecastHeader = () => {
    let newDate = new Date();

    return (
        <div className="text-white">
            <h5 className="display-5">Dallas, TX</h5>
            <span>{moment(newDate).format('dddd')},</span>
            <span>{moment(newDate).format('MMMM Do')},</span>
            <span>{moment(newDate).format('YYYY')}</span>
        </div>
    )
}

export default ForecastHeader;
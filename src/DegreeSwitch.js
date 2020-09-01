import React from 'react'

const DegreeSwitch = ({degreeType, switchValue}) => {
    return (
        <div className="degree-switch d-flex pt-2">
            <div className="pr-2">°C</div>
            <div className="custom-control custom-switch">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch1"
                    onChange={switchValue}
                />
                <label className="custom-control-label" htmlFor="customSwitch1"></label>
            </div>
            <div>°F</div>
        </div>
    )
}

export default DegreeSwitch;
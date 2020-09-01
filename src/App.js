import React from 'react';
import './App.css';
import Forecast from './Forecast';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Forecast />
      </div>
    )
  }
}

export default App;
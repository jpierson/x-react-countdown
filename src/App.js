import React, { Component } from 'react';
import './App.css';

const initialState = {
  secondsOnStart : 88,
  secondsRemaining : 0,
  isStopped : false,
}

const countdownReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START':
      return { 
        ...state, 
        isStopped : false,         
        secondsOnStart : action.totalSeconds, 
        secondsRemaining : action.totalSeconds, 
        cancelToken : action.cancelToken }
    case 'CLEAR':
      return { 
        ...state, 
        isStopped : true, 
        secondsRemaining : 0, 
        cancelToken : undefined }
    case 'TICK':
      if (!state.isStopped && state.secondsRemaining > 0)
        return { ...state, secondsRemaining : state.secondsRemaining - 1 }
      else
        return state;
    default:
      return state;
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {

  }

  dispatch(action) {
    this.setState(prevState => countdownReducer(prevState, action));
  }

  start = (totalSeconds) => {
    var cancelToken = setInterval(
      () => this.dispatch({ type : 'TICK' }), 
      1000
    );

    this.dispatch({ type : 'START', totalSeconds : totalSeconds, cancelToken : cancelToken });
  }

  clear = () => {
    clearInterval(this.state.cancelToken);

    this.dispatch({ type : 'CLEAR' });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BigCountdownClock totalSeconds={this.state.secondsRemaining} />
        </header>
        <CountdownControlPanel 
          totalSeconds={this.state.secondsOnStart} 
          dispatchStartCommand={this.start} 
          dispatchClearCommand={this.clear} />
      </div>
    );
  }
}

function totalSecondsToHoursMinutesSeconds(seconds) {
  return {
    hours : Math.floor(seconds / (60 * 60)),
    minutes : Math.floor((seconds / 60) % 60) ,
    seconds : seconds % 60
  }
}

function hoursMinutesSecondsToTotalSeconds({ hours, minutes, seconds }) {
  return (((hours * 60) + minutes) * 60) + seconds;
}

function BigCountdownClock({ totalSeconds }) {
  const { hours, minutes, seconds } = totalSecondsToHoursMinutesSeconds(totalSeconds);
  const padTwoDigits = value => value.toString().padStart(2, '0');
  return (
    <div className="BigCountdownClock">
      <span>{hours}</span>:<span>{padTwoDigits(minutes)}</span>:<span>{padTwoDigits(seconds)}</span>
    </div>
  );
}

class CountdownControlPanel extends React.Component {

  constructor(props) {
    super(props);

    this.handleChangeHours = this.handleChangeHours.bind(this);
    this.handleChangeMinutes = this.handleChangeMinutes.bind(this);
    this.handleChangeSeconds = this.handleChangeSeconds.bind(this);

    this.state = totalSecondsToHoursMinutesSeconds(props.totalSeconds);
  }

  handleChangeHours(event) {
    const value = parseInt(event.target.value, 10);
    this.setState(prevState => ({ ...prevState, hours: value }))
  }

  handleChangeMinutes(event) {
    const value = parseInt(event.target.value, 10);
    this.setState(prevState => ({ ...prevState, minutes: value }))
  }

  handleChangeSeconds(event) {
    const value = parseInt(event.target.value, 10);
    this.setState(prevState => ({ ...prevState, seconds: value }))
  }

  render() {
    const { totalSeconds, dispatchStartCommand, dispatchClearCommand } = this.props;
    const { hours, minutes, seconds } = this.state;
    const start = () => dispatchStartCommand(hoursMinutesSecondsToTotalSeconds(this.state));
    
    return (
      <form className="CountdownControlPanel" action="javascript:void(0);">
        <fieldset>
          <legend>Countdown</legend>
          <div className="CountdownControlPanel-flex">
            <div className="CountdownControlPanel-fields">
              <label className="CountdownControlPanel-field"> 
                Hour<input type="number" max="24" min="0" value={hours} onChange={this.handleChangeHours} />
              </label>
              <label className="CountdownControlPanel-field">
                Minute <input type="number" max="60" min="0" value={minutes} onChange={this.handleChangeMinutes} />
              </label>
              <label className="CountdownControlPanel-field">
                Second <input type="number" max="60" min="0" value={seconds} onChange={this.handleChangeSeconds} />
              </label>
            </div>
            <div className="CountdownControlPanel-commands">
              <button className="CountdownControlPanel-command" onClick={start}>Start</button>
              <button className="CountdownControlPanel-command" onClick={dispatchClearCommand}>Clear</button>
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}

export default App;

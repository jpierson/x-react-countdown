import React, { Component } from "react";
import * as TimeConverter from "../TimeConverter";

class CountdownControlPanel extends Component {
  constructor(props) {
    super(props);

    this.handleChangeHours = this.handleChangeHours.bind(this);
    this.handleChangeMinutes = this.handleChangeMinutes.bind(this);
    this.handleChangeSeconds = this.handleChangeSeconds.bind(this);

    this.state = TimeConverter.totalSecondsToHoursMinutesSeconds(
      props.totalSeconds
    );
  }

  handleChangeHours(event) {
    const value = parseInt(event.target.value, 10);
    this.setState(prevState => ({ ...prevState, hours: value }));
  }

  handleChangeMinutes(event) {
    const value = parseInt(event.target.value, 10);
    this.setState(prevState => ({ ...prevState, minutes: value }));
  }

  handleChangeSeconds(event) {
    const value = parseInt(event.target.value, 10);
    this.setState(prevState => ({ ...prevState, seconds: value }));
  }

  render() {
    const { dispatchStartCommand, dispatchClearCommand } = this.props;
    const { hours, minutes, seconds } = this.state;
    const start = () =>
      dispatchStartCommand(
        TimeConverter.hoursMinutesSecondsToTotalSeconds(this.state)
      );
    const selectAll = event => event.target.select();

    return (
      <fieldset className="CountdownControlPanel">
        <legend>Countdown</legend>
        <div className="CountdownControlPanel-flex">
          <div className="CountdownControlPanel-fields">
            <label className="CountdownControlPanel-field">
              Hour<input
                type="number"
                max="24"
                min="0"
                value={hours}
                onChange={this.handleChangeHours}
                onFocus={selectAll}
              />
            </label>
            <label className="CountdownControlPanel-field">
              Minute{" "}
              <input
                type="number"
                max="60"
                min="0"
                value={minutes}
                onChange={this.handleChangeMinutes}
                onFocus={selectAll}
              />
            </label>
            <label className="CountdownControlPanel-field">
              Second{" "}
              <input
                type="number"
                max="60"
                min="0"
                value={seconds}
                onChange={this.handleChangeSeconds}
                onFocus={selectAll}
              />
            </label>
          </div>
          <div className="CountdownControlPanel-commands">
            <button className="CountdownControlPanel-command" onClick={start}>
              Start
            </button>
            <button
              className="CountdownControlPanel-command"
              onClick={dispatchClearCommand}
            >
              Clear
            </button>
          </div>
        </div>
      </fieldset>
    );
  }
}

export default CountdownControlPanel;

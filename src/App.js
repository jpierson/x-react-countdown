import React, { Component } from "react";
import BigCountdownClock from "./components/BigCountdownClock"
import CountdownControlPanel from "./components/CountdownControlPanel"
import "./App.css";

const initialState = {
  secondsOnStart: 88,
  secondsRemaining: 0,
  isStopped: false
};

const countdownReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        isStopped: false,
        startTimestamp: action.now,
        secondsOnStart: action.totalSeconds,
        secondsRemaining: action.totalSeconds,
        cancelToken: action.cancelToken
      };
    case "CLEAR":
      return {
        ...state,
        isStopped: true,
        startTimestamp: 0,
        secondsRemaining: 0,
        cancelToken: undefined
      };
    case "TICK":
      if (!state.isStopped && state.secondsRemaining > 0)
        return {
          ...state,
          secondsRemaining:
            state.secondsOnStart -
            Math.floor((action.now - state.startTimestamp) / 1000)
        };
      else return state;
    default:
      return state;
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {}

  dispatch(action) {
    this.setState(prevState => countdownReducer(prevState, action));
  }

  start = totalSeconds => {
    var cancelToken = setInterval(
      () => this.dispatch({ type: "TICK", now: performance.now() }),
      500
    );

    this.dispatch({
      type: "START",
      totalSeconds: totalSeconds,
      cancelToken: cancelToken,
      now: performance.now()
    });
  };

  clear = () => {
    clearInterval(this.state.cancelToken);

    this.dispatch({ type: "CLEAR" });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <BigCountdownClock totalSeconds={this.state.secondsRemaining} />
        </header>
        <CountdownControlPanel
          totalSeconds={this.state.secondsOnStart}
          dispatchStartCommand={this.start}
          dispatchClearCommand={this.clear}
        />
      </div>
    );
  }
}


export default App;

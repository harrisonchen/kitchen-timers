var Timer = React.createClass({
  getInitialState: function() {
    return {time_left: this.props.time_left}
  },
  componentDidMount: function() {
    this.timer = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.timer)
  },
  tick: function() {
    if(this.state.time_left > 0) {
      this.setState({time_left: this.state.time_left - 1});
    }
    else {
      clearInterval(this.timer);
    }
  },
  timer_start: function() {
    clearInterval(this.timer);
    this.timer = setInterval(this.tick, 1000);
  },
  timer_stop: function() {
    clearInterval(this.timer);
  },
  render: function() {
    var timer_name = this.props.timer_name
    var time_left = this.state.time_left

    return (
      <div className="timer">
        <div className="timer-name">
          {timer_name}
        </div>
        <div className="timer-time-left">
          {Math.floor(time_left/60/60)}:{Math.floor(time_left/60%60)}:{time_left%60}
        </div>
        <button onClick={this.timer_start} className="button-start">Start</button>
        <button onClick={this.timer_stop} className="button-stop">Pause</button>
      </div>
    );
  }
});

var NewTimerForm = React.createClass({
  render: function() {
    return (
      <div className="new-timer">
        <label>Label: </label><br />
        <input type="text" /><br /><br />
        <label>Minutes: </label><br />
        <input type="text" /><br /><br />
        <button>Create Timer</button>
      </div>
    );
  }
});

var TimerList = React.createClass({
  render: function() {
    var timers = [
      {label: 'Salmon', time: 45*60},
      {label: 'Chicken Thighs', time: 90*60},
      {label: 'Carrots', time: 10}
    ];
    var timerList = [];
    for(var i = 0; i < timers.length; i++) {
      timerList.push(
        <Timer timer_name={timers[i]["label"]} time_left={timers[i]["time"]} />
      )
    }
    return (
      <div>
        <NewTimerForm />
        {timerList}
      </div>
    );
  }
});

ReactDOM.render(
  <TimerList />,
  document.getElementById('timer-list')
);

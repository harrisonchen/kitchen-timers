var Timer = React.createClass({
  getInitialState: function() {
    return {
      total_time: this.props.time_left,
      time_left: this.props.time_left,
      pause: true
    }
  },
  componentDidMount: function() {
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
    if(this.state.pause) {
      this.state.pause = false;
      clearInterval(this.timer);
      this.timer = setInterval(this.tick, 1000);
    }
  },
  timer_stop: function() {
    this.state.pause = true
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
  getInitialState: function() {
    return {
      timer_label: "Fish & Chips",
      timer_time: "30"
    }
  },
  updateLabel: function(event) {
    this.setState({
      timer_label: event.target.value
    });
  },
  updateTime: function(event) {
    this.setState({
      timer_time: event.target.value
    });
  },
  createTimer: function() {
    var timer_label = this.state.timer_label;
    var timer_time = Number(this.state.timer_time);

    if(timer_label != "" && !isNaN(timer_time)) {
      console.log("Created a Timer");
      (this.props.success)(timer_label, timer_time*60);
    }
    else {
      console.log("Failed to create Timer :(");
    }
  },
  hideForm: function() {
    (this.props.hideFormCallback)();
  },
  render: function() {
    return (
      <div className="new-timer">
        <div className="form">
          <i className="close-form-btn fa fa-times" onClick={this.hideForm} aria-hidden="true"></i>
          <label>Label: </label><br />
          <input type="text" value={this.state.timer_label} onChange={this.updateLabel} autoFocus={true} /><br /><br />
          <label>Minutes: </label><br />
          <input type="text" value={this.state.timer_time} onChange={this.updateTime} /><br /><br />
          <button onClick={this.createTimer}>Create Timer</button>
        </div>
      </div>
    );
  }
});

var TimerList = React.createClass({
  getInitialState: function() {
    return {
      visibleTimerForm: false,
      timers: []
    }
  },
  componentDidMount: function() {
    this.setState({
      timers: [
        {label: 'Salmon', time: 45*60},
        {label: 'Chicken Thighs', time: 90*60},
        {label: 'Carrots', time: 10}
      ]
    });
  },
  displayTimerForm: function() {
    this.setState({
      visibleTimerForm: true
    });
  },
  hideTimerForm: function() {
    this.setState({
      visibleTimerForm: false
    });
  },
  createNewTimer: function(timer_label, timer_time) {
    var timers = this.state.timers
    timers.push({
      label: timer_label,
      time: timer_time
    })
    this.setState({
      visibleTimerForm: false,
      timers: timers
    });
  },
  render: function() {
    var timers = this.state.timers;
    var timerList = [];
    for(var i = 0; i < timers.length; i++) {
      timerList.push(
        <Timer timer_name={timers[i]["label"]} time_left={timers[i]["time"]} />
      )
    }
    return (
      <div className="timer-list">
        <div>
          <button className="display-timer-form-btn" onClick={this.displayTimerForm}>Create New Timer</button>
        </div>
        {
          this.state.visibleTimerForm ?
            <div><div className="dark-overlay" onClick={this.hideTimerForm}></div>
            <NewTimerForm success={this.createNewTimer} hideFormCallback={this.hideTimerForm} /></div> : null
        }
        {timerList}
      </div>
    );
  }
});

ReactDOM.render(
  <TimerList />,
  document.getElementById('timer-list')
);

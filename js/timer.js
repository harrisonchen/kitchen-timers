var Timer = React.createClass({
  getInitialState: function() {
    return {
      total_time: this.props.total_time,
      time_left: this.props.total_time,
      timer_index: this.props.timer_index,
      pause: true,
      ready: false,
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
      this.setState({
        ready: true
      })
    }
  },
  timer_start: function() {
    if(this.state.pause && !this.state.ready) {
      this.state.pause = false;
      clearInterval(this.timer);
      this.timer = setInterval(this.tick, 1000);
    }
  },
  timer_stop: function() {
    if(!this.state.ready) {
      this.state.pause = true
      clearInterval(this.timer);
    }
  },
  timer_clear: function() {
    this.state.pause = true
    clearInterval(this.timer);
    this.setState({
      time_left: this.state.total_time,
      ready: false
    });
  },
  removeTimer: function() {
    clearInterval(this.timer);
    (this.props.removeTimerCallback)(this.props.timer_index)
  },
  render: function() {
    var timer_name = this.props.timer_name
    var time_left = this.state.time_left
    var total_time = this.state.total_time

    return (
      <div className="timer">
        <i className="remove-timer-btn fa fa-times" onClick={this.removeTimer} aria-hidden="true"></i>
        <div className="timer-name">
          {timer_name} ({Math.floor(total_time/60/60)}h {Math.floor(total_time/60%60)}m)
        </div>
        <div className="timer-time-left">
          {
            !this.state.ready ?
              Math.floor(time_left/60/60)+ ":" + Math.floor(time_left/60%60) + ":" + time_left%60 : <span className="ready">--- Ready ---</span>
          }
        </div>
        <button onClick={this.timer_start} className="button-start">Start</button>
        <button onClick={this.timer_stop} className="button-stop">Pause</button>
        <button onClick={this.timer_clear} className="button-clear">Clear</button>
      </div>
    );
  }
});

var NewTimerForm = React.createClass({
  getInitialState: function() {
    return {
      timer_label: "Fish & Chips",
      timer_time_hours: "0",
      timer_time_minutes: "30"
    }
  },
  updateLabel: function(event) {
    this.setState({
      timer_label: event.target.value
    });
  },
  updateHours: function(event) {
    this.setState({
      timer_time_hours: event.target.value
    });
  },
  updateMinutes: function(event) {
    this.setState({
      timer_time_minutes: event.target.value
    });
  },
  createTimer: function() {
    var timer_label = this.state.timer_label;
    var timer_time_hours = Number(this.state.timer_time_hours);
    var timer_time_minutes = Number(this.state.timer_time_minutes);
    var total_time_in_minutes = 0;
    if(!isNaN(timer_time_hours)) {
      total_time_in_minutes += timer_time_hours * 60;
    }
    if(!isNaN(timer_time_minutes)) {
      total_time_in_minutes += timer_time_minutes;
    }


    if(timer_label != "") {
      console.log("Created a Timer");
      (this.props.success)(timer_label, total_time_in_minutes*60);
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
          <label>Hours: </label><br />
          <input type="text" value={this.state.timer_time_hours} onChange={this.updateHours} /><br /><br />
          <label>Minutes: </label><br />
          <input type="text" value={this.state.timer_time_minutes} onChange={this.updateMinutes} /><br /><br />
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
        {label: 'Sample Recipe', time: 1}
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
  removeTimer: function(timer_index) {
    var timers = this.state.timers
    timers.splice(timer_index, 1)
    this.setState({
      timers: timers
    });
  },
  render: function() {
    var timers = this.state.timers;
    var timerList = [];
    for(var i = 0; i < timers.length; i++) {
      timerList.push(
        <Timer timer_name={timers[i]["label"]} total_time={timers[i]["time"]} timer_index={i} removeTimerCallback={this.removeTimer} />
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

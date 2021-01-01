import React from 'react'
import ReactDOM from 'react-dom'
import './styles/styles.scss'

class Timer25Plus5 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      seconds: 0,
      timerRunning: false
    }
    this.handleTimerClick = this.handleTimerClick.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.runningClock = this.runningClock.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.clockIt = this.clockIt.bind(this)
    this.decBreak = this.decBreak.bind(this)
    this.incBreak = this.incBreak.bind(this)
    this.decSession = this.decSession.bind(this)
    this.incSession = this.incSession.bind(this)
    this.reset = this.reset.bind(this)
    this.getDisplayMinutes = this.getDisplayMinutes.bind(this)
    this.getDisplaySeconds = this.getDisplaySeconds.bind(this)
    this.pause = this.pause.bind(this)
  }

  pause = () => {
    let i = 0
    let audio = document.getElementById('beep')
    const interval = setInterval(() => {
      audio.play()
      i++
      if (i > 0) {
        clearInterval(interval)
      }
    }, 2000)
  }

  getDisplayMinutes (seconds) {
    if (Math.floor(seconds / 60) < 10) {
      return '0' + Math.floor(seconds / 60)
    } else {
      return '' + Math.floor(seconds / 60)
    }
  }

  getDisplaySeconds (seconds) {
    if (seconds % 60 < 10) {
      return '0' + (seconds % 60)
    } else {
      return '' + (seconds % 60)
    }
  }

  reset () {
    this.stopTimer()
    this.setState(() => {
      return {
        sessionLength: 25,
        breakLength: 5,
        seconds: 0,
        timerRunning: false
      }
    })
    location.reload()
  }
  decBreak () {
    if (this.state.breakLength >= 2) {
      this.setState(() => {
        return {
          breakLength: this.state.breakLength - 1
        }
      })
    }
  }

  incBreak () {
    if (this.state.breakLength < 60) {
      this.setState(() => {
        return {
          breakLength: this.state.breakLength + 1
        }
      })
    }
  }

  decSession () {
    if (this.state.sessionLength >= 2) {
      this.setState(() => {
        return {
          sessionLength: this.state.sessionLength - 1
        }
      })
    }
  }

  incSession () {
    if (this.state.sessionLength < 60) {
      this.setState(() => {
        return {
          sessionLength: this.state.sessionLength + 1
        }
      })
    }
  }

  stopTimer () {
    this.setState(() => {
      return {
        timerRunning: false
      }
    })
  }

  handleTimerClick () {
    if (this.state.timerRunning) {
      this.stopTimer()
    } else {
      this.setState(() => {
        return {
          timerRunning: true
        }
      })
      let seconds
      let timerLength
      if (this.state.seconds > 0) {
        seconds = this.state.seconds
      } else if (this.state.seconds === 0) {
        seconds = this.state.sessionLength * 60
        this.setState(() => {
          return {
            seconds: seconds
          }
        })
      }
      console.log('seconds', seconds)

      this.runningClock()
    }
  }

  clockIt () {
    let seconds = this.state.seconds
    this.setState(() => {
      return {
        seconds: this.state.seconds - 1
      }
    })
    console.log(Math.floor(seconds / 60), seconds % 60)
    console.log(this.state.seconds)
  }

  runningClock = () => {
    const interval = setInterval(() => {
      if (this.state.seconds > 0 && this.state.timerRunning) {
        this.clockIt()
      } else if (this.state.seconds === 0 && !this.state.isBreak) {
        document.querySelector('#timer-label').innerHTML = 'Break'
        setTimeout(() => {
          this.setState(() => {
            return {
              seconds: this.state.breakLength * 60
            }
          })
          this.runBreak()
        }, 2000)
      } else if (this.state.seconds === 0 && this.state.isBreak) {
        document.querySelector('#timer-label').innerHTML = 'Session'
        this.pause()
        this.setState(() => {
          return {
            isBreak: false,
            seconds: this.state.sessionLength * 60,
            timerRunning: true
          }
        })
        var audio = document.getElementById('beep')
        this.runningClock()
      } else {
        clearInterval(interval)
      }
    }, 1000)
  }

  runBreak () {
    this.setState(() => {
      return {
        seconds: this.state.breakLength * 60,
        isBreak: true,
        timerRunning: true
      }
    })
    this.runningClock()
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div id='break-label'>Break Length</div>
            <div id='break-length'>{this.state.breakLength}</div>
            <div className='button-container'>
              <button id='break-decrement' onClick={this.decBreak}>
                Decrease
              </button>
              <button id='break-increment' onClick={this.incBreak}>
                Increase
              </button>
            </div>
          </div>
          <div className='col'>
            <div id='session-label'>Session Length</div>
            <div id='session-length'>{this.state.sessionLength}</div>
            <div className='button-container'>
              <button id='session-decrement' onClick={this.decSession}>
                Decrease
              </button>
              <button id='session-increment' onClick={this.incSession}>
                Increase
              </button>
            </div>
          </div>
        </div>
        <div id='timer-display' className='row'>
          <div id='timer-label'>Session</div>
          <div id='time-left'>
            {this.state.seconds > 0
              ? this.getDisplayMinutes(this.state.seconds) +
                ':' +
                this.getDisplaySeconds(this.state.seconds)
              : this.getDisplayMinutes(this.state.sessionLength * 60) + ':00'}
          </div>
          <audio
            src='https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg'
            id='beep'
          ></audio>
          <div className='button-container'>
            <button id='start_stop' onClick={this.handleTimerClick}>
              Start/Stop
            </button>
            <button id='reset' onClick={this.reset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}
const appTarget = document.querySelector('#app')

ReactDOM.render(<Timer25Plus5 />, appTarget)

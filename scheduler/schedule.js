const schedule = require('node-schedule');

const job = require('../job')

const SchedulerState = { Started:"Started", Stopped:"Stopped" }

class Scheduler {
  constructor() {
    this.logs = [],
    this.status = SchedulerState.Stopped
  }

  start() {
    schedule.scheduleJob('1 * * * * *', () => { job.addTaskersCount(); this.addLog('started a job')})
  }

  addLog(line) {
    this.logs.push(({ 'what happened': line, 'when': new Date()}))
    console.log(this.logs);
  }

  getLogs() {
    return this.logs
  }

}

// use singleton for storing the logs
let scheduler = new Scheduler()
module.exports = {
  current: scheduler
}

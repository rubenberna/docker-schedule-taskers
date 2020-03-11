const schedule = require('node-schedule');

const job = require('../job/job')

const SchedulerState = { Started:"Started", Stopped:"Stopped" }

class Scheduler {
  constructor() {
    this.logs = [],
    this.status = SchedulerState.Stopped
  }

  start() {
    schedule.scheduleJob('32 11 * * *', () => this.run())
  }

  async run() {
    let start = new Date()
    await job.addTaskersCount()
    let end = new Date() - start
    this.addLog('Execution time: %dms', end)
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

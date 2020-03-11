const express = require('express');
const router = express.Router()

const job = require('../job/job');

router.get('/', async (req, res) => {
  // const start = await job.addTaskersCount()
  // job.updateCategoryId()
  res.status(200)
})

module.exports = router

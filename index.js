const express = require('express');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const port = process.env.PORT || 5000;
const scheduler = require('./scheduler/schedule').current

const app = express()
app.use(cors())

app.use(session({
  secret: 's3cret',
  resave: true,
  saveUninitialized: true,
  mongodb: {}
}));

app.get('/', (req, res) => {
  let logs = scheduler.getLogs()
  res.send([...logs])
})

app.listen(port, async () => {
  console.log(`Server started on ${port}`);
  scheduler.start()
})

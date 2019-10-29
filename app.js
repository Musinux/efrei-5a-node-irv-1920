const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mydb')

const index = require('./routes/index.js')

app.use('/', index)

app.listen(3001, () => {
  console.log('Application démarrée sur le port 3000!')
})

const express = require('express')
const router = express.Router()
const fs = require('fs')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var EventSchema = new Schema({
  title: {type: String, required: true},
  start: {type: Date, required: true},
  end: {type: Date, required: true},
  owner: {type: String}
})

const Event = mongoose.model('Event', EventSchema)

let calendar = null

function readCalendar () {
  fs.readFile('./calendar.json', 'utf8', (err, data) => {
    if (err) throw err

    calendar = JSON.parse(data)
  })
}

readCalendar()

router.get('/', (req, res) => {
    res.send('ok')
})

router.post('/api/event', async (req, res) => {
  try {
    const event = new Event({
      title: "blabla",
      start: new Date(),
      end: new Date(),
      owner: "louis"
    })

    await event.save()
    res.json(event)
  } catch (err) {
    // gérez les erreurs ici
    console.log('error', err)
  }

})

router.get('/api/events', (req, res) => {
  res.json(calendar.map(c => c.id))
})

router.get('/api/events/:id', (req, res) => {
  const event = calendar.find(c => parseInt(req.params.id) === c.id)

  if (event) {
    res.json(event)
    return
  }

  res.status(404)
  res.send('No event like this one')
})

module.exports = router

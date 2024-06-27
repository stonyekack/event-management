const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/events', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const eventSchema = new mongoose.Schema({
    title: String,
    date: String,
    description: String,
});

const Event = mongoose.model('Event', eventSchema);

app.get('/events', async (req, res) => {
    const events = await Event.find();
    res.send(events);
});

app.post('/events', async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.send(event);
});

app.put('/events/:id', async (req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(event);
});

app.delete('/events/:id', async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.send({ message: 'Event deleted' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { Event } = require('./models');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200', // Assurez-vous que l'URL de votre frontend est correcte
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.use(cors());
app.use(express.json());

// Socket.IO
io.on('connection', (socket) => {
  console.log('a user connected');
});

// REST API
app.get('/events', async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
});

app.post('/events', async (req, res) => {
  const newEvent = await Event.create(req.body);
  io.emit('eventAdded', newEvent);
  res.status(201).json(newEvent);
});

app.put('/events/:id', async (req, res) => {
  const updatedEvent = await Event.update(req.body, {
    where: { id: req.params.id }
  });
  res.json(updatedEvent);
});

app.delete('/events/:id', async (req, res) => {
  await Event.destroy({
    where: { id: req.params.id }
  });
  res.status(204).send();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

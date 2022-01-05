const config = require('./config/index');
const express = require('express');
const mongoose = require('mongoose');
const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const bodyParser = require('body-parser');

const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

const { Chat } = require('./models/chat');

const { MONGO_URI, PORT } = config;

app.use(hpp());
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(morgan('dev'));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/upload', express.static('upload'));

const connect = mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connecting Success!!');
  })
  .catch((err) => console.log(err));

app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/project', require('./routes/api/project'));
app.use('/api/chat', require('./routes/api/chat'));
app.use('/api/search', require('./routes/api/search'));

///////////////// socket.io /////////////////

io.on('connection', (socket) => {
  socket.on('Input Chat Message', (msg) => {
    connect.then((db) => {
      try {
        let chat = new Chat({
          message: msg.chatMessage,
          sender: msg.userId,
          type: msg.type,
        });

        chat.save((err, doc) => {
          if (err) return res.status(400).json({ success: false, err });

          Chat.find({ _id: doc._id })
            .populate('sender')
            .exec((err, doc) => {
              return io.emit('Output Chat Message', doc);
            });
        });
      } catch (e) {
        console.error(e);
      }
    });
  });
});

/////////////////////////////////////////////

server.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});

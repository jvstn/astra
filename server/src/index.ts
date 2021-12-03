import express, { Response } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import profile from './routes/userRoutes'
import limitRoutes from './routes/orderRoutes'
import strategyRoutes from './routes/strategyRoutes'
import { coinbaseApi } from './util/coinbaseUtils';
import {Server} from 'socket.io';
import http from 'http';
import { WebSocketChannelName, WebSocketEvent } from 'coinbase-pro-node';
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  }
});
app.set('io', io);
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skyro';

app.use(express.json());

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

coinbaseApi.ws.connect();

app.use('/user', profile);
app.use('/orders', limitRoutes);
app.use('/strategies', strategyRoutes);

coinbaseApi.ws.subscribe({
  name: WebSocketChannelName.USER,
  product_ids: ["BTC-USD"],
});

coinbaseApi.ws.on(WebSocketEvent.ON_MESSAGE, (msg) => {
  if (msg.type === 'done') {
    io.emit('FILL', msg);
  }
  if (msg.type === 'open') {
    io.emit('OPEN', msg);
  }
});


server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});




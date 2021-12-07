import express, { Response } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import profile from './routes/userRoutes'
import limitRoutes from './routes/orderRoutes'
import strategyRoutes from './routes/strategyRoutes'
import { coinbaseApi } from './util/coinbaseUtils';
import {Server} from 'socket.io';
import http from 'http';
import cors from 'cors';
import { WebSocketChannelName, WebSocketEvent } from 'coinbase-pro-node';
const app = express();
const server = http.createServer(app);
app.use(cors({
  origin: 'http://localhost:3000',
}));
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  }
});
app.set('io', io);
const port = process.env.PORT || 5001;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skyro';

app.use(express.json());

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});


app.use('/api/user', profile);
app.use('/api/orders', limitRoutes);
app.use('/api/strategy', strategyRoutes);


// Connect to client socket
io.on("connection", (socket) => {
  console.log("a user connected");
});

// Connect to coinbase socket
coinbaseApi.ws.connect();

coinbaseApi.ws.subscribe({
  name: WebSocketChannelName.USER,
  product_ids: ["BTC-USD"],
});

//Emit buy sell when orders are created
coinbaseApi.ws.on(WebSocketEvent.ON_MESSAGE, (msg) => {
  if (msg.type === 'match') {
    io.emit('fill', msg);
    console.log('Emiitted fill');
  }
  if (msg.type === 'open') {
    io.emit('open', msg);
    console.log("Emiitted fill");
  }
});


server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});




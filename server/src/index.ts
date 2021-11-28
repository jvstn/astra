import express, { Response } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import profile from './routes/profile'
import limitRoutes from './routes/orderRoutes'
import strategyRoutes from './routes/strategyRoutes'
import { coinbaseApi } from './util/coinbaseUtils';
const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skyro';

app.use(express.json());

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});

coinbaseApi.ws.connect();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/user', profile);
app.use('/orders', limitRoutes);
app.use('/strategies', strategyRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



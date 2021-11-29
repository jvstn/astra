import mongoose, { Schema } from 'mongoose'

interface IUser extends mongoose.Document {
  username: string;
  watchlist: Schema[];
}

const WatchlistItemSchema = new Schema({
  product_id: {
    type: String,
    required: true
  }
})

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  
  watchlist: [WatchlistItemSchema]
})

const User = mongoose.model<IUser>('User', UserSchema);

export default User;


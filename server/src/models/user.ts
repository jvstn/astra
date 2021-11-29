import mongoose, { Schema } from 'mongoose'

export interface IWatchlistItem {
  product_id: string;
}

export interface IUser {
  username: string;
  watchlist: IWatchlistItem[];
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


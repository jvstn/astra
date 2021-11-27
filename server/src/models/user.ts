import mongoose, { Schema } from 'mongoose'

interface IUser {
  name: string;
  email: string;
  account: string;
  wallets: string[];
}

const CbAccountSchema = new Schema({
  id: String,
  currency: String,
  balance: Number
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  accountID: {
    type: String,
    required: true,
  },
  pro_wallets: [CbAccountSchema],
  coinbase_accounts: [CbAccountSchema]
})

const User = mongoose.model<IUser>('User', UserSchema);

export default User;


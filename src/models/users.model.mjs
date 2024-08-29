import * as mongoose from 'mongoose';

const UsersModel = mongoose.model(
  'Users',
  new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    accountId: mongoose.Types.ObjectId,
    role: String,
    avatar: String,
  })
);

export default UsersModel;

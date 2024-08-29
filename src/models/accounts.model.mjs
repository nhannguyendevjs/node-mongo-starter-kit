import * as mongoose from 'mongoose';

const AccountsModel = mongoose.model(
  'Accounts',
  new mongoose.Schema({
    username: String,
    password: {
      iv: String,
      content: String,
    },
  })
);

export default AccountsModel;

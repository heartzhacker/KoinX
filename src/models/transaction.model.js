
import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
  User_ID: {
    type: String,
    required: true
  },
  UTC_Time: {
    type: String,
    required: true
  },
  Operation: {
    type: String,
  },
  basecoin: {
    type:String,
  },
  qoutecoin: {
    type:String,
  },
  Price: {
    type:String,
  },
  BuySellAmount: {
    type:String,
  },
  balance: {
    type:String,
  },
  
});

export const Transaction = model('Transaction', transactionSchema);

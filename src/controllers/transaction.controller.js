
import csv from 'csv-parser';
import fs from 'fs';
import { Transaction } from '../models/transaction.model.js';

const uploadCSV = async (req, res) => {
  try {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        
        const [basecoin, quotecoin] = data.Market.split('/');
        results.push({
          User_ID: data.User_ID,
          UTC_Time: new Date(data.UTC_Time),
          Operation: data.Operation.toLowerCase(),
          basecoin,
          quotecoin,
          BuySellAmount: parseFloat(data['Buy/Sell Amount']),
          Price: parseFloat(data.Price),
        });
      })
      .on('end', async () => {
        
        await Transaction.insertMany(results);
        res.status(201).json({ message: 'Transactions uploaded successfully!' });
      });
  } catch (error) {
    console.error('Error uploading CSV:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getBalance = async (req, res) => {
  const { timestamp } = req.body;
  const queryTime = new Date(timestamp);

  try {
    
    const transactions = await Transaction.find({
      UTC_Time: { $lte: queryTime }
    }).sort({ UTC_Time: -1 });;
    console.log(transactions);
    console.log(queryTime);
    
    const balances = {};
    if (!transactions.length) {
      return res.status(400).json({ message: "No transactions found before the given timestamp" });
    }
   
    transactions.forEach((transaction) => {
      const { basecoin, Operation, BuySellAmount } = transaction;

      if (!balances[basecoin]) {
        balances[basecoin] = 0;
      }

      if (Operation === 'buy') {
        balances[basecoin] += parseInt(BuySellAmount);
      } else if (Operation === 'sell') {
        balances[basecoin] -= parseInt(BuySellAmount);
      }
    });

    res.status(200).json(balances);
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




export { uploadCSV,getBalance };


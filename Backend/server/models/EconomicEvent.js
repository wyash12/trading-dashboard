const mongoose = require('mongoose');

const economicEventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: String,
  event: { type: String, required: true },
  country: String,
  currency: { type: String, required: true },
  forecast: String,
  actual: String,
  previous: String,
  impact: {
    type: String,
    enum: ['High', 'Medium', 'Low', 'Holiday'],
    default: 'Low'
  },
  sentiment: {
    type: String,
    enum: ['Bullish', 'Bearish', 'Neutral', 'Pending'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('EconomicEvent', economicEventSchema);
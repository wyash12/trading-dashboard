const mongoose = require('mongoose');
const path = require('path');
const EconomicEvent = require('../models/EconomicEvent');


const importEconomicData = async () => {
  try {
    // Load data
    const dataPath = path.join(__dirname, '../../forexfactory_scraper/calendar.json');
    const rawData = require(dataPath);

    // Transform data
    const transformedData = rawData.map(event => ({
      date: getDateFromDayAbbreviation(event.date),
      time: event.time,
      event: event.event,
      country: getCountryFromCurrency(event.currency),
      currency: event.currency,
      forecast: event.forecast,
      actual: event.actual,
      previous: event.previous,
      impact: event.impact,
      sentiment: analyzeSentiment(event)
    }));

    // Database operations
    await EconomicEvent.deleteMany();
    await EconomicEvent.insertMany(transformedData);
    
    console.log(`✅ Successfully imported ${transformedData.length} events`);
    return true;
  } catch (error) {
    console.error('❌ Data import failed:', error);
    return false;
  }
};

// Helper functions
const getDateFromDayAbbreviation = (dayAbbrev) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayIndex = days.indexOf(dayAbbrev);
  const date = new Date();
  return new Date(date.setDate(date.getDate() + (dayIndex - date.getDay())));
};

const getCountryFromCurrency = (currency) => {
  const currencyMap = {
    USD: 'United States',
    GBP: 'United Kingdom',
    EUR: 'Eurozone',
    JPY: 'Japan',
    CAD: 'Canada',
    AUD: 'Australia'
  };
  return currencyMap[currency] || currency;
};

const analyzeSentiment = (event) => {
  // Add your sentiment analysis logic here
  if (!event.actual || event.actual === 'null') return 'Pending';
  // ... rest of sentiment logic
  return 'Neutral'; // temporary placeholder
};

module.exports = {
  importEconomicData
};
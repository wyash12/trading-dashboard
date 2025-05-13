const EconomicEvent = require('../models/EconomicEvent');

exports.getEvents = async (req, res) => {
  try {
    const { timeframe = 'week' } = req.query;
    const dateFilter = {};

    // Date filtering logic
    const now = new Date();
    switch(timeframe) {
      case 'today':
        dateFilter.date = { 
          $gte: new Date(now.setHours(0,0,0,0)),
          $lte: new Date(now.setHours(23,59,59,999))
        };
        break;
      case 'week':
      default:
        const start = new Date(now.setDate(now.getDate() - now.getDay()));
        const end = new Date(now.setDate(now.getDate() - now.getDay() + 6));
        dateFilter.date = { $gte: start, $lte: end };
        break;
    }

    const events = await EconomicEvent.find(dateFilter)
      .sort({ date: 1, time: 1 })
      .lean();

    const enhancedEvents = events.map(event => ({
      ...event,
      date: event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      sentimentIcon: getSentimentIcon(event.sentiment),
      impactBadge: getImpactBadge(event.impact)
    }));

    res.json(enhancedEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function getSentimentIcon(sentiment) {
  const icons = {
    Bullish: '🟢',
    Bearish: '🔴',
    Neutral: '⚪',
    Pending: '⏳'
  };
  return icons[sentiment] || '⏳';
}

function getImpactBadge(impact) {
  const badges = {
    High: '🔴 High Impact',
    Medium: '🟠 Medium Impact',
    Low: '🔵 Low Impact',
    Holiday: '⚫ Holiday'
  };
  return badges[impact] || '🔵 Low Impact';
}
exports.filterEvents = async (req, res) => {
  try {
    const { country, impact } = req.query;
    const filter = {};

    if (country) filter.currency = country.toUpperCase();
    if (impact) filter.impact = impact.charAt(0).toUpperCase() + impact.slice(1).toLowerCase();

    const events = await EconomicEvent.find(filter)
      .sort({ date: 1, time: 1 })
      .lean();

    res.json(enhanceEvents(events));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function enhanceEvents(events) {
  return events.map(event => ({
    ...event,
    date: event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    sentimentIcon: getSentimentIcon(event.sentiment),
    impactBadge: getImpactBadge(event.impact)
  }));
}
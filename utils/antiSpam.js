const logger = require('./logger');

class AntiSpam {
  constructor() {
    this.userLimits = new Map();
    this.maxRequestsPerMinute = parseInt(process.env.MAX_REQUESTS_PER_MINUTE || '30');
    this.timeWindow = 60000; // 1 minute in milliseconds
  }

  isRateLimited(userId) {
    if (!process.env.RATE_LIMIT_ENABLED === 'true') {
      return false;
    }

    const now = Date.now();
    
    if (!this.userLimits.has(userId)) {
      this.userLimits.set(userId, []);
    }

    const userTimestamps = this.userLimits.get(userId);
    
    // Remove timestamps older than 1 minute
    const recentTimestamps = userTimestamps.filter(ts => now - ts < this.timeWindow);
    
    if (recentTimestamps.length >= this.maxRequestsPerMinute) {
      logger.warn(`User ${userId} is rate limited`);
      return true;
    }

    recentTimestamps.push(now);
    this.userLimits.set(userId, recentTimestamps);
    return false;
  }

  reset() {
    this.userLimits.clear();
    logger.info('Rate limit cache cleared');
  }

  getUserStats(userId) {
    const timestamps = this.userLimits.get(userId) || [];
    const now = Date.now();
    return {
      requests: timestamps.length,
      limit: this.maxRequestsPerMinute,
      windowMs: this.timeWindow
    };
  }
}

module.exports = new AntiSpam();
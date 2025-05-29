import { cryptoData } from '../data/cryptoData';
import { Cryptocurrency } from '../types';

// Helper function to generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Helper function to format cryptocurrency recommendations
const formatCryptoRecommendation = (crypto: Cryptocurrency): string => {
  return `${crypto.name} (${crypto.symbol}) - ${crypto.description}`;
};

// Main function to process user messages and generate responses
export const processUserMessage = (message: string): string => {
  const normalizedMessage = message.toLowerCase();
  
  // Handle greetings
  if (/^(hi|hello|hey|greetings)/i.test(normalizedMessage)) {
    return "👋 Hello! I'm CryptoBuddy, your friendly crypto advisor. Ask me about sustainable cryptocurrencies, trending coins, or investment advice!";
  }
  
  // Handle help requests
  if (/help|guide|how to use/i.test(normalizedMessage)) {
    return "You can ask me questions like:\n- Which crypto is trending up?\n- What's the most sustainable coin?\n- Which crypto has the highest market cap?\n- What do you recommend for long-term investment?";
  }

  // Handle sustainability queries
  if (/sustainable|green|eco-friendly|environment/i.test(normalizedMessage)) {
    const sustainableCoins = Object.values(cryptoData)
      .filter(coin => coin.sustainability_score >= 7)
      .sort((a, b) => b.sustainability_score - a.sustainability_score);
    
    if (sustainableCoins.length > 0) {
      const topCoin = sustainableCoins[0];
      const otherCoins = sustainableCoins.slice(1, 3).map(coin => coin.name).join(' and ');
      
      return `🌱 The most sustainable cryptocurrency is ${topCoin.name} (${topCoin.symbol}) with a sustainability score of ${topCoin.sustainability_score}/10. It has ${topCoin.energy_use} energy usage and ${topCoin.description}\n\nOther eco-friendly options include ${otherCoins}.`;
    }
    
    return "I couldn't find highly sustainable cryptocurrencies in my database.";
  }
  
  // Handle trending/price trend queries
  if (/trending|rising|bull|price increase|growing/i.test(normalizedMessage)) {
    const trendingCoins = Object.values(cryptoData)
      .filter(coin => coin.price_trend === 'rising')
      .sort((a, b) => b.sustainability_score - a.sustainability_score);
    
    if (trendingCoins.length > 0) {
      const recommendations = trendingCoins.slice(0, 2).map(formatCryptoRecommendation).join('\n\n');
      return `📈 These cryptocurrencies are currently trending up:\n\n${recommendations}`;
    }
    
    return "I couldn't find trending cryptocurrencies in my database right now.";
  }
  
  // Handle market cap queries
  if (/market cap|largest|biggest|highest value/i.test(normalizedMessage)) {
    const highCapCoins = Object.values(cryptoData)
      .filter(coin => coin.market_cap === 'high')
      .sort((a, b) => b.sustainability_score - a.sustainability_score);
    
    if (highCapCoins.length > 0) {
      const recommendations = highCapCoins.slice(0, 2).map(formatCryptoRecommendation).join('\n\n');
      return `💰 These cryptocurrencies have the highest market capitalization:\n\n${recommendations}`;
    }
    
    return "I couldn't find high market cap cryptocurrencies in my database.";
  }
  
  // Handle long-term investment queries
  if (/long.term|invest|future|stable|hold/i.test(normalizedMessage)) {
    const longTermCoins = Object.values(cryptoData)
      .filter(coin => 
        (coin.sustainability_score >= 7 && coin.market_cap !== 'low') || 
        (coin.price_trend !== 'falling' && coin.sustainability_score >= 6))
      .sort((a, b) => b.sustainability_score - a.sustainability_score);
    
    if (longTermCoins.length > 0) {
      const topCoin = longTermCoins[0];
      return `🔮 For long-term investment, I recommend ${topCoin.name} (${topCoin.symbol}). It has a sustainability score of ${topCoin.sustainability_score}/10, ${topCoin.market_cap} market cap, and ${topCoin.price_trend} price trend.\n\n${topCoin.description}\n\nRemember: Crypto investments carry risk—always do your own research!`;
    }
    
    return "Based on my current data, I don't have strong long-term investment recommendations. The market may be volatile right now.";
  }

  // Handle specific cryptocurrency queries
  for (const [key, crypto] of Object.entries(cryptoData)) {
    if (normalizedMessage.includes(key) || normalizedMessage.includes(crypto.name.toLowerCase()) || normalizedMessage.includes(crypto.symbol.toLowerCase())) {
      return `💎 ${crypto.name} (${crypto.symbol}):\n\nPrice Trend: ${crypto.price_trend}\nMarket Cap: ${crypto.market_cap}\nEnergy Use: ${crypto.energy_use}\nSustainability Score: ${crypto.sustainability_score}/10\n\n${crypto.description}`;
    }
  }
  
  // Default response
  return "I'm not sure how to answer that question about cryptocurrencies. Try asking me about sustainable coins, trending cryptocurrencies, or specific coins like Bitcoin or Ethereum!";
};

// chatbotservices: handles the chatbot logic, processes user messages, and generates responses
// processUserMessage: main function that analyzes user input and returns appropriate responses based on predefined rules and data, matches keywords, handles various queries about cryptocurrencies, sustainability, market trends, and investment advice
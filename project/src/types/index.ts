export interface Cryptocurrency {
  name: string;
  symbol: string;
  price_trend: 'rising' | 'falling' | 'stable';
  market_cap: 'high' | 'medium' | 'low';
  energy_use: 'high' | 'medium' | 'low';
  sustainability_score: number; // 1-10
  description: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// cryptocurrency: properties of crypto coins (name, symbol, price trend, market cap, energy use, sustainability score, description)
// message: chat message structure (id, text, sender, timestamp)
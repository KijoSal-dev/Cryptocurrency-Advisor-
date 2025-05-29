import { Cryptocurrency } from '../types';

export const cryptoData: Record<string, Cryptocurrency> = {
  bitcoin: {
    name: 'Bitcoin',
    symbol: 'BTC',
    price_trend: 'rising',
    market_cap: 'high',
    energy_use: 'high',
    sustainability_score: 3,
    description: 'The original cryptocurrency with the largest market cap, but has high energy consumption due to its proof-of-work consensus mechanism.'
  },
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    price_trend: 'rising',
    market_cap: 'high',
    energy_use: 'medium',
    sustainability_score: 6,
    description: 'Smart contract platform transitioning from proof-of-work to proof-of-stake, which should significantly reduce its energy consumption.'
  },
  cardano: {
    name: 'Cardano',
    symbol: 'ADA',
    price_trend: 'stable',
    market_cap: 'medium',
    energy_use: 'low',
    sustainability_score: 9,
    description: 'Research-driven blockchain platform using proof-of-stake consensus. Known for its focus on sustainability and academic approach.'
  },
  solana: {
    name: 'Solana',
    symbol: 'SOL',
    price_trend: 'rising',
    market_cap: 'medium',
    energy_use: 'low',
    sustainability_score: 8,
    description: 'High-performance blockchain with fast transaction times and low fees. Uses a proof-of-stake consensus mechanism with low energy consumption.'
  },
  ripple: {
    name: 'Ripple',
    symbol: 'XRP',
    price_trend: 'stable',
    market_cap: 'medium',
    energy_use: 'low',
    sustainability_score: 7,
    description: 'Digital payment protocol focusing on international money transfers. Doesn\'t require mining, making it more energy-efficient.'
  },
  dogecoin: {
    name: 'Dogecoin',
    symbol: 'DOGE',
    price_trend: 'falling',
    market_cap: 'medium',
    energy_use: 'high',
    sustainability_score: 2,
    description: 'Meme-inspired cryptocurrency that started as a joke but gained popularity. Uses proof-of-work consensus like Bitcoin.'
  },
  polkadot: {
    name: 'Polkadot',
    symbol: 'DOT',
    price_trend: 'rising',
    market_cap: 'medium',
    energy_use: 'low',
    sustainability_score: 8,
    description: 'Multi-chain network enabling cross-blockchain transfers. Uses nominated proof-of-stake for consensus, making it energy efficient.'
  },
  avalanche: {
    name: 'Avalanche',
    symbol: 'AVAX',
    price_trend: 'rising',
    market_cap: 'medium',
    energy_use: 'low',
    sustainability_score: 7,
    description: 'Platform for launching decentralized applications with high throughput. Uses proof-of-stake consensus.'
  }
};

//  contains the cryptocurrency database with information about various coins like Bitcoin, Ethereum, Cardano, etc.
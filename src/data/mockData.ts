import { faker } from '@faker-js/faker';

// Models
export interface User {
  id: string;
  name: string;
  email: string;
  totalBalance: number;
  securityStatus: {
    twoFactorEnabled: boolean;
    lastLogin: Date;
  };
}

export interface Transaction {
    id: string;
    date: Date;
    type: 'buy' | 'sell' | 'transfer';
    asset: string;
    amount: number;
    price: number;
    value: number;
    fees: number;
    status: 'completed' | 'pending' | 'failed';
  }

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  currentPrice: number;
  value: number;
  priceChange24h: number;
}

export interface StakingInfo {
  asset: string;
  amount: number;
  apy: number;
  earnings: number;
}

export interface EarningsData {
  date: Date;
  amount: number;
}

export interface ExchangeData {
  name: string;
  volume24h: number;
  trades24h: number;
}

export interface PerformanceData {
  date: Date;
  value: number;
}

// Consts
const cryptocurrencies = [
    { name: 'Bitcoin', symbol: 'BTC' },
    { name: 'Ethereum', symbol: 'ETH' },
    { name: 'Cardano', symbol: 'ADA' },
    { name: 'Binance Coin', symbol: 'BNB' },
    { name: 'Solana', symbol: 'SOL' },
  ];

// Generators
export const generateUser = (): User => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    totalBalance: parseFloat(faker.finance.amount(10000, 1000000, 2)),
    securityStatus: {
        twoFactorEnabled: faker.datatype.boolean(),
        lastLogin: faker.date.recent(),
    },
});

export const generateTransaction = (): Transaction => ({
    id: faker.string.uuid(),
    date: faker.date.recent(),
    type: faker.helpers.arrayElement(['buy', 'sell', 'transfer']),
    asset: faker.finance.currencyName(),
    amount: parseFloat(faker.finance.amount(0.1, 10, 6)),
    price: parseFloat(faker.finance.amount(100, 50000, 2)),
    value: parseFloat(faker.finance.amount(100, 10000, 2)),
    fees: parseFloat(faker.finance.amount(1, 50, 2)),
    status: faker.helpers.arrayElement(['completed', 'pending', 'failed']),
  });
export const generateCryptoAsset = (usedCryptos: Set<string>): CryptoAsset => {
    let selectedCrypto;
    do {
      selectedCrypto = faker.helpers.arrayElement(cryptocurrencies);
    } while (usedCryptos.has(selectedCrypto.name));
    
    usedCryptos.add(selectedCrypto.name);
    
    return {
      id: faker.string.uuid(),
      name: selectedCrypto.name,
      symbol: selectedCrypto.symbol,
      amount: parseFloat(faker.finance.amount(0.1, 100, 8)),
      currentPrice: parseFloat(faker.finance.amount(100, 50000, 2)),
      value: parseFloat(faker.finance.amount(1000, 100000, 2)),
      priceChange24h: parseFloat(faker.finance.amount(-10, 10, 2)),
    };
};
  
export const generateStakingInfo = (): StakingInfo => ({
  asset: faker.finance.currencyName(),
  amount: parseFloat(faker.finance.amount(1, 1000, 2)),
  apy: parseFloat(faker.finance.amount(1, 20, 2)),
  earnings: parseFloat(faker.finance.amount(0.1, 100, 2)),
});

export const generateEarningsData = (days: number): EarningsData[] => {
  return Array.from({ length: days }, (_, index) => ({
    date: faker.date.recent(days - index),
    amount: parseFloat(faker.finance.amount(100, 10000, 2)),
  }));
};

export const generateExchangeData = (): ExchangeData[] => {
  const exchanges = ['Binance', 'Coinbase', 'Kraken', 'Huobi', 'KuCoin'];
  return exchanges.map(name => ({
    name,
    volume24h: parseFloat(faker.finance.amount(1000000, 10000000, 0)),
    trades24h: faker.number.int({ min: 10000, max: 1000000 }),
  }));
};

export const generatePerformanceData = (days: number): PerformanceData[] => {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (days - 1) * 24 * 60 * 60 * 1000);
    
    return Array.from({ length: days }, (_, index) => {
      const date = new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000);
      return {
        date: date,
        value: parseFloat(faker.finance.amount(10000, 100000, 2)),
      };
    });
  };

export const generateMockData = (days: number = 30) => {
    const user = generateUser();
    const usedCryptos = new Set<string>();
    const cryptoAssets = Array.from({ length: 5 }, () => generateCryptoAsset(usedCryptos));
    const transactions = Array.from({ length: 20 }, generateTransaction);
    const performanceData = generatePerformanceData(days);
    const earningsData = generateEarningsData(days);
    const exchangeData = generateExchangeData();
    const stakingInfo = Array.from({ length: 3 }, generateStakingInfo);

    return { user, cryptoAssets, transactions, performanceData, earningsData, exchangeData, stakingInfo };
};
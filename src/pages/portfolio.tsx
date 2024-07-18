import { useState, useEffect } from 'react';
import { generateMockData, CryptoAsset, Transaction, PerformanceData } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Portfolio() {
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);

  useEffect(() => {
    const { cryptoAssets, transactions, performanceData } = generateMockData();
    setCryptoAssets(cryptoAssets);
    setTransactions(transactions);
    setPerformanceData(performanceData);
  }, []);

  const totalPortfolioValue = cryptoAssets.reduce((total, asset) => total + asset.value, 0);

  const performanceChartData = {
    labels: performanceData.map(data => data.date.toLocaleDateString()),
    datasets: [
      {
        label: 'Portfolio Value',
        data: performanceData.map(data => data.value),
        fill: false,
        borderColor: 'rgb(45, 212, 191)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Performance',
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Portfolio</h1>
    {/* Performance Metrics Section */}
    <Card className="mb-6">
        <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
            <h3 className="text-lg font-medium">ROI</h3>
            <p className="text-2xl font-bold text-teal-600">+15.32%</p>
            </div>
            <div>
            <h3 className="text-lg font-medium">Net Gains/Losses</h3>
            <p className="text-2xl font-bold text-teal-600">+$2,345.67</p>
            </div>
            <div>
            <h3 className="text-lg font-medium">24h Performance</h3>
            <p className="text-2xl font-bold text-teal-600">+2.5%</p>
            </div>
        </div>
        </CardContent>
    </Card>

    {/* Overview Section */}
    <Card className="mb-6">
        <CardHeader>
        <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <h3 className="text-lg font-medium">Total Portfolio Value</h3>
            <p className="text-3xl font-bold text-teal-600">${totalPortfolioValue.toFixed(2)}</p>
            </div>
            <div>
            <Line data={performanceChartData} options={chartOptions} />
            </div>
        </div>
        </CardContent>
    </Card>

    {/* Holdings Section */}
    <Card className="mb-6">
        <CardHeader>
        <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocation</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {cryptoAssets.map((asset) => (
                <tr key={asset.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                        <div className="text-sm text-gray-500 ml-2">({asset.symbol})</div>
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.amount.toFixed(6)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${asset.currentPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${asset.value.toFixed(2)}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${asset.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {asset.priceChange24h >= 0 ? '+' : ''}{asset.priceChange24h.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {((asset.value / totalPortfolioValue) * 100).toFixed(2)}%
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </CardContent>
    </Card>

    {/* Transactions Section */}
    <Card>
        <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {transactions.slice(0, 5).map((transaction) => (
                <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.asset}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.amount.toFixed(6)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.value.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.fees.toFixed(2)}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </CardContent>
    </Card>

    </div>
  );
}
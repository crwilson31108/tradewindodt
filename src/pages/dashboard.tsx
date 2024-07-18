import { useState, useEffect } from 'react';
import { generateMockData, User, CryptoAsset, Transaction, PerformanceData } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ChartOptions, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import Link from 'next/link';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);

  useEffect(() => {
    const { user, cryptoAssets, transactions, performanceData } = generateMockData(30);
    setUser(user);
    setCryptoAssets(cryptoAssets);
    setTransactions(transactions);
    setPerformanceData(performanceData);
  }, []);

  const greyTealsColorScheme = [
    'rgba(45, 212, 191, 0.8)',  // teal
    'rgba(100, 116, 139, 0.8)', // grey
    'rgba(20, 184, 166, 0.8)',  // lighter teal
    'rgba(71, 85, 105, 0.8)',   // darker grey
    'rgba(13, 148, 136, 0.8)',  // darker teal
  ];

  const totalPortfolioValue = cryptoAssets.reduce((total, asset) => total + asset.value, 0);

  const performanceChartData = {
    labels: performanceData.map(data => data.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
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

  const portfolioCompositionData = {
    labels: cryptoAssets.map(asset => asset.name),
    datasets: [
      {
        data: cryptoAssets.map(asset => asset.value),
        backgroundColor: greyTealsColorScheme,
        borderColor: greyTealsColorScheme.map(color => color.replace('0.8', '1')),
        borderWidth: 1,
      },
    ],
  };
  
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'center' as const,
        labels: {
          boxWidth: 12,
          padding: 10,
          font: {
            size: 10
          }
        }
      },
      title: {
        display: false,
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 0
      }
    }
  };

  
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          maxTicksLimit: 10,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Portfolio Value ($)',
        },
        ticks: {
          callback: function(value: number | string, index: number, values: any[]): string {
            if (typeof value === 'number') {
              return '$' + value.toLocaleString();
            }
            return value;
          },
        },
      },
    },
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}</h1>
        <Link href="/account" className="text-teal-600 hover:text-teal-800">
        Account Settings
        </Link>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-800">Buy</button>
        <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-800">Sell</button>
        <button className="bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-800">Transfer</button>
        <button className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-800">Deposit</button>
    </div>

    {/* Overview */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
        <CardHeader>
            <CardTitle>Total Account Balance</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-3xl font-bold text-teal-600">${user.totalBalance.toFixed(2)}</p>
        </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
            <p>{transactions.length} transactions in the last 7 days</p>
        </CardContent>
        </Card>
    </div>

    {/* Recent Transactions */}
    <Card className="mb-8">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {transactions.slice(0, 5).map((transaction) => (
                <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date.toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.amount.toFixed(6)} {transaction.asset}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.value.toFixed(2)}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </CardContent>
    </Card>

    {/* Portfolio Snapshot and Performance Heartbeat */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
            <CardHeader>
                <CardTitle>Portfolio Snapshot</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col h-64">
                <div className="mb-2">
                    <h3 className="text-lg font-medium">Total Portfolio Value</h3>
                    <p className="text-2xl font-bold text-teal-600">${totalPortfolioValue.toFixed(2)}</p>
                </div>
                <div className="flex-grow relative chart-container" style={{ height: '180px' }}>
                    <Doughnut data={portfolioCompositionData} options={doughnutOptions} />
                </div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Performance Heartbeat</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                <Line data={performanceChartData} options={chartOptions} />
                </div>
            </CardContent>
        </Card>
    </div>

    {/* Holdings Summary */}
    <Card className="mb-8">
        <CardHeader>
        <CardTitle>Top Holdings</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {cryptoAssets.slice(0, 5).map((asset) => (
                <tr key={asset.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                        <div className="text-sm text-gray-500 ml-2">({asset.symbol})</div>
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${asset.currentPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.amount.toFixed(6)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${asset.value.toFixed(2)}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${asset.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {asset.priceChange24h >= 0 ? '+' : ''}{asset.priceChange24h.toFixed(2)}%
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </CardContent>
    </Card>

    {/* Tools and Resources */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
        <CardHeader>
            <CardTitle>Investment Tools</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="list-disc pl-5">
            <li>Portfolio Analysis</li>
            <li>Risk Assessment</li>
            <li>Tax Calculator</li>
            </ul>
        </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Learning Resources</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="list-disc pl-5">
            <li>Crypto 101</li>
            <li>Trading Strategies</li>
            <li>Market Analysis</li>
            </ul>
        </CardContent>
        </Card>
    </div>
    </div>
  );
}
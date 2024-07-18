import { useState, useEffect } from 'react';
import { generateMockData, Transaction } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), to: new Date() });
  const [transactionType, setTransactionType] = useState('all');
  const [cryptocurrency, setCryptocurrency] = useState('all');

  useEffect(() => {
    const { transactions } = generateMockData();
    setTransactions(transactions);
    setFilteredTransactions(transactions);
  }, []);

  useEffect(() => {
    const filtered = transactions.filter(transaction => {
      const matchesSearch = 
        transaction.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDateRange = 
        transaction.date >= dateRange.from && transaction.date <= dateRange.to;
      
      const matchesType = 
        transactionType === 'all' || transaction.type === transactionType;
      
      const matchesCrypto = 
        cryptocurrency === 'all' || transaction.asset === cryptocurrency;

      return matchesSearch && matchesDateRange && matchesType && matchesCrypto;
    });
    setFilteredTransactions(filtered);
  }, [searchTerm, dateRange, transactionType, cryptocurrency, transactions]);

  const volumeChartData = {
    labels: filteredTransactions.map(t => t.date.toLocaleDateString()),
    datasets: [{
      label: 'Transaction Volume',
      data: filteredTransactions.map(t => t.value),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Transaction Volume Over Time'
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
    </div>

    {/* Filters and Search */}
    <Card className="mb-8">
        <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
            <Label htmlFor="search">Search</Label>
            <Input
                id="search"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            <div className="grid grid-cols-2 gap-2">
            <div>
                <Label htmlFor="fromDate">From</Label>
                <Input
                id="fromDate"
                type="date"
                value={dateRange.from.toISOString().split('T')[0]}
                onChange={(e) => setDateRange(prev => ({ ...prev, from: new Date(e.target.value) }))}
                />
            </div>
            <div>
                <Label htmlFor="toDate">To</Label>
                <Input
                id="toDate"
                type="date"
                value={dateRange.to.toISOString().split('T')[0]}
                onChange={(e) => setDateRange(prev => ({ ...prev, to: new Date(e.target.value) }))}
                />
            </div>
            </div>
            <div>
            <Label htmlFor="transactionType">Transaction Type</Label>
            <Select onValueChange={(value) => setTransactionType(value)}>
                <SelectTrigger id="transactionType">
                <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
            </Select>
            </div>
            <div>
            <Label htmlFor="cryptocurrency">Cryptocurrency</Label>
            <Select onValueChange={(value) => setCryptocurrency(value)}>
                <SelectTrigger id="cryptocurrency">
                <SelectValue placeholder="Select cryptocurrency" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="all">All Cryptocurrencies</SelectItem>
                <SelectItem value="BTC">Bitcoin</SelectItem>
                <SelectItem value="ETH">Ethereum</SelectItem>
                {/* Add more cryptocurrencies as needed */}
                </SelectContent>
            </Select>
            </div>
        </div>
        </CardContent>
    </Card>

    {/* Transaction Summary */}
    <Card className="mb-8">
        <CardHeader>
        <CardTitle>Transaction Summary</CardTitle>
        </CardHeader>
        <CardContent>
        <p>Total Transactions: {filteredTransactions.length}</p>
        <p>Total Volume: ${filteredTransactions.reduce((sum, t) => sum + t.value, 0).toFixed(2)}</p>
        </CardContent>
    </Card>

    {/* Transaction List */}
    <Card className="mb-8">
        <CardHeader>
        <CardTitle>Transaction List</CardTitle>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.asset}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.amount.toFixed(6)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.value.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.fees.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button variant="outline" size="sm">Details</Button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </CardContent>
    </Card>

    {/* Tools and Actions */}
    <Card>
        <CardHeader>
        <CardTitle>Tools and Actions</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="flex space-x-4">
            <Button>Export CSV</Button>
            <Button>Export PDF</Button>
            <Button>Print</Button>
            <Button>Import Transactions</Button>
        </div>
        </CardContent>
    </Card>
    </div>
  );
}

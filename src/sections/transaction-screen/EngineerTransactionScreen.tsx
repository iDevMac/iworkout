import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

// --- Sample Data Structure ---
const engineerTransactions = [
  { 
    id: 'P-20251001-01', 
    date: 'Oct 1, 2025', 
    title: 'Weekly Payout', 
    detail: 'Transfer to Bank Account (B1234)', 
    amount: 850.75, // Payout (Money OUT of the system, IN to the engineer)
    type: 'Payout', 
    status: 'Completed' 
  },
  { 
    id: 'E-20250929-A', 
    date: 'Sep 29, 2025', 
    title: 'Job #456 Commission', 
    detail: 'Repair: iPhone 15 Screen', 
    amount: 125.00, // Earning
    type: 'Earning', 
    status: 'Cleared' 
  },
  { 
    id: 'E-20250928-B', 
    date: 'Sep 28, 2025', 
    title: 'Job #455 Commission', 
    detail: 'Installation: Office Network', 
    amount: 450.75, 
    type: 'Earning', 
    status: 'Cleared' 
  },
  { 
    id: 'P-20250924-02', 
    date: 'Sep 24, 2025', 
    title: 'Weekly Payout', 
    detail: 'Transfer to Bank Account (B1234)', 
    amount: 720.50, 
    type: 'Payout', 
    status: 'Pending' 
  },
];

// --- Status Indicator Component (Reused/Modified) ---
const StatusIndicator = ({ status }) => {
  let bgColor;
  let textColor;
  switch (status) {
    case 'Completed':
    case 'Cleared':
      bgColor = 'bg-green-100';
      textColor = 'text-green-700';
      break;
    case 'Pending':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-700';
      break;
    case 'Rejected':
      bgColor = 'bg-red-100';
      textColor = 'text-red-700';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-600';
  }
  return (
    <View className={`px-2 py-0.5 rounded-md ${bgColor}`}>
      <Text className={`text-xs font-semibold ${textColor}`}>{status}</Text>
    </View>
  );
};

// --- Single Engineer Transaction Row Renderer ---
const EngineerTransactionRow = ({ item }) => {
  // Payouts (Money leaving system to engineer) and Earnings (Money entering their balance)
  const isPayout = item.type === 'Payout';
  const amountColor = isPayout ? 'text-red-600' : 'text-green-600'; // Red for a system debit (payout), Green for a system credit (earning)
  const sign = isPayout ? '-' : '+'; // Show '-' for a Payout, '+' for an Earning
  const icon = isPayout ? '📦' : '💰'; // Box for payout, Money bag for earning

  return (
    <TouchableOpacity 
      className="flex-row items-center p-4 bg-white border-b border-gray-100" 
      activeOpacity={0.7}
    >
      {/* Left Icon */}
      <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${isPayout ? 'bg-red-50' : 'bg-green-50'}`}>
         <Text className="text-xl">{icon}</Text>
      </View>

      {/* Center Column: Title & Detail */}
      <View className="flex-1 mr-4">
        <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
        <Text className="text-sm text-gray-500 mt-0.5">{item.detail}</Text>
      </View>

      {/* Right Column: Amount & Status */}
      <View className="items-end">
        <Text className={`text-base font-bold ${amountColor} mb-1`}>
          {sign}${item.amount.toFixed(2)}
        </Text>
        <StatusIndicator status={item.status} />
      </View>
    </TouchableOpacity>
  );
};

// --- Main Screen Component ---
const EngineerTransactionScreen = () => {
  return (
    <View className="flex-1 bg-gray-50">
      
      {/* Financial Summary Card (More Prominent for Engineer) */}
      <View className="p-4 bg-white shadow-md mb-4">
        <Text className="text-sm font-medium text-gray-500">Current Balance</Text>
        <Text className="text-4xl font-extrabold text-gray-900 mt-1">$415.75</Text> 
        <TouchableOpacity className="mt-3 py-2 px-4 rounded-lg bg-indigo-600">
            <Text className="text-white font-semibold text-center">Request Payout</Text>
        </TouchableOpacity>
      </View>

      {/* Section Header for History */}
      <Text className="px-4 pb-2 text-lg font-bold text-gray-700">Payout & Earnings History</Text>
      
      {/* Transactions List */}
      <FlatList
        data={engineerTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EngineerTransactionRow item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => (
          <View className="items-center justify-center p-10">
            <Text className="text-lg text-gray-500">No earnings or payouts recorded yet.</Text>
          </View>
        )}
      />
    </View>
  );
};

export default EngineerTransactionScreen;
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Assuming 'tw' is a utility like NativeWind or twrnc for styling

// --- Sample Data Structure ---
const transactionsData = [
  { 
    id: 'T-20251001-A', 
    date: 'Oct 1, 2025', 
    description: 'Repair for iPhone 13 Pro', 
    amount: 199.99, 
    type: 'Repair Payment', 
    status: 'Paid' 
  },
  { 
    id: 'T-20250920-B', 
    date: 'Sep 20, 2025', 
    description: 'Diagnosis Fee (MacBook)', 
    amount: 55.00, 
    type: 'Fee', 
    status: 'Pending' 
  },
  { 
    id: 'T-20250915-C', 
    date: 'Sep 15, 2025', 
    description: 'Refund for iPad Battery Service', 
    amount: -79.50, // Negative for refund/credit
    type: 'Refund', 
    status: 'Processed' 
  },
  { 
    id: 'T-20250801-D', 
    date: 'Aug 1, 2025', 
    description: 'Repair for Samsung S21', 
    amount: 79.50, 
    type: 'Repair Payment', 
    status: 'Paid' 
  },
];

// --- Status Indicator Component ---
const StatusIndicator = ({ status }) => {
  let bgColor;
  let textColor;
  switch (status) {
    case 'Paid':
    case 'Processed':
      bgColor = 'bg-green-100';
      textColor = 'text-green-700';
      break;
    case 'Pending':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-700';
      break;
    case 'Failed':
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

// --- Single Transaction Row Renderer ---
const TransactionRow = ({ item }) => {
  // Determine color for amount (Green for credit/refund, Red for payment/debit)
  const amountColor = item.amount < 0 ? 'text-green-600' : 'text-red-600';
  const sign = item.amount < 0 ? '+' : '-';
  const displayAmount = Math.abs(item.amount).toFixed(2);

  return (
    <TouchableOpacity 
      className="flex-row items-center justify-between p-4 bg-white border-b border-gray-100" 
      activeOpacity={0.7}
    >
      {/* Left Column: Description & Date */}
      <View className="flex-1 mr-4">
        <Text className="text-base font-semibold text-gray-800">{item.description}</Text>
        <Text className="text-sm text-gray-500 mt-0.5">{item.date} • {item.type}</Text>
      </View>

      {/* Right Column: Amount & Status */}
      <View className="items-end">
        <Text className={`text-base font-bold ${amountColor} mb-1`}>
          {sign}${displayAmount}
        </Text>
        <StatusIndicator status={item.status} />
      </View>
    </TouchableOpacity>
  );
};

// --- Main Screen Component ---
const ClientTransactionsScreen = () => {
  return (
    <View className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="p-4 bg-white border-b border-gray-200 shadow-sm">
        <Text className="text-2xl font-extrabold text-gray-900">Payment Transactions</Text>
        {/* Simple overall balance summary - often included in transaction screens */}
        <Text className="text-sm text-gray-600 mt-1">Total Spent: $429.49</Text> 
      </View>

      {/* Transactions List */}
      <FlatList
        data={transactionsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionRow item={item} />}
        contentContainerStyle={{ paddingVertical: 0 }}
        ListEmptyComponent={() => (
          <View className="items-center justify-center p-10">
            <Text className="text-lg text-gray-500">No payment transactions recorded.</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ClientTransactionsScreen;
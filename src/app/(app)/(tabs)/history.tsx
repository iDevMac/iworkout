import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Assuming 'tw' is a utility like NativeWind or twrnc for styling

// --- Sample Data Structure ---
const repairHistory = [
  { id: '1', device: 'iPhone 13 Pro', issue: 'Screen Replacement', status: 'Completed', date: '2025-09-10', cost: 199.99 },
  { id: '2', device: 'Samsung Galaxy S21', issue: 'Battery Service', status: 'Completed', date: '2025-08-25', cost: 79.50 },
  { id: '3', device: 'iPad Air (4th Gen)', issue: 'Charging Port Repair', status: 'Pending Payment', date: '2025-09-20', cost: 55.00 },
  { id: '4', device: 'MacBook Pro 16"', issue: 'SSD Data Recovery', status: 'In Progress', date: '2025-09-01', cost: 350.00 },
];

// --- Status Indicator Component ---
const StatusIndicator = ({ status }) => {
  let bgColor;
  switch (status) {
    case 'Completed':
      bgColor = 'bg-green-500';
      break;
    case 'In Progress':
      bgColor = 'bg-blue-500';
      break;
    case 'Pending Payment':
      bgColor = 'bg-yellow-500';
      break;
    default:
      bgColor = 'bg-gray-400';
  }
  return (
    <View className={`px-2 py-1 rounded-full ${bgColor} items-center`}>
      <Text className="text-white text-xs font-semibold">{status}</Text>
    </View>
  );
};

// --- Single Repair Item Renderer ---
const RepairItem = ({ item }) => (
  <TouchableOpacity className="p-4 mb-3 mx-4 bg-white rounded-lg shadow-md border border-gray-100" activeOpacity={0.8}>
    <View className="flex-row justify-between items-start mb-2">
      <Text className="text-lg font-bold text-gray-800 flex-1">{item.device}</Text>
      <StatusIndicator status={item.status} />
    </View>
    
    <Text className="text-sm text-gray-600 mb-1">Issue: {item.issue}</Text>
    
    <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
      <Text className="text-xs text-gray-500">Date: {item.date}</Text>
      <Text className="text-base font-semibold text-indigo-600">${item.cost.toFixed(2)}</Text>
    </View>
  </TouchableOpacity>
);

// --- Main Screen Component ---
const RepairHistoryScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 bg-gray-50"> 
        {/* Header */}
        <View className="p-4 bg-white border-b border-gray-200 shadow-sm">
          <Text className="text-2xl font-extrabold text-gray-900">Repair History</Text>
        </View>

        {/* List */}
        <FlatList
          data={repairHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RepairItem item={item} />}
          contentContainerStyle={{ paddingVertical: 12 }}
          ListEmptyComponent={() => (
            <View className="items-center justify-center p-10">
              <Text className="text-lg text-gray-500">No repair history found.</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default RepairHistoryScreen;
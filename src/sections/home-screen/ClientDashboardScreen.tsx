import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

// Dummy data for the dashboard
const user = {
  name: 'Engineer',
  metrics: {
    active: 1,
    completed: 4,
    pendingPayment: 1,
  },
  devices: [
    { id: '1', name: 'iPhone 14 Pro', status: 'Repair in Progress', icon: 'phone-portrait' },
    { id: '2', name: 'MacBook Air M2', status: 'Healthy', icon: 'laptop-outline' },
    { id: '3', name: 'Apple Watch S8', status: 'Healthy', icon: 'watch-outline' },
  ],
  recentActivity: [
    { id: '1', title: 'Technician Assigned', description: 'David A. is now handling your iPhone 14 Pro.', time: '10:05 AM', icon: 'person-circle' },
    { id: '2', title: 'Payment Received', description: 'Payment for MacBook Air repair confirmed.', time: 'Yesterday', icon: 'checkmark-circle' },
    { id: '3', title: 'Repair Completed', description: 'Your MacBook Air is ready for pickup.', time: 'Yesterday', icon: 'build' },
  ],
};

// --- Reusable Sub-components ---

// Card for displaying key metrics (KPIs)
const MetricCard = ({ icon, label, value, color }) => (
  <View className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 items-center">
    <MaterialCommunityIcons name={icon} size={28} color={color} />
    <Text className={`text-2xl font-bold mt-2`} style={{ color }}>{value}</Text>
    <Text className="text-sm font-medium text-gray-500">{label}</Text>
  </View>
);

// Card for displaying a user's registered device
const DeviceItem = ({ item }) => {
  const isHealthy = item.status === 'Healthy';
  return (
    <View className="bg-white p-4 rounded-xl w-40 mr-4 border border-gray-100">
      <Ionicons name={item.icon} size={24} color={isHealthy ? '#10B981' : '#F59E0B'} />
      <Text className="text-base font-semibold text-gray-800 mt-2">{item.name}</Text>
      <Text className={`text-xs font-bold ${isHealthy ? 'text-green-500' : 'text-amber-500'}`}>
        {item.status.toUpperCase()}
      </Text>
    </View>
  );
};

// List item for the recent activity timeline
const ActivityItem = ({ item }) => (
  <View className="flex-row items-center mb-4">
    <View className="bg-gray-100 p-3 rounded-full mr-4">
      <Ionicons name={item.icon} size={20} color="#555" />
    </View>
    <View className="flex-1">
      <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
      <Text className="text-sm text-gray-500">{item.description}</Text>
    </View>
    <Text className="text-xs text-gray-400">{item.time}</Text>
  </View>
);


const ClientDashboardScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* --- Header --- */}
        <View className="px-5 pt-5">
          <Text className="text-3xl font-bold text-gray-800">
            Welcome back, {user.name}!
          </Text>
          <Text className="text-base text-gray-500">
            Here's a summary of your repair activities.
          </Text>
        </View>

        {/* --- Key Metrics Section --- */}
        <View className="px-5 mt-6 flex-row space-x-4">
          <MetricCard icon="progress-wrench" label="Active Repairs" value={user.metrics.active} color="#3B82F6" />
          <MetricCard icon="check-decagram" label="Completed Jobs" value={user.metrics.completed} color="#10B981" />
          <MetricCard icon="credit-card-clock-outline" label="Pending Bills" value={user.metrics.pendingPayment} color="#F97316" />
        </View>

        {/* --- My Devices Section --- */}
        <View className="mt-8">
          <Text className="text-lg font-semibold text-gray-800 mb-4 px-5">
            My Devices
          </Text>
          <FlatList
            data={user.devices}
            renderItem={DeviceItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
          />
        </View>

        {/* --- Quick Actions --- */}
        <View className="px-5 mt-8">
            <TouchableOpacity className="bg-blue-500 p-4 rounded-xl flex-row items-center justify-center">
                <Ionicons name="add-circle-outline" size={24} color="white" />
                <Link href={"/new-fix"} className="text-white text-base font-bold ml-2">Book a New Repair</Link>
            </TouchableOpacity>
        </View>
        
        {/* --- Recent Activity Section --- */}
        <View className="mt-8 px-5">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </Text>
          <View className="bg-white p-4 rounded-2xl border border-gray-100">
            {user.recentActivity.map(item => <ActivityItem key={item.id} item={item} />)}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ClientDashboardScreen;
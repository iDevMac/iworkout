import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Dummy data for an engineer's dashboard
const engineerData = {
  name: 'David',
  stats: {
    newJobs: 3,
    inProgress: 2,
    completedToday: 5,
  },
  jobs: {
    new: [
      { id: 'JOB789', device: 'iPhone 14 Pro', issue: 'Cracked screen', customer: 'Bisi Adebayo', status: 'New' },
      { id: 'JOB790', device: 'Samsung S22 Ultra', issue: 'Won\'t turn on', customer: 'Chinedu Okoro', status: 'New' },
      { id: 'JOB791', device: 'Google Pixel 7', issue: 'Charging port issue', customer: 'Fatima Bello', status: 'New' },
    ],
    inProgress: [
      { id: 'JOB785', device: 'MacBook Pro 16"', issue: 'Keyboard replacement', customer: 'Tunde Ojo', status: 'Awaiting Parts' },
      { id: 'JOB786', device: 'Dell XPS 15', issue: 'Overheating fan', customer: 'Amara Eze', status: 'Diagnostics' },
    ],
    completed: [
      { id: 'JOB780', device: 'OnePlus 9 Pro', issue: 'Battery replacement', customer: 'Segun Adekunle', status: 'Completed' },
    ],
  },
};

// --- Reusable Sub-components ---

// Card for engineer's daily stats
const StatCard = ({ icon, label, value, color }) => (
  <View className={`flex-1 p-4 rounded-2xl`} style={{ backgroundColor: color }}>
    <MaterialCommunityIcons name={icon} size={28} color="white" />
    <Text className="text-white text-3xl font-bold mt-2">{value}</Text>
    <Text className="text-white text-sm font-medium">{label}</Text>
  </View>
);

// Detailed card for each job assignment
const JobCard = ({ item }: {item: any}) => {
  const statusStyles = {
    'New': 'bg-blue-100 text-blue-800',
    'Awaiting Parts': 'bg-amber-100 text-amber-800',
    'Diagnostics': 'bg-purple-100 text-purple-800',
    'Completed': 'bg-green-100 text-green-800',
  };

  const actionButton = {
      'New': { text: 'Accept Job', color: 'bg-blue-500'},
      'Awaiting Parts': { text: 'Update Status', color: 'bg-amber-500'},
      'Diagnostics': { text: 'Start Repair', color: 'bg-purple-500'},
      'Completed': { text: 'View Report', color: 'bg-green-500'},
  };

  return (
    <View className="bg-white p-4 rounded-2xl mb-4 border border-gray-100 shadow-sm">
      <View className="flex-row justify-between items-start">
        <View>
          <Text className="text-sm font-medium text-gray-400">{item.id}</Text>
          <Text className="text-lg font-bold text-gray-800 mt-1">{item.device}</Text>
        </View>
        <View className={`px-3 py-1 rounded-full ${statusStyles[item.status] || 'bg-gray-100'}`}>
          <Text className={`text-xs font-bold ${statusStyles[item.status]?.split(' ')[1] || 'text-gray-800'}`}>{item.status}</Text>
        </View>
      </View>
      <Text className="text-base text-gray-600 my-2">Issue: {item.issue}</Text>
      <Text className="text-sm text-gray-500">Customer: {item.customer}</Text>
      <TouchableOpacity className={`mt-4 p-3 rounded-xl justify-center items-center ${actionButton[item.status]?.color || 'bg-gray-500'}`}>
        <Text className="text-white font-bold text-base">{actionButton[item.status]?.text || 'View Details'}</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Main Dashboard Screen ---

const EngineerDashboardScreen = () => {
  const [activeTab, setActiveTab] = useState<string>('inProgress');

  const tabs = [
    { key: 'new', label: `New (${engineerData.jobs.new.length})` },
    { key: 'inProgress', label: `In Progress (${engineerData.jobs.inProgress.length})` },
    { key: 'completed', label: `Completed (${engineerData.jobs.completed.length})` },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* --- Header --- */}
        <View className="px-5 pt-5">
          <Text className="text-3xl font-bold text-gray-800">
            Hello, {engineerData.name}
          </Text>
          <Text className="text-base text-gray-500">
            Here are your tasks for today, 26th September 2025.
          </Text>
        </View>

        {/* --- Today's Summary --- */}
        <View className="px-5 mt-6 flex-row space-x-3">
          <StatCard icon="bell-ring-outline" label="New Jobs" value={engineerData.stats.newJobs} color="#3B82F6" />
          <StatCard icon="cogs" label="In Progress" value={engineerData.stats.inProgress} color="#A855F7" />
          <StatCard icon="check-all" label="Completed Today" value={engineerData.stats.completedToday} color="#22C55E" />
        </View>
        
        {/* --- Job Queue Section --- */}
        <View className="mt-8">
          <Text className="text-xl font-bold text-gray-800 mb-4 px-5">
            My Job Queue
          </Text>

          {/* Tab Buttons */}
          <View className="flex-row justify-around bg-gray-200 p-1 mx-5 rounded-full">
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                className={`flex-1 p-2 rounded-full ${activeTab === tab.key ? 'bg-white shadow' : ''}`}
              >
                <Text className={`text-center font-bold ${activeTab === tab.key ? 'text-blue-500' : 'text-gray-500'}`}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Job List */}
          <View className="px-5 mt-4">
            <FlatList
              data={engineerData.jobs[activeTab]}
              renderItem={({ item }) => <JobCard item={item} />}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ListEmptyComponent={<Text className="text-center text-gray-400 mt-8">No jobs in this category.</Text>}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EngineerDashboardScreen;
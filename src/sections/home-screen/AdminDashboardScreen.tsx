import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Dummy data for a Super Admin's dashboard
const adminData = {
  stats: {
    revenueToday: '₦185,500',
    jobsToday: 23,
    activeEngineers: 8,
    csat: 4.8,
  },
  jobStatusDistribution: [
    { status: 'New', count: 12, color: '#3B82F6' },
    { status: 'In Progress', count: 8, color: '#A855F7' },
    { status: 'Awaiting Parts', count: 5, color: '#F97316' },
    { status: 'Completed', count: 42, color: '#22C55E' },
  ],
  topEngineers: [
    { id: '1', name: 'David A.', jobsCompleted: 42, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a' },
    { id: '2', name: 'Bisi Adebayo', jobsCompleted: 38, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
    { id: '3', name: 'Chinedu Okoro', jobsCompleted: 35, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c' },
  ],
};


// --- Reusable Sub-components ---

// Card for high-level business stats (KPIs)
const AdminStatCard = ({ icon, label, value, subValue, iconBgColor }: { icon: any, label: string, value: string | number, subValue?: null, iconBgColor: string }) => (
  <View className="flex-row items-center bg-white p-4 rounded-2xl flex-1 border border-gray-100">
    <View className={`p-3 rounded-full mr-4`} style={{ backgroundColor: iconBgColor }}>
      <MaterialCommunityIcons name={icon} size={24} color="white" />
    </View>
    <View>
      <Text className="text-xl font-bold text-gray-800">{value}</Text>
      <Text className="text-sm text-gray-500">{label}</Text>
    </View>
  </View>
);

// Bar component for the job status chart
const StatusChartBar = ({ item, total }) => (
  <View className="mb-3">
    <View className="flex-row justify-between items-center mb-1">
        <Text className="text-sm font-medium text-gray-600">{item.status}</Text>
        <Text className="text-sm font-bold text-gray-800">{item.count}</Text>
    </View>
    <View className="h-2 bg-gray-200 rounded-full">
      <View
        style={{ width: `${(item.count / total) * 100}%`, backgroundColor: item.color }}
        className="h-2 rounded-full"
      />
    </View>
  </View>
);

// --- Main Dashboard Screen ---

const SuperAdminDashboard = () => {
  const totalJobs = adminData.jobStatusDistribution.reduce((sum, item) => sum + item.count, 0);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* --- Header --- */}
        <View className="px-5 pt-5">
          <Text className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </Text>
          <Text className="text-base text-gray-500">
            Friday, 26th September 2025
          </Text>
        </View>

        {/* --- Key Metrics (KPIs) --- */}
        <View className="px-5 mt-6 space-y-3">
            <View className="flex-row space-x-3">
                <AdminStatCard icon="cash-multiple" label="Revenue Today" value={adminData.stats.revenueToday} iconBgColor="#10B981" />
                <AdminStatCard icon="briefcase-check" label="Jobs Today" value={adminData.stats.jobsToday} iconBgColor="#3B82F6" />
            </View>
             <View className="flex-row space-x-3">
                <AdminStatCard icon="account-hard-hat" label="Active Engineers" value={adminData.stats.activeEngineers} iconBgColor="#F97316" />
                <AdminStatCard icon="star-circle" label="CSAT Score" value={adminData.stats.csat} iconBgColor="#A855F7" />
            </View>
        </View>
        
        {/* --- Job Status Overview --- */}
        <View className="mt-8 px-5">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Operations Overview
          </Text>
          <View className="bg-white p-5 rounded-2xl border border-gray-100">
            {adminData.jobStatusDistribution.map(item => (
              <StatusChartBar key={item.status} item={item} total={totalJobs} />
            ))}
          </View>
        </View>

        {/* --- Top Performing Engineers --- */}
        <View className="mt-8 px-5">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Top Engineers (This Month)
          </Text>
          <View className="space-y-3">
            {adminData.topEngineers.map((engineer, index) => (
              <View key={engineer.id} className="bg-white p-3 rounded-2xl flex-row items-center border border-gray-100">
                <Text className="text-lg font-bold text-gray-400 mr-3">{index + 1}</Text>
                <Image source={{ uri: engineer.avatar }} className="w-10 h-10 rounded-full mr-3" />
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-800">{engineer.name}</Text>
                </View>
                <View className="flex-row items-center">
                    <MaterialCommunityIcons name="check-decagram" size={16} color="#10B981" />
                    <Text className="text-base font-bold text-gray-800 ml-2">{engineer.jobsCompleted}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* --- Quick Actions --- */}
         <View className="mt-8 px-5">
            <Text className="text-xl font-bold text-gray-800 mb-4">
                Management
            </Text>
            <View className="flex-row flex-wrap justify-between">
                <TouchableOpacity className="bg-white w-[48%] p-4 rounded-2xl items-center justify-center border border-gray-100 mb-3">
                    <Ionicons name="people-sharp" size={24} color="#3B82F6"/>
                    <Text className="mt-2 font-bold text-gray-700">Engineers</Text>
                </TouchableOpacity>
                 <TouchableOpacity className="bg-white w-[48%] p-4 rounded-2xl items-center justify-center border border-gray-100 mb-3">
                    <Ionicons name="list-sharp" size={24} color="#A855F7"/>
                    <Text className="mt-2 font-bold text-gray-700">All Jobs</Text>
                </TouchableOpacity>
                 <TouchableOpacity className="bg-white w-[48%] p-4 rounded-2xl items-center justify-center border border-gray-100">
                    <Ionicons name="cash" size={24} color="#10B981"/>
                    <Text className="mt-2 font-bold text-gray-700">Finances</Text>
                </TouchableOpacity>
                 <TouchableOpacity className="bg-white w-[48%] p-4 rounded-2xl items-center justify-center border border-gray-100">
                    <Ionicons name="archive" size={24} color="#F97316"/>
                    <Text className="mt-2 font-bold text-gray-700">Inventory</Text>
                </TouchableOpacity>
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SuperAdminDashboard;
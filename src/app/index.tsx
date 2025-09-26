import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

// Dummy data for categories and services
const categories = [
  { id: '1', label: 'Phones', icon: 'phone-portrait-outline' },
  { id: '2', label: 'Laptops', icon: 'laptop-outline' },
  { id: '3', label: 'Tablets', icon: 'tablet-portrait-outline' },
  { id: '4', label: 'Watches', icon: 'watch-outline' },
  { id: '5', label: 'Consoles', icon: 'game-controller-outline' },
];

const popularServices = [
  { id: '1', name: 'Screen Replacement', price: '15,000', icon: 'phone-portrait-sharp' },
  { id: '2', name: 'Battery Change', price: '8,000', icon: 'battery-half-sharp' },
  { id: '3', name: 'Water Damage', price: '12,500', icon: 'water' },
  { id: '4', name: 'Software Update', price: '5,000', icon: 'sync-circle' },
];

//  components for better readability with NativeWind

const HomeScreen = () => {

    const {isLoaded, isSignedIn} = useAuth()

  // Helper component for rendering category icons
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity className="items-center mr-6">
      <View className="bg-blue-100 p-4 rounded-full">
        <Ionicons name={item.icon} size={28} color="#007AFF" />
      </View>
      <Text className="mt-2 text-sm font-medium text-gray-700">{item.label}</Text>
    </TouchableOpacity>
  );

  // Helper component for rendering service cards
  const renderServiceItem = ({ item }) => (
    <TouchableOpacity className="bg-white p-4 rounded-2xl flex-row items-center mb-4 border border-gray-100">
      <View className="bg-gray-100 p-3 rounded-xl mr-4">
        <Ionicons name={item.icon} size={24} color="#333" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">{item.name}</Text>
        <Text className="text-sm text-gray-500">Starting from ₦{item.price}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#C0C0C0" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* --- Header --- */}
        <View className="px-5 pt-5 flex-row justify-between items-center">
          <View>
            <Text className="text-xl font-regular text-gray-500">Hello. 👋</Text>
            <Text className="text-2xl font-bold text-gray-800">
              How can we help you?
            </Text>
          </View>
          <TouchableOpacity className="p-2 bg-white rounded-full border border-gray-200">
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* --- Search Bar --- */}
        <View className="px-5 mt-6">
          <View className="flex-row items-center bg-white p-3 rounded-full border border-gray-200">
            <Ionicons name="search-outline" size={20} color="#999" className="mr-2" />
            <TextInput
              placeholder="Search for a device or service..."
              className="flex-1 text-base"
            />
          </View>
        </View>

        {/* --- Categories Section --- */}
        <View className="mt-8">
          <Text className="text-lg font-semibold text-gray-800 mb-4 px-5">
            Categories
          </Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
          />
        </View>

        {/* --- Promotional Banner --- */}
        <View className="px-5 mt-8">
          <View className="bg-blue-500 rounded-2xl p-6 flex-row items-center justify-between overflow-hidden">
            <View>
              <Text className="text-xl font-bold text-white">25% Off</Text>
              <Text className="text-base text-white mt-1">
                For all laptop screen repairs
              </Text>
              <TouchableOpacity className="bg-white px-4 py-2 rounded-full mt-4">
                <Link href={"/sign-up"} className="text-blue-500 font-bold text-center">{!isSignedIn ? "SignUp Now" : "Book Now"}</Link>
              </TouchableOpacity>
            </View>
            <MaterialCommunityIcons name="laptop" size={90} color="rgba(255, 255, 255, 0.3)" />
          </View>
        </View>
        
        {/* --- Popular Services --- */}
        <View className="mt-8 px-5">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Popular Services
          </Text>
          <FlatList
            data={popularServices}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false} // Disable scrolling for the inner list
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
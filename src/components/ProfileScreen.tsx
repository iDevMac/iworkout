import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


// Dummy data for the profile
  const user = {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    name: 'Jane Doe',
    username: '@jane_doe',
    bio: 'Digital artist & coffee enthusiast 🎨☕️\nCreating vibrant worlds one pixel at a time.',
    stats: {
      pending: 3,
      total: 10, // Using string for formatted numbers
      succesful: 7,
    },
  };

  const Stat = ({ label, value }) => (
    <View className="items-center">
      <Text className="text-xl font-bold text-gray-800">{value}</Text>
      <Text className={`text-sm mt-1 font-bold ${label === "Pending" ? "text-amber-600" : label === "Total" ? "text-gray-600" : "text-blue-700"}`}>{label}</Text>
    </View>
  );


export default function ProfilePage() {
  const {signOut} = useAuth()

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "cancel",
        style: "cancel"
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => signOut()
      }
    ])
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="flex-1 justify-center items-center p-5">
          {/* --- Profile Header --- */}
          <View className="flex-1 items-center mb-5">
            <Image
              source={{ uri: user.avatar }}
              className="w-20 h-20 rounded-full"
            />
            <View className="">
              <Text className="text-2xl font-bold text-gray-900 text-center">{user.name}</Text>
              <Text className="text-base text-gray-500 text-center">{user.username}</Text>
            </View>
          </View>

          {/* --- User Bio --- */}
          <View className="mb-5">
            <Text className="text-base text-gray-700 leading-snug text-center">{user.bio}</Text>
          </View>
          
          <View className="px-6 mb-8 w-full">
           <TouchableOpacity
              onPress={handleSignOut}
              className="bg-red-800 p-3 rounded-xl shadow-sm cursor-pointer"
              activeOpacity={0.8}
            >
              <View className="flex-row justify-center items-center gap-1">
                <Ionicons name="log-out-outline" size={20} color={'white'}/>
                <Text className="font-semibold text-white">Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* --- Stats Section --- */}
          <View className="flex-row justify-around py-4 border-t border-b border-gray-200 mb-5 icon-weather-fullmoon w-full">
            <Stat label="Pending" value={user.stats.pending} />
            <Stat label="Total" value={user.stats.total} />
            <Stat label="Successful" value={user.stats.succesful} />
          </View>

          {/* --- Action Buttons --- */}
          <View className="flex-row justify-between space-x-5 mb-5">
            <TouchableOpacity className="flex-1 justify-center items-center bg-blue-500 p-3 rounded-lg">
              <Text className="text-white text-base font-semibold">Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row justify-center items-center bg-gray-200 p-3 rounded-lg">
              <Ionicons name="settings-outline" size={18} color="#333" />
              <Text className="text-gray-800 text-base font-semibold ml-2">Settings</Text>
            </TouchableOpacity>
          </View>

          {/* --- Content Tabs (Placeholder) --- */}
          <View className="flex-row justify-center border-b border-gray-200">
            <TouchableOpacity className="p-4 border-b-2 border-gray-800">
              <Ionicons name="grid" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity className="p-4">
              <Ionicons name="bookmark-outline" size={24} color="#aaa" />
            </TouchableOpacity>
          </View>

          {/* --- Grid Content (Placeholder) --- */}
          <View className="mt-5 items-center">
            <Text className="text-lg text-gray-300">User content goes here...</Text>
             
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

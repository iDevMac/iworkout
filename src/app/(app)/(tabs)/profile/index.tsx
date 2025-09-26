import { useAuth } from '@clerk/clerk-expo';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
// Assuming 'tw' is a utility like NativeWind or twrnc for styling

// Mock User Data
const userData = {
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  phone: '(555) 123-4567',
  address: '123 Tech Lane, Silicon City, CA 90210',
  memberSince: 'Joined Oct 2024',
};

// Mock Navigation Links (e.g., using icons like 'Settings', 'Lock', 'Help')
const profileLinks = [
  { id: '1', title: 'Edit Profile', iconName: 'Pencil', screen: 'EditProfile' },
  { id: '2', title: 'Payment Methods', iconName: 'CreditCard', screen: 'Payments' },
  { id: '3', title: 'Notifications', iconName: 'Bell', screen: 'Notifications' },
  { id: '4', title: 'Security & Privacy', iconName: 'LockClosed', screen: 'Security' },
  { id: '5', title: 'Help & Support', iconName: 'QuestionMarkCircle', screen: 'Help' },
];

// --- Navigation Item Component ---
const ProfileLinkItem = ({ title, iconName, onPress }) => (
  <TouchableOpacity 
    className="flex-row items-center justify-between p-4 bg-white border-b border-gray-100" 
    onPress={onPress}
  >
    <View className="flex-row items-center">
      {/* Placeholder for Icon (e.g., using a library like react-native-vector-icons) */}
      <View className="w-6 h-6 mr-3 items-center justify-center">
         {/* Icon goes here, for example: <Icon name={iconName} size={20} color="#4f46e5" /> */}
         <Text className="text-indigo-600 text-lg">⚙️</Text>
      </View>
      <Text className="text-base text-gray-800 font-medium">{title}</Text>
    </View>
    
    {/* Right Arrow Icon */}
    <Text className="text-gray-400 text-xl">ᐳ</Text>
  </TouchableOpacity>
);


// --- Main Screen Component ---
const ProfileScreen = ({ navigation }) => {
   const {signOut} = useAuth()
  
  // Dummy function for handling navigation
  const handlePress = (screen) => {
    console.log(`Navigating to ${screen}`); 
    // In a real app, you would use: navigation.navigate(screen)
  };
  
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
    <View className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

        {/* --- 1. Profile Header Section --- */}
        <View className="bg-indigo-600 p-6 pb-10 items-center">
          
          {/* Avatar Placeholder */}
          <View className="w-24 h-24 rounded-full bg-indigo-200 border-4 border-white justify-center items-center mb-3">
             {/* Replace with actual Image component */}
             <Text className="text-4xl font-bold text-indigo-700">A</Text> 
          </View>
          
          <Text className="text-2xl font-bold text-white">{userData.name}</Text>
          <Text className="text-sm text-indigo-200">{userData.memberSince}</Text>
          
          <TouchableOpacity 
            className="mt-3 px-4 py-1.5 bg-indigo-700 rounded-full"
            onPress={() => handlePress('EditProfile')}
          >
            <Text className="text-sm font-semibold text-white">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* --- 2. Contact Information Card --- */}
        <View className="mx-4 -mt-6 p-4 bg-white rounded-lg shadow-md mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-2">Contact Details</Text>
          <Text className="text-sm text-gray-600">Email: {userData.email}</Text>
          <Text className="text-sm text-gray-600">Phone: {userData.phone}</Text>
          <Text className="text-sm text-gray-600 mt-1">Address: {userData.address}</Text>
        </View>

        {/* --- 3. Navigation Links Section --- */}
        <View className="bg-white border-t border-b border-gray-200">
          {profileLinks.map((link, index) => (
            <ProfileLinkItem 
              key={link.id}
              title={link.title}
              iconName={link.iconName}
              onPress={() => handlePress(link.screen)}
            />
          ))}
        </View>
        
        {/* --- 4. Logout Button --- */}
        <TouchableOpacity 
          className="mx-4 mt-8 p-3 bg-red-500 rounded-lg items-center"
          onPress={handleSignOut}
        >
          <Text className="text-lg font-bold text-white">Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Switch, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Assuming 'tw' is a utility like NativeWind or twrnc for styling
// And you have an icon library like react-native-vector-icons for 'ChevronRight', 'Camera', 'Photo'

// Mock Data for Dropdowns (could come from an API)
const deviceTypes = ['Smartphone', 'Tablet', 'Laptop', 'Smartwatch', 'Other'];
const issueCategories = ['Screen', 'Battery', 'Charging Port', 'Software', 'Speaker/Mic', 'Camera', 'Other'];

const BookingScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    deviceType: '',
    deviceName: '',
    deviceModel: '',
    issueCategory: '',
    issueDescription: '',
    hasLiquidDamage: false,
    images: [], // Stores URIs of uploaded images
    fullName: '',
    email: '',
    phoneNumber: '',
    preferredDate: '', // Could be date picker value
    preferredTime: '', // Could be time picker value
    pickupAddress: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async () => {
    // In a real app, you would use an image picker library (e.g., expo-image-picker)
    // const result = await ImagePicker.launchImageLibraryAsync({...});
    // if (!result.cancelled) {
    //   setFormData(prev => ({ ...prev, images: [...prev.images, result.uri] }));
    // }
    Alert.alert("Upload Image", "This would open an image picker to select photos of the device/issue.");
    // Mocking an image upload for demonstration
    setFormData(prev => ({ ...prev, images: [...prev.images, 'https://via.placeholder.com/100/FF5733/FFFFFF?text=Img'] }));
  };

  const handleRemoveImage = (uriToRemove) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter(uri => uri !== uriToRemove) }));
  };

  const nextStep = () => {
    // Basic validation before moving to next step
    if (step === 1 && (!formData.deviceType || !formData.deviceName)) {
      Alert.alert("Error", "Please fill in device type and name.");
      return;
    }
    if (step === 2 && (!formData.issueCategory || !formData.issueDescription)) {
        Alert.alert("Error", "Please describe the issue.");
        return;
      }
    if (step === 3 && (!formData.fullName || !formData.email || !formData.phoneNumber)) {
        Alert.alert("Error", "Please fill in your contact details.");
        return;
      }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmitBooking = () => {
    // Here you would send formData to your backend API
    console.log('Submitting Booking:', formData);
    Alert.alert(
      "Booking Confirmed!", 
      "Your repair request has been submitted. We'll contact you shortly.",
      [{ text: "OK", onPress: () => navigation.goBack() }] // Go back after confirmation
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View className="p-4">
            <Text className="text-xl font-bold text-gray-800 mb-4">1. Device Details</Text>
            
            <Text className="text-gray-700 mb-2">Device Type:</Text>
            <View className="flex-row flex-wrap justify-between mb-4">
              {deviceTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  className={`py-2 px-4 rounded-full border mb-2 ${
                    formData.deviceType === type ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
                  }`}
                  onPress={() => handleChange('deviceType', type)}
                >
                  <Text className={`${formData.deviceType === type ? 'text-white' : 'text-gray-700'}`}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-gray-700 mb-2">Device Name (e.g., iPhone, Galaxy, MacBook):</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-lg bg-white mb-4 text-gray-800"
              placeholder="e.g., iPhone 13 Pro"
              value={formData.deviceName}
              onChangeText={(text) => handleChange('deviceName', text)}
            />

            <Text className="text-gray-700 mb-2">Device Model (Optional):</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-lg bg-white mb-4 text-gray-800"
              placeholder="e.g., A2643"
              value={formData.deviceModel}
              onChangeText={(text) => handleChange('deviceModel', text)}
            />
          </View>
        );

      case 2:
        return (
          <View className="p-4">
            <Text className="text-xl font-bold text-gray-800 mb-4">2. Problem Description</Text>
            
            <Text className="text-gray-700 mb-2">Issue Category:</Text>
            <View className="flex-row flex-wrap justify-between mb-4">
              {issueCategories.map((category) => (
                <TouchableOpacity
                  key={category}
                  className={`py-2 px-4 rounded-full border mb-2 ${
                    formData.issueCategory === category ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
                  }`}
                  onPress={() => handleChange('issueCategory', category)}
                >
                  <Text className={`${formData.issueCategory === category ? 'text-white' : 'text-gray-700'}`}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-gray-700 mb-2">Describe the issue in detail:</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-lg bg-white mb-4 h-32 text-gray-800"
              placeholder="e.g., Screen is cracked and unresponsive, battery drains quickly..."
              multiline
              value={formData.issueDescription}
              onChangeText={(text) => handleChange('issueDescription', text)}
            />

            <View className="flex-row justify-between items-center bg-white p-3 rounded-lg shadow-sm mb-4">
              <Text className="text-gray-700 text-base">Has liquid damage?</Text>
              <Switch
                trackColor={{ false: "#E5E7EB", true: "#818CF8" }}
                thumbColor={formData.hasLiquidDamage ? "#4F46E5" : "#F9FAFB"}
                onValueChange={(value) => handleChange('hasLiquidDamage', value)}
                value={formData.hasLiquidDamage}
              />
            </View>

            <Text className="text-gray-700 mb-2">Upload Photos of the device/damage (Optional):</Text>
            <TouchableOpacity 
              className="flex-row items-center justify-center p-3 bg-indigo-100 rounded-lg border border-indigo-200 mb-3"
              onPress={handleImageUpload}
            >
              {/* Icon Placeholder */}
              <Text className="text-indigo-600 text-lg mr-2">📸</Text>
              <Text className="text-indigo-600 font-semibold">Add Photo</Text>
            </TouchableOpacity>

            <View className="flex-row flex-wrap">
              {formData.images.map((uri, index) => (
                <View key={index} className="relative w-24 h-24 m-1">
                  <Image source={{ uri }} className="w-full h-full rounded-lg" />
                  <TouchableOpacity 
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                    onPress={() => handleRemoveImage(uri)}
                  >
                    <Text className="text-white text-xs font-bold">✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        );

      case 3:
        return (
          <View className="p-4">
            <Text className="text-xl font-bold text-gray-800 mb-4">3. Your Contact Details</Text>
            
            <Text className="text-gray-700 mb-2">Full Name:</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-lg bg-white mb-4 text-gray-800"
              placeholder="John Doe"
              value={formData.fullName}
              onChangeText={(text) => handleChange('fullName', text)}
            />

            <Text className="text-gray-700 mb-2">Email Address:</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-lg bg-white mb-4 text-gray-800"
              placeholder="john.doe@example.com"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
            />

            <Text className="text-gray-700 mb-2">Phone Number:</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-lg bg-white mb-4 text-gray-800"
              placeholder="(555) 123-4567"
              keyboardType="phone-pad"
              value={formData.phoneNumber}
              onChangeText={(text) => handleChange('phoneNumber', text)}
            />

            <Text className="text-gray-700 mb-2">Preferred Service Date (Optional):</Text>
            {/* In a real app, this would be a date picker */}
            <TouchableOpacity className="border border-gray-300 p-3 rounded-lg bg-white mb-4">
                <Text className="text-gray-500">{formData.preferredDate || "Select Date"}</Text>
            </TouchableOpacity>

            <Text className="text-gray-700 mb-2">Preferred Service Time (Optional):</Text>
            {/* In a real app, this would be a time picker */}
            <TouchableOpacity className="border border-gray-300 p-3 rounded-lg bg-white mb-4">
                <Text className="text-gray-500">{formData.preferredTime || "Select Time"}</Text>
            </TouchableOpacity>

            <Text className="text-gray-700 mb-2">Pickup/Dropoff Address (Optional):</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-lg bg-white h-24 text-gray-800"
              placeholder="e.g., 123 Main St, Apt 4B, City, State, Zip"
              multiline
              value={formData.pickupAddress}
              onChangeText={(text) => handleChange('pickupAddress', text)}
            />
          </View>
        );
      
      case 4:
        return (
            <View className="p-4">
                <Text className="text-xl font-bold text-gray-800 mb-4">4. Review & Confirm</Text>

                <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                    <Text className="text-lg font-semibold text-gray-800 mb-2">Device Details</Text>
                    <Text className="text-gray-600">Type: {formData.deviceType}</Text>
                    <Text className="text-gray-600">Name: {formData.deviceName}</Text>
                    {formData.deviceModel ? <Text className="text-gray-600">Model: {formData.deviceModel}</Text> : null}
                </View>

                <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                    <Text className="text-lg font-semibold text-gray-800 mb-2">Problem Summary</Text>
                    <Text className="text-gray-600">Category: {formData.issueCategory}</Text>
                    <Text className="text-gray-600 mb-2">Description: {formData.issueDescription}</Text>
                    <Text className="text-gray-600">Liquid Damage: {formData.hasLiquidDamage ? 'Yes' : 'No'}</Text>
                    {formData.images.length > 0 && (
                      <View className="mt-2">
                        <Text className="text-gray-700 font-semibold mb-1">Attached Images:</Text>
                        <View className="flex-row flex-wrap">
                          {formData.images.map((uri, index) => (
                            <Image key={index} source={{ uri }} className="w-16 h-16 rounded-lg m-1 border border-gray-200" />
                          ))}
                        </View>
                      </View>
                    )}
                </View>

                <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                    <Text className="text-lg font-semibold text-gray-800 mb-2">Your Contact Information</Text>
                    <Text className="text-gray-600">Name: {formData.fullName}</Text>
                    <Text className="text-gray-600">Email: {formData.email}</Text>
                    <Text className="text-gray-600">Phone: {formData.phoneNumber}</Text>
                    {formData.preferredDate ? <Text className="text-gray-600">Preferred Date: {formData.preferredDate}</Text> : null}
                    {formData.preferredTime ? <Text className="text-gray-600">Preferred Time: {formData.preferredTime}</Text> : null}
                    {formData.pickupAddress ? <Text className="text-gray-600">Address: {formData.pickupAddress}</Text> : null}
                </View>
            </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="p-4 bg-white border-b border-gray-200 shadow-sm flex-row items-center">
        {step > 1 && (
          <TouchableOpacity onPress={prevStep} className="mr-3 p-2">
            <Text className="text-indigo-600 text-2xl font-bold">{"<"}</Text> 
          </TouchableOpacity>
        )}
        <Text className="text-xl font-extrabold text-gray-900 flex-1">New Repair Booking</Text>
        <Text className="text-base text-gray-600">Step {step}/4</Text>
      </View>

      <ScrollView className="flex-1">
        {renderStepContent()}
      </ScrollView>

      {/* Footer Navigation Buttons */}
      <View className="p-4 bg-white border-t border-gray-200 flex-row justify-between items-center">
        {step > 1 && (
          <TouchableOpacity 
            className="flex-1 mr-2 py-3 px-4 rounded-lg border border-gray-300 items-center" 
            onPress={prevStep}
          >
            <Text className="text-gray-700 font-semibold">Previous</Text>
          </TouchableOpacity>
        )}
        {step < 4 ? (
          <TouchableOpacity 
            className={`flex-1 ml-2 py-3 px-4 rounded-lg items-center ${
                (step === 1 && (!formData.deviceType || !formData.deviceName)) ||
                (step === 2 && (!formData.issueCategory || !formData.issueDescription)) ||
                (step === 3 && (!formData.fullName || !formData.email || !formData.phoneNumber))
                ? 'bg-indigo-300' : 'bg-indigo-600'
            }`} 
            onPress={nextStep}
            disabled={
                (step === 1 && (!formData.deviceType || !formData.deviceName)) ||
                (step === 2 && (!formData.issueCategory || !formData.issueDescription)) ||
                (step === 3 && (!formData.fullName || !formData.email || !formData.phoneNumber))
            }
          >
            <Text className="text-white font-semibold">Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            className="flex-1 py-3 px-4 rounded-lg bg-green-600 items-center" 
            onPress={handleSubmitBooking}
          >
            <Text className="text-white font-semibold">Confirm Booking</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BookingScreen;
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Ionicons} from "@expo/vector-icons";
import GoogleSignIn from '@/components/GoogleSignIn'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = useState<boolean>()
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    if (!emailAddress || !password) {
      Alert.alert("Error: No field should be empty.")
    }

    setIsLoading(true)

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })
      // If sign-in process is complete, set the created session as active
      // and redirect the user
      setIsLoading(false)
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      setIsLoading(false)
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <SafeAreaView className='flex-1'>
      <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       className='flex-1'
      >

        <View className='flex-1 px-5'>
          <View className='flex-1 justify-center'>
            <View className='items-center mb-8'>
              <View className='w-20 h-20 bg-gradient-to-r from-black to-purple-950 rounded-2xl items-center justify-center mb-4 shadow-lg'>
                <Ionicons name='fitness' size={40} color="white"/>
              </View>
              <Text className='text-3xl font-bold text-gray-900 mb-2'>
                iWorkout
              </Text>
              <Text className='text-lg text-gray-500 text-center'>
                Track your workout journey, {"\n"} reach your fitness goals...
              </Text>
            </View>


            <View className='bg-white rounded-2xl border p-6 shadow-sm mb-6'>
              <Text className='text-2xl font-bold text-gray-900 mb-6 text-center'>Welcome Back</Text>
              <View className='mb-4'>
                <Text className='mb-2 text-md text-gray-900 font-medium'>Email</Text>
                <View className='flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-600'>
                    <Ionicons name='mail-outline' size={20} color={"#687280"}/>
                    <TextInput
                      autoCapitalize='none'
                      value={emailAddress}
                      placeholder='Enter email'
                      placeholderTextColor={""}
                      onChangeText={setEmailAddress}
                      className='flex-1 ml-3 text-gray-800'
                      editable={!isLoading}
                    />
                </View>
              </View>   

              {/* //password field      */}
              <View className='mb-4'>
                <Text className='mb-2 text-md text-gray-900 font-medium'>Password</Text>
                <View className='flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-600'>
                    <Ionicons name='lock-closed-outline' size={20} color={"#687280"}/>
                    <TextInput
                      autoCapitalize='none'
                      value={password}
                      secureTextEntry={isPasswordVisible}
                      placeholder='Enter password'
                      placeholderTextColor={""}
                      onChangeText={setPassword}
                      className='flex-1 ml-3 text-gray-800'
                      editable={!isLoading}
                    />
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                      {
                        isPasswordVisible
                        ?
                        <Ionicons name='eye' size={20} color={"#687280"}/>
                        :
                        <Ionicons name='eye-off' size={20} color={"#687280"}/>
                      }
                    </TouchableOpacity>
                  </View>
                </View>  
            </View>


              <TouchableOpacity 
                onPress={onSignInPress}
                className={`w-full py-5 rounded-xl shadow-sm mb-4 ${isLoading ? 'bg-gray-400' : 'bg-indigo-700'}`}
                activeOpacity={0.8}
              >
                <View className='flex-row items-center justify-center'>
                    {
                      isLoading
                      ?(<Ionicons name='refresh' size={20} color={'white'}/>)
                      :(<Ionicons name='log-in-outline' size={20} color={'white'}/>)
                    }
                    <Text className='text-gray-100 text-semibold text-center'>
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Text>
                </View>
              </TouchableOpacity>

              <View className='flex-row justify-center items-center my-4'>
                <View className='flex-1 h-px bg-gray-500'></View>
                <Text className='px-4 text-sm text-gray-500'>Or</Text>
                <View className='flex-1 h-px bg-gray-500'></View>
              </View>
            {/* Google Sign in  */}
            <GoogleSignIn/>

            <View className='flex-row justify-center gap-2 mt-4'>
              <Text>Don't have an account?</Text>
              <Link href="/sign-up">
                <Text className='text-indigo-700'>Sign up</Text>
              </Link>
            </View>
          </View>

          <View className='my-3'>
              <Text className='text-sm text-gray-800 text-center'>Start Your Fitness Journey Today</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
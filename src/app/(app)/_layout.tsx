import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'


const AppLayout = () => {

  const {isLoaded, isSignedIn, userId, sessionId, getToken} = useAuth()

 if (!isLoaded) {
  return(
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator size={"large"} color={"black"}/>
    </View>
  )
 }
  
  return (
    <Stack>
        <Stack.Protected guard={isSignedIn}>
          <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
        </Stack.Protected>

        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name='sign-in' options={{headerShown: false}}/>
          <Stack.Screen name='sign-up' options={{headerShown: false}}/>
        </Stack.Protected>
    </Stack>
  )
}

export default AppLayout
import * as React from 'react'
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [isLoading, setIsLoading] = React.useState<boolean>()
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false)

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    if (!emailAddress || !password) {
      Alert.alert("Error: No field should be empty.")
    }
    
      setIsLoading(true)
    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setIsLoading(false)
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      
      console.error(JSON.stringify(err, null, 2))
    }finally{
      setIsLoading(false)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    if (!code) {
      Alert.alert("Kindly enter the sent verification code")
    }

    setIsLoading(true)
    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      setIsLoading(false)
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setIsLoading(false)
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      // <SafeAreaView className='flex-1 bg-gray-50'>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className='flex-1'
        >

            <View className='flex-1 justify-center items-center px-6'>
              {/* Logo and Branding  */}
              <View className='items-center mb-8'>
                <View className='w-20 h-20 bg-gradient-to-r from-black to-purple-950 rounded-2xl items-center justify-center mb-4 shadow-lg'>
                  <Ionicons name='fitness' size={40} color="white"/>
                </View>
                <Text className='text-3xl font-bold text-gray-900 mb-2'>
                  Check Your Email
                </Text>
                <Text className='text-lg text-gray-500 text-center'>
                  We have sent a verification email to {"\n"} <Text className='font-semibold'>{emailAddress}</Text>
                </Text>
              </View>

              <View className='bg-white rounded-2xl border p-6 shadow-sm mb-6 w-full'>
                <Text className='text-2xl font-bold text-gray-900 mb-6 text-center'>Verify Your Email</Text>
                <View className='mb-4'>
                  <Text className='mb-2 text-md text-gray-900 font-medium'>Verification Code</Text>
                  <View className='flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-600'>
                      <Ionicons name='key-outline' size={20} color={"#687280"}/>
                      <TextInput
                        autoCapitalize='none'
                        value={code}
                        placeholder='Enter verification code'
                        placeholderTextColor={""}
                        onChangeText={setCode}
                        className='flex-1 ml-3 text-gray-800'
                        editable={!isLoading}
                      />
                  </View>
                </View>  

                <TouchableOpacity 
                  onPress={onVerifyPress}
                  className={`w-full py-5 rounded-xl shadow-sm mb-4 ${isLoading ? 'bg-gray-400' : 'bg-indigo-700'}`}
                  activeOpacity={0.8}
                >
                  <View className='flex-row items-center justify-center gap-2'>
                      {
                        isLoading
                        ?(<Ionicons name='refresh' size={20} color={'white'} className='animate-spin'/>)
                        :(<Ionicons name='checkmark-circle' size={20} color={'white'}/>)
                      }
                      <Text className='text-gray-100 text-semibold text-center'>
                        {isLoading ? "Verifying..." : "Verify Email"}
                      </Text>
                  </View>
                </TouchableOpacity> 

                <View className='flex-row justify-center gap-2 mt-4'>
                  <Text>Didn't receive any code?</Text>
                  <Link href="/sign-up">
                    <Text className='text-indigo-700'>Resend Code</Text>
                  </Link>
                </View>
              </View>
            </View>  

            <View className='mb-7'>
              <Text className='text-sm text-gray-800 text-center'>Ready to maximize your workout Journey...</Text>
            </View>
        </KeyboardAvoidingView>
      // </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-200'>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className='flex-1'
      >
        <View className='flex-1 px-4 bg-gray-100'>
          <View className='flex-1 justify-center'>            

            {/* Logo and Branding  */}
            <View className='items-center mb-8'>
              <View className='w-20 h-20 bg-gradient-to-r from-black to-purple-950 rounded-2xl items-center justify-center mb-4 shadow-lg'>
                <Ionicons name='fitness' size={40} color="white"/>
              </View>
              <Text className='text-3xl font-bold text-gray-900 mb-2'>
                Join iWorkout
              </Text>
              <Text className='text-lg text-gray-500 text-center'>
                Track your workout journey, {"\n"} reach your fitness goals...
              </Text>
            </View>

            {/* Sign Up Form  */}
            <View className='bg-white rounded-2xl border p-6 shadow-sm mb-6'>
              <Text className='text-2xl font-bold text-gray-900 mb-6 text-center'>Create Account</Text>
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
              onPress={onSignUpPress}
              className={`w-full py-5 rounded-xl shadow-sm mb-4 ${isLoading ? 'bg-gray-400' : 'bg-indigo-700'}`}
              activeOpacity={0.8}
            >
              <View className='flex-row items-center justify-center gap-2'>
                  {
                    isLoading
                    ?(<Ionicons name='refresh' size={20} color={'white'}/>)
                    :(<Ionicons name='person-add-outline' size={20} color={'white'}/>)
                  }
                  <Text className='text-gray-100 text-semibold text-center'>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Text>
              </View>
            </TouchableOpacity>

            <View className='flex-row justify-center gap-2 mt-4'>
              <Text>Already have an account?</Text>
              <Link href="/sign-in">
                <Text className='text-indigo-700'>Sign In</Text>
              </Link>
            </View>
          </View>

          <View className='my-3'>
              <Text className='text-sm text-gray-800 text-center'>Ready to maximize your workout Journey...</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
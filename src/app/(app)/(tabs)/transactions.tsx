import { View, Text } from 'react-native'
import React from 'react'
import ClientTransactionsScreen from '@/sections/transaction-screen/ClientTransactionScreen'
import EngineerTransactionScreen from '@/sections/transaction-screen/EngineerTransactionScreen'
import { SafeAreaView } from 'react-native-safe-area-context'

const TransactionScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      {/* <ClientTransactionsScreen/> */}
      <EngineerTransactionScreen/>
    </SafeAreaView>
  )
}

export default TransactionScreen
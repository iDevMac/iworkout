import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'

const TabsLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen
         name='index'
         options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({size, color}) => <AntDesign name='home' size={size} color={color}/>
         }}
        />
        <Tabs.Screen
         name='transactions'
         options={{
            title: "Transactions",
            headerShown: false,
            tabBarIcon: ({size, color}) => <AntDesign name='book' size={size} color={color}/>
         }}
        />
        <Tabs.Screen
         name='new-fix'
         options={{
            title: "NewFix",
            headerShown: false,
            tabBarIcon: ({size, color}) => <AntDesign name='pluscircle' size={size} color={color}/>
         }}
        />
        <Tabs.Screen
         name='active-workout'
         options={{
            title: "Active Workout",
            headerShown: false,
            href: null,
            tabBarStyle: {display: 'none'}
            // tabBarIcon: ({size, color}) => <AntDesign name='home' size={size} color={color}/>
         }}
        />
        <Tabs.Screen
         name='history'
         options={{
            title: "History",
            headerShown: false,
            tabBarIcon: ({size, color}) => <AntDesign name='clockcircleo' size={size} color={color}/>
         }}
        />
        <Tabs.Screen
         name='profile'
         options={{
            title: "Profile",
            headerShown: false,
            // tabBarIcon: ({size, color}) => (
            //     <Image
            //         src={"/user.png"}
            //         style={{width: 28, height: 28, borderRadius: 100}}
            //         alt='profile'
            //         className='rounded-full'
            //     />
            // )
            tabBarIcon: ({size, color}) => <AntDesign name='user' size={size} color={color}/>
         }}
        />
    </Tabs>
  )
}

export default TabsLayout
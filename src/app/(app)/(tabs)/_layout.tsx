import { View, Text, Image } from 'react-native'
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
         name='excercises'
         options={{
            title: "Excercises",
            headerShown: false,
            tabBarIcon: ({size, color}) => <AntDesign name='book' size={size} color={color}/>
         }}
        />
        <Tabs.Screen
         name='workout'
         options={{
            title: "Workout",
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
            //         source={""}
            //         style={{width: 28, height: 28, borderRadius: 100}}
            //         alt='profile'
            //         className='rounded-full'
            //     />
            // )
         }}
        />
    </Tabs>
  )
}

export default TabsLayout
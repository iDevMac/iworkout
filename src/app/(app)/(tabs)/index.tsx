import SuperAdminDashboard from "@/sections/home-screen/AdminDashboardScreen";
import ClientDashboardScreen from "@/sections/home-screen/ClientDashboardScreen";
import EngineerDashboardScreen from "@/sections/home-screen/EngineerDashboardScreen";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaView className="flex flex-1 text-2xl">
      {/* <SuperAdminDashboard/> */}
      {/* <ClientDashboardScreen/> */}
      <EngineerDashboardScreen/>
    </SafeAreaView>
  );
}



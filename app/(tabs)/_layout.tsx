import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Redirect, Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,

        tabBarActiveTintColor: "#FF5A1F",
        tabBarInactiveTintColor: "#9B9B9B",

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: 6,
        },

        tabBarStyle: {
          position: "absolute",

           height: 75,
           paddingTop: 10,
           paddingBottom: 10,

          backgroundColor: "#FFF",

          borderTopWidth: 0,

          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          

          elevation: 15,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Entypo
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => (
            <Entypo
              name="heart-outlined"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Sacola",
          tabBarStyle: {
            display: 'none',
          },
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="shopping-bag"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="user"
              size={size - 2}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
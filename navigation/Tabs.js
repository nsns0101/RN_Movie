import React from "react";
import { View, Text, useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../colors";
import { Ionicons } from "@expo/vector-icons";
import Stack from "./Stack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme();
    return (
        <Tab.Navigator screenOptions={{
            headerTitleAlign: "center",
            tabBarStyle: {backgroundColor: isDark ? "black" : "white"},
            tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
            tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
            headerStyle: {
                backgroundColor: isDark ? BLACK_COLOR : "white",
              },
              headerTitleStyle: {
                color: isDark ? "white" : BLACK_COLOR,
              },
              tabBarLabelStyle : {
                  marginTop: -5,
                  fontSize: 14,
                  fontWeight: "400"
              }
        }}>
            <Tab.Screen name="Movies" component={Movies} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return (<Ionicons name={focused ? "film" : "film-outline"} size={size} color={color} />);
                }
            }}/>
            <Tab.Screen name="TV" component={Tv} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return (<Ionicons name={focused ? "tv" : "tv-outline"} size={size} color={color} />);
                }
            }}/>
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return (<Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />);
                }
            }}/>
        </Tab.Navigator>
    )
};

export default Tabs;
import React from "react";
import { View, Text, useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../colors";

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
        }}>
            <Tab.Screen name="Movies" component={Movies} options={{title:"Movies"}}/>
            <Tab.Screen name="Tv" component={Tv} options={{title:"Tv"}}/>
            <Tab.Screen name="Search" component={Search} options={{title:"Search"}}/>
        </Tab.Navigator>
    )
};

export default Tabs;
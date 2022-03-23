import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => (
<Tab.Navigator screenOptions={{
    headerTitleAlign: "center", 
    tabBarStyle: { backgroundColor: "tomato"},
    tabBarActiveTintColor: "red",
    tabBarInactiveTintColor: "purple",
    headerTitleStyle: { color: "tomato" },
    headerRight: () => {
        return (
        <View>
            <Text>Hello</Text>
        </View>
        )}
}}>
    <Tab.Screen name="Movies" component={Movies} options={{title:"Movies"}}/>
    <Tab.Screen name="Tv" component={Tv} options={{title:"Tv"}}/>
    <Tab.Screen name="Search" component={Search} options={{title:"Search"}}/>
</Tab.Navigator>
);

export default Tabs;
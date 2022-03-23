import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => (
<Tab.Navigator>
    <Tab.Screen name="Movies" component={Movies} options={{headerTitleAlign: "center", title:"Movies"}}/>
    <Tab.Screen name="Tv" component={Tv} options={{headerTitleAlign: "center", title:"Tv"}}/>
    <Tab.Screen name="Search" component={Search} options={{headerTitleAlign: "center", title:"Search"}}/>
</Tab.Navigator>
);

export default Tabs;
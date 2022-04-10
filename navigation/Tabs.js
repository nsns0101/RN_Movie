import React from "react";
import { View, Text, useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../colors";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme();
    return (
        //tab navigator는 sceneContainerStyle과 관련된 prop를 가지고 있음
        //sceneContainerStyle = 각 화면에 대한 스타일
        <Tab.Navigator 
            sceneContainerStyle={{
                backgroundcolor: isDark ? BLACK_COLOR : "white"
            }}
            screenOptions={{
                //unmountOnBlur : //해당 컴포넌트(화면)를 떠나면 메모리에서 컴포넌트를 삭제
                //ReactQuery를 사용해서 fetch하면 캐싱메모리에 저장하기 때문에 다시 fetch를 하지 않음
                //즉 다시 데이터를 로드 하지 않아도 되지만 처음부터 보여주지 않음(슬라이드 등)
                //그래서 unmountOnBlur를 사용
                unmountOnBlur: true,  
                headerTitleAlign: "center",
                tabBarStyle: {backgroundColor: isDark ? BLACK_COLOR : "white"},
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
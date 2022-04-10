import React, {useState} from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Text, Image, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
// import Tabs from "./navigation/Tabs.js";
// import Stack from "./navigation/Stack.js";
import { ThemeProvider } from "styled-components/native";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Root from "./navigation/Root.js";
import { darkTheme, lightTheme } from "./styled";

//QueryClient Setup 1
const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map(font => Font.loadAsync(font));

const loadAssets = (images) => images.map(image =>{
  if(typeof image === "string"){    //형태 ex) "https://~~"
    return Image.prefetch(image);
  }
  else{                             //형태 ex) require("~~~");
    return Asset.loadAsync(image);
  }
})

export default function App(){
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async() => {
    // await new Promise( (resolve) => setTimeout(resolve, 10000) ); //10초 로딩

    // await Font.loadAsync(Ionicons.font);  //Ionicons에 접근 가능 코드(loadFonts함수로 대체)
    const fonts = loadFonts([Ionicons.font]);

    // await Asset.loadAsync(require("./dog.jpg"));  //로컬 파일 불러오기(loadAssets함수로 대체)
    // await Image.prefetch("https://reactnative.dev/img/oss_logo.png");//인터넷 파일 불러오기 문자열이라 prefetch (loadAssets함수로 대체)
    const images = loadAssets([
      require("./dog.jpg"), 
      "https://reactnative.dev/img/oss_logo.png"
      ]);
    
    //모든 것에 대한 await 해주기
    await Promise.all([...fonts, ...images]);
  };

  //현재 기기가 dark 모드인지 light모드인지 확인하여 boolen value return
  const isDark = useColorScheme() === "dark";

  if(!ready){
    return <AppLoading
      startAsync={startLoading}
      onFinish={onFinish}
      onError={console.error}
      />;
  }

  return (
    //QueryClient Setup 2
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
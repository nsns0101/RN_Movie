import React, {useState} from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";

export default function App(){
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async() => {
    // await new Promise( (resolve) => setTimeout(resolve, 10000) );

    await Font.loadAsync(Ionicons.font);  //Ionicons에 접근 가능 코드
    await Asset.loadAsync(require("./dog.jpg"));  //로컬 파일 불러오기

    await Image.prefetch("https://reactnative.dev/img/oss_logo.png");
  };

  if(!ready){
    return <AppLoading
      startAsync={startLoading}
      onFinish={onFinish}
      onError={console.error}
      />;
  }

  return <Text>We are done loading!</Text>;
}
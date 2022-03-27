import React from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// swiper참고문서 
//https://github.com/reactrondev/react-native-web-swiper
import Swiper from 'react-native-web-swiper';
// Dimensions - 현재 화면의 크기를 알 수 있음
import { Dimensions } from "react-native";

const API_KEY = "b5ff37f3b8cb4ef5dc5c2bbda9d2c6e8";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`
const View = styled.View`
  flex: 1;
`
// 현재 화면의 높이 GET
// == const SCREEN_HEIGHT = Dimensions.get("window").height;
const {height : SCREEN_HEIGHT} = Dimensions.get("window");


//??
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {  
  const getNowPlaying = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    )
  }
  return (
    <Container>
      {/*  */}
      <Swiper  loop timeout={3.5} containerStyle={{ wdith: "100%", height: SCREEN_HEIGHT / 4}}>
        <View style={{ backgroundColor: "red" }}></View>
        <View style={{ backgroundColor: "blue" }}></View>
        <View style={{ backgroundColor: "red" }}></View>
        <View style={{ backgroundColor: "blue" }}></View>
      </Swiper>
    </Container>
  )
};
export default Movies;
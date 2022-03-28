import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// swiper참고문서 
//https://github.com/reactrondev/react-native-web-swiper
import Swiper from 'react-native-swiper';
// Dimensions - 현재 화면의 크기를 알 수 있음
import { ActivityIndicator, Dimensions, Text, StyleSheet, ImageBackground } from "react-native";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";

const API_KEY = "b5ff37f3b8cb4ef5dc5c2bbda9d2c6e8";

const Container = styled.ScrollView`

`;
const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image`
  flex: 1;
`;

const Title = styled.Text``;

// 현재 화면의 높이 GET
// == const SCREEN_HEIGHT = Dimensions.get("window").height;
const {height : SCREEN_HEIGHT} = Dimensions.get("window");


//??
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {  
  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<any[]>([]);

  const getNowPlaying = async () => {
    //실제로 필요한 데이터는 ~~.json().results
    const { results } = await (await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    )).json();
    // console.log(results);
    setLoading(false);    // 필요한 데이터를 받았으면 로딩이 끝
    setNowPlayingMovies(results);
  }

  useEffect(()=> {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator color="black" size="small" />
    </Loader>
  ) : (
    <Container>
      {/*  */}
      <Swiper  
        loop 
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4}}
      >
      {
        nowPlayingMovies.map( (movie) => {
          return (
            <View key={movie.id}>
              <BgImg 
                // style={StyleSheet.absoluteFill}
                source={{ uri: makeImgPath(movie.backdrop_path) }}
                resizeMode="cover"
              />
              {/* 이미지에 블러를 주려면 이미지가 BlurView 바깥에 있어야 함 */}
              <BlurView intensity={80} style={StyleSheet.absoluteFill}>
                <Title>{movie.original_title}</Title>
              </BlurView>
            </View>
          )  
      })
      }
      </Swiper>
    </Container>
  );
};
export default Movies;
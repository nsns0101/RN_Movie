import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// swiper참고문서 
//https://github.com/reactrondev/react-native-web-swiper
import Swiper from 'react-native-swiper';
// Dimensions - 현재 화면의 크기를 알 수 있음
import { ActivityIndicator, Dimensions, Text, StyleSheet, ImageBackground, useColorScheme } from "react-native";
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

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`

const Title = styled.Text<{ isDark: boolean}>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 10px;
`;
const Overview = styled.Text<{ isDark: boolean}>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;
//OverView의 모든 css를 가져올 수 있음
const Votes = styled(Overview)`
  font-size: 12px;
`;

// 현재 화면의 높이 GET
// == const SCREEN_HEIGHT = Dimensions.get("window").height;
const {height : SCREEN_HEIGHT} = Dimensions.get("window");


//??
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {  
  const isDark = useColorScheme() === "dark";
  // console.log(useColorScheme());
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
        horizontal  
        loop 
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4}}
      >
      {
        nowPlayingMovies.map( (movie) => {
          // console.log(movie.poster_path);
          return (
            <View key={movie.id}>
              <BgImg 
                // style={StyleSheet.absoluteFill}
                source={{ uri: makeImgPath(movie.backdrop_path) }}
                resizeMode="cover"
              />
              {/* 이미지에 블러를 주려면 이미지가 BlurView 바깥에 있어야 함 */}
              <BlurView
                tint={isDark ? "dark" : "light"}
                intensity={60} style={StyleSheet.absoluteFill}
              >
                <Wrapper>
                  <Poster source={{uri:makeImgPath(movie.poster_path) }}/>
                  <Column>
                    <Title isDark={isDark}>{movie.original_title}</Title>
                    <Overview isDark={isDark}>{movie.overview.slice(0, 90)}...</Overview>
                    {movie.vote_average > 0 ? (
                      <Votes isDark={isDark}>⭐️{movie.vote_average}</Votes>
                    ) : null}
                  </Column>
                </Wrapper>
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
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// swiper참고문서 
//https://github.com/reactrondev/react-native-web-swiper
import Swiper from 'react-native-swiper';
// Dimensions - 현재 화면의 크기를 알 수 있음
import { ActivityIndicator, Dimensions } from "react-native";
import Slide from "../components/Slide";

const API_KEY = "b5ff37f3b8cb4ef5dc5c2bbda9d2c6e8";

const Container = styled.ScrollView`

`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;



// 현재 화면의 높이 GET
// == const SCREEN_HEIGHT = Dimensions.get("window").height;
const {height : SCREEN_HEIGHT} = Dimensions.get("window");


//??
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {  
  // console.log(useColorScheme());
  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<any[]>([]);  // 상영중인 영화
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);
  
  //현재 상영중인 영화 get
  const getNowPlaying = async () => {
    //실제로 필요한 데이터는 ~~.json().results
    const { results } = await (await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    )).json();
    // console.log(results);
    setLoading(false);    // 필요한 데이터를 받았으면 로딩이 끝
    setNowPlayingMovies(results);
  }
  
  //곧 상영 예정인 영화 get
  const getUpcoming = async () => {
    const { results } = await (await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    )).json();
    setUpcoming(results);
  }

  //
  const getTrending = async () => {
    const { results } = await (await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1`
    )).json();
  }

  const getData = async () => {
    //데이터 받기가 끝나면
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    //로딩 끝
    setLoading(false);
  }

  useEffect(()=> {
    getData();
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
      {nowPlayingMovies.map((movie) => (
        <Slide 
          key={movie.id}
          backdropPath={movie.backdrop_path}
          posterPath={movie.poster_path}
          originalTitle={movie.original_title}
          voteAverage={movie.vote_average}
          overview={movie.overview}
        />
      ))}
      </Swiper>
    </Container>
  );
};
export default Movies;
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// swiper참고문서 
//https://github.com/reactrondev/react-native-web-swiper
import Swiper from 'react-native-swiper';
// Dimensions - 현재 화면의 크기를 알 수 있음
import { ActivityIndicator, Dimensions, useColorScheme } from "react-native";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const API_KEY = "b5ff37f3b8cb4ef5dc5c2bbda9d2c6e8";

const Container = styled.ScrollView`

`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text<{ isDark: boolean}>`
color: ${(props) =>
  props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`
const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 10px;
  align-items: center;
`
const Title = styled.Text<{ isDark: boolean}>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  font-weight: 600;
  font-size: 13px;
  margin-top: 7px;
`;
const Votes = styled.Text<{ isDark: boolean}>`
  font-size: 11px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;


// 현재 화면의 높이 GET
// == const SCREEN_HEIGHT = Dimensions.get("window").height;
const {height : SCREEN_HEIGHT} = Dimensions.get("window");


//??
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {  
  const isDark = useColorScheme() === "dark";
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
    setTrending(results);
  }

  const getData = async () => {
    //데이터 받기가 끝나면
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    //로딩 끝
    console.log(trending);
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
        containerStyle={{ marginBottom: 20, width: "100%", height: SCREEN_HEIGHT / 4}}
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
      <ListTitle isDark={isDark}>Trending Movies</ListTitle>
      <TrendingScroll
        contentContainerStyle={{ paddingLeft: 30 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {trending.map(movie => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path}/>
            {/* 제목은 13글자만 넘으면 ... */}
            <Title isDark={isDark}>
              {movie.original_title.slice(0,13)}
              {movie.original_title.length > 13 ? "..." : null}
            </Title>
            <Votes isDark={isDark}>⭐️{movie.vote_average}/10</Votes>
          </Movie>
        ))}
      </TrendingScroll>
    </Container>
  );
};
export default Movies;
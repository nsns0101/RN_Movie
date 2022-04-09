import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// swiper참고문서 
//https://github.com/reactrondev/react-native-web-swiper
import Swiper from 'react-native-swiper';
// Dimensions - 현재 화면의 크기를 알 수 있음
import { ActivityIndicator, Dimensions, useColorScheme, RefreshControl } from "react-native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";


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
  margin-top: 10px;
`;



const ListContainer = styled.View`
  margin-bottom: 15px;
`;

//ListTitle css를 복사
const CommingSoonTitle = styled(ListTitle)<{ isDark : boolean}>`
  margin-bottom: 10px;
`

// 현재 화면의 높이 GET
// == const SCREEN_HEIGHT = Dimensions.get("window").height;
const {height : SCREEN_HEIGHT} = Dimensions.get("window");


//??
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {  
  const isDark = useColorScheme() === "dark";
  // console.log(useColorScheme());
  const [refreshing, setRefreshing] = useState(false);  // 새로고침
  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<any[]>([]);  // 상영중인 영화
  const [upcoming, setUpcoming] = useState<any[]>([]);  // Comming Soon
  const [trending, setTrending] = useState<any[]>([]);  // Trending
  
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
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);    //로딩 끝
    setLoading(false);
    // console.log("getData");
  }

  useEffect(()=> {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);  // 새로고침 기호 보이게
    await getData();
    setRefreshing(false); // 새로고침 기호 안보이게
  }

  return loading ? (
    <Loader>
      <ActivityIndicator color="black" size="small" />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>
      }
    >
      {/*  */}
      <Swiper
        horizontal  
        loop 
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ marginBottom: 10, width: "100%", height: SCREEN_HEIGHT / 4}}
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
      <ListContainer>
        <ListTitle isDark={isDark}>Trending Movies</ListTitle>
        {/* horizontal = {true} 영화 포스터들이 가로로  */}
        <TrendingScroll
          contentContainerStyle={{ paddingLeft: 30 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {trending.map(movie => (
            <VMedia
              key={movie.id}
              posterPath={movie.poster_path}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average}
            />
          ))}
        </TrendingScroll>
      </ListContainer>
      <CommingSoonTitle isDark={isDark}>Coming Soon</CommingSoonTitle>
        {upcoming.map(movie => (
          <HMedia
            key={movie.id}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            overview={movie.overview}
            releaseDate={movie.release_date}
        />
        ))}
    </Container>
  );
};
export default Movies;
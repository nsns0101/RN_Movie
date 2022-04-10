import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, FlatList, 
  ActivityIndicator, Dimensions, useColorScheme, RefreshControl } from "react-native";

  // swiper참고문서 
//https://github.com/reactrondev/react-native-web-swiper
import Swiper from 'react-native-swiper';
// Dimensions - 현재 화면의 크기를 알 수 있음
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
const TrendingScroll = styled.FlatList`
  margin-top: 10px;
`;



const ListContainer = styled.View`
  margin-bottom: 15px;
`;

//ListTitle css를 복사
const ComingSoonTitle = styled(ListTitle)<{ isDark : boolean}>`
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

  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );

  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );

  const VSeparator = styled.View`
    width: 20px;
  `;
  const HSeparator = styled.View`
    height: 20px;
  `;

  const MovieKeyExtractor = (item) => item.id + "";

  return loading ? (
    <Loader>
      <ActivityIndicator color="black" size="small" />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}     // 새로고침 데이터 및 refreshing값 변경
      refreshing={refreshing}   // 새로고침 true? false?
      // 모든 항목의 맨 위에 렌더링됨(FlatList는 원래 자식 컴포넌트를 가질 수 없는데 이걸 쓰면 가능)
      ListHeaderComponent={     
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
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
            <TrendingScroll
              data={trending}
              horizontal
              keyExtractor={MovieKeyExtractor}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              ItemSeparatorComponent={VSeparator}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ComingSoonTitle isDark={isDark}>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcoming}
      keyExtractor={MovieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}

    />
  );
};
export default Movies;
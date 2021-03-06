import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  FlatList,
  ActivityIndicator,
  Dimensions,
  useColorScheme,
} from "react-native";
// swiper참고문서
//https://github.com/reactrondev/react-native-web-swiper
import Swiper from "react-native-swiper";
import { useQuery, useQueryClient } from "react-query";
import { MovieResponse, moviesApi } from "../api";
// 2.13강의 오류대처 timer Warining
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
// Dimensions - 현재 화면의 크기를 알 수 있음
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import Loader from "../components/Loader";
import HList from "../components/HList";

const ListTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const ListContainer = styled.View`
  margin-bottom: 15px;
`;

//ListTitle css를 복사
const ComingSoonTitle = styled(ListTitle)<{ isDark: boolean }>`
  margin-bottom: 10px;
`;

// 현재 화면의 높이 GET
// == const SCREEN_HEIGHT = Dimensions.get("window").height;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

//??
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient(); //query, caching memory 접근가능

  const isDark = useColorScheme() === "dark";

  const [refreshing, setRefreshing] = useState(false);
  /* ReactQuery를 사용해서 fetch하면 캐싱메모리에 저장하기 때문에 다시 fetch를 하지 않음
     즉 다시 데이터를 로드 하지 않아도 됨
     API사용료를 내고 있다면 이득
  */
  const {
    isLoading: nowPlayingLoading, //로딩 상태
    data: nowPlayingData, //데이터
    // refetch: refetchNowPlaying,  //데이터 새로 부르기
  } = useQuery<MovieResponse>(
    ["movies", "nowPlaying"], //캐시에 이 key로 저장됨(query key)
    moviesApi.nowPlaying
  );

  const { isLoading: upcomingLoading, data: upcomingData } =
    useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const VSeparator = styled.View`
    width: 20px;
  `;
  const HSeparator = styled.View`
    height: 20px;
  `;

  // const MovieKeyExtractor = ;
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onRefresh={onRefresh} // 새로고침 데이터 및 refreshing값 변경
      refreshing={refreshing} // 새로고침 true? false?
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
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}
          <ComingSoonTitle isDark={isDark}>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeparator}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path || ""}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  ) : null;
};
export default Movies;

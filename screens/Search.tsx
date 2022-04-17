import React, { useState } from "react";
import { Alert, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? "white" : "black")};
  color: ${(props) => (props.isDark ? "black" : "white")};
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 5px auto;
`;

const Search = () => {
  const isDark = useColorScheme() == "dark";
  const [query, setQuery] = useState("");
  //Movie
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled: false, //useQuery를 사용 하지 않는 상태로
  });

  //Tv
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, {
    enabled: false,
  });

  //Search했을 경우
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    //refetch (refetch를 하면enabled를 true로 만들어줌)
    searchMovies();
    searchTv();
  };

  const onChangeText = (text: string) => {
    setQuery(text);
  };

  return (
    <Container>
      <SearchBar
        isDark={isDark}
        placeholder={"Search for Movie or Tv Show"}
        placeholderTextColor={isDark ? "gary" : "rgba(255,255,255,0.5)"}
        //휴대폰에서 엔터키의 이름을 설정
        returnKeyType="search"
        onChangeText={onChangeText}
        //텍스트 입력의 제출 버튼을 눌렀을때 호출되는 콜백(== onSubmit?)
        onSubmitEditing={onSubmit}
      />
      {/* 로딩 안되어 있으면 로딩기호 보여주기 */}
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HList title="Movie Results" data={moviesData.results} />
      ) : null}
      {tvData ? <HList title="TV Results" data={tvData.results} /> : null}
    </Container>
  );
};

export default Search;

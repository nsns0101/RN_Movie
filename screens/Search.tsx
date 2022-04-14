import React, { useState } from "react";
import { View, Text, useColorScheme } from "react-native";
import styled from "styled-components/native";

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
      />
    </Container>
  );
};

export default Search;

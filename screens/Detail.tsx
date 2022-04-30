import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

//params.route를 params로
const Detail = ({
  //navigation 옵션은 모든 page에서 사용가능
  // 밑의 useEffect참조
  navigation: { setOptions },
  route: {
    params: { originalTitle },
  },
}) => {
  // console.log(rest.route.params.originalTitle);
  // console.log(params);
  useEffect(() => {
    //Stack Navigation의 header name을 변경할 수 있음
    setOptions({
      title: originalTitle,
    });
  }, []);
  return (
    <Container>
      <Text>{originalTitle}</Text>
    </Container>
  );
};
export default Detail;

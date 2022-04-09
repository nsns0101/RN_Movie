import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const VerticalMovie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text<{ isDark: boolean}>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  font-weight: 600;
  font-size: 13px;
  margin-top: 7px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}


const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "dark";

  return (
  <VerticalMovie>
    <Poster path={posterPath} />
    <Title isDark={isDark}>
      {originalTitle.slice(0, 13)}
      {originalTitle.length > 13 ? "..." : null}
    </Title>
    <Votes votes={voteAverage} />
  </VerticalMovie>
  );
}

export default VMedia;
import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";

interface VotesProps {
  votes: number;
}

const Text = styled.Text<{ isDark: boolean}>`
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
  font-size: 10px;
`;

const Votes: React.FC<VotesProps> = ({ votes }) => {
  const isDark = useColorScheme() === "dark";
  return (
  <Text isDark={isDark}>{votes > 0 ? `⭐️ ${votes}/10` : `Coming soon`}</Text>
  )};
export default Votes;
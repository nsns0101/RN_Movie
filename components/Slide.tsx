import Reack from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";
import { StyleSheet, useColorScheme } from "react-native";
import Poster from "./Poster";

const BgImg = styled.Image`
  flex: 1;
`;

const Title = styled.Text<{ isDark: boolean}>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 10px;
`;

const Overview = styled.Text<{ isDark: boolean}>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;
//OverView의 모든 css를 가져올 수 있음
const Votes = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
    backdropPath: string; 
    posterPath: string; 
    originalTitle: string;
    voteAverage: number;
    overview: string;
}

const Slide:React.FC<SlideProps> = ({ 
    backdropPath, 
    posterPath, 
    originalTitle,
    voteAverage,
    overview
}) => {
    const isDark = useColorScheme() === "dark";
    return (
        <View style={{ flex: 1}}>
            <BgImg 
            // style={StyleSheet.absoluteFill}
            source={{ uri: makeImgPath(backdropPath) }}
            resizeMode="cover"
            />
            {/* 이미지에 블러를 주려면 이미지가 BlurView 바깥에 있어야 함 */}
            <BlurView
            tint={isDark ? "dark" : "light"}
            intensity={80} style={StyleSheet.absoluteFill}
            >
                <Wrapper>
                    <Poster path={posterPath}/>
                    <Column>
                        <Title isDark={isDark}>{originalTitle}</Title>
                        {voteAverage > 0 ? (
                            <Votes isDark={isDark}>⭐️{voteAverage}</Votes>
                            ) : null}
                        <Overview isDark={isDark}>{overview.slice(0, 90)}...</Overview>
                    </Column>
                </Wrapper>
            </BlurView>
        </View>
    )
}

export default Slide;
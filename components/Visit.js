import React, { useEffect, useRef, useState } from "react";

import {
  Image,
  useWindowDimensions,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import Carousel from "react-native-snap-carousel";
import { AirbnbRating, Rating } from "react-native-elements";
import Spacer from "./Spacer";
const Title = styled.Text`
  font-family: Pretendard-SemiBold;
  font-size: 24px;
  color: rgb(50, 50, 50);

  padding-top: 40px;
`;
const Label = styled.Text`
    font-family: Pretendard-Regular;
    font-size: 13px;
    color: rgb(50,50,50)
    padding-bottom: 15px;
`;
const Paragraph = styled.Text`
    font-family: Pretendard-SemiBold;
    font-size: 15px;
    color: rgb(40,40,40)
    text-align: center;
    padding-left: 50px;
    padding-right: 50px;
    width: 100%;

`;
const Container = styled.View`
  width: 100%;
  align-items: center;
`;
const ImageWrapper = styled.View`
  width: 100%;
  align-items: center;
`;
const VisitImage = styled.Image`
  border-radius: 10px;
`;
const StarContainer = styled.View`
  width: 100%;
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
`;
const IconWrapper = styled.View`
  margin-top: 20px;
  margin-bottom: 5px;
`;
const SemiTitle = styled.Text`
    font-family: Pretendard-SemiBold;
    font-size: 15px;
    color: rgb(40,40,40)
    text-align: center;
`;
const VerticalDiv = styled.View`
  background-color: "rgba(228,86,103,0.4)";
  width: 1px;
  height: 70px;
`;

function Visit({
  file,
  rating,
  comment,
  adventage,
  shortage,
  onLayout,
  divider,
}) {
  const winDim = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(winDim.height - 450);
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      var ratio = height / width;
      ratio = ratio < 0.75 ? 0.75 : ratio;
      ratio = ratio > 2 ? 2 : ratio;
      setImageHeight(ratio * (winDim.width - 10));
    });
 
  }, [file]);

  return (
    <Container onLayout={onLayout}>
      {divider ? <Spacer height={40} /> : null}
      {divider ? <VerticalDiv /> : null}
      <ImageWrapper>
        <View style={{ margin: 20 }} />
        <Ionicons
          name={"ios-camera-outline"}
          size={25}
          color={"rgb(100,100,100)"}
        />
        <View style={{ margin: 5 }} />
        <VisitImage
          resizeMode="cover"
          style={{
            width: winDim.width - 10,
            height: imageHeight,
          }}
          source={{ uri: file }}
        />
      </ImageWrapper>
      <View style={{ margin: 20 }} />
      {comment ? (
        <>
          <IconWrapper>
            <Ionicons
              name={"ios-chatbubbles-outline"}
              size={25}
              color={"rgb(100,100,100)"}
            />
          </IconWrapper>
          <Paragraph>
            {comment}
          </Paragraph>
        </>
      ) : null}

      {adventage ? (
        <>
          <IconWrapper>
            <Ionicons
              name={"thumbs-up-outline"}
              size={25}
              color={"rgb(100,100,100)"}
            />
          </IconWrapper>
          <Paragraph>
            {adventage}
          </Paragraph>
        </>
      ) : null}
      {shortage ? (
        <>
          <IconWrapper>
            <Ionicons
              name={"thumbs-down-outline"}
              size={25}
              color={"rgb(100,100,100)"}
            />
          </IconWrapper>
          <Paragraph>
            {shortage}
          </Paragraph>
        </>
      ) : null}
      <View style={{ margin: 10 }} />

      <IconWrapper>
        <Ionicons name={"walk-outline"} size={30} color={"rgb(100,100,100)"} />
      </IconWrapper>
      <SemiTitle>여기는</SemiTitle>
      <AirbnbRating
        count={5}
        reviews={["별로였어", "아쉬웠어", "괜찮았어", "좋았어", "역대급이었어"]}
        defaultRating={3}
        size={20}
        reviewSize={20}
        selectedColor={"#fbbc05"}
        reviewColor={"rgb(40,40,40)"}
      />
    </Container>
  );
}

export default Visit;

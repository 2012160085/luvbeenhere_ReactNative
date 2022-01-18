import React, { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { fontSet } from "../fonts";
import IconRating from "./IconRating";
import { Ionicons } from "@expo/vector-icons";
import { GetThumbURI } from "../util/ThumbnailURI";

const Container = styled.View`
  background-color: white;
  margin-vertical: 5px;
  elevation: 2;
`;
const Head = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
`;
const Title = styled.Text`
  font-family: ${fontSet.Medium};
  font-size: 17px;
`;
const ImageInfo = styled.View`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.66);
`;
const ImageDesc = styled.Text`
  font-family: ${fontSet.Regular};
  font-size: 16px;
  color: white;
  padding-horizontal: 5px;
  padding-vertical: 2px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Body = styled.TouchableOpacity`
  height: 250px;
  background-color: white;
`;
const Tail = styled.View`
  background-color: white;
`;
const Info = styled.View`
  background-color: white;
  display: flex;
  flex-direction: row;
`;

const DateFeed = ({ data, route, navigation }) => {

  const onPress = () => {


    navigation.navigate("Detail", {
      screen: "DateDetail",
      params: {
        visitId: -1,
        id: data.id,
      },
    });
  };

  const representImage = data.visits[0].photos[0].file;

  return (
    <Container>
      <Body activeOpacity={0.8} onPress={onPress}>
        <Head>
          <Title>{data.name}</Title>
          <Ionicons
            name="arrow-forward"
            size={20}
            style={{ position: "absolute", right: 10 }}
          />
        </Head>
        <Image
          source={{ uri: GetThumbURI(representImage) }}
          style={{ width: "100%", height: 250 }}
        ></Image>
      </Body>
      <Tail>
        <IconRating
          onRating={null}
          iconName={"md-medical"}
          selectedColor={"#ea4335"}
          defaultColor={"#dbdee1"}
          iconSize={18}
          ratingCount={3}
          defaultValue={2}
          disabled={true}
        />
        <Text>일시</Text>
        <Text>장소</Text>
        <Text>사진 몇 장</Text>
      </Tail>
      <Info>
        <Ionicons
          name="heart"
          color={"tomato"}
          size={16}
          style={{ marginHorizontal: 5 }}
        >
          <Text>3</Text>
        </Ionicons>
        <Ionicons
          name="chatbox-ellipses-outline"
          color={"black"}
          size={16}
          style={{ marginHorizontal: 5 }}
        >
          <Text>3</Text>
        </Ionicons>
      </Info>
    </Container>
  );
};

export default DateFeed;

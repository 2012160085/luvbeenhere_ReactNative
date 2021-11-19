import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { FEED_PHOTO, PHOTO_FRAGMENT } from "../fragments";
import { Ionicons } from "@expo/vector-icons";
import { AirbnbRating, Rating } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import { fontSet } from "../fonts";

const Container = styled.View`
  display: flex;
  background-color: white;
`;
const DateContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;
const DateText = styled.Text`
  font-family: ${fontSet.SemiBold};
  font-size: 20px;
  margin-left: 20px;
  color: black;
`;
const PlaceContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const PlaceText = styled.Text`
  font-family: ${fontSet.SemiBold};
  font-size: 20px;
  margin-left: 20px;
`;
const PhotoContainer = styled.View``;
const PhotoText = styled.Text`
  font-size: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  font-family: ${fontSet.SemiBold};
`;
const CarouselView = styled.View``;
const CarouselImageCover = styled.View`
  position: absolute;
  width: 100%;
  height: 80px;
  bottom: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 10px;
  border-bottom-width: 0.5px;
  border-color: rgb(254, 254, 254);
`;
const ImageCaption = styled.Text`
  color: white;
  font-family: ${fontSet.SemiBold};
`;
const RatingContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgb(240, 240, 240);
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 20px;
  border-bottom-width: 1px;
  border-color: rgba(0, 0, 0, 0.3);
`;
export const SimpleInput = styled.TextInput`
  background-color: #4285f424;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
`;
const RatingText = styled.Text`
  font-family: ${fontSet.Medium};
`;
const RatingStarContainer = styled.View`
  background-color: rgb(0, 0, 0);
`;
const CommentsContainer = styled.View``;
const CommentButton = styled.TouchableOpacity`
  background-color: rgb(240, 240, 240);
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 20px;
  border-bottom-width: 1px;
  border-color: rgba(0, 0, 0, 0.3);
`;
const CommentText = styled.Text`
  color: black;
  font-family: ${fontSet.Medium};
`;
const EditContainer = styled.TouchableOpacity``;
const renderItem = ({ item, index }, screen) => {
  return (
    <View style={{ height: screen.width * 0.8 + 20 }}>
      <Image
        key={index}
        style={{
          width: screen.width * 0.8,
          height: screen.width * 0.8,
          borderRadius: 10,
        }}
        resizeMode="cover"
        source={{ uri: item.uri }}
      />
      <CarouselImageCover>
        <ImageCaption>3시 15분</ImageCaption>
      </CarouselImageCover>
    </View>
  );
};
export default function UploadForm({ route, navigation }) {
  const photos =
    Platform.OS === "ios"
      ? route.params.file
      : [...route.params.file].reverse();
  const screen = useWindowDimensions();

  return (
    <Container>
      <DateContainer>
        <DateText>12.01.01데이트에 추가</DateText>
        <EditContainer>
          <Ionicons name={"pencil"} />
        </EditContainer>
      </DateContainer>
      <PlaceContainer>
        <PlaceText>장소</PlaceText>
      </PlaceContainer>
      <PhotoContainer>
        <PhotoText>{photos.length}개 사진</PhotoText>
        <CarouselView>
          <Carousel
            data={photos}
            renderItem={(e) => renderItem(e, screen)}
            sliderWidth={screen.width}
            itemWidth={screen.width * 0.8}
            itemHeight={screen.width * 0.8}
            layout={"tinder"}
            firstItem={Platform.OS === "ios" ? 0 : photos.length - 1}
          />
        </CarouselView>
      </PhotoContainer>
      <RatingContainer>
        <RatingText>별점</RatingText>
        <RatingStarContainer>
          <Rating
            count={5}
            showRating={false}
            defaultRating={3}
            imageSize={20}
            selectedColor={"#fbbc05"}
            reviewColor={"rgb(40,40,40)"}
            tintColor="rgb(238,238,238)"
          />
        </RatingStarContainer>
      </RatingContainer>
      <CommentsContainer>
        <CommentButton>
          <CommentText>코멘트 입력</CommentText>
        </CommentButton>
        <CommentButton>
          <CommentText>좋았던 점</CommentText>
        </CommentButton>
        <CommentButton>
          <CommentText>아쉬운 점</CommentText>
        </CommentButton>
      </CommentsContainer>
    </Container>
  );
}

import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  Switch,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../colors";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { fontSet } from "../fonts";
import IconRating from "../components/IconRating";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

const CREATE_VISIT = gql`
  mutation (
    $name: String!
    $photoPosts: [PhotoPost]!
    $rating: Int
    $comment: String
    $isPublic: Boolean
  ) {
    createVisit(
      name: $name
      photoPosts: $photoPosts
      rating: $rating
      comment: $comment
      isPublic: $isPublic
    ) {
      ok
      error
      visitId
      dateId
    }
  }
`;
const carouselSize = 0.33;
const CommentInput = styled.TextInput`
  margin-left: 5px;
  margin-right: 15px;
  width: auto;
  font-family: ${(props) => (props.font ? props.font : fontSet.Regular)};
`;
const AddCommentButton = styled.TouchableOpacity`
  border-radius: 10px;
  border-width: 1px;
  border-color: black;
  padding: 10px 10px 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.start ? "flex-start" : "space-between")};
  align-items: center;
  flex: 1;
  margin-bottom: 10px;
  background-color: white;
`;
const AddCommentView = styled.View`
  border-radius: 10px;
  border-width: 1px;
  border-color: black;
  padding: 10px 10px 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  margin-bottom: 10px;
  background-color: white;
`;
const AddRatingButton = styled.View`
  border-radius: 10px;
  border-width: 1px;
  border-color: black;
  padding: 10px 10px 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-bottom: 10px;
  background-color: white;
`;
const AddPlaceButton = styled.TouchableOpacity`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-width: 1px;
  border-color: black;
  padding: 10px 10px 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;
const AddPlaceBottomButton = styled.View`
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-width: 1px;
  border-top-width: 0px;
  border-color: black;
  padding: 3px 5px 5px 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background-color: white;
`;

const InfoContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;
const PlaceLabel = styled.TouchableOpacity`
  background-color: rgb(230, 230, 230);
  border-radius: 10px;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 3px;
  margin-right: 6px;
  margin-top: 4px;
`;
const PhotoClusterTimeText = styled.Text`
font-family: ${fontSet.SemiBold};
color: black
font-size: 15px;
margin-left:10px;
`;
const ContentText = styled.Text`
  font-family: ${fontSet.Regular};
  color: ${(props) => (props.on ? "red" : "black")};
  font-size: 15px;
  margin-right: 10px;
`;
const HeadView = styled.View`
  display: flex;
  flex-direction: row;
  padding-horizontal: 20px;
`;
const PlaceRow = styled.View`
  display: flex;
  flex-direction: column;
  padding-horizontal: 20px;
`;
const RatingRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;
  align-items: center;
`;
const PublicRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-left: 20px;
  margin-right: 20px;
  align-items: center;
`;
const PlaceText = styled.Text`
  font-family: ${fontSet.SemiBold};
  font-size: 13px;
  margin-left: 0;
`;
const PhotoContainer = styled.View`
  border-radius: 10px;
`;

const CarouselView = styled.View``;
const CarouselImageCover = styled.View`
  position: absolute;
  width: 100%;
  height: 25px;
  bottom: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SimpleInput = styled.TextInput`
  color: black;
  width: 40%;
  font-size: 20px;
  font-family: ${fontSet.Regular}
  padding-vertical: 10px;
`;

const renderItem = ({ item, index }, screen) => {
  return (
    <View style={{ height: screen.width * carouselSize + 10 }}>
      <Image
        key={index}
        style={{
          width: screen.width * carouselSize,
          height: screen.width * carouselSize,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "black",
        }}
        resizeMode="cover"
        source={{ uri: item.localUri }}
      />
      <CarouselImageCover>
        <Ionicons name="time-outline" color={"black"} size={13}>
          12:34
        </Ionicons>
        <TouchableOpacity>
          <Ionicons name="md-chatbox-outline" color={"black"} size={13} />
        </TouchableOpacity>
      </CarouselImageCover>
    </View>
  );
};
const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 19px;
  font-family: ${fontSet.Medium};
`;

const RoundButton = ({ text, iconName }) => {
  return (
    <AddCommentButton>
      <Ionicons name={iconName} color={"black"} size={14}>
        <PhotoClusterTimeText> {text}</PhotoClusterTimeText>
      </Ionicons>
      <Ionicons name="chevron-forward" color={"black"} size={13}></Ionicons>
    </AddCommentButton>
  );
};

const RatingButton = ({ text, children, iconName }) => {
  return (
    <AddRatingButton>
      <Ionicons name={iconName} color={"black"} size={14}>
        <PhotoClusterTimeText> {text}</PhotoClusterTimeText>
      </Ionicons>
      {children}
    </AddRatingButton>
  );
};

const RoundPlaceButton = ({ text, iconName }) => {
  return (
    <>
      <AddPlaceButton>
        <Ionicons name={iconName} color={"black"} size={14}>
          <PhotoClusterTimeText> {text}</PhotoClusterTimeText>
        </Ionicons>
        <Ionicons name="chevron-forward" color={"black"} size={13}></Ionicons>
      </AddPlaceButton>
      <AddPlaceBottomButton>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <PlaceLabel>
            <PlaceText>경마공원</PlaceText>
          </PlaceLabel>
          <PlaceLabel>
            <PlaceText>레츠런파크</PlaceText>
          </PlaceLabel>
          <PlaceLabel>
            <PlaceText>서울대고오오오옹원</PlaceText>
          </PlaceLabel>
          <PlaceLabel>
            <PlaceText>서울대공원</PlaceText>
          </PlaceLabel>
          <PlaceLabel>
            <PlaceText>서울대공원</PlaceText>
          </PlaceLabel>
          <PlaceLabel>
            <PlaceText>경마공원</PlaceText>
          </PlaceLabel>
        </ScrollView>
      </AddPlaceBottomButton>
    </>
  );
};

const CommentButton = ({
  iconName,
  iconText,
  text,
  phColor,
  font,
  fontSize,
  onChangeText,
}) => {
  const dfFont = font ? font : fontSet.Regular;
  const dfFontSize = fontSize ? fontSize : 14;
  return (
    <AddCommentView>
      <Ionicons name={iconName} color={"black"} size={dfFontSize}>
        {iconText ? (
          <Text style={{ fontFamily: dfFont }}>{iconText}</Text>
        ) : null}
      </Ionicons>

      <CommentInput
        placeholder={text}
        multiline={true}
        onChangeText={onChangeText}
        placeholderTextColor={phColor ? phColor : "rgb(150,150,150)"}
        font={dfFont}
        fontSize={dfFontSize}
      ></CommentInput>
    </AddCommentView>
  );
};
const photoInput = (data) => {
  const file = new ReactNativeFile({
    uri: data.localUri,
    name: data.filename,
    type: "image/jpeg",
  });
  return {
    file,
    posX: data.location.latitude,
    posY: data.location.longitude,
    datetime: new Date(data.creationTime).toISOString(),
  };
};
export default function UploadForm({ route, navigation }) {
  var [comment, setComment] = useState("");
  var [rating, setRating] = useState(0);
  var [visitName, setVisitName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const toggleSwitch = () => {
    setIsPublic((previousState) => !previousState);
  };
  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() => {
        const photoPosts = photos.map((photo) => photoInput(photo));
        var variables = {
          name: visitName,
          rating,
          comment,
          isPublic,
          photoPosts,
        };
        console.log(variables);

        createVisit({
          variables,
        });
      }}
    >
      <HeaderRightText>다음</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    // console.log("-----------------------------------");
    // console.log(route.params.file);
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [comment, rating, visitName, isPublic]);

  const photos =
    Platform.OS === "ios"
      ? route.params.file
      : [...route.params.file].reverse();
  const screen = useWindowDimensions();
  const onCompleted = (e) => {
    console.log(e);
    if (e.createVisit.ok) {
      navigation.navigate("DateDetail", {
        visitId: e.createVisit.visitId,
        dateId: e.createVisit.dateId,
      });
    } else {
    }
  };

  const [createVisit, { loading, error }] = useMutation(CREATE_VISIT, {
    onCompleted,
  });
  return (
    <KeyboardAwareScrollView
      extraHeight={20}
      enableOnAndroid={true}
      extraHeight={30}
    >
      <RatingRow>
        <CommentButton
          iconName={"md-walk"}
          iconText={"방문 제목 :"}
          text={"12.01.01 방문"}
          phColor={"rgb(160,160,160)"}
          font={fontSet.Medium}
          fontSize={18}
          onChangeText={setVisitName}
        />
      </RatingRow>

      <PhotoContainer>
        <HeadView>
          <CarouselView>
            <Carousel
              data={photos}
              renderItem={(e) => renderItem(e, screen)}
              sliderWidth={screen.width * carouselSize + 10}
              itemWidth={screen.width * carouselSize}
              itemHeight={screen.width * carouselSize}
              layout={"stack"}
              firstItem={Platform.OS === "ios" ? 0 : photos.length - 1}
              layoutCardOffset={5}
            />
          </CarouselView>

          <InfoContainer>
            <RoundButton iconName={"ios-map-outline"} text={"서울시 공롱동"} />
            <RoundButton iconName={"stopwatch-outline"} text={"오후 1시 쯤"} />
          </InfoContainer>
        </HeadView>
      </PhotoContainer>
      <RatingRow>
        <CommentButton
          iconName={"text"}
          text={"짧은 글 입력.."}
          onChangeText={setComment}
        />
      </RatingRow>
      <PlaceRow>
        <RoundPlaceButton iconName={"location-outline"} text={"장소 입력"} />
      </PlaceRow>

      <RatingRow>
        <RatingButton text={"별점"} iconName={"md-medical-outline"}>
          <IconRating
            onRating={setRating}
            iconName={"md-medical"}
            selectedColor={"#ea4335"}
            defaultColor={"#dbdee1"}
            iconSize={25}
            ratingCount={3}
            defaultValue={2}
          />
        </RatingButton>
      </RatingRow>
      <RatingRow>
        <RatingButton text={"공개여부"} iconName={"md-lock-open-outline"}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ContentText on={isPublic}>
              {isPublic ? "전체 공개" : "나만 보기"}
            </ContentText>
            <Switch
              style={{ marginVertical: -10 }}
              trackColor={{ false: "#ffffff", true: "#f9c7c3" }}
              thumbColor={isPublic ? "#ea4335" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isPublic}
            ></Switch>
          </View>
        </RatingButton>
      </RatingRow>
    </KeyboardAwareScrollView>
  );
}

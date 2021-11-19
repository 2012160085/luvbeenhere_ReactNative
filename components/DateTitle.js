import React from "react";
import { Image, View } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Badge } from "react-native-elements";
import styled from "styled-components";
import { colors } from "../colors";
import { Text } from "react-native";
import { fontSet } from "../fonts";
import Timeline from "./Timeline";
import IconRating from "./IconRating";
import { LinearGradient } from 'expo-linear-gradient';
import { ts2DateStr } from "../util/DateHandle";
const Container = styled.View`
  padding-vertical: 20px;
  background-color: #f8f8fa;
`;
const TitleView = styled.View`
  display: flex;
  width: 100%;
  align-items: center;
`;

const DateTitleText = styled.Text`
  font-family: ${fontSet.SemiBold};
  font-size: 20px;
  margin-top: 10px;
`;
const DateLocationText = styled.Text`
  font-family: ${fontSet.Regular};
  font-size: 13px;
`;
const DateDateText = styled.Text`
  font-family: ${fontSet.Regular};
  font-size: 14px;
`;
const DateCommentText = styled.Text`
  font-family: ${fontSet.Medium};
  margin-top: 25px;
  max-width: 60%;
  text-align: center;
`;

const StarView = styled.View`
  margin-top: 10px;
`;

const DateTitle = ({ data }) => {
  const rates =  data.visits.filter((visit) => visit.rating);
  const sumRate = rates.map((validRateVisit) => validRateVisit.rating.value).reduce((a, b) => a + b)
  const meanRate = Math.round(sumRate/rates.length);
  return (
    <Container>
      <TitleView>
        <DateDateText>{ts2DateStr(data?.datetime)}</DateDateText>
        <Ionicons name={"location"} size={14}>
          <DateLocationText>{data?.location}</DateLocationText>
        </Ionicons>
        <DateTitleText>{data?.name}</DateTitleText>

        <StarView>
          <IconRating
            onRating={null}
            iconName={"md-medical"}
            selectedColor={"#ea4335"}
            defaultColor={"#dbdee1"}
            iconSize={16}
            ratingCount={3}
            defaultValue={meanRate}
            disabled={true}
          />
        </StarView>
        <DateCommentText>
          경마장 데이트를 하려고 했었는데 너무 갑작스런 동물원 데이트가 되어버린
          날
        </DateCommentText>
      </TitleView>
    </Container>
  );
};
export default DateTitle;

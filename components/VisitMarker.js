import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import styled from "styled-components";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Marker } from "react-native-maps";

const Container = styled.View`
  align-items: center;
`;
const TextContainer = styled.View`
  align-items: center;
  background-color: white;
  border-radius: 10px;
  border-color: #fec1bb;
  border-width: 2px;
  flex-direction: row;
  margin-bottom: -8px;
  justify-content: space-between;
`;
const InnerText = styled.Text`
  color: #e65f70;
  margin-right: 4px;
`;
const ioniconsName = ["heart", "restaurant", "cafe", "barbell"];
const materialName = ["silverware-fork-knife"];
const VisitMarker = ({ text, iconName, count }) => {
  return (
    <Container>
      <TextContainer>
        {ioniconsName.includes(iconName) ? (
          <Ionicons
            name={iconName}
            size={16}
            color={"red"}
            style={{ marginLeft: 4 }}
          />
        ) : null}
        {materialName.includes(iconName) ? (
          <MaterialCommunityIcons
            name={iconName}
            size={16}
            color={"red"}
            style={{ marginLeft: 4 }}
          />
        ) : null}
        <InnerText>{text}</InnerText>
        {count > 0 ? (
          <View
            style={{
              backgroundColor: "#fec1bb",
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
              marginRight: -1,
              height: "101%"
            }}
          >
            <Text style={{ color: "red" }}> +{count} </Text>
          </View>
        ) : null}
      </TextContainer>
      <Ionicons name={"caret-down-sharp"} color={"#fec1bb"} size={20} />
    </Container>
  );
};

export default VisitMarker;

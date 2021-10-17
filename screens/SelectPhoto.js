import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";
import dbscan from "@cdxoo/dbscan";
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { colors } from "../colors";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 3px;
  right: 3px;
`;
const OrderIconContainer = styled.View`
  position: absolute;
  bottom: 3px;
  right: 3px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;
const MiddleMenu = styled.View`
  height: 50px;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;
const LocationContainer = styled.View``;
const MultiModeContainer = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.3);
  height: 35px;
  border-radius: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;
const MultiModeText = styled.Text`
  color: white;
`;
const NumberOnIconView = styled.View`
  position: absolute;
  width: 100%
  height: 100%
  align-items: center;
`;
const NumberOnIconText = styled.Text`
  color: white;
  width: 100%
  height: 100%
  text-align: center;
  font-size: 13px;
`;
export default function SelectPhoto({ navigation }) {
  const [ok, setOk] = useState(false);
  const [test, setTest] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selPhotos, setSelPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const [multiSelect, setMultiSelect] = useState(false);
  const changeSelectMode = () => {
    setMultiSelect(!multiSelect);
  };
  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync({
      first: 100,
      sortBy: ["creationTime"],
    });
    setPhotos(photos);
    setChosenPhoto(photos[0]);
  };
  const getPermissions = async () => {
    if (Platform.OS === "ios") {
      const { accessPrivileges, canAskAgain } =
        await MediaLibrary.getPermissionsAsync();

      if (accessPrivileges === "none" && canAskAgain) {
        const { accessPrivileges } =
          await MediaLibrary.requestPermissionsAsync();
        if (accessPrivileges !== "none") {
          setOk(true);
          getPhotos();
        }
      } else if (accessPrivileges !== "none") {
        setOk(true);
        getPhotos();
      }
    } else if (Platform.OS === "android") {
      const { granted, canAskAgain } = await MediaLibrary.getPermissionsAsync();

      if (!granted && canAskAgain) {
        const { granted } = await MediaLibrary.requestPermissionsAsync();
        if (granted) {
          setOk(true);
          getPhotos();
        }
      } else if (granted) {
        setOk(true);
        getPhotos();
      }
    }
  };
  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UploadForm", {
          file: chosenPhoto,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    let simpleResult = dbscan({
      dataset: [21, 22, 23, 24, 27, 28, 29, 30, 9001],
      epsilon: 1.01,
    });
    console.log(simpleResult);
    getPermissions();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto, selPhotos]);

  const numColumns = 4;
  const { width } = useWindowDimensions();
  const choosePhoto = async (photo) => {
    setChosenPhoto(photo);
    console.log(photo.id);
    const info = await MediaLibrary.getAssetInfoAsync(photo.id);
    console.log(info);
    setTest(JSON.stringify(info));
  };
  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: width / numColumns }}
      />
      {!multiSelect ? (
        <IconContainer>
          <Ionicons
            name="checkmark-circle"
            size={18}
            color={photo === chosenPhoto ? colors.blue : "white"}
          />
        </IconContainer>
      ) : (
        <OrderIconContainer>
          <Badge
            value="1"
            badgeStyle={{ borderWidth: 0, backgroundColor: colors.blue }}
          />
        </OrderIconContainer>
      )}
    </ImageContainer>
  );
  return (
    <Container>
      <StatusBar hidden={false} />

      <Top>
        <Text style={{ color: "white", fontSize: 10, backgroundColor: "black" }}>
          {test}
        </Text>
        {/* {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto?.uri }}
            style={{ width, height: "100%" }}
          />
        ) : null} */}
      </Top>
      <MiddleMenu>
        <LocationContainer>
          <Text>""</Text>
        </LocationContainer>
        <MultiModeContainer onPress={changeSelectMode}>
          <Ionicons
            name={multiSelect ? "md-layers" : "md-layers-outline"}
            size={24}
            color={"white"}
          />
          <MultiModeText>여러 장 선택</MultiModeText>
        </MultiModeContainer>
      </MiddleMenu>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}

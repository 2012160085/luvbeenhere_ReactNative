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
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { colors } from "../colors";
import { fontSet } from "../fonts";
import PhotoSelectItem from "../components/PhotoSelectItem";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: white;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: white;
`;

const ImageContainer = styled.TouchableWithoutFeedback``;
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
  margin-right: 19px;
  font-family: ${fontSet.Medium};
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
const LocationText = styled.Text`
  font-family: Pretendard-SemiBold;
  font-size: 15px;
`;
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
  font-family: Pretendard-SemiBold;

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
  const [photos, setPhotos] = useState([]);
  const [multiChosenPhoto, setMultiChosenPhoto] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const [multiSelect, setMultiSelect] = useState(false);
  const [showingPhoto, setShowingPhoto] = useState("");
  const changeSelectMode = () => {
    if (multiSelect) {
      setChosenPhoto(multiChosenPhoto[0]);
    }
    setMultiSelect(!multiSelect);
  };

  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync({
      first: 140,
      sortBy: ["creationTime"],
    });
    setPhotos(photos);
    setChosenPhoto(photos[0]);
    setMultiChosenPhoto([photos[0]]);
    setShowingPhoto(photos[0]);
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
      onPress={async () => {
        const files = multiSelect ? multiChosenPhoto : [chosenPhoto];
        const filesWithInfo = await Promise.all(
          files.map((file) => MediaLibrary.getAssetInfoAsync(file.id))
        );
        navigation.navigate("UploadForm", {
          file: filesWithInfo,
        });
      }}
    >
      <HeaderRightText>다음</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    getPermissions();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto, multiChosenPhoto]);

  const numColumns = 4;
  const { width } = useWindowDimensions();
  const choosePhoto = async (photo) => {
    console.log("__________________PHOHOHO");
    console.log(photo);
    if (!multiSelect) {
      setChosenPhoto(photo);
      setMultiChosenPhoto([photo]);
      setShowingPhoto(photo);
    } else {
      if (!multiChosenPhoto.includes(photo)) {
        setMultiChosenPhoto([...multiChosenPhoto, photo]);
        setShowingPhoto(photo);
      } else if (multiChosenPhoto.includes(photo) && showingPhoto !== photo) {
        setShowingPhoto(photo);
      } else if (multiChosenPhoto.length <= 1) {
      } else if (multiChosenPhoto.includes(photo) && showingPhoto === photo) {
        const newPhotos = multiChosenPhoto.filter((e) => e !== photo);
        setShowingPhoto(newPhotos[newPhotos.length - 1]);
        setMultiChosenPhoto(newPhotos);
      } else {
        setMultiChosenPhoto(multiChosenPhoto.filter((e) => e !== photo));
      }
    }
  };

  const renderItem = ({ item: photo }) => {
    const photoIndex = multiSelect ? multiChosenPhoto.indexOf(photo) : -1;
    const selected = multiSelect ? photoIndex >= 0 : chosenPhoto === photo;
    const showing = showingPhoto === photo;
    return (
      <PhotoSelectItem
        photo={photo}
        onPress={() => choosePhoto(photo)}
        style={{ width: width / numColumns, height: width / numColumns }}
        multiSelect={multiSelect}
        selected={selected}
        order={photoIndex}
        showing={showing}
      />
    );
  };
  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {showingPhoto ? (
          <Image
            source={{ uri: showingPhoto?.uri }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <MiddleMenu>
        <LocationContainer>
          <LocationText>서울시 노원구 섬밭로</LocationText>
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

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
  SectionList,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import ClusterPhotos from "../util/PhotoCluster";
import { DBSCAN } from "density-clustering";


const Container = styled.View`
  flex: 1;
  background-color: white;
`;


export default function HandyUpload({ navigation }) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [multiChosenPhoto, setMultiChosenPhoto] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const [multiSelect, setMultiSelect] = useState(false);
  const [showingPhoto, setShowingPhoto] = useState("");
  const getPhotosByGroups = async () => {
    const { assets } = await MediaLibrary.getAssetsAsync({
      sortBy: ["creationTime"],
      first: 50
    })
    console.log("------------------------------ok---------------------------");
    const lastTimestamp = assets[assets.length - 1].creationTime
    const lastDate = new Date(lastTimestamp)
  
    console.log(lastDate);

    lastDate.setHours(0, 0, 0, 0);

    console.log(lastDate)
    const marginTimestamp = lastDate.getTime()
    console.log(`marginTimestamp ${marginTimestamp}`);
    const { assets: additionalAssets } = await MediaLibrary.getAssetsAsync({
      sortBy: ["creationTime"],
      createdBefore: lastTimestamp,
      createdAfter: marginTimestamp,
      first: 9999
    })
    console.log(assets.length);
    assets.push(...additionalAssets)
    console.log(assets.length);
    const assetByDate = {}
    var count = 0;
    console.log(assets[assets.length-1]); 
    assets.map((asset) => {
      const photoDate = new Date(asset.creationTime)
      console.log(photoDate);
      const date = photoDate.getDate()
      const month = photoDate.getMonth()
      const year = photoDate.getFullYear()
      const key = `${year}.${month}.${date}`;
      count = count + 1;
      console.log(count);
      if (assetByDate[key]) {
        assetByDate[key].push(asset)
      } else {
        assetByDate[key] = [asset]
      }
    })
    const keys = Object.keys(assetByDate)
    
    const result = await Promise.all(keys.filter((e) => assetByDate[e].length > 4).map((e) => {
      console.log(e);
      console.log(assetByDate[e].length);
      return ClusterPhotos(assetByDate[e], e, 0.05, [0.5, 1, 1])
    }))


    setPhotos(result)
  }

  const getPermissions = async () => {
    if (Platform.OS === "ios") {
      const { accessPrivileges, canAskAgain } =
        await MediaLibrary.getPermissionsAsync();
      if (accessPrivileges === "none" && canAskAgain) {
        const { accessPrivileges } =
          await MediaLibrary.requestPermissionsAsync();
        if (accessPrivileges !== "none") {
          setOk(true);
          getPhotosByGroups();
        }
      } else if (accessPrivileges !== "none") {
        setOk(true);
        getPhotosByGroups();
      }
    } else if (Platform.OS === "android") {
      const { granted, canAskAgain } = await MediaLibrary.getPermissionsAsync();

      if (!granted && canAskAgain) {
        const { granted } = await MediaLibrary.requestPermissionsAsync();
        if (granted) {
          setOk(true);
          getPhotosByGroups();
        }
      } else if (granted) {
        setOk(true);
        getPhotosByGroups();
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
  const screen = useWindowDimensions();


  const renderItem = ({ item }) => {

    return <View>
      <Text style={{fontSize:20}}>{item.title}</Text>
      <View style={{display:"flex" , flexDirection :"row" , width: "100%" , flexWrap :"wrap"}}>
        {item.data.map((d) => {
          return <Image key={d.uri} source={{ uri: d.uri }} style={{ width: screen.width/numColumns, height: screen.width/numColumns }} />
        })}
      </View>

    </View>
  };
  return (
    <Container>
      {photos ?
        <SectionList
          sections={photos}
          keyExtractor={(item, index) => "handySection" + index}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{fontSize:25}}>{title}</Text>
          )}
        /> : null}
    </Container>
  );
}

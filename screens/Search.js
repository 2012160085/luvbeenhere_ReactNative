import React, { useRef, useState } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { TextInput } from "../components/auth/AuthShared";
import { Ionicons } from "@expo/vector-icons";
import { gql, useLazyQuery } from "@apollo/client"
import VisitHeader from "../components/VisitHeader";
import VisitDetail from "../components/VisitDetail";
import SearchMap from "../components/SearchMap";
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
const SEARCH_VISITS = gql`
query searchVisits(
  $query: String
  $location: String
  $locationScale: Float
  $priority: String
  ) {
  searchVisits(
    query: $query
    location: $location
    locationScale: $locationScale
    priority: $priority
  ) {
    ok
    error
    visits {
      id
      name
      date{
        id
      }
      photos{
        id
        posX
        posY
        file
        datetime
      }
      rating{
        value
      }
      posX
      posY
      comment
      rgeocode
      likeCount
    }
  }
}  
`;

const Top = styled.View`

`;
const SearchBar = styled.View`
  display: flex;
  flex-direction: row;

`
const SearchOptions = styled.View`
  flex: 1;
`
const LocationButton = styled.TouchableOpacity`
  padding: 5px;
  border-radius: 4px;
  background-color: #42719e;
`
const ButtonText = styled.Text`
  color: white;
`
const CaptionText = styled.Text`
  color: black;
`
const SearchButton = styled.TouchableOpacity`
  margin-left: 10px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: #42719e;
`
const Bottom = styled.View`
  flex: 1;
  background-color: white;
`;
const MapPopup = styled.View`
  display: absolute;

`
const VisitCard = ({ item }) => {
  console.log("RENDERED");
  return (
    <>
      <VisitHeader visit={item} />
      <VisitDetail data={item} />
    </>
  )
}
const MemoVisitCard = React.memo(VisitCard, (prevProps, nextProps) => (
  prevProps.item === nextProps.item
))
const renderItem = ({ item, index }) => {
  return <MemoVisitCard item={item} />
}
const keyExtractor = (item, index) => {
  return `visit-result-${item['id']}`;
};
const SearchScreen = ({ navigation }) => {
  const [visits, setVisits] = useState([])
  const [mapShown, setMapShown] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const onCompleted = (data) => {
    if (data['searchVisits']["ok"]) {
      setVisits(data['searchVisits']["visits"])

    } else {

    }
  }
  const [searchVisitsQuery, { loading }] = useLazyQuery(
    SEARCH_VISITS,
    {
      onCompleted,


    },
  );


  return (
    <ScreenLayout >
      <Top>
        <SearchBar>
          <TextInput
            placeholder="한강, 실내 등 키워드로 검색해보세요"
            autoCapitalize="none"
            returnKeyType="done"
            placeholderTextColor={"#77aee4"}
            onChangeText={(text) => { setSearchQuery(text) }}
            onSubmitEditing={() => { console.log("검색버튼") }}
          />
          <SearchButton
            onPress={() => {
              searchVisitsQuery({
                variables: {
                  query: searchQuery
                }
              })
            }}
          >
            <Ionicons name={"search"} size={20} style={{ color: "white", margin: 10 }} />
          </SearchButton>
        </SearchBar>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <LocationButton onPress={() => navigation.openDrawer()}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Ionicons name={"filter"} color={"white"} size={12} />
              <ButtonText> 필터</ButtonText>
            </View>
          </LocationButton>
        </View>
        {mapShown ? <SearchMap></SearchMap> : null}
      </Top>
      <Bottom>
        <FlatList
          style={{ width: "100%", backgroundColor: "black" }}
          renderItem={renderItem}
          data={visits}
          keyExtractor={keyExtractor}
        />
      </Bottom>

    </ScreenLayout>
  );
}
const CustomDrawerContent = (props) => {
  return (
    <View style={{ padding: 10 }}>
      <View style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => props.navigation.toggleDrawer()}
          style={{ backgroundColor: "#42719e", padding: 1, borderRadius: 4 }}
        >
          <Ionicons name={"close"} color={"white"} size={20} />
        </TouchableOpacity>
      </View>
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <LocationButton>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingRight: 5 }}>
            <Ionicons name={"location"} color={"white"} size={12} />
            <ButtonText> 지역</ButtonText>
          </View>
        </LocationButton>
        <Text>    강북구</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <SearchMap ></SearchMap>
      </View>

    </View>
  );
}
function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}
const Drawer = createDrawerNavigator(

);
export default function Search() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: 'right', drawerStyle: {
          width: "100%"
        }
      }}
    >
      <Drawer.Screen name="SearchScreen" component={SearchScreen} options={{
        headerShown: false
      }} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
}
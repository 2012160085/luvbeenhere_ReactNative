import React, { useRef, useState } from "react";
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
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
import { fontSet } from "../fonts";
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
const CardView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding-top: 10px;
  padding-bottom: ${(props) => props.paddingBottom ? props.paddingBottom : 10}px;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: ${(props) => props.justifyContent ? props.justifyContent : "space-between"};
  margin-bottom: ${(props) => props.marginBottom ? props.marginBottom : 0}px;
  flex-wrap: wrap;
`
const H1Text = styled.Text`
  fontFamily: ${fontSet.Medium};
  fontSize: 18px;
  color: #1E1E1E;
`
const H2Text = styled.Text`
  fontFamily: ${fontSet.Medium};
  fontSize: 16px;
  color: #1E1E1E;
`
const SearchBar = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
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
const SortOrderBadge = styled.TouchableOpacity`
  border-radius: 20px;
  background-color: ${(props) => props.selected ? "#3B64F9" : "white"};
  border-color: #C8CFD6;
  border-width: 1px;
  padding-vertical: 3px;
  padding-horizontal: 7px;
  margin-right: 5px;
  margin-bottom: 5px;
`
const BadgeText = styled.Text`
  font-family: ${fontSet.Regular};
  font-size: 13px; 
  color: ${(props) => props.selected ? "white" : "#1e1e1e"};
`
const CaptionText = styled.Text`
  color: black;
`
const SearchTextInput = styled.TextInput`
  border-bottom-width: 1px;
  border-color: #42719e;
  height: 30px;
`
const SearchButton = styled.TouchableOpacity`

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
const SortOrderBadgeComponent = ({ text, selected }) => {
  return (
    <SortOrderBadge selected={selected}>
      <BadgeText selected={selected}>{text}</BadgeText>
    </SortOrderBadge>
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
          <SearchTextInput
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
            <Ionicons name={"search"} size={20} style={{ color: "#42719e", margin: 10 }} />
          </SearchButton>
          <LocationButton onPress={() => navigation.openDrawer()}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Ionicons name={"funnel"} color={"white"} size={12} />
              <ButtonText> 필터</ButtonText>
            </View>
          </LocationButton>
        </SearchBar>
        <View style={{ display: "flex", flexDirection: "row" }}>

        </View>
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
  const [mapShown, setMapShown] = useState(true)
  return (
    <View style={{ backgroundColor: "#f3f3f6", width:"100%" }}>
      <CardView marginBottom={7}>
        <H1Text>필터</H1Text>
        <TouchableOpacity
          onPress={() => props.navigation.toggleDrawer()}
        >
          <Ionicons name={"close-outline"} color={"#1E1E1E"} size={26} />
        </TouchableOpacity>
      </CardView>
      <CardView paddingBottom={1}>
        <View style={{ flexDirection: "row" }}>
          <H2Text>정렬</H2Text>
          <Ionicons name={"swap-vertical"} color={"#1E1E1E"} size={14} />
        </View>
      </CardView>
      <CardView justifyContent="flex-start" marginBottom={2}>
        <SortOrderBadgeComponent text={"추천순"} selected={true}></SortOrderBadgeComponent>
        <SortOrderBadgeComponent text={"리뷰 많은 순"} ></SortOrderBadgeComponent>
        <SortOrderBadgeComponent text={"별점 많은 순"} ></SortOrderBadgeComponent>
        <SortOrderBadgeComponent text={"최근 방문 순"} ></SortOrderBadgeComponent>
      </CardView>

      <CardView paddingBottom={1}>
        <View style={{ flexDirection: "row" }}>
          <H2Text>지역</H2Text>
        </View>
      </CardView>
      <CardView marginBottom={2}>
        <View style={{ width: "100%" }}>
          <SearchMap selected={[0]} ></SearchMap>
        </View>
      </CardView>
      <CardView paddingBottom={1}>
        <View style={{ flexDirection: "row" }}>
          <H2Text>날씨</H2Text>
        </View>
      </CardView>
      <CardView justifyContent="flex-start" marginBottom={2}>
        <SortOrderBadgeComponent text={"전체"} selected={true}></SortOrderBadgeComponent>
        <SortOrderBadgeComponent text={"추울 때"} ></SortOrderBadgeComponent>
        <SortOrderBadgeComponent text={"더울 때"} ></SortOrderBadgeComponent>
        <SortOrderBadgeComponent text={"눈/비 올 때"} ></SortOrderBadgeComponent>
      </CardView>

      <CardView paddingBottom={1}>
        <H2Text>태그</H2Text>
      </CardView>
      <CardView justifyContent="flex-start" marginBottom={2}>
        <SortOrderBadgeComponent text={"#한강"} selected={true}></SortOrderBadgeComponent>
        <SortOrderBadgeComponent text={"#벚꽃축제"} ></SortOrderBadgeComponent>
        <SortOrderBadgeComponent text={"#개인공간"} ></SortOrderBadgeComponent>
        <SortOrderBadgeComponent text={"#이태원맛집"} ></SortOrderBadgeComponent>
        <SortOrderBadgeComponent text={"#가로수길맛집"} selected={true} ></SortOrderBadgeComponent>
        <SortOrderBadgeComponent text={"#실내데이트"} selected={true} ></SortOrderBadgeComponent>
      </CardView>
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
      drawerContent={(props) => <CustomDrawerContent {...{ ...props }} />}
      screenOptions={{
        drawerPosition: 'right', drawerStyle: {
          width: "100%",
          overflow: "visible"
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
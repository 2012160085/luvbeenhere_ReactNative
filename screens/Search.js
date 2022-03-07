
import React, { useCallback, useRef, useState } from "react";
import { BackHandler, Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { gql, useLazyQuery } from "@apollo/client"
import VisitHeader from "../components/VisitHeader";
import VisitDetail from "../components/VisitDetail";
import SearchMap from "../components/SearchMap";
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerStatus,
  getDrawerStatusFromState,
} from '@react-navigation/drawer';
import { fontSet } from "../fonts";
import { getNow } from "../util/DateHandle";
const SEARCH_VISITS = gql`
query searchVisits(
  $query: String
  $sorting: String
  $weather: String
  $area1: String
  $area2: [String]
  $ts : String
){
  searchVisits(
    query: $query
    sorting: $sorting
    weather: $weather
    area1: $area1
    area2: $area2
    ts : $ts
  ) {
    ok
    error
    visits {
      id
      name
      posX
      posY
      comment
      rgeocode
      datetime
      area2
      likeCount
      weather{
        temp
        prcpt60m
      }
      rating{
        value
      }
      date{
        id
        name
      }
      photos{
        id
        posX
        posY
        file
        datetime
      }
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
  fontFamily: ${fontSet.Regular};
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
  border-color: ${(props) => props.selected ? "white" : "#C8CFD6"};
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

const SortOrderBadgeComponent = ({ text, selected, onPress }) => {
  return (
    <SortOrderBadge selected={selected} onPressIn={onPress} activeOpacity={0.8} >
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
const isFilterEmpty = (filter) => {
  return filter.areaMode === 0 &&
    filter.selectedTags.length === 0 &&
    filter.sortOrder === 0 &&
    filter.weather === 0
}
const SearchScreen = ({ navigation, route: { params } }) => {
  console.log("params");
  console.log(params);
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
                  query: searchQuery,
                  ts: getNow()
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
  const [areaMode, setAreaMode] = useState(0)
  const [sortOrder, setSortOrder] = useState(0)
  const [weather, setWeather] = useState(0)
  const [tags, setTags] = useState([
    "한강",
    "벚꽃축제",
    "프라이빗",
    "이태원맛집",
    "가로수길맛집",
    "실내데이트",
    "다이어트",
    "드라이빙",
    "제주당일치기",
    "서울근교",
    "도시락"
  ])
  const [selectedTags, setSelectedTags] = useState([])
  const [regions, setRegions] = useState([])
  useFocusEffect(
    React.useCallback(() => {
      console.log("YES");
      const onBackPress = () => {
        if (getDrawerStatusFromState(props.navigation.getState()) === 'open') {
          props.navigation.setParams({
            sortOrder,
            weather,
            regions,
            areaMode,
            selectedTags
          })
          props.navigation.is
          props.navigation.closeDrawer();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener(
        'hardwareBackPress', onBackPress
      );

      return () => {
        console.log("NO");
        BackHandler.removeEventListener(
          'hardwareBackPress', onBackPress
        );
      }

    }, [sortOrder, weather, regions, areaMode, selectedTags])
  );
  return (
    <View style={{ backgroundColor: "#f3f3f6", width: "100%" }}>
      <CardView marginBottom={7}>
        <H1Text>필터</H1Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.setParams({
              sortOrder,
              weather,
              regions,
              areaMode,
              selectedTags
            })
            props.navigation.closeDrawer();
          }}
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
        {
          ["추천수", "최근 방문 순", "관련도 순"].map((v, i) =>
            <SortOrderBadgeComponent
              key={i}
              text={v}
              selected={sortOrder === i}
              onPress={
                () => {
                  setSortOrder(i)
                }
              }
            />
          )
        }
      </CardView>

      <CardView paddingBottom={1}>
        <View style={{ flexDirection: "row" }}>
          <H2Text>지역</H2Text>
        </View>
      </CardView>
      <CardView justifyContent="flex-start" marginBottom={areaMode === 0 ? 2 : null}>
        {
          ["전체", "서울", "지도에서 선택"].map((v, i) =>
            <SortOrderBadgeComponent
              key={i}
              text={v}
              selected={areaMode === i}
              onPress={
                () => {
                  setAreaMode(i)
                }
              }
            />
          )
        }
      </CardView>
      {
        areaMode === 1 ?
          (<CardView marginBottom={2}>
            <View style={{ width: "100%", alignItems: "flex-start", paddingLeft: 20 }}>
              <SearchMap selected={[]} regions={regions} setRegions={setRegions} ></SearchMap>
            </View>
          </CardView>)
          : null
      }
      <CardView paddingBottom={1}>
        <View style={{ flexDirection: "row" }}>
          <H2Text>날씨</H2Text>
        </View>
      </CardView>
      <CardView justifyContent="flex-start" marginBottom={2}>
        {
          ["전체", "추울 때", "더울 때", "눈/비 올 때"].map((v, i) =>
            <SortOrderBadgeComponent
              key={i}
              text={v}
              selected={weather === i}
              onPress={
                () => {
                  setWeather(i)
                }
              }
            />
          )
        }
      </CardView>

      <CardView paddingBottom={1}>
        <H2Text>추천 태그</H2Text>
      </CardView>
      <CardView justifyContent="flex-start" >
        {tags.map((v, i) =>
          <SortOrderBadgeComponent
            key={i}
            text={v}
            selected={selectedTags.includes(v)}
            onPress={
              () => {
                setSelectedTags(
                  selectedTags.includes(v) ?
                    selectedTags.filter((vv) => vv !== v) :
                    [...selectedTags, v]
                )
              }
            }
          />
        )}
      </CardView>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function Search() {

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...{ ...props, }} />}
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

    </Drawer.Navigator>
  );
}
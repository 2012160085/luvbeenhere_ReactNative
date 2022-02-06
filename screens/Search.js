import React, { useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { TextInput } from "../components/auth/AuthShared";
import { Ionicons } from "@expo/vector-icons";
import { gql, useLazyQuery } from "@apollo/client"
import VisitHeader from "../components/VisitHeader";
import VisitDetail from "../components/VisitDetail";
import SearchMap from "../components/SearchMap";

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
  background-color: white;
`;
const SearchBar = styled.View`
  display: flex;
  flex-direction: row;
`
const SearchOptions = styled.View`
  display: flex;
  flex-direction: row;
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
export default function Search() {
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
        <SearchOptions>
            <LocationButton>
              <ButtonText>지역</ButtonText>
            </LocationButton>
            <CaptionText>서울시 노원구</CaptionText>
        </SearchOptions>
        <SearchMap></SearchMap>
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

import React, { useCallback, useState } from "react";
import * as Progress from 'react-native-progress';
import {
  RefreshControl,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { FlatList, ScrollView } from "react-native";
import Swiper from "react-native-swiper";
import DateCover from "../components/DateCover";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import VisitDetail from "../components/VisitDetail";
import DateDetail from "../components/DateDetailComp";
import DateReport from "../components/DateReport";
import DateFeed from "../components/DateFeed";
import { uploadJob, uploadProgress, uploadState } from "../hooks/postVisit";
import { fontSet } from "../fonts";
import { render } from "react-dom";
import FeedExplorer from "../components/FeedExplorer";
const SEE_DATES = gql`
  query ($skip: Int!, $take: Int!) {
    seeDates(skip: $skip, take: $take) {
      id
      name
      datetime
      visits {
        name
        posX
        posY
        photos {
          file
        }
      }
      couple {
        id
      }
      posX
      posY
      price
      isMine
    }
  }
`;
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default function Feed({ route, navigation }) {
  const screen = useWindowDimensions();
  const progress = useReactiveVar(uploadProgress)
  const job = useReactiveVar(uploadJob)
  const uploading = useReactiveVar(uploadState)
  const { data, loading, refetch } = useQuery(SEE_DATES, {
    variables: {
      take: 5,
      skip: 0,
    },
    fetchPolicy: "cache-and-network",
  });
  const [renderData, setRenderData] = useState([]);
  const renders = (data, uploading) =>
    [
      ...(!uploading ?
        [] :
        [
          <View key={"header_fl"} style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <Text style={{ fontSize: 16, fontFamily: fontSet.SemiBold }}>공릉동 방문 업로드 중</Text>
            <Progress.CircleSnail
              size={25}
              showsText={true}
              indeterminate={true}
              style={{ paddingHorizontal: 10 }}
              strokeCap={"round"}
              duration={700}
            />
          </View>
        ]
      ),
      ...(data?.seeDates ? data.seeDates.map((item, index) => {
        return <DateFeed key={`${index}_fl`} data={item} route={route} navigation={navigation}></DateFeed>
      })
        :
        []
      )
    ]
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = async () => await refetch()

  return (
    <View>
      <View><FeedExplorer></FeedExplorer></View>
      <FlatList
        renderItem={({ item }) => { return item }}
        data={renders(data, uploading)}
        overScrollMode="never"
        onEndReached={() => console.log("EEEEE")}
        onEndReachedThreshold={0.3}
        horizontal={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

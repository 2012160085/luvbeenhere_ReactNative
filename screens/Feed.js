import React, { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import DateCover from "../components/DateCover";
import { gql, useQuery } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import VisitDetail from "../components/VisitDetail";
import DateDetail from "./DateDetail";
import DateReport from "../components/DateReport";
const SEE_DATE = gql`
  query ($id: Int!) {
    seeDate(id: $id) {
      id
      name
      datetime
      visits {
        id
        name
        place {
          id
          name
          posX
          posY
        }
        photos {
          id
          posX
          posY
          file
          datetime
        }
        rating {
          id
          value
        }
        posX
        posY
        comment
      }
      couple {
        id
        user {
          id
          name
          username
          phone
          avatar
          createdAt
          updatedAt
        }
      }
      posX
      posY
      tag {
        id
        name
      }
      weatherTag {
        id
        name
      }
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
export default function Feed() {
  const screen = useWindowDimensions();
  const [contentStyle, setContentStyle] = useState({});
  const { data, loading, refetch } = useQuery(SEE_DATE, {
    variables: {
      id: 5,
    },
    fetchPolicy: "network-only"
  });

  return (
    <DateDetail data={data} loading={loading}/>
  );
}

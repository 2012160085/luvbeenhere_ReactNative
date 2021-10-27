import React, { useEffect } from "react";
import { Text } from "react-native";
import { gql, useQuery } from "@apollo/client";

import ScreenLayout from "../components/ScreenLayout";
import DateCover from "../components/DateCover";

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
export default function DateDetail() {
  // const { data, loading, refetch, fetchMore } = useQuery(SEE_DATE, {
  //   variables: {
  //     id: params?.dateId,
  //   },
  // });
  //console.log(data);
  return <DateCover />;
}

import React from "react";
import { Text, View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import VisitCluster from "../components/VisitCluster";
import VisitMarker from "../components/VisitMarker";
import { gql, useQuery } from "@apollo/client";
import VisitMapView from "../components/VisitMapView";

const SEE_VISITS = gql`
  query {
    seeVisits(xRngFrom: -90, xRngTo: 90, yRngFrom: -180, yRngTo: 180) {
      id
      name
      date {
        id
        name
      }
      place {
        id
        name
      }
      photos {
        id
        file
      }
      rating {
        value
      }
      posX
      posY
      comment
    }
  }
`;

const INITIAL_REGION = {
  latitude: 37.55,
  longitude: 126.99,
  latitudeDelta: 0.25,
  longitudeDelta: 0.25,
};

const App = () => {
  const { data, loading, refetch, fetchMore } = useQuery(SEE_VISITS, {
    variables: {
      
    },
  });
  return (
    <VisitMapView
      initialRegion={INITIAL_REGION}
      data={data}
      loading={loading}
    />
  );
};

export default App;

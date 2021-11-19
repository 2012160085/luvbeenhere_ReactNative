import React, { useRef } from "react";
import MapView from "react-native-map-clustering";
import { Marker, AnimatedRegion, Animated } from "react-native-maps";
import VisitMarker from "../components/VisitMarker";
import VisitCluster from "./VisitCluster";

const VisitMapView = ({ initialRegion, data, loading }) => {
  const MapViewRef = useRef();
  const SuperClusterRef = useRef();
  const animateToRegion = (coord) => {
    let region = {
      latitude: coord.latitude,
      longitude: coord.longitude,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    };

    MapViewRef.current.animateToRegion(region, 500);
  };
  const renderCluster = (cluster) => {
    const markers = SuperClusterRef.current.getLeaves(cluster.id, Infinity);
    const zoom = SuperClusterRef.current.getClusterExpansionZoom(cluster.id);
    const coord = {
      longitude: cluster.geometry.coordinates[0],
      latitude: cluster.geometry.coordinates[1],
    };

    return (
      <Marker
        key={`c${cluster.id}`}
        coordinate={coord}
        onPress={(e) => onPressCluster(e, markers, zoom)}
      >
        <VisitMarker
          text={`${markers[0].properties.data.name}`}
          count={cluster.properties.point_count - 1}
          iconName={"restaurant"}
        />
      </Marker>
    );
  };
  const onPressCluster = (e, markers, zoom) => {
    const coord = e.nativeEvent.coordinate;
    const visitIds = markers.map((marker) => marker.properties.data.id);

    animateToRegion(coord);
  };
  const onPressMarker = (e, visitId) => {
    console.log(visitId);
  };
  return (
    <MapView
      initialRegion={initialRegion}
      style={{ flex: 1 }}
      renderCluster={renderCluster}
      ref={MapViewRef}
      superClusterRef={SuperClusterRef}
      moveOnMarkerPress={false}
    >
      {loading
        ? null
        : data.seeVisits.map((visit) => {
            console.log(visit);
            return (
              <Marker
                key={visit.id}
                coordinate={{
                  latitude: visit.posX,
                  longitude: visit.posY,
                }}
                data={visit}
                onPress={(e) => {
                  onPressMarker(e, visit.id);
                }}
              >
                <VisitMarker text={visit.name} iconName={"restaurant"} />
              </Marker>
            );
          })}
    </MapView>
  );
};

export default VisitMapView;

import React, { useEffect, useRef, useState } from "react";
import MapView from "react-native-map-clustering";
import { Marker, AnimatedRegion, Animated, Polyline, Polygon } from "react-native-maps";

import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import VisitMarker from "./VisitMarker";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import { fontSet } from "../fonts";


const INITIAL_REGION = {
    latitude: 37.55,
    longitude: 126.99,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
};

const Title = styled.Text`
    font-family:${fontSet.Medium};
    font-size:20px;
`;
const LocationBadge = styled.TouchableOpacity`
    background-color: ${(props) => (props.color ? props.color : "white")};
    height:30px;
    borderRadius:60px;
    padding-horizontal: 7px;
    padding-vertical: 2px;
    justify-content: center;
    display: flex;
    elevation: 2;
    margin-right: 3px;
    
`;
const BadgeText = styled.Text`
    font-family:${fontSet.Medium};
    font-size: 15px;
`;
const DateBriefMap = ({ data }) => {
    const screen = useWindowDimensions();
    const mapRef = useRef()
    const [viewMode, setViewMode] = useState(1)
    const locations = data.map((visit) => {
        return {
            latitude: visit.posX,
            longitude: visit.posY
        }
    })
    console.log(locations);

    return (
        <View style={{ backgroundColor: "white" }}>
            <Title>위치 보기</Title>
            <MapView
                initialRegion={INITIAL_REGION}
                style={{ height: 200, marginTop: 10, marginBottom: 5 }}
                moveOnMarkerPress={true}
                pitchEnabled={false}
                scrollEnabled={false}
                clusteringEnabled={false}
                ref={mapRef}
                onLayout={() => mapRef.current.fitToCoordinates(
                    locations,
                    {
                        edgePadding: {
                            top: 20,
                            right: 40,
                            bottom: 20,
                            left: 40,
                        },
                    }
                )}
            >
                {data.map((visit) => {
                    return (
                        <Marker
                            key={visit.id}
                            coordinate={{
                                latitude: visit.posX,
                                longitude: visit.posY,
                            }}
                        >
                            <VisitMarker text={visit.name} iconName={"restaurant"} />
                        </Marker>
                    );
                })}
                <Polyline 
                    coordinates={locations}
                    strokeWidth={2}
                    lineDashPattern={[1]}
                    strokeColor={"tomato"}
                />
            </MapView>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity onPress={() => {
                    setViewMode(1 - viewMode)
                    mapRef.current.fitToCoordinates(
                        locations,
                        {
                            edgePadding: {
                                top: viewMode === 0 ? 20 : 60,
                                right: viewMode === 0 ? 40 : 120,
                                bottom: viewMode === 0 ? 20 : 60,
                                left: viewMode === 0 ? 40 : 120,
                            },
                        }
                    )
                }}>
                    <LocationBadge color={"#fbbc05"} >
                        <BadgeText>경로보기</BadgeText>
                    </LocationBadge>
                </TouchableOpacity>
                {data.map((visit) => {
                    return (
                        <TouchableOpacity key={`lb${visit.id}`} onPress={() => {
                            setViewMode(0)
                            mapRef.current.animateCamera({
                                center: {
                                    latitude: visit.posX,
                                    longitude: visit.posY,
                                },
                                zoom: 17
                            })
                        }}>
                            <LocationBadge >
                                <BadgeText>{visit.name}</BadgeText>
                            </LocationBadge>
                        </TouchableOpacity>
                    )
                })}


            </ScrollView>
        </View>

    );
};
export default DateBriefMap;

import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar ,View, Animated, Easing} from 'react-native';
import styled from "styled-components/native";
import { Rating } from 'react-native-elements';
import Divider from "./Divider";
import { Ionicons } from "@expo/vector-icons";
const Container = styled.View`
    width: 100%;
    align-items: center;
`;
const Title = styled.Text`
    font-family: Pretendard-SemiBold;
    font-size: 24px;
    color: rgb(50,50,50);

    padding-top: 40px;
`;
const LocationLabel = styled.Text`
    font-family: Pretendard-Regular;
    font-size: 13px;
    color: rgb(120,120,120)
    padding-bottom: 15px;
`;
const SemiTitle = styled.Text`
    font-family: Pretendard-SemiBold;
    font-size: 13px;
    color: rgb(90,90,90)
`;
function DateDetailHeader({title,rating,daydate,location,placeLabel,onLayout}){
    return (
        <Container onLayout={onLayout}>
            
            <Title>
                {title}
            </Title>
            <LocationLabel>
                {daydate}
            </LocationLabel>
            <SemiTitle>
                위치
            </SemiTitle>
            <View style={{flexDirection:"row"}}>
            <LocationLabel>
                {location}
            </LocationLabel>
            <Ionicons name={"ios-location"} size={17} color={"#e65f70"} />
            </View>
            
            <SemiTitle>
                평균 별점
            </SemiTitle>
            <Rating
                type='star'
                ratingCount={5}
                startingValue={rating} 
                imageSize={20}
                readonly
                />
            <View style={{margin:10}}/>
            <SemiTitle>
                방문
            </SemiTitle>
            <LocationLabel>
                {placeLabel ? placeLabel : '장소없음'}
            </LocationLabel>
            <Divider color={"rgb(228,86,103)"} margin={30}><Ionicons name={"ios-trail-sign-outline"} size={25} color={"rgb(228,86,103)"} /></Divider>
        

        </Container>
        
    )
}

export default DateDetailHeader;
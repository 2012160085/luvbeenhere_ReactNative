import React, { useRef, useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
    display:flex;
    flex-direction: row;
`
const Column = styled.View`
    display:flex;
    flex-direction: column;
`
const EmptyCell = styled.View`
    width: 40px;
    height: 36px;
    background-color: white;
    margin: 3px;
`
const ColorCell = styled.TouchableOpacity`
    width: 40px;
    height: ${(props) => (props.space ? props.space : 1) * 42 - 6}px;
    background-color: ${(props) => props.color};
    margin: 3px;
`
const CellText = styled.Text`
    font-size: 12px;
    color: ${(props) => props.color};
`
function SearchMap() {
    return (
        <Container>
            <Column>
                <EmptyCell />
                <EmptyCell />
                <EmptyCell />
                <ColorCell color={"#A66658"} >
                    <CellText color="white">
                        강서{'\n'}양천
                    </CellText>
                </ColorCell>
                <EmptyCell />
                <EmptyCell />
            </Column>
            <Column>
                <EmptyCell />
                <ColorCell color={"#EB9331"} >
                    <CellText color="black">
                        은평{'\n'}서대문
                    </CellText>
                </ColorCell>
                <ColorCell color={"#FDC76F"} >
                    <CellText color="black">
                        마포
                    </CellText>
                </ColorCell>
                <ColorCell color={"#A66658"} >
                    <CellText color="white">
                        영등포
                    </CellText>
                </ColorCell>
                <ColorCell color={"#A64638"} >
                    <CellText color="white">
                        구로{'\n'}금천
                    </CellText>
                </ColorCell>
                <EmptyCell />
            </Column>
            <Column>
                <EmptyCell />
                <ColorCell color={"#EB9331"} >
                    <CellText color="black">
                        종로
                    </CellText>
                </ColorCell>
                <ColorCell color={"#FDC76F"} >
                    <CellText color="black">
                        중구
                    </CellText>
                </ColorCell>
                <ColorCell color={"#A66658"} >
                    <CellText color="white">
                        용산
                    </CellText>
                </ColorCell>
                <ColorCell color={"#A64638"} >
                    <CellText color="white">
                        동작
                    </CellText>
                </ColorCell>
                <ColorCell color={"#BF584E"} >
                    <CellText color="white">
                        관악
                    </CellText>
                </ColorCell>
            </Column>
            <Column>
                <ColorCell color={"#EB9331"} >
                    <CellText color="black">
                        강북
                    </CellText>
                </ColorCell>
                <ColorCell color={"#EB9331"} >
                    <CellText color="black">
                        성북
                    </CellText>
                </ColorCell>
                <ColorCell color={"#FDC76F"} space={2} >
                    <CellText color="black">
                        동대문{'\n'}성동
                    </CellText>
                </ColorCell>
                <ColorCell color={"#A64638"} space={2}>
                    <CellText color="white">
                        서초
                    </CellText>
                </ColorCell>
            </Column>
            <Column>
                <ColorCell color={"#EB9331"} space={2}>
                    <CellText color="black">
                        도봉{'\n'}노원
                    </CellText>
                </ColorCell>
                <ColorCell color={"#FDC76F"} >
                    <CellText color="black">
                        중랑{'\n'}광진
                    </CellText>
                </ColorCell>
                <ColorCell color={"#A66658"} space={2}>
                    <CellText color="white">
                        강남
                    </CellText>
                </ColorCell>
                <EmptyCell />
            </Column>
            <Column>
                <EmptyCell />
                <EmptyCell />
                <EmptyCell />
                <ColorCell color={"#A66658"} >
                    <CellText color="white">
                        강동
                    </CellText>
                </ColorCell>
                <ColorCell color={"#A64638"} >
                    <CellText color="white">
                        송파
                    </CellText>
                </ColorCell>
                <EmptyCell />
            </Column>
        </Container>
    )

}

export default SearchMap;

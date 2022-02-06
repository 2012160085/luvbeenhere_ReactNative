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
    height: 35px;
    background-color: white;
    margin: 3px;
`
const ColorCell = styled.View`
    width: 40px;
    height: 35px;
    border: 1px ${(props) => props.color};
    margin: 3px;
    clip-path
`
function SearchMap() {
    return (
        <Container>
            <Column>
                <EmptyCell />
                <EmptyCell />
                <EmptyCell />
                <ColorCell color={"#D8E3F2"} />
                <EmptyCell />
                <EmptyCell />
            </Column>
            <Column>
                <EmptyCell />
                <ColorCell color={"#F2CA50"} />
                <ColorCell color={"#F2B950"} />
                <ColorCell color={"#A66658"} />
                <ColorCell color={"#A64638"} />
                <EmptyCell />
            </Column>
            <Column>
                <EmptyCell />
                <ColorCell color={"#F2CA50"} />
                <ColorCell color={"#F2B950"} />
                <ColorCell color={"#A66658"} />
                <ColorCell color={"#A64638"} />
                <ColorCell color={"#BF584E"} />
            </Column>
            <Column>
                <ColorCell color={"#F2CA50"} />
                <ColorCell color={"#F2CA50"} />
                <ColorCell color={"#F2B950"} />
                <ColorCell color={"#A66658"} />
                <ColorCell color={"#A64638"} />
                <ColorCell color={"#BF584E"} />
            </Column>
            <Column>
                <ColorCell color={"#F2CA50"} />
                <ColorCell color={"#F2CA50"} />
                <ColorCell color={"#F2B950"} />
                <ColorCell color={"#A66658"} />
                <ColorCell color={"#A64638"} />
                <EmptyCell />
            </Column>
            <Column>
                <EmptyCell />
                <EmptyCell />
                <EmptyCell />
                <ColorCell color={"#A66658"} />
                <ColorCell color={"#A64638"} />
                <EmptyCell />
            </Column>
        </Container>
    )

}

export default SearchMap;

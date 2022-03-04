import React, { useRef, useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";


const Container = styled.View`

    flex-direction: row;

`
const Column = styled.View`
    display:flex;
    flex-direction: column;
`
const EmptyCell = styled.View`
    width: 35px;
    height: 30px;
    background-color: white;
    margin: 2px;
`
const ColorCell = styled.TouchableOpacity`
    width: 35px;
    height: ${(props) => (props.space ? props.space : 1) * (30 + 4) - 4}px;
    background-color: ${(props) => props.selected ? "#3B64F9" : "white"};
    margin: 2px;
    border-radius: 8px;
    align-items: center;
    justify-content: flex-start;
    border-width: 1px;
    border-color: ${(props) => props.selected ? "white" : "#C8CFD6"};
`
const CellText = styled.Text`
    font-size: 11px;
    color: ${(props) => props.selected ? "white" : "#1e1e1e"};
    margin-bottom: -2px;
    
`
const Cell = ({ selected, texts, space, onPress }) => {
    return <ColorCell selected={selected} space={space} onPress={onPress}>
        {texts.map((v) => <CellText selected={selected} key={v}>
            {v}
        </CellText>)}
    </ColorCell>
}
export const areaGroup = {
    0: null,
    1: ["강서구", "양천구"],
    2: ['은평', '서대문'],
    3: ['마포'],
    4: ['영등포'],
    5: ['구로', '금천'],
    6: ['종로'],
    7: ['중구'],
    8: ['용산'],
    9: ['동작'],
    10: ['관악'],
    11: ['강북'],
    12: ['성북'],
    13: ['동대문', '성동'],
    14: ['서초'],
    15: ['도봉', '노원'],
    16: ['중랑', '광진'],
    17: ['강남'],
    18: ['강동'],
    19: ['송파']
}
const toggleArea = (regions, setRegions, n) => {
    if (!regions.includes(n)) {
        setRegions([...regions, n])
    } else {
        setRegions(regions.filter((v, i, a) => v !== n))
    }
}
function SearchMap({ selected, regions, setRegions }) {
    return (
        <Container>
            <Column>
                <EmptyCell />
                <EmptyCell />
                <EmptyCell />
                <Cell selected={regions.includes(1)} texts={['강서', '양천']} onPress={() => toggleArea(regions, setRegions, 1)} />
                <EmptyCell />
                <EmptyCell />
            </Column>
            <Column>
                <EmptyCell />
                <Cell selected={regions.includes(2)} texts={['은평', '서대문']} onPress={() => toggleArea(regions, setRegions, 2)} />
                <Cell selected={regions.includes(3)} texts={['마포']} onPress={() => toggleArea(regions, setRegions, 3)} />
                <Cell selected={regions.includes(4)} texts={['영등포']} onPress={() => toggleArea(regions, setRegions, 4)} />
                <Cell selected={regions.includes(5)} texts={['구로', '금천']} onPress={() => toggleArea(regions, setRegions, 5)} />
                <EmptyCell />
            </Column>
            <Column>
                <EmptyCell />
                <Cell selected={regions.includes(6)} texts={['종로']} onPress={() => toggleArea(regions, setRegions, 6)} />
                <Cell selected={regions.includes(7)} texts={['중구']} onPress={() => toggleArea(regions, setRegions, 7)} />
                <Cell selected={regions.includes(8)} texts={['용산']} onPress={() => toggleArea(regions, setRegions, 8)} />
                <Cell selected={regions.includes(9)} texts={['동작']} onPress={() => toggleArea(regions, setRegions, 9)} />
                <Cell selected={regions.includes(10)} texts={['관악']} onPress={() => toggleArea(regions, setRegions, 10)} />
            </Column>
            <Column>
                <Cell selected={regions.includes(11)} texts={['강북']} onPress={() => toggleArea(regions, setRegions, 11)} />
                <Cell selected={regions.includes(12)} texts={['성북']} onPress={() => toggleArea(regions, setRegions, 12)} />
                <Cell selected={regions.includes(13)} texts={['동대문', '성동']} space={2} onPress={() => toggleArea(regions, setRegions, 13)} />
                <Cell selected={regions.includes(14)} texts={['서초']} space={2} onPress={() => toggleArea(regions, setRegions, 14)} />
            </Column>
            <Column>
                <Cell selected={regions.includes(15)} texts={['도봉', '노원']} space={2} onPress={() => toggleArea(regions, setRegions, 15)} />
                <Cell selected={regions.includes(16)} texts={['중랑', '광진']} onPress={() => toggleArea(regions, setRegions, 16)} />
                <Cell selected={regions.includes(17)} texts={['강남']} space={2} onPress={() => toggleArea(regions, setRegions, 17)} />
                <EmptyCell />
            </Column>
            <Column>
                <EmptyCell />
                <EmptyCell />
                <EmptyCell />
                <Cell selected={18 in selected} texts={['강동']} onPress={() => toggleArea(regions, setRegions, 18)} />
                <Cell selected={19 in selected} texts={['송파']} onPress={() => toggleArea(regions, setRegions, 19)} />
                <EmptyCell />
            </Column>
        </Container>

    )

}

export default SearchMap;

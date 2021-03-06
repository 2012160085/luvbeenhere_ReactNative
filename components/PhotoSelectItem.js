import React from "react";
import { Image, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "react-native-elements";
import styled from "styled-components";
import { colors } from "../colors";
const OrderIconContainer = styled.View`
  position: absolute;
  bottom: 3px;
  right: 3px;
  z-index: 2;
`;
const IconContainer = styled.View`
  position: absolute;
  bottom: 3px;
  right: 3px;
  z-index: 2;
`;
const ImageContainer = styled.TouchableWithoutFeedback``;
const WhiteView = styled.View`
    position: absolute;
    width : 100%;
    height : 100%;
    z-index: 1;
    background-color: rgba(255,255,255,0.5);
`;

const MemoImage = React.memo(Image, (prevProps, nextProps) => (
    prevProps.source.uri === nextProps.source
))
export default PhotoSelectItem = ({ photo, style, multiSelect, selected, order, onPress, showing , onPressIn, rerender}) => {
    console.log("PHOTO SELECT ITEM RERENDER");
    return <ImageContainer onPress={onPress} onPressIn = {onPressIn}>
        <View>
            {showing ? <WhiteView /> : null}

            <MemoImage
                source={{ uri: photo.uri }}
                style={style}
            />
            {!multiSelect ? (
                <IconContainer>
                    <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={selected ? colors.blue : "white"}
                    />
                </IconContainer>
            ) : (
                <OrderIconContainer>
                    <Badge
                        value={order + 1}
                        badgeStyle={{ borderWidth: 0, backgroundColor: order >= 0 ? colors.blue : "white" }}
                    />
                </OrderIconContainer>
            )}
        </View>
    </ImageContainer>
}
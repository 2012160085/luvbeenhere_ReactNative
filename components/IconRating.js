import React, { forwardRef, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import { TouchableWithoutFeedback, Animated, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IconRating = (
  { iconName, iconSize, selectedColor, defaultColor, ratingCount, onRating },
  ref
) => {
  const [value, setValue] = useState(0);
  const count = [...Array(ratingCount).keys()];

  return (
    <Container>
      {count.map((e) => (
        <TouchableOpacity
          style={{ marginHorizontal: 2 }}
          key={e}
          onPressIn={() => {
            setValue(e + 1 === value ? 0 : e + 1);
            onRating(e + 1 === value ? 0 : e + 1);
          }}
        >
          <Ionicons
            name={iconName}
            color={value > e ? selectedColor : defaultColor}
            size={iconSize}
          />
        </TouchableOpacity>
      ))}
    </Container>
  );
};

export default forwardRef(IconRating);

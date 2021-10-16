import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Button = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 15px 10px;
  border-radius: 3px;
  width: 80px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  margin-bottom : 15px
  margin-left : 15px;
  justify-content : center;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

export default function SendButton({ onPress, disabled, text, loading, count }) {

  
  const TimerText = () => {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;
    return `${minutes}:${Math.floor(seconds / 10)}${seconds % 10}`;
  };
  

  return (
    <Button disabled={count ? true : disabled} onPress={e => {onPress(e); }}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{count ? TimerText() : text}</ButtonText>
      )}
    </Button>
  );
}

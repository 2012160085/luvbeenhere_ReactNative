import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { PhoneInput, TextInput } from "../components/auth/AuthShared";
import styled from "styled-components";
import { colors } from "../colors";
import SendButton from "../components/auth/SendButton";
import Spacer from "../components/Spacer";

const Container = styled.View`
  position: absolute;
  right: 0;
  height: 100%;
  width: 100px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;
const AuthTimeLeft = styled.Text`
  color: #4285f4db;
  font-size: 16px;
  margin-right: 10px;
`;
const TimerText = (count) => {
  const minutes = Math.floor(count / 60);
  const seconds = count % 60;
  return `${minutes}:${Math.floor(seconds / 10)}${seconds % 10}`;
};

const Timer = ({ onComplete }, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      setFromOutside(time) {
        setSeconds(time);
      },
    }),
    []
  );
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        if(seconds === 1){
          console.log("EXPIRED");
          onComplete();
        }
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [seconds]);

  return (
    <Container>
      {seconds ? <AuthTimeLeft>{TimerText(seconds)}</AuthTimeLeft> : null}
    </Container>
  );
};
export default forwardRef(Timer);

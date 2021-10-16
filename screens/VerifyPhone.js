import React, { useRef, useState } from "react";
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
import Timer from "../components/Timer";
import { Text, View } from "react-native";
import { codeTable } from "../util/ErrorCodes";
import { StackActions } from "@react-navigation/routers";

const VERIFY_PHONE_MUTATION = gql`
  mutation ($phone: String!, $auth: String!) {
    verifyPhone(phone: $phone, auth: $auth) {
      ok
      error
      token
    }
  }
`;
const CREATE_PHONE_VERIFY = gql`
  mutation createPhoneVerifySMS($phone: String!) {
    createPhoneVerifySMS(phone: $phone) {
      ok
      error
    }
  }
`;
const placeholderTextColor = "rgba(0, 0, 0, 0.3)";
const PhoneInputContainer = styled.View`
  flex-direction: row;
`;

const onNext = (nextOne) => {
  nextOne?.current?.focus();
};

export default function CreateAccount({ navigation }) {
  useEffect(() => {
    register("phone", {
      required: true,
      minLength: 10,
      maxLength: 11,
    });
  }, [register]);
  useEffect(() => {
    authRegister("auth", {
      required: true,
      minLength: 6,
      maxLength: 6,
    });
  }, [authRegister]);

  const timerRef = useRef();
  const phoneRef = useRef();
  const authRef = useRef();

  const [sentSMS, setSentSMS] = useState(false);
  const [authPhoneNumber, setAuthPhoneNumber] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const { register, handleSubmit, setValue, getValues, watch, reset } =
    useForm();
  const {
    register: authRegister,
    handleSubmit: authHandleSubmit,
    setValue: authSetValue,
    getValues: authGetValue,
    watch: authWatch,
    reset: authReset,
  } = useForm();

  const onSendCompleted = (data) => {
    const {
      createPhoneVerifySMS: { ok, error },
    } = data;
    if (ok) {
      timerRef.current.setFromOutside(180);
      setSentSMS(true);
    }else{
      setErrorCode(error);
      console.log(codeTable[error]);
    }
  };

  const [createPhoneVerifySMS, { loading: sendLoading }] = useMutation(
    CREATE_PHONE_VERIFY,
    {
      onCompleted: onSendCompleted,
    }
  );
  const [verifyPhone, { loading: authLoading }] = useMutation(
    VERIFY_PHONE_MUTATION,
    {
      onCompleted: (data) => {
        const {
          verifyPhone: { ok, error, token },
        } = data;
        if (ok) {
          navigation.dispatch(
            StackActions.replace("CreateAccount", {
              phone: authPhoneNumber,
              token,
            })
          );
        } else {
          setErrorCode(error);
          console.log(codeTable[error]);
        }
      },
    }
  );

  const onAuthValid = (data) => {
    if (!authLoading) {
      verifyPhone({
        variables: {
          auth: data.auth,
          phone: authPhoneNumber,
        },
      });
    }
  };

  const onPhoneValid = (data) => {
    if (!sendLoading) {
      setAuthPhoneNumber(data.phone);
      createPhoneVerifySMS({
        variables: {
          ...data,
        },
      });
    }
  };

  const onExpire = () => {
    setSentSMS(false);
  };

  const clearScreen = () => {
    phoneRef.current.clear();
    authRef.current.clear();
    setSentSMS(false);
    timerRef.current.setFromOutside(0);
    authSetValue("auth", "");
    setValue("phone", "");
  };
  return (
    <AuthLayout>
      <PhoneInputContainer>
        <PhoneInput
          ref={phoneRef}
          placeholder="휴대폰 번호 입력"
          keyboardType="number-pad"
          returnKeyType="done"
          lastOne={true}
          placeholderTextColor={placeholderTextColor}
          onChangeText={(text) => setValue("phone", text)}
          onSubmitEditing={() => {
            handleSubmit(onPhoneValid)();
            onNext(authRef);
          }}
        />

        <SendButton
          text={sentSMS ? "재전송" : "인증"}
          disabled={sendLoading || !watch("phone")}
          onPress={() => {
            handleSubmit(onPhoneValid)();
            onNext(authRef);
          }}
          loading={sendLoading}
          count={0}
        />
      </PhoneInputContainer>
      <View>
        <TextInput
          ref={authRef}
          placeholder="인증번호"
          keyboardType="number-pad"
          returnKeyType="done"
          lastOne={true}
          placeholderTextColor={placeholderTextColor}
          onChangeText={(text) => authSetValue("auth", text)}
          onSubmitEditing={authHandleSubmit(onAuthValid)}
        />
        <Timer ref={timerRef} timeRemain={10} onComplete={onExpire}></Timer>
      </View>

      <AuthButton
        text="다음"
        disabled={!sentSMS || !authWatch("auth")}
        onPress={authHandleSubmit(onAuthValid)}
      />
      {errorCode ? <Text>{codeTable[errorCode]}</Text> : null}
    </AuthLayout>
  );
}

import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { StackActions } from "@react-navigation/routers";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation (
    $name: String!
    $username: String!
    $password: String!
    $phone: String!
    $auth: String!
  ) {
    createAccount(
      name: $name
      username: $username
      phone: $phone
      password: $password
      auth: $auth
    ) {
      ok
      error
    }
  }
`;
const placeholderTextColor = "rgba(0, 0, 0, 0.3)";
export default function CreateAccount({ route: { params }, navigation }) {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    const { username, password, name } = getValues();
    console.log(data);
    if (ok) {
      navigation.dispatch(
        StackActions.replace("LogIn", {
          username: data.username,
          password: data.passowrd,
        })
      );
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
  const nameRef = useRef();
  const passwordConfirmRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      console.log("___________");
      console.log(data);
      console.log(params);
      createAccountMutation({
        variables: {
          name: data.name,
          username: data.username,
          phone: params.phone,
          password: data.password,
          auth: params.token,
        },
      });
    }
  };

  useEffect(() => {
    console.log("from phoneverify");
    console.log(params);
    register("username", {
      required: true,
    });
    register("name", {
      required: true,
    });
    register("password", {
      required: true,
    });
    register("passwordConfirm", {
      required: true,
    });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        placeholder="아이디"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(nameRef)}
        placeholderTextColor={placeholderTextColor}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        ref={nameRef}
        placeholder="남에게 보여질 이름(언제든 바꿀 수 있어요)"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        placeholderTextColor={placeholderTextColor}
        onChangeText={(text) => setValue("name", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="비밀번호"
        autoCapitalize="none"
        returnKeyType="next"
        secureTextEntry
        onSubmitEditing={() => onNext(passwordConfirmRef)}
        placeholderTextColor={placeholderTextColor}
        onChangeText={(text) => setValue("password", text)}
      />

      <TextInput
        ref={passwordConfirmRef}
        placeholder="비밀번호 확인"
        autoCapitalize="none"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={placeholderTextColor}
        onChangeText={(text) => setValue("passwordConfirm", text)}
        onSubmitEditing={handleSubmit(onValid)}
      />

      <AuthButton
        text="Create Account"
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}

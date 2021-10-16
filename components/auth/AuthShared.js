import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  background-color: #4285f424;
  padding: 15px 7px;
  border-radius: 4px;
  color: black;
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
`;

export const PhoneInput = styled.TextInput`
  background-color: #4285f424;
  padding: 15px 7px;
  border-radius: 4px;
  flex: 3
  color: black;
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
`;
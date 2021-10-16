import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-elements";

const VisitCluster = ({ coord, size, count, onPress }) => {
  return (
    <Marker coordinate={coord} onPress={onPress} >
      <View>
        <Ionicons name={"chatbubble"} color={"white"} size={size} />
        <Ionicons
          name={"chatbubble-outline"}
          color={"#fec1bb"}
          size={size}
          style={{ position: "absolute" }}
        />
        <Ionicons
          name={"heart"}
          color={"red"}
          size={16}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginLeft: -8,
            marginTop: -8,
          }}
        />
        <View
          style={{
            position: "absolute",
            left: "100%",
            marginLeft: -15,
            backgroundColor: "#fec1bb",
            borderRadius: 10,
          }}
        >
          <Text style={{color:"red"}}> +{count} </Text>
        </View>
      </View>
    </Marker>
  );
};

export default VisitCluster;

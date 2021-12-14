import Slider from "@react-native-community/slider";
import React from "react";
import { View } from "react-native";

const FeedExplorer = () => {
    return (<View>
        <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
        />
    </View>)
}

export default FeedExplorer
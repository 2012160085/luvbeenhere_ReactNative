import React from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar ,View, Animated, Easing} from 'react-native';
function Divider({color, margin, children}){
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor:"white"}}>
           
            <View style={{flex: 1, height: 1, backgroundColor: color , margin: margin}} />
                <View>
                    {children}
                </View>
            <View style={{flex: 1, height: 1, backgroundColor: color , margin: margin}} />
           
        </View>
    )
}
export default Divider;
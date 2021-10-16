import React, { Children, useEffect, useRef,useState } from "react";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView } from "react-native";




const StickyNav = ({visible,children}) => {
    // fadeAnim will be used as the value for opacity. Initial Value: 0
    const fadeAnim = useRef(new Animated.Value(0)).current;


    const [show,setShow] = useState(false)

    const fadeIn = () => {

      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    };
  
    const fadeOut = () => {

      // Will change fadeAnim value to 0 in 3 seconds
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();
    };
    useEffect(() => {
        if(visible){
            fadeIn() ;
        }
        else{
            fadeOut() ;
        }
    });
    return (
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              // Bind opacity to animated value
              opacity: fadeAnim
            }
          ]}
        >
          {children}
        </Animated.View>
    );
  }
  
  const styles = StyleSheet.create({
    fadingContainer: {
      position: "absolute",
      height: "100%",
      width: "100%",
      borderBottomColor:"#e65d6e",
      borderBottomWidth: 1
    }
  });
  
export default StickyNav;
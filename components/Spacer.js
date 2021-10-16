import React, { useEffect, useRef, useState } from "react";

import {View} from 'react-native';
function Spacer({width,height}){
    return ( 
        <View style={{
            width,
            height
        }} />
    )
    
}

export default Spacer;
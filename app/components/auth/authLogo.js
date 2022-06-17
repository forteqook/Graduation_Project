import React from "react";
import {
    View,
    Image
} from 'react-native';

import LogoImage from '../../assets/images/logo_sample.png';

const LogoComponent = () => (
    <View style={{alignItems:'center', marginBottom:30}}>
        <Image
            source={LogoImage}
            style={{
                resizeMode: "contain",
                height: '50%'
            }}
        />
    </View>
)

export default LogoComponent;
import React from 'react';
import {
    View,
    ScrollView
} from 'react-native';

const ScrollPageForm = (props) => (
    <View style={{ flex: 1, backgroundColor: props.backgroundColor }}>
        <ScrollView style={{ flex:1, margin:30, marginBottom: props.marginBottom }}>{props.render}</ScrollView>
        {props.buttonBottom}
    </View>
)

export default ScrollPageForm;
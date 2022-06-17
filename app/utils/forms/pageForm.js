import React from 'react';
import {
    View,
    ScrollView
} from 'react-native';

const PageForm = (props) => (
    <View style={{ flex: 1, backgroundColor: props.backgroundColor }}>
        <View style={{ flex:1, margin:30, marginBottom: props.marginBottom }}>{props.render}</View>
        {props.buttonBottom}
    </View>
)

export default PageForm;
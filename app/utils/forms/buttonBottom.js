import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    TouchableHighlight,
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ButtonBottom = (props) => {
    return (
            <TouchableHighlight
                onPress={props.onPress}
                disabled={props.disabled}
                style={[ styles.button, {
                    backgroundColor: props.disabled ? 'gray' : props.color,
                    bottom: 0
                }]}
                underlayColor='gray'
            >
                <Text style={{ fontSize:15, color: 'white' }}>{props.title}</Text>
            </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 60,
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default ButtonBottom;
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native';

const ButtonCommon = (props) => {
    const disabled = props.disabled ?? false;
    return (
        <TouchableHighlight
            onPress={props.onPress}
            style={[ styles.button, {
                backgroundColor: disabled ? '#d9d9d9' : 'white',
                borderColor: disabled ? '#bababa' : '#0FC760'
            }]}
            underlayColor='#dbdbdb'
        >
            <Text style={[ styles.text, { color: disabled ? '#bababa' : '#0FC760' } ]}>{props.text}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 60,
        width: '100%',
        borderRadius: 15,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 17,
        fontWeight: '500',
    }
})

export default ButtonCommon;
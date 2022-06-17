import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

const ButtonSettings = (props) => {
    return (
        <TouchableHighlight
            onPress={props.onPress}
            style={ styles.button }
            underlayColor='#dbdbdb'
        >
            <View style={{ marginLeft:10 }}>
                <Text style={[ styles.text, { color: props.textColor ?? 'black' } ]}>{props.title}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 57,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#ededed',
        borderRadius: 15,
        borderWidth: 1,
        // alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
    }
})

export default ButtonSettings;
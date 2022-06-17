import React from 'react';
import {
    View,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
    Text
} from 'react-native';

const InputPageForm = (props) => (
    <KeyboardAvoidingView style={{ flex:1, backgroundColor:'white' }} behavior={Platform.OS === 'ios' ? 'padding':'height'} enabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex:1, margin:30, marginBottom: props.marginBottom }}>
                {props.render}
            </View>
        </TouchableWithoutFeedback>
        {props.buttonBottom}
    </KeyboardAvoidingView>
)

export default InputPageForm;
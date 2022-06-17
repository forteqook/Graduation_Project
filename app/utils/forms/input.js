import React from "react";
import {
    StyleSheet,
    TextInput,
    View,
    Text
} from 'react-native';

//레이아웃과 스타일 작업이 필요할 것 같습니다!
const input = (props) => {
    let template = null;
    switch(props.inputType) {
        case "textInput" :
            template =
                <>
                    <View style={ styles.titleContainer }>
                        <Text style={ styles.title }>{props.title}</Text>
                    </View>

                    <TextInput
                        {...props}
                        style={styles.input}
                    />
                    {props.valid != null ? (props.valid || props.isBlank) ?           //valid라는 props를 받았다는 전제 하에, 입력이 규칙에 맞지 않고 AND 비어있지 않을때
                            null
                        :
                            <Text>옳바르지 않은 {props.type} 형식입니다.</Text>             //다음과 같은 텍스트를 출력합니다.
                    : null}
                </>
        break;
        default :
            return template
    }
    return template
}

const styles = StyleSheet.create({
    input: {
        width:'100%',
        height: 50,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#F3F3F3',
        backgroundColor: '#FFFFFF',
        fontSize:15,
    },
    titleContainer: {
        marginBottom: 5
    },
    title: {
        fontWeight: '600',
        fontSize: 14,
        color: 'black'
    }
});

export default input;
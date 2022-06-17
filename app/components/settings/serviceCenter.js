import React, {Component} from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
} from 'react-native';

import PageForm from '../../utils/forms/pageForm';
import ButtonCommon from '../../utils/forms/buttonCommon';
import ButtonSettings from '../../utils/forms/buttonSettings';

class ServiceCenter extends Component {
    render () {
        return (
            <PageForm
                render={(
                    <>
                    <View>
                        <ButtonSettings
                            title='이메일 문의'
                            onPress={() => alert('under construction!')}
                        />
                    </View>
                    
                    <View style={ styles.buttonContainer }>
                        <ButtonSettings
                            title='나의 문의내역'
                            onPress={() => alert('under construction!')}
                        />
                    </View>

                    <View style={ styles.buttonContainer }>
                        <ButtonCommon
                            text='고객안심센터 연결하기'
                            onPress={() => alert('under construction!')}
                        />
                    </View>
                    </>
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 20
    }
})

export default ServiceCenter;
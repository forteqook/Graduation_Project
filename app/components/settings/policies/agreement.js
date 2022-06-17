import React, {useState} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import Scooter from '../../../assets/images/scooter.png';
import ButtonBottom from '../../../utils/forms/buttonBottom';

const Agreement = ({navigation}) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex:1, margin: 30, marginBottom: 80 }}>
                <View style={ styles.topViewContainer }>
                    <View style={{ flexDirection:'row' }}>
                        <Text style={ [styles.topText, { fontWeight:'bold' }] }>바빌키</Text>
                        <Text style={ styles.topText }>에 원활한 서비스</Text>
                    </View>

                    <View>
                        <Text style={ styles.topText }>이용을 위해 약관에</Text>
                    </View>

                    <View>
                        <Text style={ styles.topText }>동의해 주세요</Text>
                    </View>
                </View>

                <View style={ styles.midViewContainer }>
                    <Image
                        source={Scooter}
                        style={{ resizeMode: 'contain', height: '55%' }}
                    />
                </View>

                <View style={ styles.bottomViewContainer }>
                    <View style={ styles.checkContainer }>
                            <CheckBox
                                disabled={false}
                                value={toggleCheckBox}
                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                style={{ flex: 0.1, }}
                                tintColors={{true: '#0FC760'}}
                            />

                        <View style={{ flex:0.9 }}>
                            <Text style={{ fontSize:18, fontWeight:'bold', color:'black' }}>서비스 이용 약관에 동의합니다.</Text>
                        </View>
                    </View>

                    <View style={ styles.policiesContainer }>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Policies", { screen: 'ServiceTerms' }) }}
                            style={{ flex:2, alignItems: 'flex-end' }}
                        >
                            <Text style={ styles.bottomText }>babil 이용약관</Text>
                        </TouchableOpacity>

                        <Text>, </Text>
                        
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Policies", { screen: 'PersonalInfoTerms' }) }}
                            style={{ flex:3, alignItems:'flex-start' }}
                        >
                            <Text style={ styles.bottomText }>babil 개인정보 제3자 동의</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            <ButtonBottom
                title='확인'
                color='#0FC760'
                onPress={()=>{navigation.navigate("AuthForm", {type: 'register', action: '다음'})}}
                disabled = {!toggleCheckBox}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    topViewContainer: {
        flex: 2
    },
    midViewContainer: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomViewContainer: {
        flex: 1
    },
    checkContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    policiesContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
    },
    topText: {
        fontSize: 24,
        color: 'black'
    },
    bottomText: {
        fontSize: 15,
        textDecorationLine: 'underline'
    },
})

export default Agreement;
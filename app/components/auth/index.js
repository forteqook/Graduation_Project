import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';

import Scooter from '../../assets/images/scooter.png';
import NaverLogin from '../../assets/images/btnG_완성형.png';
import KaKaoLogin from '../../assets/images/kakao_login_large_narrow.png';
import GoogleLogin from '../../assets/images/btn_google_signin_light_normal_web.png';

class AuthComponent extends Component {
    render () {
        return (
            <View style={{ flex:1, backgroundColor: 'white' }}>
                <View style={{ flex: 1, margin: 30 }}>
                    <View style={styles.topViewContainer}>
                        <View style={styles.textViewContainer}>
                            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#0FC760'}}> 바빌</Text>
                            <Text style={styles.topText}>이제 오토바이도</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.topText, {fontWeight:'bold'}]}>휴대폰</Text>
                                <Text style={styles.topText}>으로 </Text>
                                <Text style={[styles.topText, {fontWeight:'bold'}]}>간편하게,</Text>
                            </View>
                            <Text style={styles.topText}>바빌키</Text>
                        </View>
                    </View>
                    
                    <View style={styles.midViewContainer}>
                        <View style={{ marginBottom:5 }}>
                            <Image
                                source={Scooter}
                                style={{resizeMode:'contain', height:'80%'}}
                            />
                        </View>
                    </View>

                    <View style={styles.bottomViewContainer}>
                        <View style={styles.buttonsContainer}>
                            <View style={styles.button}>
                                <Image
                                    source={NaverLogin}
                                    style={{resizeMode:'contain', height: '100%'}}
                                />
                            </View>

                            <View style={styles.button}>
                                <Image
                                    source={KaKaoLogin}
                                    style={{resizeMode:'contain', height: '100%'}}
                                />
                            </View>

                            <View style={styles.button}>
                                <Image
                                    source={GoogleLogin}
                                    style={{resizeMode:'contain', height: '100%'}}
                                />
                            </View>
                        </View>

                        <View style={styles.emailAuthContainer}>
                            <View>
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.props.navigation.navigate("AuthForm", {type: 'login', action: '로그인'})
                                    }}
                                >
                                    <Text style={styles.authText}>이메일 로그인       </Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <Text> | </Text>
                            </View>
                        
                            <View>
                                <TouchableOpacity
                                    onPress={()=>{this.props.navigation.navigate("Agreement")}}
                                >
                                    <Text style={styles.authText}>       회원가입</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    topViewContainer: {
        flex: 1,
    },
    midViewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    bottomViewContainer: {
        flex: 1
    },
    textViewContainer: {
        marginTop: 20
    },
    topText: {
        fontSize: 30,
        color: '#0FC760'
    },
    buttonsContainer: {
        flex: 6,
        alignItems: 'center'
    },
    button:{
        flex: 1,
        margin: 5
    },
    emailAuthContainer: {
        flex: 1,
        flexDirection:'row',
        justifyContent:'center',
        marginTop: 10
    },
    authText: {
        color: 'black',
        fontWeight: '400'
    }
})

export default AuthComponent;
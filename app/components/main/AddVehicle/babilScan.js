import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startScan, terminateScan, emptyBLEList } from '../../../store/actions/ble_actions';

import PageForm from '../../../utils/forms/pageForm';

import Scooter from '../../../assets/images/scooter.png';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class BabilScan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isDeviceFound: false,
            scanCounter: 0,
            scale: new Animated.Value(0)
        }
    }

    componentDidMount() {
        this.focusUnsubscribe = this.props.navigation.addListener('focus', () => {
            console.log('start scanning')
            this.props.emptyBLEList();
            const targetDeviceUid = this.props.route.params.newBabilKey.deviceUid;
            this.props.startScan([targetDeviceUid])
        });
        this.blurUnsubscribe = this.props.navigation.addListener('blur', () => {
            this.props.terminateScan();

        })
        Animated.sequence([
            Animated.loop(
                Animated.timing(
                    this.state.scale,
                    {
                        toValue: 250,
                        duration: 1000,
                        useNativeDriver: false
                    }
                )
            ),
            Animated.delay(1000)
        ])
        .start();
        
        console.log(this.props.route.params.newBabilKey.deviceUid)
        
        this.timeBomb
        .then(() => this.setState({
            isLoading: false,
            isDeviceFound: true
        }))
        .catch(() => this.setState({
            isLoading: false,
            isDeviceFound: false
        }))
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state !== prevState) {
            const timer =  setTimeout(() => {
                if (!this.state.isLoading) {
                    if (this.state.isDeviceFound) {
                        this.props.navigation.push('BikeNickName', { newBabilKey: { ...this.props.route.params.newBabilKey } });
                    } else {
                        console.log('why is this happening');
                        this.props.navigation.push('RegistrationResult', { type: 'fail' });
                    }
                    clearTimeout(timer);
                }
            }, 1000)
        }
    }

    componentWillUnmount() {
        this.focusUnsubscribe();
        this.blurUnsubscribe();
    }

    timeBomb = new Promise((resolve, reject) => {
        let cnt = 0
        const checker = setInterval(() => {
            console.log(`looking for ${this.props.route.params.newBabilKey.deviceName} ${cnt}, ${JSON.stringify(this.props.BLEList)}`);
            this.setState({
                scanCounter: cnt % 4
            })
            if (this.props.BLEList?.some((item) => item.name == this.props.route.params.newBabilKey.deviceName)) {
                clearInterval(checker);
                resolve();
            }
            if (cnt == 25) {
                clearInterval(checker)
                reject()
            }
            cnt += 1
        }, 500)
    })

    render () {
        return (
            <PageForm
                render={(
                    <>
                    <View style={ styles.topViewContainer }>
                        <View style={ styles.topTextContainer }>
                            <Text style={[ styles.topText, { fontWeight:'bold' } ]}>내 바이크</Text>
                            <Text style={ styles.topText }>를 찾고 있어요!</Text>
                        </View>
                    </View>

                    <View style={ styles.midViewContainer }>
                        <Animated.View style={{
                            width: this.state.scale,
                            height: this.state.scale,
                            borderRadius: 250 / 2,
                            borderColor: '#0FC760',
                            borderWidth: 20,
                            opacity: this.state.scale.interpolate({
                                inputRange: [0,175,250],
                                outputRange: [0,1,0]
                            })
                            }}
                        />
                        <Image
                            source={Scooter}
                            style={{ resizeMode:'contain', height:'40%', position:'absolute', top:screenHeight*0.13 }}
                        />
                    </View>

                    <View style={ styles.bottomViewContainer }>
                        <View style={ styles.textContainer }>
                            <Text style={ styles.bottomText }>잠시만 기다려 주세요</Text>
                            <Text style={ styles.bottomText }>{'.'.repeat(this.state.scanCounter)}</Text>
                        </View>
                    </View>
                    </>
                )}
                backgroundColor='white'
            />

        )
    }
}

const styles = StyleSheet.create({
    topViewContainer: {
        flex: 1
    },
    midViewContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomViewContainer: {
        flex: 1,
    },
    topTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20
    },
    topText: {
        fontSize: 30,
        color: 'black'
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 30
    },
    bottomText: {
        fontSize: 18
    }
    
})

function mapStateToProps(state) {
    console.log('mapStateToProps')
    return {
        BLEList: state.BLE_Reducer['BLEList'],
    }
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ startScan, terminateScan, emptyBLEList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BabilScan)
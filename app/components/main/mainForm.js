import React, {Component} from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Alert,
    Image,
    Pressable
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { stopConnection, writeCharacteristic } from '../../store/actions/ble_actions';

import PowerOn from '../../assets/images/powerOn.png';
import PowerOff from '../../assets/images/powerOff.png';
import EngineOn from '../../assets/images/engineOn.png';
import EngineOff from '../../assets/images/engineOff.png';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class MainForm extends Component {
    state = {
        isPowerOn: false,
        isPressing: false
    }

    componentDidMount() {
        this.blurUnsubscribe = this.props.navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            Alert.alert(
                '경고',
                '연결 해제 하시겠습니까?',
                [
                    { text: '아니오', onPress: () => {}},
                    { text: '예', onPress: async () => {
                        try {
                            await this.props.stopConnection();
                            this.props.navigation.dispatch(e.data.action);
                        } catch (error) {
                            alert('연결 해제 실패! 다시 시도해주세요.');
                        }
                    }}
                ]
            )
        })
    }

    componentWillUnmount() {
        this.blurUnsubscribe();
    }

    renderText = () => {
        const selectedBabilKey = this.props.route.params.selectedBabilKey;
        return (
            <View style={ styles.textContainer }>
                <View>
                    <Text style={{ textTransform:'capitalize' }}>{ selectedBabilKey.brand }</Text>
                </View>

                <View>
                    <Text style={{ fontSize:30, fontWeight:'bold', color:'black' }}>{ selectedBabilKey.bikeNickName }</Text>
                </View>
            </View>
        )
    }

    renderPowerButton = () => {
        return (
            <Pressable
                style={[ styles.button, { borderColor: this.state.isPowerOn ? '#0FC760' : '#ededed' } ]}
                onLongPress={() => {
                    if (this.state.isPowerOn) {
                        console.log('2 secs')
                        this.setState({ isPowerOn:false })
                        this.props.writeCharacteristic('a');
                    }
                }}
                onPress={() => {
                    if (!this.state.isPowerOn) {
                        this.setState({ isPowerOn: true })
                        this.props.writeCharacteristic('a');
                    }
                }}
                delayLongPress={1000}
            >
                <Image
                    source={ this.state.isPowerOn ? PowerOn : PowerOff }
                    style={{ resizeMode:'contain', height:'30%' }}
                /> 
            </Pressable>
        )
    }

    renderFlame = () => (
            <Pressable
                style={{ height:60, width:60, alignItems:'center', justifyContent:'center', position:'absolute', top:screenHeight*0.38, left:screenWidth*0.8 }}
                onPressIn={() => {
                    this.setState({ isPressing: true})
                    this.state.isPowerOn ?
                        this.props.writeCharacteristic('b')
                    :
                        null
                }}
                onPressOut={() => {
                    this.setState({ isPressing: false})
                    this.state.isPowerOn ?
                        this.props.writeCharacteristic('b')
                    :
                        null
                }}
            >
                <Image
                    source={
                        this.state.isPowerOn ?
                            this.state.isPressing ?
                            EngineOn
                            :
                            EngineOff
                        :
                            EngineOff
                    }
                    style={{ resizeMode:'contain', height:'100%' }}
                />
            </Pressable>
    )

    renderEngineButton = () => {
        
    }

    render () {
        return (
            <View style={{ flex:1 }}>
                <View style={ styles.topViewContainer }>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>NO IMAGE</Text>
                </View>

                <View style={ styles.midViewContainer }>
                    <View style={ styles.contentsContainer }>
                        {this.renderText()}
                        
                        <View style={ styles.buttonContainer }>
                            {this.renderPowerButton()}
                        </View>
                    </View>
                </View>
            {this.renderFlame()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topViewContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    midViewContainer: {
        flex: 1.7
    },
    contentsContainer: {
        margin: 30,
        flex: 1
    },
    textContainer: {
        justifyContent: 'flex-end',
        flex: 1
    },
    buttonContainer: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        height: '60%',
        width: '60%',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function mapStateToProps(state) {
    return {
    }
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ stopConnection, writeCharacteristic }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainForm)
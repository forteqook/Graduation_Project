import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { checkProductExists } from '../../../store/actions/main_action';

import Input from '../../../utils/forms/input';
import InputPageForm from '../../../utils/forms/inputPageForm';
import ButtonBottom from '../../../utils/forms/buttonBottom';
import ButtonCommon from '../../../utils/forms/buttonCommon';

class BabilLink extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.route)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.targetProductUid !== prevState.targetProductUid) {
            console.log(this.state.targetProductUid)
        }
    }

    state = {
        hasErrors: false,
        input: {
            value: "",
            type: "textInput",
        },
        targetProductUid: '',
        targetProductIndex: '',
        targetProductName: ''
    }

    updateInput = (value) => {
        this.setState({
            hasErrors: false
        })

        let inputCopy = this.state.input;
        inputCopy.value = value

        this.setState({
            input: inputCopy
        })
    }

    renderCheckButton = (deviceUid) => {
        const disabled = this.state.targetProductUid ? true : false;
        const title = disabled ? 'UID 등록 완료' : 'UID 등록';
        return (
            <ButtonCommon
                text={title}
                onPress={() => this.props.checkProductExists(deviceUid)
                .then(({productIndex, productName}) => this.setState({
                    targetProductUid: deviceUid,
                    targetProductIndex: productIndex,
                    targetProductName: productName
                }), (error) => {
                    console.log(error)
                })}
                disabled={ disabled }
            />
        )
    }

    renderSubmitButton = () => {
        const disabled = this.state.targetProductUid ? false : true;
        return (
            <ButtonBottom
                title="다음"
                color='#0FC760'
                onPress={()=>this.props.navigation.push("BabilScan", {newBabilKey: {...this.props.route.params.selectedBike, deviceUid: this.state.targetProductUid, deviceIndex: this.state.targetProductIndex, deviceName: this.state.targetProductName}})}
                disabled={ disabled }
            />
        )
    }

    render () {
        return (
            <InputPageForm
                render={(
                    <>
                        <View style={ styles.topViewContainer }>
                            <View style={{ flexDirection:'row' }}>
                                <Text style={[ styles.topText, { fontWeight:'bold' } ]}>BABIL 정보</Text>
                                <Text style={ styles.topText }>를</Text>
                            </View>

                            <View>
                                <Text style={ styles.topText }>입력해주세요.</Text>
                            </View>

                            <Text style={{ fontSize: 15, fontWeight:'500', color:'#dbd9d9', marginTop:10 }}>3 / 3</Text>
                        </View>

                        <View style={ styles.midViewContainer }>
                            <View style={{ marginTop: 20 }}>
                                <Input
                                    title='바빌 키 UID'
                                    value={this.state.input.value}
                                    inputType={this.state.input.type}
                                    autoCapitalize={'characters'}
                                    placeholder='바빌 키 UID를 입력해주세요.'
                                    placeholderTextColor={'#ddd'}
                                    onChangeText={value => this.updateInput(value)}
                                />
                            </View>

                            <View style={{ marginTop: 30 }}>
                                {this.renderCheckButton(this.state.input.value)}
                            </View>
                        </View>

                        {/* <View>
                            <Input
                                title='차대번호'
                                value={this.state.input.value}
                                inputType={this.state.input.type}
                                autoCapitalize={'none'}
                                placeholder='차대번호를 입력해주세요.'
                                placeholderTextColor={'#ddd'}
                                onChangeText={value => this.updateInput(value)}
                            />
                        </View> */}
                    </>
                )}
                backgroundColor='white'
                buttonBottom={this.renderSubmitButton()}
            />
        )
    }
}

const styles = StyleSheet.create({
    topViewContainer: {
        flex: 1
    },
    midViewContainer: {
        flex: 4,
    },
    itemViewContainer: {
        height: 55,
        borderBottomColor: '#edebeb',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    itemContainer: {
        flex:1, 
        flexDirection: 'row'
    },
    itemTextContainer: {
        flex:1,
        marginLeft: 15,
        justifyContent: 'center'
    },
    topText: {
        fontSize: 25,
        color: 'black'
    },
    modelText: {
        fontSize: 15,
        fontWeight: '600',
        textTransform: 'capitalize'
    },
    itemImage: {
        flex:0.17,
        height:'90%',
        alignSelf:'center',
        backgroundColor:'white',
        borderWidth:1,
        borderRadius: 15,
        alignItems:'center',
        justifyContent:'center',
    }
})

function mapStateToProps(state) {
    return {
        
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ checkProductExists }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BabilLink);
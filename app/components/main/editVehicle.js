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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteBabilKey } from '../../store/actions/main_action';
import { stopConnection } from '../../store/actions/ble_actions';

import Input from '../../utils/forms/input';
import ButtonBottom from '../../utils/forms/buttonBottom';

class EditVehicle extends Component {
    state = {
        hasErrors: false,
        form: {
            bikeNickName: {
                value:"",
                type:"textInput"
            }
        }
    }

    componentDidMount() {
        console.log('selectedBabilKey: ', this.props.route.params?.selectedBabilKey);
    }
    
    deleteBabilKey = (userUid, babilKey) => {
        this.props.deleteBabilKey(userUid, babilKey)
        .then(() => {
            this.props.navigation.push('MainHome');
        }, (error) => {
            alert('바빌키 삭제 실패');
        })
    }

    updateInput = (name, value) => {
        this.setState({
            hasErrors:false
        })
        
        let formCopy = this.state.form;
        formCopy[name].value = value

        this.setState({
            form: formCopy
        })
    }

    render () {
        return (
            <View style={{ flex:1 }}>
                <View style={ styles.topViewContainer }>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>NO IMAGE</Text>
                </View>

                <View style={ styles.midViewContainer }>
                    <View style={ styles.contentsContainer }>
                        <View>
                            <Input
                                title='바이크 이름'
                                type='바이크 이름'
                                value={this.state.form.bikeNickName.value}
                                inputType={this.state.form.bikeNickName.type}
                                autoCapitalize={'none'}
                                placeholder='바이크 이름을 입력해주세요.'
                                placeholderTextColor={'#ddd'}
                                onChangeText={value => this.updateInput("bikeNickName", value)}
                                // valid={this.state.form.bikeNickName.valid}
                                // isBlank={this.state.form.bikeNickName.isBlank}
                            />
                        </View>

                        {/* <View>
                            <Button
                                title='등록 해제하기'
                                onPress={() => {
                                    this.props.stopConnection();
                                    setTimeout(() => {
                                        this.deleteBabilKey(this.props.User.uid, this.props.route.params.selectedBabilKey)
                                    }, 300)
                                }}
                            />
                        </View> */}
                    </View>
                </View>
                <ButtonBottom
                    title='등록 해제하기'
                    color='#e82a2a'
                    onPress={() => {
                        this.props.stopConnection();
                        setTimeout(() => {
                            this.deleteBabilKey(this.props.User.uid, this.props.route.params.selectedBabilKey)
                        }, 300)
                    }}
                />
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
})

function mapStateToProps(state) {
    return {
        BabilKeysList: state.Main_Reducer['babilKeysList'],
        User: state.Auth_Reducer['user']
    }
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ deleteBabilKey, stopConnection }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVehicle)
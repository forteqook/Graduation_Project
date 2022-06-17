import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from 'react-native';

import Input from '../../utils/forms/input';
import ButtonBottom from '../../utils/forms/buttonBottom';

class FindAccount extends Component {
    constructor (props) {
        super(props);
        this.props.route.name == 'FindEmail' ?
            this.state={
                type:'email',
                action:'아이디 찾기',
                hasErrors: false,
                form:{
                    name:{
                        value:"",
                        type:"textInput"
                    },
                    email:{
                        value:"",
                        type:"textInput"
                    }
                }
            }
        :   this.state={
                type:'password',
                action:'비밀번호 찾기',
                hasErrors: false,
                form:{
                    name:{
                        value:"",
                        type:"textInput"
                    },
                    email:{
                        value:"",
                        type:"textInput"
                    }
                }
            }
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

    putEmailAddress = () => (
        this.state.type != 'email' ?
        <View style={ styles.inputContainer }>
            <Input
                title='이메일'
                type='이메일'
                value={this.state.form.email.value}
                inputType={this.state.form.email.type}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                placeholder='이메일을 입력해주세요.'
                placeholderTextColor={'#ddd'}
                onChangeText={value => this.updateInput("email", value)}
                // valid={this.state.form.email.valid}
                // isBlank={this.state.form.email.isBlank}
            />
        </View>
        :   null
    )

    render() {
        return (
            <KeyboardAvoidingView style={{ flex:1, backgroundColor:'white' }} behavior={Platform.OS === 'ios' ? 'padding':'height'} enabled={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, margin: 30 }}>
                        <View style={ styles.inputViewContainer }>
                            {this.putEmailAddress()}

                            <View style={ styles.inputContainer }>
                                <Input
                                    title='이름'
                                    type='이름'
                                    value={this.state.form.name.value}
                                    inputType={this.state.form.name.type}
                                    autoCapitalize={'none'}
                                    placeholder='이름을 입력해주세요.'
                                    placeholderTextColor={'#ddd'}
                                    onChangeText={value => this.updateInput("name", value)}
                                    // valid={this.state.form.name.valid}
                                    // isBlank={this.state.form.name.isBlank}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <ButtonBottom
                    title='확인'
                    color='#0FC760'
                    onPress={()=>alert('under construction!')}
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    logoViewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputViewContainer: {
        flex: 3
    },
    inputContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    bottomViewContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    findAccountContainer: {
        flex: 1,
        marginTop: 10,
        marginLeft: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        color: 'black'
    }
})

export default FindAccount;
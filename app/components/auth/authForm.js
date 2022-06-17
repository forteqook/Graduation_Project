import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ValidationRules from '../../utils/forms/validationRules';
import Input from '../../utils/forms/input';
import ButtonCommon from '../../utils/forms/buttonCommon';
import Timer from '../../utils/forms/timer';

import {
    signIn,
    signUp,
    createUserDB,
    verifyPhoneNumber
} from '../../store/actions/auth_action';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class AuthForm extends Component {

    state = {
        type: this.props.route.params.type,         //login, register
        action: this.props.route.params.action,     //로그인, 다음(등록)
        hasErrors: false,                           //form 이 올바르지 않거나, 서버로 부터 응답이 옳바르지 않은 경우 true가 됩니다.
        form: {
            email: {
                value: "",
                type: "textInput",
                rules:{
                    isRequired: true,
                    isEmail: true,
                },
                valid: false,
                isBlank: true
            },
            password: {
                value: "",
                type: "textInput",
                rules:{
                    isRequired: true,
                    minLength: 6
                },
                valid: false,
                isBlank: true
            },
            confirmPassword: {
                value: "",
                type: "textInput",
                rules:{
                    confirmPassword: 'password'
                },
                valid: false,
                isBlank: true
            },
            // phoneNumber: {
            //     value: "",
            //     type: "textInput",
            //     rules:{
            //         isRequired: true,
            //         isPhoneNumber: true
            //     },
            //     valid: false,
            //     isBlank: true
            // },
            // credential: {
            //     value: "",
            //     type: "textInput",
            //     rules:{
            //         isRequired: true,
            //         minLength: 6
            //     },
            //     valid: false,
            //     isBlank: true
            // }
        }
    }

    logo = () => (
        this.state.type == 'login' ?
            <View style={styles.logoViewContainer}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#0FC760' }}>바빌</Text>
            </View>
        :
            null
    )

    //Input 컴포넌트에서, onChangeText의 이벤트 핸들러 입니다.
    updateInput = (name, value) => {
        this.setState({
            hasErrors: false
        })

        let formCopy = this.state.form;
        formCopy[name].value = value

        //rules
        //입력할 때 마다 rule 체크를 합니다.
        let rules = formCopy[name].rules;
        let valid = ValidationRules(value, rules, formCopy);
        formCopy[name].valid = valid;

        //입력값이 null 인지 체크 합니다.
        !value ? formCopy[name].isBlank = true : formCopy[name].isBlank = false;

        this.setState({
            form: formCopy
        })
    }

    //authForm 컴포넌트의 state.type 에 따라 action creator에서 어떤 action 을 불러올지 정합니다.
    submitUser = async () => {
        let isFormValid = true;
        let submittedForm = {};

        const formCopy = this.state.form;

        //type 이 login 인지 register 인지에 따라 submittedForm 에 무엇을 담을건지 정합니다.
        for (let key in formCopy) {
            if (this.state.type === 'login') {
                if (key == 'email' || key == 'password') {
                    isFormValid = isFormValid && formCopy[key].valid;
                    submittedForm[key] = formCopy[key].value;
                }
            }
            else {
               isFormValid = isFormValid && formCopy[key].valid;
               submittedForm[key] = formCopy[key].value;
            }
        }

        //결국, isFormValid는 for 문을 전부 돌며, 각 form에서 valid 끼리 and 연산 한 것과 같아집니다.
        //즉 모든 form 의 valid 가 true 가 아니면, 액션 자체가 실행이 안됩니다.
        if (isFormValid) {
            if (this.state.type === 'login') {
                try {
                    await this.props.signIn(submittedForm)
                } catch (error) {
                    console.log('error: ', error);
                }
                this.manageAccess();
            }
            else {
                try {
                    await this.props.signUp(submittedForm)
                    await this.props.createUserDB(this.props.User)
                } catch (error) {
                    console.log(error);
                    this.setState({
                        hasErrors:true
                    })
                }
                this.manageAccess();
            }
        }
        else {
           this.setState ({
               hasErrors:true
           })
        }
    }

    manageAccess = () => {
        if (!this.props.User) {
            this.setState({hasErrors:true})
        }
        else {
            this.setState({hasErrors:false})
            this.props.navigation.push("CompComponent")
        }
    }

    confirmPassword = () => (
        this.state.type != 'login' ?
        <View style={ styles.inputContainer }>
            <Input
                title='비밀번호 확인'
                type='비밀번호'
                value={this.state.form.confirmPassword.value}
                inputType={this.state.form.confirmPassword.type}
                secureTextEntry={true}
                placeholder='비밀번호 재입력'
                placeholderTextColor={'#ddd'}
                onChangeText={value => this.updateInput("confirmPassword", value)}
                valid={this.state.form.confirmPassword.valid}
                isBlank={this.state.form.confirmPassword.isBlank}
            />
        </View>
        : null
    )

    //전화번호 입력
    getPhoneNum = () => (
        this.state.type != 'login' ?
            <View style={{flexDirection: 'row'}}>
                <View>
                    <Input
                        title='휴대전화 번호'
                        type='휴대전화 번호'
                        value={this.state.form.phoneNumber.value}
                        inputType={this.state.form.phoneNumber.type}
                        keyboardType={'phone-pad'}
                        placeholder='전화번호를 입력해주세요'
                        placeholderTextColor={'#ddd'}
                        onChangeText={value => this.updateInput("phoneNumber", value)}
                        valid={this.state.form.phoneNumber.valid}
                        isBlank={this.state.form.phoneNumber.isBlank}
                    />
                </View>

                <View>
                    <Button
                        title='인증 요청'
                        onPress={() => this.props.verifyPhoneNumber(this.state.form.phoneNumber.value)}
                    />
                </View>
            </View>
            : null
    )

    getCredential = () => (
        this.state.type != 'login' ?
        <View>
            <View>
                <View>
                    <Input
                        title='인증번호'
                        type='인증번호'
                        value={this.state.form.credential.value}
                        inputType={this.state.form.credential.type}
                        keyboardType={'phone-pad'}
                        placeholder='인증번호를 입력해주세요'
                        placeholderTextColor={'#ddd'}
                        onChangeText={value => this.updateInput("credential", value)}
                        valid={this.state.form.credential.valid}
                        isBlank={this.state.form.credential.isBlank}
                    />
                </View>

                <View style={{position: 'absolute', left: screenWidth*0.8}}>
                    <Timer/>
                </View>
            </View>

            <View>
                <Button
                    title='인증하기'
                />
            </View>
        </View>
        :
        null
    )

    //로그인/다음 버튼과 로그인 화면에서의 이메일 찾기 | 비밀번호 찾기 버튼을 담고 있습니다.
    //추후 이름을 수정해야 안 헷갈릴 것 같습니다.
    findAccount = () => (
        this.state.type == 'login' ?
            <View style={ styles.findAccountContainer }>
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate("FindAccount", { screen: "FindEmail" }) }}
                    style={{ marginRight: 30 }}
                >
                    <Text style={ styles.text }>이메일 찾기</Text>
                </TouchableOpacity>

                <View>
                    <Text> | </Text>
                </View>

                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate("FindAccount", { screen: "FindPassword" }) }}
                    style={{ marginLeft: 30 }}
                >
                    <Text style={ styles.text }>비밀번호 찾기</Text>
                </TouchableOpacity>
            </View>
        :
            null
    )

    formHasErrors = () => (
        this.state.hasErrors ? 
        alert("Form Has Errors!")
        : null
    )

    // temporary function
    tempFunc = async () => {
        const tempForm = {
            email: 'ccc@ccc.com',
            password: '123456'
        }

        if (this.state.type === 'login') {
            await this.props.signIn(tempForm)
            .catch((error) => alert('error!'))
            this.manageAccess();
        }
        else {
            try {
                await this.props.signUp(tempForm)
                // await this.props.createUserDB(this.props.User.user)
            } catch (error) {
                console.log('error is ', error)
            }
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex:1, backgroundColor:'white' }} behavior={Platform.OS === 'ios' ? 'padding':'height'} enabled={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, margin: 30 }}>
                        {this.logo()}

                        <View style={ styles.inputViewContainer }>
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
                                    valid={this.state.form.email.valid}
                                    isBlank={this.state.form.email.isBlank}
                                />
                            </View>

                            <View style={ styles.inputContainer }>
                                <Input
                                    title='비밀번호 입력'
                                    type='비밀번호'
                                    value={this.state.form.password.value}
                                    inputType={this.state.form.password.type}
                                    autoCapitalize={'none'}
                                    secureTextEntry={true}
                                    placeholder='비밀번호를 입력해주세요.'
                                    placeholderTextColor={'#ddd'}
                                    onChangeText={value => this.updateInput("password", value)}
                                    valid={this.state.form.password.valid}
                                    isBlank={this.state.form.password.isBlank}
                                />
                            </View>

                            {this.confirmPassword()}

                            {/* {this.getPhoneNum()}
                            {this.getCredential()} */}
                        </View>
                        
                        <View style={ styles.bottomViewContainer }>
                            <View style={ styles.buttonContainer }>
                                <ButtonCommon text={this.state.action} onPress={() => this.submitUser()} />
                            </View>
                            {/* <View>
                                <Button
                                    title={this.state.action}
                                    onPress={() => this.submitUser()}
                                />
                            </View> */}

                            {this.findAccount()}
                        </View>

                        {/* <View>
                            <Button
                                title = 'temp signUp button'
                                onPress = {() => this.tempFunc()}
                            />
                        </View> */}
                        
                        {this.formHasErrors()}
                    </View>
                </TouchableWithoutFeedback>
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

function mapStateToProps(state) {
    return {
        User: state.Auth_Reducer['user']
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signIn, signUp, createUserDB, verifyPhoneNumber }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
import React, {Component} from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import PageForm from '../../../utils/forms/pageForm';
import Input from '../../../utils/forms/input';


class MyInfo extends Component {

    state = {
        hasErrors: false,
        form:{
            email:{
                value:"",
                type:"textInput"
            },
            password:{
                value:"",
                type:"textInput"
            },
        }
    }

    renderButton = (title, onPress) => {
        return (
            <TouchableHighlight
                style={ styles.button }
                onPress={onPress}
                underlayColor='green'
            >
                <Text style={ styles.textTitle }>{title}</Text>
            </TouchableHighlight>
        )
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
            <PageForm
                render={(
                    <>
                    <View style={ styles.inputViewContainer }>
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

                    <View style={[ styles.inputViewContainer, { flexDirection:'row' } ]}>
                        <View style={ styles.inputContainer }>
                            <Input
                                title='비밀번호 입력'
                                type='비밀번호'
                                value={this.state.form.password.value}
                                secureTextEntry={true}
                                inputType={this.state.form.password.type}
                                autoCapitalize={'none'}
                                placeholder='비밀번호를 입력해주세요.'
                                placeholderTextColor={'#ddd'}
                                onChangeText={value => this.updateInput("password", value)}
                                // valid={this.state.form.password.valid}
                                // isBlank={this.state.form.password.isBlank}
                            />
                        </View>

                        <View style={ styles.buttonContainer }>
                            {this.renderButton('변경하기', () => alert('under construction!'))}
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
    inputViewContainer: {
        marginBottom: 15,
    },
    inputContainer: {
        flex: 2.5
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginLeft: 10
    },
    button: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0FC760',
        borderRadius: 10,
    },
    textTitle: {
        color: 'white',
    }
})

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInfo);
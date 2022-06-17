import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Input from '../../../utils/forms/input';
import { setNewBabilKey } from '../../../store/actions/main_action';

import InputPageForm from '../../../utils/forms/inputPageForm';
import ButtonBottom from '../../../utils/forms/buttonBottom';

class BikeNickName extends Component {
    componentDidMount() {
        console.log(this.props.route.params)
    }

    state = {
        hasErrors: false,
        input: {
            value: "",
            type: "textInput",
        }
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

    manageAccess = () => {
        this.props.setNewBabilKey(this.props.route.params.newBabilKey, this.props.User.uid, this.state.input.value)
        .then(() => this.props.navigation.push('RegistrationResult', { type: 'complete' }))
        .catch((error) => alert('등록 실패'))
    }

    renderSubmitButton = () => {
        const disabled = this.state.input.value ? false : true;
        return (
            <ButtonBottom
                title="다음"
                color='#0FC760'
                onPress={() => this.manageAccess()}
                disabled={ disabled }
            />
        )
    }

    render () {
        return (
            <InputPageForm
                render={(
                    <View>
                        <Input
                            title='바이크 이름'
                            value={this.state.input.value}
                            inputType={this.state.input.type}
                            autoCapitalize={'none'}
                            placeholder='내 바이크에 이름을 입력해주세요.'
                            placeholderTextColor={'#ddd'}
                            onChangeText={value => this.updateInput(value)}
                        />
                    </View>
                )}
                buttonBottom={this.renderSubmitButton()}
            />
        )
    }
}

const styles = StyleSheet.create({})

function mapStateToProps(state) {
    return {
        User: state.Auth_Reducer['user']
    }
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setNewBabilKey }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BikeNickName)
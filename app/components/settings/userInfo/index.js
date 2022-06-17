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

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { deleteUserAccount } from '../../../store/actions/auth_action';

import PageForm from '../../../utils/forms/pageForm';
import ButtonSettings from '../../../utils/forms/buttonSettings';

class UserInfo extends Component {
    render () {
        return (
            <PageForm
                render={(
                    <>
                    <View>
                        <ButtonSettings
                            title="내 정보 관리"
                            onPress={()=>this.props.navigation.navigate("MyInfo")}
                        />
                    </View>

                    <View style={ styles.buttonContainer }>
                        <ButtonSettings
                            title="내 바이크 관리"
                            onPress={()=>this.props.navigation.navigate("MyVehicle")}
                        />
                    </View>

                    <View style={ styles.buttonContainer }>
                        <ButtonSettings
                            title='탈퇴하기'
                            onPress={() => {
                                this.props.deleteUserAccount(this.props.User, this.props.BabilKeysList)
                                .then(() => {
                                    this.props.navigation.getParent().getParent().push('AuthComponent');
                                }, (error) => {
                                    console.log('error:', error);
                                    alert('삭제 실패');
                                })
                            }}
                            textColor='red'
                        />
                    </View>
                    </>
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 20
    }
})

function mapStateToProps(state) {
    return {
        User: state.Auth_Reducer['userCredential'].user,
        BabilKeysList: state.Main_Reducer['babilKeysList'],
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ deleteUserAccount }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { signOut } from '../../store/actions/auth_action';

import PageForm from '../../utils/forms/pageForm';
import ButtonSettings from '../../utils/forms/buttonSettings';

class AppSettings extends Component {
    render () {
        return (
            <PageForm
                render={(
                    <>
                    <View>
                        <ButtonSettings
                            title="로그아웃"
                            onPress={() => {
                                this.props.signOut()
                                .then(() => this.props.navigation.getParent().push('AuthComponent'))
                                .catch(() => alert('다시 시도해주세요.'))
                            }}
                        />
                    </View>
                    </>
                )}
            />
        )
    }
}

const styles = StyleSheet.create({})

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signOut }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSettings);
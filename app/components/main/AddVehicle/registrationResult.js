import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';

import PageForm from '../../../utils/forms/pageForm';
import Disapproved from '../../../assets/images/delete-button.png';
import Approved from '../../../assets/images/check.png';

class ScanFail extends Component {
    state = {
        type: this.props.route.params.type,
    }

    renderResult = () => {
        const isCompleteScreen = this.state.type == 'complete';
        return (
            <View style={ styles.viewContainer }>
                <View style={{ flex:2, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Image
                        source={ isCompleteScreen ? Approved : Disapproved }
                        style={{ resizeMode:'contain', height:'40%'}}
                    />
                </View>

                <View style={{ flex:1, alignItems: 'center', paddingTop:50 }}>
                    <Text style={{ fontSize:20, color: isCompleteScreen ? '#0FC760' : '#e82a2a' }}>{isCompleteScreen ? '등록 완료' : '등록 실패'}</Text>
                </View>
            </View>
        )
    }

    renderButtons = () => {
        const isCompleteScreen = this.state.type === 'complete';
        return (
            <View style={ styles.buttonContainer }>
                <TouchableHighlight
                    onPress={() => this.props.navigation.push('BrandSelect')}
                    style={[ styles.button, {
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: '#0FC760'
                    }]}
                    underlayColor='gray'
                >
                    <Text style={{ fontSize:15, color: '#0FC760' }}>{isCompleteScreen ? '추가 등록하기' : '다시 등록하기'}</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => this.props.navigation.getParent().push('MainHome')}
                    style={[ styles.button, {
                        backgroundColor: isCompleteScreen ? '#0FC760' : '#e82a2a'
                    }]}
                    underlayColor='gray'
                >
                    <Text style={{ fontSize:15, color: 'white' }}>{isCompleteScreen ? '완료' : '등록 중단하기'}</Text>
                </TouchableHighlight>
            </View>
        )
    }

    render () {
        return (
            <PageForm
                render={(
                    <>
                    {this.renderResult()}
                    </>
                )}
                buttonBottom={this.renderButtons()}
            />
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        paddingBottom: '50%'
    },
    buttonContainer: {
        height: 120,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    button: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default ScanFail
import React, {Component} from 'react';
import {Animated, View, Button, Dimensions, StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { autoSignIn } from '../../store/actions/auth_action';

const loadingImage = require('../../assets/images/loading_image2.png');

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
            devMode: false
        }
    }

    onComplete = async () => {
        try {
            await this.props.autoSignIn();
            if (this.props.User?.uid) {
                this.props.navigation.push('CompComponent');
            } else {
                this.props.navigation.push('AuthComponent');
            }
        } catch (error) {
            console.log(error)
            alert('로그인 실패');
        }
    }

    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false
        }).start(()=>{
            this.onComplete()
        })
    }

    render() {
        return (
            <View style={styles.contianer}>
                {this.state.devMode ? 
                    <View>
                        <Button
                            title="Login"
                            onPress={() => this.props.navigation.navigate("AuthComponent")}
                        />
                        <Button
                            title="Main"
                            onPress={() => this.props.navigation.navigate("CompComponent")}
                        />
                    </View>
                :
                    <Animated.Image
                    source={loadingImage}
                    style={{resizeMode:'contain',
                            height: '80%',
                            width: '80%',
                            opacity: this.state.opacity,
                            left: this.state.opacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [60, 0]
                            })
                    }}
                    onLoad={this.onLoad}
                    >
                    </Animated.Image>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contianer: {
        height: '100%',
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: '#0FC760'
    }
})

function mapStateToProps(state) {
    return {
        User: state.Auth_Reducer['user']
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ autoSignIn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
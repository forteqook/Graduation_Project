import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableHighlight
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { getBabilKeys } from '../../store/actions/main_action';
import { startScan, terminateScan, emptyBLEList, connectDevice } from '../../store/actions/ble_actions';

import ButtonCommon from '../../utils/forms/buttonCommon';

class MainHome extends Component {

    state={
        isRefreshing: false
    }

    //바이크 리스트를 받아오는 액션을 실행합니다.
    componentDidMount() {
        console.log('index.js componentDidMount')
        this.focusUnsubscribe = this.props.navigation.addListener('focus', () => {
            this.getBabilKeysList(this.props.User?.uid);
        });
        this.blurUnsubscribe = this.props.navigation.addListener('blur', () => {
            this.props.terminateScan();
        })
        // console.log('this is user object: ', this.props.User);
        // console.log('this is babilKey object:', this.props.BabilKeysList);
    }

    componentWillUnmount() {
        this.focusUnsubscribe();
        this.blurUnsubscribe();
    }

    getBabilKeysList = async (userUid) => {
        try {
            await this.props.getBabilKeys(userUid);
            if (this.props.BabilKeysList.length > 0) {
                console.log('this is babil keys list: ', this.props.BabilKeysList);
                const deviceUidList = this.props.BabilKeysList.map((item) => item.deviceUid);
                this.props.startScan(deviceUidList);
            }
        } catch (error) {
            alert('바빌 키 목록을 불러오는데 실패했습니다. 인터넷 연결을 확인하세요.');
        }
    }

    checkDeviceAvailable = (babilKeyName) => {
        const bleNameList = this.props.BLEList.map((item) => item.name)
        return bleNameList.includes(babilKeyName)
    }

    bringDeviceObject = (babilKeyName) => {
        return this.props.BLEList.find((item) => item.name === babilKeyName)
    }

    refresh = () => {
        this.props.emptyBLEList()
        const deviceUidList = this.props.BabilKeysList.map((item) => item.deviceUid);
        setTimeout(() => {
            this.setState({ isRefreshing: false })
            this.props.startScan(deviceUidList)
        }, 100)
    }

    renderBabilKeys = ({item}) => {
        if (item) {
            const isDeviceAvailable = this.checkDeviceAvailable(item.deviceName);
            return (
                <TouchableHighlight
                    onPress={() => {
                        this.props.connectDevice(this.bringDeviceObject(item.deviceName))
                        .then((result) => this.props.navigation.push('MainForm', { selectedBabilKey: item }))
                        .catch((error) => {
                            alert('연결 실패');
                            this.refresh();
                            console.log(error);
                        })
                    }}
                    style={[ styles.itemViewContainer, { backgroundColor: isDeviceAvailable ? 'white' : '#dbd9d9' } ]}
                    disabled={!isDeviceAvailable}
                    underlayColor='gray'
                >
                    <View style={ styles.itemContainer }>
                        <View style={{ height:'100%', alignSelf:'center', backgroundColor:'white', alignItems:'center', justifyContent:'center' }}>
                            <Text>NO IMAGE</Text>
                        </View>

                        <View style={ styles.itemTextContainer }>
                            <View>
                                <Text style={{ fontSize:15, color: isDeviceAvailable ? '#0FC760' : 'gray' }}>{item.brand}</Text>
                            </View>

                            <View>
                                <Text style={{ fontSize:20, fontWeight:'bold', color: isDeviceAvailable ? 'black' : 'gray' }}>{item.bikeNickName}</Text>
                            </View>

                            <View>
                                <Text style={{ fontSize:10, color: isDeviceAvailable ? 'blue' : 'gray' }}>{isDeviceAvailable? '연결됨' : '연결안됨'}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }
    }

    render () {
        return (
            <View style={{ flex:1, margin: 30 }}>
                <View style={{ flex:10 }}>
                    {this.props.BabilKeysList.length > 0 ?
                        <FlatList
                        data={this.props.BabilKeysList}
                        renderItem={this.renderBabilKeys}
                        extraData={this.props.BLEList}
                        keyExtractor={item=> item.babilKeyId}
                        onRefresh={()=>{ this.refresh() }}
                        refreshing={this.state.isRefreshing}
                        />
                    :
                        <View style={{ alignItems:'center', justifyContent:'center' }}>
                            <Text style={{ fontSize:30, fontWeight:'bold' }}>등록된 바이크가 없습니다</Text>
                        </View>
                    }
                </View>
                
                <View style={{flex:1}}>
                    <ButtonCommon
                        text="+ 내 바이크 등록하기"
                        onPress={()=>this.props.navigation.push('AddVehicle')}
                    />
                </View>



                {/* <View>
                    <Button
                        title="새로고침"
                        onPress={()=>this.refresh()}
                    />
                </View>

                <View>
                    <Button
                        title='temp mainform'
                        onPress={() => this.props.navigation.push('MainForm', { devMode: true })}
                    />
                </View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    brandText: {
        color: '#0FC760',
        fontSize: 15
    },
    bikeNickNameText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },    
    itemViewContainer: {
        margin: 5,
        height: 100,
        justifyContent: 'center',
        borderRadius: 15
    },
    itemContainer: {
        margin: 10,
        flexDirection: 'row',
    },
    itemTextContainer: {
        marginLeft: 15
    }
})

function mapStateToProps(state) {
    return {
        BabilKeysList: state.Main_Reducer['babilKeysList'],
        BLEList: state.BLE_Reducer['BLEList'],
        User: state.Auth_Reducer['user']
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getBabilKeys, startScan, terminateScan, emptyBLEList, connectDevice }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHome);
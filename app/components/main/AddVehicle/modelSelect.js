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

import { getBikes } from '../../../store/actions/main_action';

import Input from '../../../utils/forms/input';
import ButtonBottom from '../../../utils/forms/buttonBottom';
import InputPageForm from '../../../utils/forms/inputPageForm';

class ModelSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasErrors: false,
            input: {
                value: "",
                type: "textInput",
            },
            selectedBike: {
                brand: this.props.route.params.selectedBrand,
                modelName: ''
            }
        }
    }

    componentDidMount() {
        this.props.getBikes(this.props.route.params.selectedBrand)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedBike.modelName !== prevState.selectedBike.modelName) {
            console.log(this.state.selectedBike)
            console.log(this.props.route.params.selectedBrand)
        }
    }

    updateInput = (value) => {
        this.setState({
            hasErrors: false
        })

        let inputCopy = this.state.input;
        inputCopy.value = value;

        this.setState({
            input: inputCopy
        })
    }

    renderBikes = ({item}) => {
        if(item && item.modelName.includes(this.state.input.value)) {
            const isSelected = item.modelName === this.state.selectedBike.modelName;
            return (
                <TouchableHighlight
                    onPress={() => {this.setState({selectedBike: {...this.state.selectedBike, modelName: item.modelName}})}}
                    style={ styles.itemViewContainer }
                    underlayColor='#edebeb'
                >
                    <View style={ styles.itemContainer }>
                        <View style={[ styles.itemImage, { borderColor: isSelected ? '#0FC760' : 'white' } ]}>
                            <Text style={{ fontSize: 10 }}>NO</Text>
                            <Text style={{ fontSize: 10 }}>Image</Text>
                        </View>

                        <View style={ styles.itemTextContainer }>
                            <Text style={[ styles.modelText, { color: isSelected ? '#0FC760' : 'black' } ]}>{item.modelName}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        } else {
            return null
        }
    }

    renderSubmitButton = () => {
        const disabled = this.state.selectedBike.modelName ? false : true;
        return (
            <ButtonBottom
                title="다음"
                color='#0FC760'
                onPress={()=>this.props.navigation.push("BabilLink", { selectedBike: {...this.state.selectedBike} })}
                disabled={disabled}
            />
        )
    }

    render () {
        return (
            <InputPageForm
                render={(
                    <>
                        <View style={ styles.topViewContainer }>
                            <View style={{ flexDirection:'row' }}>
                                <Text style={[ styles.topText, { fontWeight:'bold' } ]}>바이크</Text>
                                <Text style={ styles.topText }>를</Text>
                            </View>

                            <View>
                                <Text style={ styles.topText }>선택해주세요.</Text>
                            </View>

                            <Text style={{ fontSize: 15, fontWeight:'500', color:'#dbd9d9', marginTop:10 }}>2 / 3</Text>
                        </View>

                        <View stlye={ styles.midViewContainer }>
                            <Input
                                title='바이크 검색'
                                value={this.state.input.value}
                                inputType={this.state.input.type}
                                autoCapitalize={'none'}
                                placeholder='ex) Citi 100'
                                placeholderTextColor={'#ddd'}
                                onChangeText={value => this.updateInput(value)}
                            />
                        </View>

                        <View style={ styles.bottomViewContainer }>
                            <View style={{ flex:0.1, justifyContent:'flex-end' }}>
                                <Text style={{ fontSize:13, }}>검색 결과</Text>
                            </View>
                            
                            <View style={{ flex:1 }}>
                                <FlatList
                                    data={this.props.BrandBikesList}
                                    renderItem={this.renderBikes}
                                    extraData={this.state.input.value}
                                    keyExtractor={item=>(item.brand+'_'+item.modelName)}
                                />
                            </View>
                        </View>
                    </>                    
                )}
                backgroundColor='white'
                marginBottom={100}
                buttonBottom={this.renderSubmitButton()}
            />
        )
    }
}

const styles = StyleSheet.create({
    topViewContainer: {
        flex: 1.5
    },
    midViewContainer: {
        flex: 1
    },
    bottomViewContainer: {
        flex: 4,
        marginTop: 10
    },
    itemViewContainer: {
        height: 55,
        borderBottomColor: '#edebeb',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    itemContainer: {
        flex:1, 
        flexDirection: 'row'
    },
    itemTextContainer: {
        flex:1,
        marginLeft: 15,
        justifyContent: 'center'
    },
    topText: {
        fontSize: 25,
        color: 'black'
    },
    modelText: {
        fontSize: 15,
        fontWeight: '600',
        textTransform: 'capitalize'
    },
    itemImage: {
        flex:0.17,
        height:'90%',
        alignSelf:'center',
        backgroundColor:'white',
        borderWidth:1,
        borderRadius: 15,
        alignItems:'center',
        justifyContent:'center',
    }
})

function mapStateToProps(state) {
    return {
        BrandBikesList: state.Main_Reducer['brandBikesList']
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getBikes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelSelect);
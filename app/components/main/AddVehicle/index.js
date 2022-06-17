import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight,
    ScrollView,
    FlatList
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { getBrands } from '../../../store/actions/main_action';

import ButtonBottom from '../../../utils/forms/buttonBottom';

class BrandSelect extends Component {
    componentDidMount() {
        this.props.getBrands();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedBrand !== prevState.selectedBrand) {
            console.log(this.state.selectedBrand)
        }
    }

    state = {
        selectedBrand: ''
    }

    renderBrands = ({item}) => {
        if (item) {
            const isSelected = item === this.state.selectedBrand;
            return (
                <TouchableHighlight
                    onPress={() => {this.setState({selectedBrand: item})}}
                    style={ styles.itemContainer }
                    underlayColor='#edebeb'
                >
                    <Text style={[ styles.brandText, { color: isSelected ? '#0FC760' : 'black' } ]}>{item}</Text>
                </TouchableHighlight>
            )
        }
        else {
            return null
        }
    }

    renderSubmitButton = () => {
        const disabled = this.state.selectedBrand ? false : true;
        return (
            <ButtonBottom
                title="다음"
                color='#0FC760'
                onPress={()=>this.props.navigation.push("ModelSelect", { selectedBrand: this.state.selectedBrand })}
                disabled={disabled}
            />
        )
    }

    render () {
        return (
            <View style={{ flex: 1, backgroundColor:'white' }}>
                <View style={{ flex:1, margin:30 }}>
                    <View style={ styles.topViewContainer }>
                        <View style={{ flexDirection:'row' }}>
                            <Text style={[ styles.topText, { fontWeight:'bold' } ]}>브랜드</Text>
                            <Text style={ styles.topText }>를</Text>
                        </View>

                        <View>
                            <Text style={ styles.topText }>선택해주세요.</Text>
                        </View>

                        <Text style={{ fontSize: 15, fontWeight:'500', color:'#dbd9d9', marginTop:10 }}>1 / 3</Text>
                    </View>

                    <View style={ styles.midViewContainer }>
                        <FlatList
                            data={this.props.Brands}
                            renderItem={this.renderBrands}
                            extraData={this.state.selectedBrand}
                            keyExtractor={item=>item}
                        />
                    </View>
                </View>
                {this.renderSubmitButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topViewContainer: {
        flex: 1
    },
    midViewContainer: {
        flex: 4
    },
    itemContainer: {
        height: 55,
        borderColor: '#0FC760',
        borderWidth: 1,
        borderRadius: 20,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topText: {
        fontSize: 25,
        color: 'black'
    },
    brandText: {
        textTransform: 'uppercase',
    }
})

function mapStateToProps(state) {
    return {
        Brands: state.Main_Reducer['brandsList']
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getBrands}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandSelect);
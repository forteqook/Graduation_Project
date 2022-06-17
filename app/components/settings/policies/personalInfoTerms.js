import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';
import PageForm from '../../../utils/forms/pageForm';

class PersonalInfoTerms extends Component {
    render () {
        return (
            <>
                <PageForm
                render={(
                    <Text>텍스트</Text>
                )}
                backgroundColor='white'
                />
            </>
        )
    }
}

const styles = StyleSheet.create({})

export default PersonalInfoTerms;
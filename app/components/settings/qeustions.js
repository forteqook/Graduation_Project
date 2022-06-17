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

import PageForm from '../../utils/forms/pageForm';
import QuestionsAccordion from '../../utils/forms/questionsAccordion';

const SECTIONS = [
    {
        title: '회원 탈퇴를 하고 싶어요.',
        content: '위드와 검치 들, 사제들, 성기사들 앞에는 보물이 산더미 처럼 쌓여 있었다.',
    },
    {
        title: '시동은 어느정도 거리에서까지 되나요?',
        content: '바르칸과 불사의 군단을 처단하고 획득한 방대한 금은보화와 골동품, 장비 들!',
    },
];

class FAQ extends Component {
    render () {
        return (
            <>
            <PageForm
            render={(
                <QuestionsAccordion sections={SECTIONS}/>
            )}
            backgroundColor='white'
            />
            </>
        )
    }
}

const styles = StyleSheet.create({})

export default FAQ;
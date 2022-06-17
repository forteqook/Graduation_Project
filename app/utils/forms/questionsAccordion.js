import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

class QuestionsAccordion extends Component {
    state = {
      activeSections: [],
    };
  
    _renderSectionTitle = (section) => {
      return (
        <View style={styles.title}>
          <Text>{section.title}</Text>
        </View>
      );
    };
  
    _renderHeader = (section) => {
      return (
        <View style={styles.header}>
          <Text style={styles.headerText}>{section.title}</Text>
        </View>
      );
    };
  
    _renderContent = (section) => {
      return (
        <View style={styles.content}>
          <Text style={{}}>{section.content}</Text>
        </View>
      );
    };
  
    _updateSections = (activeSections) => {
      this.setState({ activeSections });
    };
  
    render() {
      return (
        <Accordion
          sections={this.props.sections}
          activeSections={this.state.activeSections}
          // renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
          underlayColor='#ededed'
        />
      );
    }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  headerText: {
    color: 'black',
    fontSize: 15
  }
})

export default QuestionsAccordion
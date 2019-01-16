import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import AppStyles from '../AppStyles';

export default class CategoryButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor={AppStyles.colorSet.hairlineColor}>
        <View style={styles.categoryItemContainer}>
          <View style={[styles.iconContainer, { borderColor: this.props.color, backgroundColor: this.props.lightColor }]}>
            <Image style={[styles.categoryIcon, { tintColor: this.props.color }]} source={this.props.icon} />
          </View>
          <Text style={styles.categoryName}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  categoryItemContainer: {
    alignItems: 'center',
    padding: 30,
    borderWidth: 1,
    borderColor: AppStyles.colorSet.hairlineColor,
    borderRadius: 5,
    minWidth: 130,
  },
  iconContainer: {
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: 'grey',
    width: 60,
  },
  categoryIcon: {
    height: 30,
    width: 30,
  },
  categoryName: {
    marginTop: 10,
    alignSelf: 'center',
  },
})
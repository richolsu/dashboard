import React from 'react';
import { StyleSheet, View } from 'react-native';
import MenuButton from '../components/MenuButton';
import AppStyles from '../AppStyles';

export default class DrawerContainer extends React.Component {

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton title='Home' source={AppStyles.iconSet.home} onPress={() => { navigation.navigate('Home') }} />
          <MenuButton title='Dashboard' source={AppStyles.iconSet.bars} onPress={() => { navigation.navigate('Dashboard') }} />
          <MenuButton title='Orders' source={AppStyles.iconSet.orders} onPress={() => { navigation.navigate('Orders') }} />
          <MenuButton title='Notifications' source={AppStyles.iconSet.bell} onPress={() => { navigation.navigate('Notifications') }} />
          <MenuButton title='Activity' source={AppStyles.iconSet.feed} onPress={() => { navigation.navigate('Activity') }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
})


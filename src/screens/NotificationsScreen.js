import React from 'react';
import { ScrollView, View, FlatList, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import AppStyles from '../AppStyles';
import Icon from 'react-native-vector-icons/Ionicons';

class NotificationsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Notifications',
        headerLeft:
            <TouchableOpacity onPress={() => { navigation.toggleDrawer() }} >
                <Icon style={AppStyles.styleSet.menuButton} name="ios-menu" size={AppStyles.iconSizeSet.normal} color={AppStyles.colorSet.mainThemeForegroundColor} />
            </TouchableOpacity>,
    });

    constructor(props) {
        super(props);
    }

    

    render() {
        return (
            <ScrollView style={styles.container}>
                <Image style={{ tintColor: 'red' }} source={AppStyles.iconSet.home} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(NotificationsScreen);


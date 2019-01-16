import React from 'react';
import { ScrollView, View, FlatList, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import AppStyles from '../AppStyles';
import apiData from '../dummy_data.json';
import Icon from 'react-native-vector-icons/Ionicons';

class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Home',
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
                
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppStyles.colorSet.grayBgColor,
        margin: 8,
        borderRadius: 8,
    },
    searchIcon: {
        padding: 10,
        paddingRight: 0,
    },
    input: {
        flex: 1,
        padding: 5,
        paddingLeft: 0,
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    userPhoto: {
        width: 40,
        height: 40,
        marginLeft: 5,
    },
    friends: {
        minHeight: 75,
        padding: 10,
    },
    friendDivider: {
        width: 30,
        height: "100%",
    },
    friendItemContainer: {
        alignItems: 'center',
    },
    friendPhoto: {
        height: 60,
        borderRadius: 30,
        width: 60,
    },
    friendName: {
        marginTop: 10,
        alignSelf: 'center',
    },
    chats: {
        flex: 1,
        padding: 10,
    },
    chatItemContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    chatItemIcon: {
        height: 70,
        // borderRadius: 45,
        width: 70,
    },
    chatItemContent: {
        flex: 1,
        alignSelf: 'center',
        marginLeft: 10,
    },
    chatFriendName: {
        color: AppStyles.colorSet.mainTextColor,
        fontSize: 17,
    },
    content: {
        flexDirection: 'row',
    },
    message: {
        flex: 2,
        color: AppStyles.colorSet.mainSubtextColor
    },
    time: {
        marginLeft: 5,
        color: AppStyles.colorSet.mainSubtextColor
    }
});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(HomeScreen);

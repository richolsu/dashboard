import React from 'react';
import { ScrollView, View, FlatList, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import AppStyles from '../AppStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import Api from '../Api';

class NotificationsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Notifications',
    });

    constructor(props) {
        super(props);

        this.state = {
            list: Api.getNotifications()
        };
    }

    onPressItem = (item) => {

    }

    getInfo = (type) => {
        const info = {
            icon: '',
            name: '',
        };

        switch (type) {
            case 1:
                info.icon = 'md-calculator';
                info.name = 'Calendar';
                break;
            case 2:
                info.icon = 'ios-business';
                info.name = 'Sales';
                break;
            case 3:
                info.icon = 'ios-gift';
                info.name = 'Recommendations';
                break;
            case 4:
                info.icon = 'ios-person';
                info.name = 'Users';
                break;
            case 5:
                info.icon = 'ios-radio';
                info.name = 'Monitoring';
                break;
            case 6:
                info.icon = 'ios-arrow-down';
                info.name = 'Alerts';
                break;
        }
        return info;
    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.onPressItem(item)}>
            <View style={styles.itemContainer}>
                <Icon style={styles.icon} name={this.getInfo(item.type).icon} size={30} color={AppStyles.colorSet.mainSubtextColor} />
                <View style={styles.leftContainer}>
                    <Text style={styles.name}>{this.getInfo(item.type).name.toUpperCase()}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.subTitle}</Text>
                </View>

                <View style={styles.rightContainer}>
                    {item.alarmType == 1 &&
                        <View style={styles.alarm}></View>
                    }
                </View>


            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <FlatList
                data={this.state.list}
                renderItem={this.renderItem}
                keyExtractor={item => `${item.id}`}
                initialNumToRender={5}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: AppStyles.colorSet.hairlineColor,
    },
    icon: {
        margin: 10,
    },
    leftContainer: {
        flex: 1,
        marginLeft: 20,
    },
    name: {
        fontSize:12,
        color: AppStyles.colorSet.mainSubtextColor,
    },
    title: {
        marginTop: 3,
        color: AppStyles.colorSet.mainTextColor,
    },
    description: {
        fontSize: 12,
        color: AppStyles.colorSet.mainSubtextColor,
        marginTop: 3,
    },
    rightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 50,
    },
    alarm: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 20,
        marginLeft: 40,
        backgroundColor: AppStyles.colorSet.customersColor,
    },
    
});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(NotificationsScreen);


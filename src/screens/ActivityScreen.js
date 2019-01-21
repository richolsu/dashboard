import React from 'react';
import { ScrollView, View, FlatList, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import AppStyles from '../AppStyles';
import Api from '../Api';

class ActivityScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Activity Feed',
    });

    constructor(props) {
        super(props);
        this.state = {
            list: Api.getActivityFeeds()
        };
    }

    onPressItem = (item) => {

    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.onPressItem(item)}>
            <View style={styles.itemContainer}>
                <View style={[styles.circle, { backgroundColor: (item.type == 1 ? 'green' : (item.type == 2 ? 'red' : AppStyles.colorSet.mainSubtextColor)) }]} />
                <View style={styles.leftContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.subTitle}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={item.valueType == 1 ? styles.value1 : styles.value2}>{item.value}</Text>
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
        height: 60,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 1,
        margin: 10,
        backgroundColor: AppStyles.colorSet.mainThemeForegroundColor,
        borderColor: AppStyles.colorSet.mainTextColor,
    },
    leftContainer: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        color: AppStyles.colorSet.mainTextColor,
        fontFamily: AppStyles.fontSet.regular,
    },
    description: {
        fontSize: 12,
        color: AppStyles.colorSet.mainSubtextColor,
        marginTop: 3,
        fontFamily: AppStyles.fontSet.regular,
    },
    rightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: AppStyles.fontSet.regular,
    },
    value1: {
        color: AppStyles.colorSet.mainSubtextColor,
        fontSize:11,
        fontFamily: AppStyles.fontSet.regular,
    },
    value2: {
        color: AppStyles.colorSet.mainThemeForegroundColor,
        fontSize: 13,
        fontFamily: AppStyles.fontSet.regular,
    }
});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(ActivityScreen);


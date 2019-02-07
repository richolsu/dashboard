import React from 'react';
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import AppStyles from '../AppStyles';
import Api from '../Api';
import { SafeAreaView } from 'react-navigation';

class DetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('item').title,
    });

    constructor(props) {
        super(props);

        const category = props.navigation.getParam('category');
        const item = props.navigation.getParam('item');
        const data = Api.getDataOfCategory(category, item.id);

        this.state = {
            data: data
        };
    }

    render() {
        const properties = this.state.data.properties;
        const propertyRows = Object.keys(properties).map(function(key) {
            const property = properties[key];
            console.log("================");
            console.log(key, property);
            return (
                <View style={styles.row}>
                    <Text style={styles.propertyTitle}>{key}</Text>
                    <Text style={styles.propertyValue}>{property}</Text>
                </View>
            );
        });

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <FastImage style={styles.photo} resizeMode={'contain'} source={{ uri: this.state.data.photo }} />
                    <Text style={styles.title}>{this.state.data.title}</Text>
                    <Text style={styles.description}>{this.state.data.description}</Text>
                    {propertyRows}
                </ScrollView>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    scrollContainer: {
        backgroundColor: 'white',
        flex: 1,
    },
    photo: {
        width: '100%',
        height: 150,
        margin: 10,
        alignSelf: 'center',
    },
    title: {
        margin: 10,
        fontSize: 20,
        color: AppStyles.colorSet.mainTextColor,
        fontFamily: AppStyles.fontSet.regular,
    },
    description: {
        fontSize: 12,
        color: AppStyles.colorSet.mainSubtextColor,
        margin: 10,
        fontFamily: AppStyles.fontSet.regular,
    },
    propertyTitle: {
        flex: 1,
        fontSize: 16,
        color: AppStyles.colorSet.mainTextColor,
        fontFamily: AppStyles.fontSet.regular,
    },
    propertyValue: {
        fontSize: 12,
        color: AppStyles.colorSet.mainSubtextColor,
        fontFamily: AppStyles.fontSet.regular,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        padding: 10,
        borderBottomColor: AppStyles.colorSet.hairlineColor
    }
});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(DetailScreen);


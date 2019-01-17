import React from 'react';
import { ScrollView, View, FlatList, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import AppStyles from '../AppStyles';
import Api from '../Api';

class ListScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.category,
    });

    constructor(props) {
        super(props);

        const category = props.navigation.getParam('category');
        this.state = {
            category: category,
            list: Api.getListOfCategory(category)
        };
    }

    onPressItem = (item) => {
        this.props.navigation.navigate('DetailScreen', { category: this.state.category, item: item });
    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.onPressItem(item)}>
            <View style={styles.itemContainer}>
                <FastImage style={styles.photo} source={{ uri: item.photo }} />
                <View style={styles.leftContainer}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.value}>{item.value}</Text>
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
    photo: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 1,
        margin: 10,
        borderColor: AppStyles.colorSet.mainTextColor,
    },
    leftContainer: {
        flex: 1,
    },
    title: {
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
    },
    value: {
        color: AppStyles.colorSet.mainSubtextColor,
    }
});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(ListScreen);


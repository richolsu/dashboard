import React from 'react';
import { ScrollView, View, FlatList, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import AppStyles from '../AppStyles';
import Api from '../Api';
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

        this.state = {
            categories: Api.getCategories(),
        }
    }


    renderCategoryItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.onPresscategory(item)}>
            <View style={styles.categoryItemContainer}>
                <View style={[styles.iconContainer, {borderColor: item.color, backgroundColor: item.lightColor}]}>
                    <Image style={[styles.categoryIcon, {tintColor: item.color}]} source={item.icon} />
                </View>
                <Text style={styles.categoryName}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    renderCategorySeparator = () => {
        return (<View style={styles.categoryDivider} />);
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.categories}>
                    <FlatList
                        horizontal={true}
                        initialNumToRender={4}
                        ItemSeparatorComponent={this.renderCategorySeparator}
                        data={this.state.categories}
                        showsHorizontalScrollIndicator={false}
                        renderItem={this.renderCategoryItem}
                        keyExtractor={item => `${item.id}`}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    categories: {
        minHeight: 75,
        padding: 10,
    },
    categoryDivider: {
        width: 30,
        height: "100%",
    },
    categoryItemContainer: {
        alignItems: 'center',
    },
    iconContainer: {
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: AppStyles.colorSet.mainThemeForegroundColor,
        backgroundColor: 'grey',
        width: 60,
    },
    categoryIcon: {
        height: 30,
        tintColor: AppStyles.colorSet.mainThemeForegroundColor,
        width: 30,
    },
    categoryName: {
        marginTop: 10,
        alignSelf: 'center',
    },
});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(HomeScreen);


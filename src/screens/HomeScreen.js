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

        const summary = Api.getSummary();
        const summaryList = Object.keys(summary).map(key => {
            return {
                key: key,
                value: summary[key]
            };
        });
        
        this.state = {
            categories: Api.getCategories(),
            summaryList: summaryList,
            orders: Api.getOrders().slice(0, 10)
        }
    }

    onPressCategory = (item) => {
        if (item.title == 'Analytics') {
            this.props.navigation.navigate('AnalyticsScreen');
        } else {
            this.props.navigation.navigate('ListScreen', { category: item.title });
        }        
    }

    renderCategoryItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.onPressCategory(item)}>
            <View style={styles.categoryItemContainer}>
                <View style={[styles.iconContainer, { borderColor: item.color, backgroundColor: item.lightColor }]}>
                    <Image style={[styles.categoryIcon, { tintColor: item.color }]} source={item.icon} />
                </View>
                <Text style={styles.categoryName}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    renderCategorySeparator = () => {
        return (<View style={styles.categoryDivider} />);
    };

    renderSummarySeparator = () => {
        return (<View style={styles.summaryDivider} />);
    };

    renderSummaryItem = ({ item }) => (
        <View style={styles.summaryItemContainer}>
            <Text style={styles.summaryKey} numberOfLines={2}>{item.key.toUpperCase()}</Text>
            <Text style={styles.summaryValue}>{item.value}</Text>
        </View>
    );

    renderOrderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.onPressItem(item)}>
            <View style={styles.orderItemContainer}>
                <FastImage style={styles.orderPhoto} source={{ uri: item.photo }} />
                <View style={styles.orderLeftContainer}>
                    <Text style={styles.orderTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.orderDescription}>{item.description}</Text>
                </View>
                <View style={styles.orderRightContainer}>
                    <Text style={item.valueType == 1 ? styles.orderValue1 : styles.orderValue2}>{item.value}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

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
                <View style={styles.chart}>
                </View>
                <View style={styles.summary}>
                    <FlatList
                        horizontal={true}
                        ItemSeparatorComponent={this.renderSummarySeparator}
                        data={this.state.summaryList}
                        showsHorizontalScrollIndicator={false}
                        renderItem={this.renderSummaryItem}
                        keyExtractor={item => `${item.key}`}
                    />
                </View>
                <View style={styles.orders}>
                    <Text style={styles.ordersTitle}>Recent Orders</Text>
                    <FlatList
                        data={this.state.orders}
                        renderItem={this.renderOrderItem}
                        keyExtractor={item => `${item.id}`}
                        initialNumToRender={5}
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
    chart: {
        minHeight: 120,
        padding: 10,
    },
    summary: {
        minHeight: 75,
        padding: 10,
    },
    summaryItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        minWidth: 120,
        borderColor: AppStyles.colorSet.hairlineColor
    },
    summaryDivider: {
        width: 10,
        height: "100%",
    },
    summaryKey: {
        textAlign: 'center',
        color: AppStyles.colorSet.mainSubtextColor
    },
    summaryValue: {
        fontSize: 18,
        color: AppStyles.colorSet.mainThemeForegroundColor
    },

    orders: {

    },
    ordersTitle: {
        padding: 10,
        color: AppStyles.colorSet.mainTextColor,
        fontSize: 20,
    },
    orderItemContainer: {
        flexDirection: 'row',
        height: 60,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderPhoto: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 1,
        margin: 10,
        borderColor: AppStyles.colorSet.mainTextColor,
    },
    orderLeftContainer: {
        flex: 1,
    },
    orderTitle: {
        color: AppStyles.colorSet.mainTextColor,
    },
    orderDescription: {
        fontSize: 12,
        color: AppStyles.colorSet.mainSubtextColor,
        marginTop: 3,
    },
    orderRightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderValue1: {
        color: AppStyles.colorSet.redColor,
    },
    orderValue2: {
        color: AppStyles.colorSet.mainThemeForegroundColor,
    }

});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(HomeScreen);


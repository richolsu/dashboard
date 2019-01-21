import React from 'react';
import { ScrollView, View, FlatList, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import AppStyles from '../AppStyles';
import Api from '../Api';
import Icon from 'react-native-vector-icons/Ionicons';
import { LineChart } from 'react-native-chart-kit'
import ModalSelector from 'react-native-modal-selector';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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
            orders: Api.getOrders().slice(0, 10),
            currentDateRangeOption: AppStyles.dateRangeOptions[1],
        }
    }

    getLineChartData = () => {
        const labels = [];
        const values = [];

        Api.getRevenueData().forEach(element => {
            labels.push(element.label);
            values.push(element.value);
        });

        const chartData = {
            labels: labels,
            datasets: [
                {
                    data: values,
                }
            ]
        };

        return chartData;
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
        <TouchableOpacity onPress={() => this.onPressOrderItem(item)}>
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

    onPressOrderItem = (item) => {
        this.props.navigation.navigate('DetailScreen', { category: 'Orders', item: item });
    }

    onChanageDateRange = (option) => {
        this.setState({
            currentDateRangeOption: option,
        });


    }

    onDayPress = (day) => {
        alert(day);
    }

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
                <Calendar
                    onDayPress={this.onDayPress}
                    // markingType={'period'}
                    // Collection of dates that have to be marked. Default = {}
                    markedDates={{
                        '2019-01-14': { selected: true, selectedColor: 'blue'},
                        '2019-01-16': { selected: true, startingDay: true, color: AppStyles.colorSet.hairlineColor, textColor: AppStyles.colorSet.mainTextColor },
                        '2019-01-17': { color: AppStyles.colorSet.hairlineColor, textColor: AppStyles.colorSet.mainTextColor },
                        '2019-01-18': { endingDay: true, color: AppStyles.colorSet.hairlineColor, textColor: AppStyles.colorSet.mainTextColor },
                    }}
                />
                <View style={styles.chart}>
                    <View style={styles.row}>
                        <Text style={styles.chartTitle}>Overview</Text>
                        <View>
                            <ModalSelector
                                touchableActiveOpacity={0.9}
                                data={AppStyles.dateRangeOptions}
                                backdropPressToClose={true}
                                cancelText={'Cancel'}
                                initValue={this.state.currentDateRangeOption.label}
                                onChange={this.onChanageDateRange}>
                                <View style={styles.dateRange}>
                                    <Text style={styles.dateRangeTitle}>{this.state.currentDateRangeOption.label}</Text>
                                    <Icon style={styles.icon} name={'ios-arrow-down'} size={16} color={AppStyles.colorSet.mainSubtextColor} />
                                </View>

                            </ModalSelector>
                        </View>
                    </View>
                    <LineChart
                        data={this.getLineChartData(this.getLineChartData())}
                        width={AppStyles.windowH}
                        height={220}
                        gridMin={0}
                        chartConfig={AppStyles.chartConfig}
                        bezier
                    />
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
        minHeight: 220,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartTitle: {
        padding: 10,
        flex: 1,
        color: AppStyles.colorSet.mainTextColor,
        fontSize: 20,
    },
    dateRange: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    dateRangeTitle: {
        color: AppStyles.colorSet.mainSubtextColor,
        fontSize: 12,
    },
    icon: {
        marginLeft: 10,
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


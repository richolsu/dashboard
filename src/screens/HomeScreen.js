import React from 'react';
import { ScrollView, View, FlatList, Text, Dimensions, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import AppStyles from '../AppStyles';
import Api from '../Api';
import Icon from 'react-native-vector-icons/Ionicons';
// import { LineChart } from 'react-native-chart-kit';
import LineChart from '../components/line-chart';

import ModalSelector from 'react-native-modal-selector';
import SelectDateRangeModal from '../components/SelectDateRangeModal';
import moment from 'moment';

const WINDOW_WIDTH = Dimensions.get('window').width;

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

        const startDay = moment().format(AppStyles.dateFormat);
        const endDay = moment().format(AppStyles.dateFormat);

        this.state = {
            categories: Api.getCategories(),
            summaryList: summaryList,
            orders: Api.getOrders().slice(0, 10),
            currentDateRangeOption: AppStyles.dateRangeOptions[1],
            startDay: startDay,
            endDay: endDay,
            selectDateRangeModalVisible: false,
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

    onChanageDateRangeOption = (option) => {
        this.setState({
            currentDateRangeOption: option,
        });

        if (option.key == 'custom_range') {
            this.setState({ selectDateRangeModalVisible: true });
        }

    }

    onSelectDateRangeCancel = () => {
        this.setState({ selectDateRangeModalVisible: false });
    }

    onSelectDateRangeDone = (dateRange) => {
        var currentDateRangeOption = {...this.state.currentDateRangeOption};
        currentDateRangeOption.label = moment(dateRange.startDay).format("MMM D, YYYY") + " - " + moment(dateRange.endDay).format("MMM D, YYYY");

        this.setState({
            currentDateRangeOption: currentDateRangeOption,
            startDay: dateRange.startDay,
            endDay: dateRange.endDay,
            selectDateRangeModalVisible: false
        });
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
                                onChange={this.onChanageDateRangeOption}>
                                <View style={styles.dateRange}>
                                    <Text style={styles.dateRangeTitle}>{this.state.currentDateRangeOption.label}</Text>
                                    <Icon style={styles.icon} name={'ios-arrow-down'} size={16} color={AppStyles.colorSet.mainSubtextColor} />
                                </View>

                            </ModalSelector>
                        </View>
                    </View>
                    <LineChart
                        data={this.getLineChartData(this.getLineChartData())}
                        width={WINDOW_WIDTH}
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
                {this.state.selectDateRangeModalVisible &&
                    <SelectDateRangeModal
                        startDay={this.state.startDay}
                        endDay={this.state.endDay}
                        onCancel={this.onSelectDateRangeCancel}
                        onDone={this.onSelectDateRangeDone}
                    ></SelectDateRangeModal>
                }
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
        width: 20,
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
        borderColor: AppStyles.colorSet.hairlineColor,
        backgroundColor: 'grey',
        width: 60,
    },
    categoryIcon: {
        height: 27,
        tintColor: AppStyles.colorSet.hairlineColor,
        width: 27,
    },
    categoryName: {
        marginTop: 10,
        alignSelf: 'center',
        fontFamily: AppStyles.fontSet.regular,
        fontSize: 12
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
        fontWeight: 'bold',
        fontFamily: AppStyles.fontSet.bold,
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
        fontFamily: AppStyles.fontSet.regular,
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
        color: AppStyles.colorSet.mainSubtextColor,
        fontFamily: AppStyles.fontSet.regular,
    },
    summaryValue: {
        fontSize: 18,
        color: AppStyles.colorSet.mainThemeForegroundColor,
        fontFamily: AppStyles.fontSet.regular,
    },

    orders: {

    },
    ordersTitle: {
        padding: 10,
        color: AppStyles.colorSet.mainTextColor,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: AppStyles.fontSet.bold,
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
        borderColor: AppStyles.colorSet.hairlineColor,
    },
    orderLeftContainer: {
        flex: 1,
    },
    orderTitle: {
        color: AppStyles.colorSet.mainTextColor,
        fontFamily: AppStyles.fontSet.regular,
    },
    orderDescription: {
        fontSize: 12,
        color: AppStyles.colorSet.mainSubtextColor,
        marginTop: 3,
        fontFamily: AppStyles.fontSet.regular,
    },
    orderRightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderValue1: {
        color: AppStyles.colorSet.redColor,
        fontFamily: AppStyles.fontSet.regular,
    },
    orderValue2: {
        color: AppStyles.colorSet.mainThemeForegroundColor,
        fontFamily: AppStyles.fontSet.regular,
    }

});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(HomeScreen);


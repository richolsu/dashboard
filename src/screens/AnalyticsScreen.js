import React from 'react';
import { ScrollView, View, FlatList, Text, TextInput, Image, Dimensions, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import AppStyles from '../AppStyles';
import Api from '../Api';
import {
    BarChart,
    PieChart,
} from 'react-native-chart-kit'

import LineChart from '../components/line-chart'

class AnalyticsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Analytics',
    });

    constructor(props) {
        super(props);

        this.state = {
            revenueData: Api.getRevenueData(),
            costData: Api.getCostData(),
            acquisitionData: Api.getAcquisitionData(),
            monthlyProfitData: Api.getMonthlyProfitData(),
            quarterlyCountryRevenueData: Api.getQuarterlyCountryRevenueData(),
        };
    }

    onPressItem = (item) => {

    }


    getLineChartData = (data) => {
        const labels = [];
        const values = [];

        data.forEach(element => {
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

    getPieChartData = (data) => {

        const chartData = [];

        for (var i = 0; i < data.length; i++) {
            var element = data[i];
            var g = parseInt(255 * i / data.length);
            chartData.push({
                name: element.label,
                value: element.value,
                legendFontColor: AppStyles.colorSet.mainTextColor,
                legendFontSize: 12,
                color: 'rgb(36, ' + g + ',223)'
            });
        }

        return chartData;
    }

    getBarChartData = () => {

        const labels = [];
        const usValues = [];
        const ukValues = [];
        const indiaValues = [];

        this.state.quarterlyCountryRevenueData.forEach(element => {
            labels.push(element.label);
            usValues.push(element.value.us);
            ukValues.push(element.value.uk);
            indiaValues.push(element.value.india);
        });

        const chartData = {
            labels: labels,
            datasets: [
                {
                    data: usValues,
                },
                {
                    data: ukValues,
                },
                {
                    data: indiaValues,
                }
            ]
        };

        return chartData;
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <LineChart
                    data={this.getLineChartData(this.state.revenueData)}
                    width={AppStyles.windowH}
                    height={220}
                    config={{renderHorizontalLines:{count: 10}}}
                    gridMin={0}
                    chartConfig={AppStyles.chartConfig}
                    bezier
                />
                <LineChart
                    data={this.getLineChartData(this.state.costData)}
                    width={AppStyles.windowH}
                    height={220}
                    chartConfig={AppStyles.chartConfig}
                    bezier
                />
                <PieChart
                    data={this.getPieChartData(this.state.acquisitionData)}
                    width={AppStyles.windowH}
                    height={220}
                    chartConfig={AppStyles.chartConfig}
                    accessor="value"
                    backgroundColor="transparent"
                    paddingLeft="15"
                />
                <PieChart
                    data={this.getPieChartData(this.state.monthlyProfitData)}
                    width={AppStyles.windowH}
                    height={220}
                    chartConfig={AppStyles.chartConfig}
                    accessor="value"
                    backgroundColor="transparent"
                    paddingLeft="15"
                />
                <BarChart
                    // style={graphStyle}
                    data={this.getBarChartData()}
                    width={AppStyles.windowH}
                    height={220}
                    chartConfig={AppStyles.chartConfig}
                />

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

export default connect(mapStateToProps)(AnalyticsScreen);


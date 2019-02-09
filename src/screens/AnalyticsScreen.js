import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { connect } from 'react-redux';
import Api from '../Api';
import AppStyles from '../AppStyles';
import LineChart from '../components/line-chart';
import BarChart from '../components/bar-chart';

const WINDOW_WIDTH = Dimensions.get('window').width;

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
                <Text style={styles.title}>Revenue</Text>
                <LineChart
                    data={this.getLineChartData(this.state.revenueData)}
                    width={WINDOW_WIDTH}
                    height={220}
                    config={{renderHorizontalLines:{count: 10}}}
                    gridMin={0}
                    chartConfig={AppStyles.chartConfig}
                    bezier
                />
                <Text style={styles.title}>Costs</Text>
                <LineChart
                    data={this.getLineChartData(this.state.costData)}
                    width={WINDOW_WIDTH}
                    height={220}
                    chartConfig={AppStyles.chartConfig}
                    bezier
                />
                <Text style={styles.title}>Acquisition</Text>
                <PieChart
                    data={this.getPieChartData(this.state.acquisitionData)}
                    width={WINDOW_WIDTH}
                    height={220}
                    chartConfig={AppStyles.chartConfig}
                    accessor="value"
                    backgroundColor="transparent"
                    paddingLeft="15"
                />
                <Text style={styles.title}>Monthly Profit</Text>
                <PieChart
                    data={this.getPieChartData(this.state.monthlyProfitData)}
                    width={WINDOW_WIDTH}
                    height={220}
                    chartConfig={AppStyles.chartConfig}
                    accessor="value"
                    backgroundColor="transparent"
                    paddingLeft="15"
                />
                <Text style={styles.title}>Quarterly Revenue by Country</Text>
                <BarChart
                    // style={graphStyle}
                    data={this.getBarChartData()}
                    width={WINDOW_WIDTH}
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
    title: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: AppStyles.colorSet.mainTextColor,
        fontFamily: AppStyles.fontSet.bold,
    }
});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(AnalyticsScreen);


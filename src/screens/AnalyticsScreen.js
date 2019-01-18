import React from 'react';
import { ScrollView, View, FlatList, Text, TextInput, Image, Dimensions, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import AppStyles from '../AppStyles';
import Api from '../Api';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'

class AnalyticsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Analytics',
    });

    constructor(props) {
        super(props);

        this.state = {
            list: Api.getListOfCategory('Analytics')
        };
    }

    onPressItem = (item) => {

    }



    render() {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                data: [20, 45, 28, 80, 99, 43],
            }]
        }

        const pieChartData = [
            { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'New York', population: 8538000, color: '#777777', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
        ]

        const barChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'June', 'June', 'June', 'June', 'June'],
            datasets: [{
                data: [20, 45, 28, 80, 99, 43, 13, 15, 18, 20, 21]
            }]
        }

        const screenWidth = Dimensions.get('window').width

        const chartConfig = {
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            color: (opacity = 1) => `rgba(48, 104, 204, ${opacity})`
        }

        return (
            <ScrollView style={styles.container}>
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                />

                <BarChart
                    // style={graphStyle}
                    data={barChartData}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                />

                <PieChart
                    data={pieChartData}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
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


import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import AppStyles from '../AppStyles';
import TextButton from 'react-native-button';
import { SafeAreaView } from 'react-navigation';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';

class SelectDateRangeModal extends React.Component {

    constructor(props) {
        super(props);

        const startDay = this.props.startDay;
        const endDay = this.props.endDay;

        this.state = {
            startDay: startDay,
            endDay: endDay,
            selectedDays: this.getSelectedDateRange(startDay, endDay)
        }
    }

    getSelectedDateRange = (startDayString, endDayString) => {
        
        const selectedDays = {};
        const startDay = moment(startDayString);
        const endDay = moment(endDayString);

        for (var day = startDay; day.diff(endDay) <= 0; day = day.add(1, 'days')) {
            var dayConfig = {
                selected: true,
                startingDay: true,
                color: AppStyles.colorSet.hairlineColor,
                textColor: AppStyles.colorSet.mainTextColor
            }
            selectedDays[day.format(AppStyles.dateFormat)] = dayConfig;
        }

        return selectedDays;
    }

    onCancel = () => {
        this.props.onCancel();
    }

    onDone = () => {
        this.props.onDone({startDay: this.state.startDay, endDay: this.state.endDay});
    }

    onDayPress = (day) => {
        if (Object.keys(this.state.selectedDays).length == 0) {
            this.setState({ 
                startDay: day.dateString,
                endDay: day.dateString,
                selectedDays: this.getSelectedDateRange(day.dateString, day.dateString) 
            });
        } else {
            this.setState({ 
                endDay: day.dateString,
                selectedDays: this.getSelectedDateRange(this.state.startDay, day.dateString) 
            });
        }
    }

    onDayLongPress = (day) => {
        this.setState({ selectedDays: {} });
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                onRequestClose={this.onCancel}>
                <SafeAreaView style={styles.modalView}>
                    <View style={styles.headerBar}>
                        <TextButton style={styles.btn} onPress={() => this.onCancel()} >Cancel</TextButton>
                        <Text style={styles.title}>Select Dates</Text>
                        <TextButton style={styles.btn} onPress={() => this.onDone()} >Done</TextButton>
                    </View>
                    <Calendar
                        onDayPress={this.onDayPress}
                        onDayLongPress={this.onDayLongPress}
                        hideExtraDays={true}
                        markedDates={this.state.selectedDays}
                    />
                </SafeAreaView>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
    },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        color: AppStyles.colorSet.mainThemeForegroundColor,
        padding: 10,
    },
    title: {
        color: 'black',
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
    }
});



export default SelectDateRangeModal;

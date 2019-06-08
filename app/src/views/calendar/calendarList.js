/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import _ from 'lodash';
import Header from '../../components/header/header';
import { CalenderCard } from '../../components/calenderCard/calenderCard';
import Color from '../../common/Color';

class CalendarList extends Component {
  constructor(props) {
    super(props);
    const { InstructorList, selectedIndex } = props;
    let selectedInstructor = InstructorList[selectedIndex];

    const selectedStartDate = selectedInstructor.sd;
    const newStateValues = this.updateRelatedDates(selectedStartDate, InstructorList);

    let marked = _.groupBy(InstructorList, function (b) {
      return b.sd;
    });
    let markeddateaArray = Object.keys(marked);
    let markedDates = {};
    markeddateaArray.map(date => {
      markedDates[date] = {
        selected: true,
        marked: true,
        selectedColor: Color.calenderColor,
      };
    });

    this.state = {
      ...newStateValues,
      markedDates,
    };
  }

  updateRelatedDates = (selectedDate, InstructorList) => {
    const filteredInstructor = InstructorList.filter(item => {
      return selectedDate === item.sd;
    });

    return {
      selectedDate: selectedDate,
      selectedDateData: filteredInstructor,
    };
  };


  render() {
    const { markedDates, selectedDateData, selectedDate } = this.state;
    const { InstructorList } = this.props;

    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <Header title="Calendar" />

        <Calendar
          style={{
            height: 350,
            margin: 10,
            marginTop: 5,
            justifyContent: 'center',
          }}
          monthFormat="MMM yyyy"
          onDayPress={(date) => {
            console.log('nabeel: selected day', date)
            const { year, month, day } = date;
            const formattedDate = `${year}-${month<10?"0":""}${month}-${day<10?"0":""}${day}`;
            const newStateValues = this.updateRelatedDates(formattedDate, InstructorList);

            this.setState({ ...newStateValues });
          }}
          firstDay={1}
          markedDates={markedDates}
          onDayLongPress={day => {
            console.log(day);
          }}
          hideArrows={false}
        />
        <View style={{ flex: 1, alignItems: 'center' }}>
          {selectedDateData.map(item => {
            return (<CalenderCard data={item} date={selectedDate} />);
          })}

        </View>
      </ScrollView>
    );
  }
}

const maptoprops = state => {
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata,
    InstructorList: state.SearchIntructor.searchedList,
    selectedIndex: state.SearchIntructor.calenderSelectionIndex
  };
};

export default connect(maptoprops)(CalendarList);

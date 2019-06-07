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
    console.log("nabeel: selected date: ", selectedInstructor, selectedInstructor.sd);
    const selectedStartDate = selectedInstructor.sd;
    const filteredInstructor = InstructorList.filter((item, index, array) => {
      return selectedStartDate === item.sd;
    });


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

    console.log("nabeel: filteredList", filteredInstructor, selectedStartDate);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      selectedDate: selectedStartDate,
      markedDates,
      marked: {},
      selectedDateData: filteredInstructor,
    };
  }


  render() {
    const { markedDates } = this.state;

    console.log("nabeel: clander List: ", this.state, this.state.selectedDateData, markedDates);
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
            this.setState({
              selectedDate: `${year}-${month}-${day}`
            });
          }}
          firstDay={1}
          markedDates={markedDates}
          onDayLongPress={day => {
            console.log(day);
            this.setState({ selected: day });
          }}
          hideArrows={false}
        />
        <View style={{ flex: 1, alignItems: 'center' }}>
          {this.state.selectedDateData.map(item => {
            return <CalenderCard data={item} date={this.state.selectedDate} />;
          })}

        </View>
      </ScrollView>
    );
  }
}

const maptoprops = state => {
  console.log('maptoprops==', state.SearchIntructor.searchedList);
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata,
    InstructorList: state.SearchIntructor.searchedList,
    selectedIndex: state.SearchIntructor.calenderSelectionIndex
  };
};

export default connect(maptoprops)(CalendarList);

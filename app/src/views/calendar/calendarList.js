/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import _ from 'lodash';
import Header from '../../components/header/header';
import {CalenderCard} from '../../components/calenderCard/calenderCard';
import Color from '../../common/Color';

class CalendarList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      date: moment ().format ('YYYY-MM-DD'),
      selectedDate: moment ().format ('YYYY-MM-DD'),
      markedDates: {},
      marked: {},
      selectedDateData: [],
    };
  }
  componentWillMount () {
    let marked = _.groupBy (this.props.InstructorList, function (b) {
      return b.sd;
    });

    let markeddateaArray = Object.keys (marked);

    let obj = {};
    markeddateaArray.map (date => {
      this.setState ({selectedDateData: marked['2019-06-05']});

      obj[date] = {
        selected: true,
        marked: true,
        selectedColor: Color.calenderColor,
      };
    });

    this.setState ({markedDates: obj, marked: marked});
  }

  render () {
    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <Header title="Calendar" />

        <Calendar
          style={{
            height: 350,
            margin: 10,
            marginTop: 5,
            justifyContent: 'center',
          }}
          minDate="2012-05-10"
          maxDate="2012-05-30"
          monthFormat="MMM yyyy"
          onMonthChange={month => this.setState ({date: month.dateString})}
          firstDay={1}
          hideDayNames
          showWeekNumbers
          onPressArrowLeft={substractMonth => substractMonth ()}
          onPressArrowRight={addMonth => addMonth ()}
          markingType="multi-dot"
          markedDates={this.state.markedDates}
          onDateSelect={day => console.log (day)}
          markedDates={{
            [this.state.selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: 'orange',
            },
            ...this.state.markedDates,
          }}
          theme={{selectedDayBackgroundColor: '#00adf5'}}
          onDayLongPress={day => {
            console.log (day);
            this.setState ({selected: day});
          }}
          hideArrows={false}
        />
        <View style={{flex: 1, alignItems: 'center'}}>
          {this.state.selectedDateData.map (item => {
            return <CalenderCard data={item} date={this.state.selectedDate} />;
          })}

        </View>
      </ScrollView>
    );
  }
}

const maptoprops = state => {
  console.log ('maptoprops==', state.SearchIntructor.searchedList);
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata,
    InstructorList: state.SearchIntructor.searchedList,
  };
};

export default connect (maptoprops, null) (CalendarList);

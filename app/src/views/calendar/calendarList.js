/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import PropTypes from "prop-types";
import moment from "moment";
import Header from "../../components/header/header";
import { CalenderCard } from "../../components/calenderCard/calenderCard";
class CalendarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format("YYYY-MM-DD")
    };
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Header title="Calendar" />

        <Calendar
          style={{
            height: 350,
            margin: 10,
            marginTop: 5,
            justifyContent: "center"
          }}
          minDate="2012-05-10"
          maxDate="2012-05-30"
          monthFormat={"MMM yyyy"}
          onMonthChange={month => this.setState({ date: month.dateString })}
          hideArrows={false}
          hideExtraDays={false}
          firstDay={1}
          hideDayNames
          showWeekNumbers
          onPressArrowLeft={substractMonth => substractMonth()}
          onPressArrowRight={addMonth => addMonth()}
          onDayPress={day => {
            this._selectDate(day);
          }}
          current={this.state.date}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            todayTextColor: "yellow",
            dayTextColor: "black",
            textDisabledColor: "#d9e1e8",
            dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            arrowColor: "grey",
            monthTextColor: "grey",
            textMonthFontWeight: "bold",
            textDayFontSize: 16,
            textMonthFontSize: 25,
            textDayHeaderFontSize: 16,
            selected: "#707070",
            selectedDayBackgroundColor: "#EEEEEE",
            selectedDayTextColor: "black"
          }}
        />
        <View style={{ flex: 1, alignItems: "center" }}>
          <CalenderCard />
          <CalenderCard />
        </View>
      </View>
    );
  }
}

export default CalendarList;

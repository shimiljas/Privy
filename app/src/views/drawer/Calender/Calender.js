import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Container, Text } from "native-base";
import Calendar from "react-native-calendar";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import Color from "../../../common/Color";
import { CalenderCard } from "../../../components";
import Header from "../../../components/header/header";
import KeyWords from "../../../common/Localization";
import Styles from "./Styles";
import styles from "../../../components/modelAlert/styles";

var data = [
  {
    title: "Search for Service"
  },
  {
    title: "Search for Service"
  },
  {
    title: "Search for Service"
  }
];
const customStyle = {
  selectedDayCircle: {
    backgroundColor: Color.calenderColor
  },
  title: {
    color: Color.grayClg
  },
  titleText: {
    fontSize: 15
  },
  dayHeading: {
    color: Color.grayClg
  },
  weekendHeading: {
    color: Color.grayClg
  },
  weekendDayText: {
    color: Color.darkGray
  },
  selectedDayText: {
    color: Color.whiteClr
  },
  hasEventCircle: {
    backgroundColor: Color.calenderColor
  }
};
class CalenderScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  _cellDetailView = () => {
    return <CalenderCard />;
  };
  backBtnPress = () => {
     Actions.pop();
  };
  render() {
    const { userData } = this.props;
    return (
      <Container style={Styles.container}>
        <Header title={KeyWords.calendarText} />
        <View style={Styles.backArea}>
          {userData.roleId == "2" ? (
            <View style={Styles.nameArea}>
              <Text style={Styles.nameText}>Jason Bourne</Text>
              <View style={Styles.line} />
            </View>
          ) : (
            <View style={Styles.nameArea} />
          )}

          <TouchableOpacity onPress={() => this.backBtnPress()} style={Styles.btnarea}>
            <Text style={Styles.back}>{KeyWords.back}</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={Styles.calenderView}> */}
        <View style={Styles.calenderView}>
          <Calendar
            showEventIndicators
            eventDates={["2018-11-01", "2018-11-07", "2018-11-19"]}
            showControls
            customStyle={customStyle}
            prevButtonText={"<"}
            removeClippedSubviews={false}
            nextButtonText={">"}
            scrollEnable={false}
          />
          <View style={Styles.transparent} />
        </View>
        {/* </View> */}

        <FlatList
          contentContainerStyle={Styles.list}
          data={data}
          renderItem={({ item }) => this._cellDetailView(item)}
          keyExtractor={this.keyExtractor}
        />
      </Container>
    );
  }
}

//export default DashboardComponent;
const maptoprops = state => {
  // console.log("dashboard state", state);
  return {
    userData: state.User.userdata
  };
};

export default connect(maptoprops)(CalenderScreen);

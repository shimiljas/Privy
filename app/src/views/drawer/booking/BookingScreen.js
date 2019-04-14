import React, { Component } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Container, Tab, Tabs } from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { AllClasses } from "../../../actions";
import Header from "../../../components/header/header";
import Styles from "./bookingStatus/Styles";
import CancelBooking from "./bookingStatus/CancelBooking";
import ComingBooking from "./bookingStatus/ComingBooking";
import KeyWords from "../../../common/Localization";
import RF from "react-native-responsive-fontsize";

class BookingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tabStatus:0
      sIndex: 0
    };
    //his.getAllClasses();
  }

  // getAllClasses=()=>{
  //   console.log('all classes apip calls')
  //   const{userData,AllClasses}=this.props;
  //   const{tabStatus}=this.state;

  //   AllClasses({
  //     status:tabStatus,
  //     roll_id:userData.roleId,
  //     user_id: userData._id,
  //     api_token: userData.api_token != null ? userData.api_token : userData.token
  //    } );
  // }

  onScrollEnd(e) {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    console.log("scrolled to page ", pageNum);
  }

  render() {
    const { userData } = this.props;
    return (
      <Container>
        <Header
          title={
            Actions.currentParams.headerName != undefined
              ? Actions.currentParams.headerName
              : KeyWords.booked + " " + KeyWords.lessons
          }
        />
        <View>
          <TabBar
            onSelect={sIndex => this.setState({ sIndex })}
            selected={this.state.sIndex}
            data={[
              userData.roleId == 3
                ? KeyWords.booked + " " + KeyWords.scheduleTitle
                : KeyWords.upcoming,
              userData.roleId == 3
                ? KeyWords.cancelled + " " + KeyWords.scheduleTitle
                : KeyWords.previousL
            ]}
          />
        </View>
        <View>
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            horizontal={true}
            pagingEnabled={true}
          >
            <View style={{ flex: 1, backgroundColor: "yellow" }}>
              <View style={{ flex: 1, backgroundColor: "yellow" }} />
            </View>
            <View style={{ flex: 1, backgroundColor: "crimson" }}>
              <View style={{ flex: 1, backgroundColor: "crimson" }} />
            </View>
          </ScrollView>
        </View>
        {/* <Tabs 
          tabBarUnderlineStyle={Styles.tabsView}
          onChangeTab={(tab)=>{
     
            console.log('tab object ', tab)
            if (tab.from == 0) {
              {this.setState({tabStatus:1})}
              // this.getAllClasses();
            
            } else {
              {this.setState({tabStatus:0})}
              // this.getAllClasses();
          
            }
          }}
        >
          <Tab
           
            heading={
              userData.roleId == 3
                ? KeyWords.booked + " " + KeyWords.scheduleTitle
                : KeyWords.upcoming
            }
            tabStyle={Styles.tabStyle}
            textStyle={Styles.textStyle}
            activeTabStyle={Styles.activeTabStyle}
            activeTextStyle={Styles.activeTextStyle}
          >
            <ComingBooking />
          </Tab>
          <Tab
            heading={
              userData.roleId == 3
                ? KeyWords.cancelled + " " + KeyWords.scheduleTitle
                : KeyWords.previousL
            }
            tabStyle={Styles.tabStyle}
            textStyle={Styles.textStyle}
            activeTabStyle={Styles.activeTabStyle}
            activeTextStyle={Styles.activeTextStyle}
          >
            <CancelBooking />
          </Tab>
        </Tabs> */}
      </Container>
    );
  }
}

const TabBar = ({ onSelect, selected, data }) => (
  <View
    style={{
      flexDirection: "row",
      borderBottomColor: "black",
      borderBottomWidth: 1
    }}
  >
    <TouchableOpacity
      style={{
        flex: 1
      }}
      onPress={() => onSelect(0)}
    >
      <View style={{ backgroundColor: selected === 0 ? "green" : "white" }}>
        <Text
          style={{
            padding: "5%",
            fontSize: RF(2.3),
            fontFamily: "Poppins-Medium",
            color: selected === 0 ? "white" : "black",
            textAlign: "center"
          }}
        >
          {data[0]}
        </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        flex: 1
      }}
      onPress={() => onSelect(1)}
    >
      <View style={{ backgroundColor: selected === 1 ? "green" : "white" }}>
        <Text
          style={{
            padding: "5%",
            fontSize: RF(2.3),
            fontFamily: "Poppins-Medium",
            textAlign: "center",
            color: selected === 1 ? "white" : "black"
          }}
        >
          {data[1]}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

BookingScreen.propTypes = {
  //userData: PropTypes.element
};

const maptoprops = state => {
  return {
    userData: state.User.userdata
  };
};
export default connect(
  maptoprops,
  { AllClasses }
)(BookingScreen);

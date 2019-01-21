import React, { Component } from "react";
import { Container, Tab, Tabs } from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { AllClasses} from "../../../actions";
import  Header  from "../../../components/header/header";
import Styles from "./bookingStatus/Styles";
import CancelBooking from "./bookingStatus/CancelBooking";
import ComingBooking from "./bookingStatus/ComingBooking";
import KeyWords from "../../../common/Localization";

class BookingScreen extends Component {
  constructor(props) {
    super(props);
    this.state ={
      // tabStatus:0
    }
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
        <Tabs 
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
        </Tabs>
      </Container>
    );
  }
}

BookingScreen.propTypes = {
  //userData: PropTypes.element
};

const maptoprops = state => {
  return {
    userData: state.User.userdata,
  };
};
export default connect(
  maptoprops,
  {AllClasses}
)(BookingScreen);

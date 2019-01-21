import React from "react";
import { View, FlatList } from "react-native";
import { Container, Text, Item } from "native-base";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import PropTypes from "prop-types";
import { deshBoardValue, AllClasses } from "../../../actions";
import Images from "../../../common/images";
import GlobalStyle from "../../../common/GlobalStyle";
import { CardComponent } from "../../../components";
import Header from "../../../components/header/header";
import Styles from "./Styles";
import KeyWords from "../../../common/Localization";

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log("dash ", props);
  }
  componentDidMount = async () => {
    const { userData, deshBoardValue } = this.props;
    var d = userData;
    let data = {
      roll_id: d.roleId,
      user_id: d._id,
      api_token: d.api_token != null ? d.api_token : d.token
    };
    await deshBoardValue(data);
  };
  openScreen = async title => {
    const { userData, AllClasses } = this.props;
    switch (title) {
      case "Messages":
        Actions.Messages({ type: "replace" });
        break;
      case "Special Price":
        Actions.SpecialPrice({ type: "replace" });
        break;
      case "Bookings":
      AllClasses({
        status: 0,
        roll_id: userData.roleId,
        user_id: userData._id,
        api_token:
          userData.api_token != null ? userData.api_token : userData.token
      });
           Actions.BookingScreen({ type: "replace" });
        break;
      case "Booked Lessons":
        AllClasses({
          status: 0,
          roll_id: userData.roleId,
          user_id: userData._id,
          api_token:
            userData.api_token != null ? userData.api_token : userData.token
        });
        Actions.BookingScreen();
        break;
      case "Search for Service":
        Actions.Search({ type: "replace" });
        break;
      case "Earnings":
        alert("In progress...");
        break;
      case "My Reviews":
        Actions.ReviewScreen({ type: "replace" });
        break;
      case "Submit Review for Your Lessons":
        Actions.SubmitReview({ type: "replace" });
        break;
      default:
        break;
    }
  };
  _cellDetailView = item => {
    console.log("data asdfaf", item.value);
    return (
      <CardComponent
        style={item.value == "" ? GlobalStyle.height40 : GlobalStyle.height10}
        restyle={item.value == "" ? { height: "0%" } : GlobalStyle.height10}
        imageStyle={item.value == "" ? { aspectRatio: 0.6 } : {}}
        title={item.title}
        image={item.image}
        value={item.value}
        subTitle={item.subTitle}
        footerImage={item.footerImage}
        footerValue={item.footerValue}
        onClickOfTitle={() => this.openScreen(item.title)}
        onClickOfSubtitle={() => this.openScreen(item.subTitle)}
      />
    );
  };

  openSchedules = () => {
    //alert("sd");
    Actions.Schedules({ type: "replace" });
  };

  render() {
    const { userData, DashboardCall } = this.props;
    var instructor = [
      {
        title: "Earnings",
        image: Images.earningsImg,
        value: `$ ${DashboardCall.earnings}`,
        subTitle: "My Reviews",
        footerImage: Images.starImg,
        footerValue: "0"
      },
      {
        title: "Bookings",
        image: Images.bookedlessonsImg,
        value: `${DashboardCall.booked_lesson}`,
        subTitle: "Cancellations",
        footerImage: Images.cancelImg,
        footerValue: DashboardCall.cancelled_booking
      },
      {
        title: "Lesson Price",
        image: Images.submitrfylImg,
        value: "$ 15.00",
        subTitle: "Special Price",
        footerImage: Images.specialImg,
        footerValue: "0"
      },
      {
        title: "Messages",
        image: Images.messagesImg,
        value: `${DashboardCall.messages}`,
        subTitle: "Unread",
        footerImage: Images.commentImg,
        footerValue: DashboardCall.unread_messages
      }
    ];

    var student = [
      {
        title: "Search for Service",
        image: Images.searchforserviceImg,
        value: "",
        subTitle: "",
        footerImage: "",
        footerValue: ""
      },
      {
        title: "Booked Lessons",
        image: Images.bookedlessonsImg,
        value: `${DashboardCall.booked_lesson}`,
        subTitle: "Cancellations",
        footerImage: Images.cancelImg,
        footerValue: DashboardCall.cancelled_booking
      },
      {
        title: "Messages",
        image: Images.messagesImg,
        value: `${DashboardCall.messages}`,
        subTitle: "Unread",
        footerImage: Images.commentImg,
        footerValue: DashboardCall.unread_messages
      },
      {
        title: "Submit Review for Your Lessons",
        image: Images.submitrfylImg,
        value: "",
        subTitle: "",
        footerImage: "",
        footerValue: ""
      }
    ];

    return (
      <Container style={Styles.container}>
        <Header title={KeyWords.dashboard} />
        <View style={[GlobalStyle.viewCenter]}>
          <FlatList
            contentContainerStyle={Styles.flatlist}
            data={userData.roleId == 3 ? instructor : student}
            renderItem={({ item }) => this._cellDetailView(item)}
            keyExtractor={this.keyExtractor}
            numColumns={2}
          />
          <View style={[GlobalStyle.viewCenter, Styles.btnView]}>
            {userData.roleId == 3 ? (
              <Item
                rounded
                style={[Styles.btn, GlobalStyle.viewCenter]}
                onPress={() => this.openSchedules()}
              >
                <Text style={Styles.btnText}>{KeyWords.schedule}</Text>
              </Item>
            ) : (
              <View />
            )}
          </View>
        </View>
      </Container>
    );
  }
}

DashboardComponent.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired
};

const maptoprops = state => {
  console.log("dashboard state state", state.DashboardCall.dashBoard);
  return {
    userData: state.User.userdata,
    DashboardCall: state.DashboardCall.dashBoard
  };
};

export default connect(
  maptoprops,
  { deshBoardValue, AllClasses }
)(DashboardComponent);

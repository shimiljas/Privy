import React from "react";
import { View, FlatList, AsyncStorage, TouchableOpacity } from "react-native";
import { Container, Text, Item } from "native-base";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import PropTypes from "prop-types";
import ClientApi from "../../../common/ApiManager";
import { deshBoardValue, AllClasses, getUserInfo } from "../../../actions";
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
    this.state = {
      userData: {}
    };
  }
  componentDidMount = async () => {
    const { deshBoardValue } = this.props;
    let data = {
      role_id: await AsyncStorage.getItem("roleId"),
      user_id: await AsyncStorage.getItem("userId"),
      api_token: await AsyncStorage.getItem("apiToken")
    };
    this.setState({
      userData: {
        roleId: data.role_id,
        _id: data.user_id,
        token: data.api_token
      }
    });

    await deshBoardValue(data);
  };
  openScreen = async title => {
    const { AllClasses } = this.props;
    const { userData } = this.state;
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

  toggleProfile = async () => {
    Actions.FirstLogin({ type: "replace" });
    // const { userData } = this.props;
    // var token =
    //   userData.api_token != null ? userData.api_token : userData.token;

    // let roleId = userData.roleId;
    // if (roleId == 2) roleId = 3;
    // else if (roleId == 3) roleId = 2;

    // var obj = { user_id: userData._id, roleId: roleId };
    // var response = await ClientApi.callApi("setUserRole", obj, token);
    // // console.log("api response toggleProfile == ", response);
    // if (response.status == "true") {
    //   await AsyncStorage.setItem("roleId", String(roleId));
    //   var data = { user_id: this.props.userData._id };
    //   data.api_token = token;
    //   // Actions.drawer({ type: "replace" });
    //   await this.props.deshBoardValue({
    //     user_id: this.props.userData._id,
    //     role_id: roleId,
    //     api_token: token
    //   });
    //   await this.props.getUserInfo(data);
    // }
  };

  render() {
    const { DashboardCall } = this.props;
    const { userData } = this.state;
    console.log("USERDATA < DASHBOARD CALL");
    console.log({ userData, DashboardCall });
    console.log("USERDATA < DASHBOARD CALL");
    var instructor = [
      {
        title: "Earnings",
        image: Images.earningsImg,
        value: `$ ${DashboardCall.earnings || 0}`,
        subTitle: "My Reviews",
        footerImage: Images.starImg,
        footerValue: `$ ${DashboardCall.reviews || 0}`
      },
      {
        title: "Bookings",
        image: Images.bookedlessonsImg,
        value: `${DashboardCall.booked_lesson || 0}`,
        subTitle: "Cancellations",
        footerImage: Images.cancelImg,
        footerValue: DashboardCall.cancelled_booking || 0
      },
      {
        title: "Lesson Price",
        image: Images.submitrfylImg,
        value: `$ ${DashboardCall.lesson_price || 0}`,
        subTitle: "Special Price",
        footerImage: Images.specialImg,
        footerValue: `$ ${DashboardCall.sp_price || 0}`
      },
      {
        title: "Messages",
        image: Images.messagesImg,
        value: `${DashboardCall.messages || 0}`,
        subTitle: "Unread",
        footerImage: Images.commentImg,
        footerValue: DashboardCall.unread_messages || 0
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
        value: `${DashboardCall.booked_lesson || 0}`,
        subTitle: "Cancellations",
        footerImage: Images.cancelImg,
        footerValue: DashboardCall.cancelled_booking
      },
      {
        title: "Messages",
        image: Images.messagesImg,
        value: `${DashboardCall.messages || 0}`,
        subTitle: "Unread",
        footerImage: Images.commentImg,
        footerValue: DashboardCall.unread_messages
      },
      {
        title: "Submit Review ",
        image: Images.submitrfylImg,
        subTitle: "My Reviews",
        footerImage: Images.starImg,
        footerValue: `$ ${DashboardCall.reviews || 0}`
      }
    ];

    return (
      <Container style={Styles.container}>
        <Header
          title={KeyWords.dashboard}
          onHome={true}
          roleId={userData.roleId}
          onToggleProfile={() => this.toggleProfile()}
        />
        <View style={[GlobalStyle.viewCenter]}>
          <View style={{ height: 15 }} />
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
  return {
    userData: state.User.userdata,
    DashboardCall: state.DashboardCall.dashBoard
  };
};

export default connect(
  maptoprops,
  { deshBoardValue, AllClasses, getUserInfo }
)(DashboardComponent);

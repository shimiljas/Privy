import React from "react";
import { AsyncStorage } from "react-native";
import { Container, Tab, Tabs } from "native-base";
import { connect } from "react-redux";
import ApprovedReview from "./reviewStatus/ApprovedReview";
import PenddingReview from "./reviewStatus/PendingReview";
import Header from "../../../components/header/header";
import Styles from "./Styles";
import KeyWords from "../../../common/Localization";
import clientApi from "../../../common/ApiManager";

class ReviewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: [],
      approved: []
    };
  }

  componentDidMount = async () => {
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
    await this.getReviews();
  };
  componentWillReceiveProps(nextProps) {
    this.getReviews();
  }
  
  getReviews = async () => {
    const { userData } = this.state;
    var obj = {
      user_id: +userData._id,
      token: userData.api_token != null ? userData.api_token : userData.token,
      ut: userData.roleId
    };
    var response = await clientApi.callApi(
      "get_reviews.php",
      obj,
      userData.api_token != null ? userData.api_token : userData.token
    );
    console.log("reviews == ", response);
    const approvedReviews = [];
    const pendingReviews = [];
    if (response.success == 1) {
      reviews = response.data;
      for (let review of reviews) {
        if (review.approve == 1) {
          approvedReviews.push(review);
        } else {
          pendingReviews.push(review);
        }
      }
      this.setState({ pending: pendingReviews, approved: approvedReviews });
    }
  };

  render() {
    return (
      <Container>
        <Header title={KeyWords.reviews} />
        <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 0, height: 0 }}>
          <Tab
            heading={KeyWords.pending}
            tabStyle={Styles.tabStyle}
            textStyle={Styles.tabTextStyle}
            activeTabStyle={Styles.activeTabStyle}
            activeTextStyle={Styles.activeTabText}
          >
            <PenddingReview reviews={this.state.pending} />
          </Tab>
          <Tab
            heading={KeyWords.approved}
            tabStyle={Styles.tabStyle}
            textStyle={Styles.tabTextStyle}
            activeTabStyle={Styles.activeTabStyle}
            activeTextStyle={Styles.activeTabText}
          >
            <ApprovedReview reviews={this.state.approved} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
const maptoprops = state => {
  return {
    userData: state.User.userdata
  };
};
export default connect(
  maptoprops,
  {}
)(ReviewScreen);

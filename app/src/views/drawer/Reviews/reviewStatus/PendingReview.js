import React from "react";
import { FlatList, AsyncStorage } from "react-native";
import { Container, View } from "native-base";
import { connect } from "react-redux";
import Styles from "./Styles";
import { ReviewCard } from "../../../../components";
import GlobalStyle from "../../../../common/GlobalStyle";
import clientApi from "../../../../common/ApiManager";

var reviews = [
  {
    title: "Booking1",
    iot: 1,
    isp: 0,
    isr: 1,
    rate: 3
  },
  {
    title: "Booking2",
    iot: 1,
    isp: 0,
    isr: 1,
    rate: 1
  },
  {
    title: "Booking3",
    iot: 1,
    isp: 0,
    isr: 1,
    rate: 5
  },
  {
    title: "Booking4",
    iot: 1,
    isp: 0,
    isr: 1,
    rate: 3
  },
  {
    title: "Booking5",
    iot: 1,
    isp: 0,
    isr: 1,
    rate: 2
  },
  {
    title: "Booking1",
    iot: 1,
    isp: 0,
    isr: 1,
    rate: 4
  }
];
class CancelBooking extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount = async () => {
  //   let data = {
  //     role_id: await AsyncStorage.getItem("roleId"),
  //     user_id: await AsyncStorage.getItem("userId"),
  //     api_token: await AsyncStorage.getItem("apiToken")
  //   };
  //   this.setState({
  //     userData: {
  //       roleId: data.role_id,
  //       _id: data.user_id,
  //       token: data.api_token
  //     }
  //   });
  //   await this.getReviews();
  // };

  // getReviews = async () => {
  //   const { userData } = this.state;
  //   var obj = {
  //     user_id: +userData._id,
  //     token: userData.api_token != null ? userData.api_token : userData.token
  //   };
  //   var response = await clientApi.callApi(
  //     "get_reviews.php",
  //     obj,
  //     userData.api_token != null ? userData.api_token : userData.token
  //   );
  //   console.log("reviews == ", response);
  //   if (response.success == 1) {
  //     reviews = response.data;
  //     console.log("reviews == ", reviews);
  //     this.setState({ reviews: reviews });
  //   }
  // };

  _cellDetailView = item => {
    console.log(item);
    return <ReviewCard btn item={item} />;
  };
  render() {
    return (
      <Container>
        <FlatList
          contentContainerStyle={GlobalStyle.alignItemsCenter}
          data={this.props.reviews}
          renderItem={({ item }) => this._cellDetailView(item)}
          keyExtractor={this.keyExtractor}
        />
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
)(CancelBooking);

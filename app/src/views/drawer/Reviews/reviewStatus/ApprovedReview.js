import React from "react";
import { FlatList, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { Container } from "native-base";
import { ReviewCard } from "../../../../components";
import GlobalStyle from "../../../../common/GlobalStyle";
import clientApi from "../../../../common/ApiManager";

var data = [
  {
    title: "Booking1",
    iot:1,
    isp:0,
    isr:1,
    rate:3,
    date:'21/04/2019'
  },
  {
    title: "Booking2",
    iot:1,
    isp:0,
    isr:1,
    rate:1,
    date:'21/04/2019'
  },
  {
    title: "Booking3",
    iot:1,
    isp:0,
    isr:1,
    rate:5,
    date:'21/04/2019'
  },
  {
    title: "Booking4",
    iot:1,
    isp:0,
    isr:1,
    rate:3,
    date:'21/04/2019'
  },
  {
    title: "Booking5",
    iot:1,
    isp:0,
    isr:1,
    rate:2,
    date:'21/04/2019'
  },
  {
    title: "Booking1",
    iot:1,
    isp:0,
    isr:1,
    rate:4,
    date:'21/04/2019'
  }
];
class ComingBooking extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    let data = {
      role_id: await AsyncStorage.getItem("roleId"),
      user_id: await AsyncStorage.getItem("userId"),
      api_token: await AsyncStorage.getItem("apiToken")
    };
    this.setState({userData: {roleId: data.role_id, _id: data.user_id, token: data.api_token}});
    await this.getReviews();
  }
 
    getReviews = async() => {
      const { userData } = this.state;
      var obj = {
        user_id: +userData._id
      };
      var response = await clientApi.callApi(
        "get_reviews.php",
        obj,
        userData.api_token != null ? userData.api_token : userData.token
      );
      if (response.success == 1) {
        reviews = response.data;
        console.log("reviews == ", reviews);
  
        this.setState({ reviews: reviews });
      }
    }

  _cellDetailView = item => {
    console.log(item);
    return <ReviewCard item ={item}/>;
  };
  render() {
    return (
      <Container>
        <FlatList
          contentContainerStyle={GlobalStyle.alignItemsCenter}
          data={data}
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
)(ComingBooking);

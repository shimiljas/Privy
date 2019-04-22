import React from "react";
import { FlatList, AsyncStorage } from "react-native";
import { Container, View } from "native-base";
import { connect } from "react-redux";
import Styles from "./Styles";
import { ReviewCard } from "../../../../components";
import GlobalStyle from "../../../../common/GlobalStyle";

var data = [
  {
    title: "Booking1",
    iot:1,
    inp:0,
    rec:1,
    rate:3
  },
  {
    title: "Booking2",
    iot:1,
    inp:0,
    rec:1,
    rate:1
  },
  {
    title: "Booking3",
    iot:1,
    inp:0,
    rec:1,
    rate:5
  },
  {
    title: "Booking4",
    iot:1,
    inp:0,
    rec:1,
    rate:3
  },
  {
    title: "Booking5",
    iot:1,
    inp:0,
    rec:1,
    rate:2
  },
  {
    title: "Booking1",
    iot:1,
    inp:0,
    rec:1,
    rate:4
  }
];
class CancelBooking extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    let data = {
      role_id: await AsyncStorage.getItem("roleId"),
      user_id: await AsyncStorage.getItem("userId"),
      api_token: await AsyncStorage.getItem("apiToken")
    };
  }
  _cellDetailView = (item) => {
	console.log(item);  
    return <ReviewCard btn item={item}/>;
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
)(CancelBooking);

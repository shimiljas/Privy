import React from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { Container } from "native-base";
import { ReviewCard } from "../../../../components";
import GlobalStyle from "../../../../common/GlobalStyle";

var data = [
  {
    title: "Booking1",
    iot:1,
    inp:0,
    rec:1,
    rate:3,
    date:'21/04/2019'
  },
  {
    title: "Booking2",
    iot:1,
    inp:0,
    rec:1,
    rate:1,
    date:'21/04/2019'
  },
  {
    title: "Booking3",
    iot:1,
    inp:0,
    rec:1,
    rate:5,
    date:'21/04/2019'
  },
  {
    title: "Booking4",
    iot:1,
    inp:0,
    rec:1,
    rate:3,
    date:'21/04/2019'
  },
  {
    title: "Booking5",
    iot:1,
    inp:0,
    rec:1,
    rate:2,
    date:'21/04/2019'
  },
  {
    title: "Booking1",
    iot:1,
    inp:0,
    rec:1,
    rate:4,
    date:'21/04/2019'
  }
];
class ComingBooking extends React.Component {
  constructor(props) {
    super(props);
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

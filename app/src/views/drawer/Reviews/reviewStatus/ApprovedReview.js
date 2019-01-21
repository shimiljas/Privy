import React from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { Container } from "native-base";
import { ReviewCard } from "../../../../components";
import GlobalStyle from "../../../../common/GlobalStyle";

var data = [
  {
    title: "Search for Service"
  },
  {
    title: "Search for Service"
  },
  {
    title: "Search for Service"
  },
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
class ComingBooking extends React.Component {
  constructor(props) {
    super(props);
  }
  _cellDetailView = item => {
    console.log(item);
    return <ReviewCard />;
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

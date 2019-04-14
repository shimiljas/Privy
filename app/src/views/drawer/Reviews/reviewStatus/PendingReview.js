import React from "react";
import { FlatList } from "react-native";
import { Container, View } from "native-base";
import { connect } from "react-redux";
import Styles from "./Styles";
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
class CancelBooking extends React.Component {
  constructor(props) {
    super(props);
  }
  _cellDetailView = (item) => {
	console.log(item);  
    return <ReviewCard btn />;
  };
  render() {
    return (
      <Container>
        <View style={Styles.listArea}>
          <FlatList
            contentContainerStyle={GlobalStyle.alignItemsCenter}
            data={data}
            renderItem={({ item }) => this._cellDetailView(item)}
            keyExtractor={this.keyExtractor}
          />
        </View>
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

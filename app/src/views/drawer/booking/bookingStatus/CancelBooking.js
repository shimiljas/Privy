import React from "react";
import { Text, FlatList } from "react-native";

import { connect } from "react-redux";
import { Container, View } from "native-base";
import GlobalStyle from "../../../../common/GlobalStyle";
import KeyWords from "../../../../common/Localization";
import Styles from "./Styles";
import { BookingCard } from "../../../../components";

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
  _cellDetailView = item => {
    const { userData ,AllClasses} = this.props;
    return (
      <BookingCard
        rollId={userData.roleId}
        bookingData={item}
        lessons={AllClasses[0].class_detials}
      />
    );
  };
  render() {
    const { userData, AllClasses } = this.props;
    return (
      <Container>
        {AllClasses != undefined ? (
          <View>
            <View style={[Styles.lessonsArea, GlobalStyle.row]}>
              <Text style={Styles.lessonText}>
                {AllClasses[0].class_detials.title}
              </Text>
              <Text style={Styles.timeText}>
                {userData.roleId == 3 ? "10 Aug 11AM -12PM" : ""}
              </Text>
            </View>
            <View style={Styles.listArea}>
              <FlatList
                data={AllClasses[0].bookings}
                renderItem={({ item }) => this._cellDetailView(item)}
                keyExtractor={this.keyExtractor}
              />
            </View>
          </View>
        ) : (
          <View style={Styles.noRecord}>
            <Text> In Progress...</Text>
          </View>
        )}
      </Container>
    );
  }
}

const maptoprops = state => {
  return {
    userData: state.User.userdata,
    AllClasses: undefined
  };
};
export default connect(
  maptoprops,
  {}
)(CancelBooking);

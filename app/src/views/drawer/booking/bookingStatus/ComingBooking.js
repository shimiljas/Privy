import React from "react";
import { Text, FlatList } from "react-native";
import { Container, View } from "native-base";
import { connect } from "react-redux";

import GlobalStyle from "../../../../common/GlobalStyle";
import Styles from "./Styles";
import { BookingCard } from "../../../../components";
import KeyWords from "../../../../common/Localization";

var data = [
  // {
  //   title: "Search for Service"
  // },
  // {
  //   title: "Search for Service"
  // },
  // {
  //   title: "Search for Service"
  // },
  // {
  //   title: "Search for Service"
  // },
  // {
  //   title: "Search for Service"
  // },
  // {
  //   title: "Search for Service"
  // }
];
class ComingBooking extends React.Component {
  constructor(props) {
    super(props);
  }

  _cellDetailView = item => {
    const { userData, AllClasses } = this.props;

    data = AllClasses;
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
    // console.log(AllClasses, "All booking classes sss", AllClasses[0]);
    return (
      <Container>
        {AllClasses != undefined ? (
          AllClasses.length > 0 ? (
            <View>
              <View style={Styles.lessonsArea}>
                <View style={GlobalStyle.row}>
                  <Text style={Styles.lessonText}>
                    {AllClasses[0].class_detials.title}
                  </Text>
                  <Text style={Styles.timeText}>
                    {userData.roleId == 3 ? "10 Aug 11AM -12PM" : ""}
                  </Text>
                </View>
                {userData.roleId == 3 ? (
                  <View style={GlobalStyle.row}>
                    <View style={[GlobalStyle.row, Styles.bookingView]}>
                      <Text style={[Styles.lessonText, Styles.combineText]}>
                        {KeyWords.booking}
                        {" - "}
                      </Text>
                      <Text style={[Styles.timeText, Styles.combineText]}>
                        {" "}
                        {/* {(AllClasses[0].booking).length} */}
                      </Text>
                    </View>
                    <View style={[GlobalStyle.row, GlobalStyle.container]}>
                      <Text style={[Styles.lessonText, Styles.combineText]}>
                        {KeyWords.class} {KeyWords.size}
                        {" - "}
                      </Text>
                      <Text style={[Styles.timeText, Styles.combineText]}>
                        {" "}
                        15
                      </Text>
                    </View>
                  </View>
                ) : null}
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
              <Text> No records found</Text>
            </View>
          )
        ) : (
          <View style={Styles.noRecord}>
            <Text> No records found</Text>
          </View>
        )}
      </Container>
    );
  }
}

const maptoprops = state => {
  console.log("All booking classes aaa", state.AllClasses.allClasses);
  return {
    userData: state.User.userdata,
    AllClasses: state.AllClasses.allClasses
  };
};
export default connect(
  maptoprops,
  {}
)(ComingBooking);

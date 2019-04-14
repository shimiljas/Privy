import React from "react";
import { Container, Tab, Tabs } from "native-base";
import { connect } from "react-redux";
import ApprovedReview from "./reviewStatus/ApprovedReview";
import PenddingReview from "./reviewStatus/PendingReview";
import Header from '../../../components/header/header';
import Styles from "./Styles";
import KeyWords from "../../../common/Localization";

class ReviewScreen extends React.Component {
  test() {}

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
            <PenddingReview />
          </Tab>
          <Tab
            heading={KeyWords.approved}
            tabStyle={Styles.tabStyle}
            textStyle={Styles.tabTextStyle}
            activeTabStyle={Styles.activeTabStyle}
            activeTextStyle={Styles.activeTabText}
          >
            <ApprovedReview />
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

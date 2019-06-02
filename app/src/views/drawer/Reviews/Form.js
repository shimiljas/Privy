import React from "react";
import { View, Text, AsyncStorage, ScrollView } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import StarRating from "react-native-star-rating";
import ModalSelector from "react-native-modal-selector";
import PropTypes from "prop-types";
import { deshHomeValue, SendReview } from "../../../actions";
import Util from "../../../common/Util";
import Styles from "./Styles";
import Color from "../../../common/Color";
import GlobalStyle from "../../../common/GlobalStyle";
import KeyWords from "../../../common/Localization";
import clientApi from "../../../common/ApiManager";
import {
  SpinnerLoad,
  ButtonComponent,
  PickerComponent,
  RadioButtonComponent
} from "../../../components";
import Header from "../../../components/header/header";

var reviews = [
  {
      "bid": 4,
      "cid": 2,
      "iid": 6,
      "title": "Meditation",
      "sd": "04/18/2019",
      "ed": "06/18/2019"
  },
  {
      "bid": 6,
      "cid": 2,
      "iid": 6,
      "title": "Meditation",
      "sd": "04/18/2019",
      "ed": "06/18/2019"
  }
];

class SubmitReviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructChildren: true,
      instructChildren1: true,
      instructChildren2: true,
      selectedData: {},
      rating: 0
    };
  }

  selectLesson = (lesson) => {
    this.setState({selectedData:lesson});
    console.log(this.selectedData);
  };
  homeBtnClick = async () => {
    const { deshHomeValue } = this.props;
    Actions.Dashboard({ type: "replace" });
  };
  componentDidMount = async () => {
    let data = {
      role_id: await AsyncStorage.getItem("roleId"),
      user_id: await AsyncStorage.getItem("userId"),
      api_token: await AsyncStorage.getItem("apiToken")
    };
    this.setState({userData: {roleId: data.role_id, _id: data.user_id, token: data.api_token}});
    await this.getReviews();
  };

  getReviews = async() => {
    const { userData } = this.state;
    var obj = {
      user_id: +userData._id
    };
    var response = await clientApi.callApi(
      "get_booked_cls4review.php",
      obj,
      userData.api_token != null ? userData.api_token : userData.token
    );
    if (response.success == 1) {
      reviews = response.data;
      console.log("classes == ", reviews);

      this.setState({ reviews: reviews });
    }
  } 

  submit = async () => {
    const {
      userData,
      instructChildren,
      instructChildren1,
      instructChildren2,
      rating,
      selectedData
    } = this.state;
    var obj = {
      user_id: userData._id,
      bid: selectedData.bid,
      iot: instructChildren ? 1 : 0,
      isp: instructChildren1 ? 1 : 0,
      isr: instructChildren2 ? 1 : 0,
      iid: selectedData.iid,
      rate: rating
    };
    var response = await clientApi.callApi(
      "update_review_student.php",
      obj,
      userData.api_token != null ? userData.api_token : userData.token
    );
    console.log(response);
    alert(response.message);
    if (response.success == 1) {
      this.homeBtnClick()
    }
  };

  render() {
    const { SpinnerVisible } = this.props;
    const {
      instructChildren,
      instructChildren1,
      instructChildren2,
      selectedData
    } = this.state;
    return (
      <ScrollView>
        <Header title="Review" />
        <View padder style={Styles.mainView}>
          <SpinnerLoad spinnerVisible={SpinnerVisible} />
          <View style={Styles.margin5}>
            <View style={Styles.marginBottom3}>
              <Text style={Styles.title}>{KeyWords.reviewYourLesson}</Text>
            </View>

            <View style={GlobalStyle.divider} />

            <View>
              <PickerComponent
              title={KeyWords.lesson}
              placeholder={KeyWords.lesson}
              data={reviews}
              callFunction={(value) => this.selectLesson(value)}
              fieldWidth={GlobalStyle.width100p}
              height={90}
              enabled
              key="reviews"/>
            </View>

            <View>
              <Text style={Styles.lable}>{KeyWords.startDate}</Text>
              <Text style={Styles.datelable}>{selectedData !== undefined ? selectedData.sd : ''}</Text>
            </View>

            <View style={Styles.marginTop5p}>
              <Text style={Styles.lable}>{KeyWords.wasTheInsOnTime}</Text>
              <View style={[GlobalStyle.row, Styles.marginTop2p]}>
                <RadioButtonComponent
                  title={KeyWords.yes}
                  value={instructChildren}
                  setValues={() =>
                    this.setState({
                      instructChildren: true
                    })
                  }
                />
                <View style={ Styles.marginLeft10p}>
                <RadioButtonComponent
                  title={KeyWords.no}
                  value={!instructChildren}
                  setValues={() =>
                    this.setState({
                      instructChildren: false
                    })
                  }
                />
                </View>
              </View>
            </View>

            <View style={Styles.marginTop5p}>
              <Text style={Styles.lable}>
                {KeyWords.wasTheInstructorProfessional}
              </Text>
              <View style={[GlobalStyle.row, Styles.marginTop2p]}>
                <RadioButtonComponent
                  title={KeyWords.yes}
                  value={instructChildren1}
                  setValues={() =>
                    this.setState({
                      instructChildren1: true
                    })
                  }
                />

                <View style={ Styles.marginLeft10p}>
                <RadioButtonComponent
                  title={KeyWords.no}
                  value={!instructChildren1}
                  setValues={() =>
                    this.setState({
                      instructChildren1: false
                    })
                  }
                />
                </View>
              </View>
            </View>

            <View style={Styles.marginTop5p}>
              <Text style={Styles.lable}>{KeyWords.wouldYouRecommend}</Text>
              <View style={[GlobalStyle.row, Styles.marginTop2p]}>
                <RadioButtonComponent
                  title={KeyWords.yes}
                  value={instructChildren2}
                  setValues={() =>
                    this.setState({
                      instructChildren2: true
                    })
                  }
                />
              <View style={ Styles.marginLeft10p}>
                  <RadioButtonComponent
                    title={KeyWords.no}
                    value={!instructChildren2}
                    setValues={() =>
                      this.setState({
                        instructChildren2: false
                      })
                    }
                  />
                  </View>
              </View>
            </View>

            <View style={Styles.marginTop5p}>
              <Text style={Styles.lable}>{KeyWords.rating}</Text>
              <View style={[GlobalStyle.row, Styles.marginTop2p]}>
                <StarRating
                  maxStars={5}
                  rating={this.state.rating}
                  fullStarColor="#fac917"
                  starSize={Util.getHeight(3.5)}
                  emptyStarColor={Color.grayClg}
                  selectedStar={rating => this.setState({ rating: rating })}
                />
              </View>
            </View>

            <View
              style={[
                GlobalStyle.row,
                GlobalStyle.viewCenter,
                Styles.marginTopBottom4
              ]}
            >
              <ButtonComponent
                btnText={KeyWords.submit + " " + KeyWords.review}
                btnStyle={Styles.btn}
                callFunction={()=>this.submit()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

SubmitReviewComponent.propTypes = {
  SpinnerVisible: PropTypes.element.isRequired
};

const maptoprops = state => {
  console.log("instructor data === ", state.User.userdata);
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata
  };
};

export default connect(
  maptoprops,
  { SendReview }
)(SubmitReviewComponent);

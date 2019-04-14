import React from "react";
import { View, Text } from "react-native";
import { Container } from "native-base";
import { connect } from "react-redux";
import StarRating from "react-native-star-rating";
import ModalSelector from "react-native-modal-selector";
import PropTypes from "prop-types";
import { SendReview } from "../../../actions";
import Util from "../../../common/Util";
import Styles from "./Styles";
import Color from "../../../common/Color";
import GlobalStyle from "../../../common/GlobalStyle";
import KeyWords from "../../../common/Localization";
import {
  SpinnerLoad,
  ButtonComponent,
  CheckBoxComponent
} from "../../../components";
import Header from "../../../components/header/header";

var lessons = [{ id: 1, name: "Language" }, { id: 2, name: "Music" }];

class SubmitReviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructChildren: true,
      instructChildren1: true,
      instructChildren2: true,
      rating: 0
    };
  }

  selectLesson = () => {};

  submit = async () => {
    // const { SendReview, userData } = this.props;
    // const {
    //   instructChildren,
    //   instructChildren1,
    //   instructChildren2,
    //   rating
    // } = this.state;
    // await SendReview({
    //   user_id: userData._id,
    //   api_token:
    //     userData.api_token != null ? userData.api_token : userData.token,
    //   booking_id: booking_id,
    //   answer1: instructChildren,
    //   answer2: instructChildren1,
    //   answer3: instructChildren2, 
    //   classId: classId,
    //   rating: rating
    // });
  };

  render() {
    const { SpinnerVisible } = this.props;
    const {
      instructChildren,
      instructChildren1,
      instructChildren2
    } = this.state;
    return (
      <Container>
        <Header title="Review" />
        <View padder style={Styles.mainView}>
          <SpinnerLoad spinnerVisible={SpinnerVisible} />
          <View style={Styles.margin5}>
            <View style={Styles.marginBottom3}>
              <Text style={Styles.title}>{KeyWords.reviewYourLesson}</Text>
            </View>

            <View style={GlobalStyle.divider} />

            <View>
              <Text style={Styles.lable}>{KeyWords.lesson}</Text>
              <ModalSelector
                data={lessons}
                keyExtractor={item => item._id}
                labelExtractor={item =>
                  item.name != null ? item.name : item.title
                }
                onChange={value => this.selectLesson(value)}
                selectStyle={[
                  GlobalStyle.borderWidth0,
                  GlobalStyle.alignItemsFlexStart
                ]}
              />
            </View>

            <View style={Styles.marginTop5p}>
              <Text style={Styles.lable}>{KeyWords.wasTheInsOnTime}</Text>
              <View style={[GlobalStyle.row, Styles.marginTop2p]}>
                <CheckBoxComponent
                  title={KeyWords.yes}
                  value={instructChildren}
                  setValues={() =>
                    this.setState({
                      instructChildren: true
                    })
                  }
                />

                <CheckBoxComponent
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

            <View style={Styles.marginTop5p}>
              <Text style={Styles.lable}>
                {KeyWords.wasTheInstructorProfessional}
              </Text>
              <View style={[GlobalStyle.row, Styles.marginTop2p]}>
                <CheckBoxComponent
                  title={KeyWords.yes}
                  value={instructChildren1}
                  setValues={() =>
                    this.setState({
                      instructChildren1: true
                    })
                  }
                />

                <CheckBoxComponent
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

            <View style={Styles.marginTop5p}>
              <Text style={Styles.lable}>{KeyWords.wouldYouRecommend}</Text>
              <View style={[GlobalStyle.row, Styles.marginTop2p]}>
                <CheckBoxComponent
                  title={KeyWords.yes}
                  value={instructChildren2}
                  setValues={() =>
                    this.setState({
                      instructChildren2: true
                    })
                  }
                />

                <CheckBoxComponent
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

            <View style={Styles.marginTop5p}>
              <Text style={Styles.lable}>{KeyWords.rating}</Text>
              <View style={[GlobalStyle.row, Styles.marginTop2p]}>
                <StarRating
                  maxStars={5}
                  rating={this.state.rating}
                  fullStarColor="#fac917"
                  starSize={Util.getHeight(2.5)}
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
      </Container>
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

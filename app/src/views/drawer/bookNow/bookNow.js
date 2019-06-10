import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Container, Content, Item } from "native-base";
import moment from "moment";
import { connect } from "react-redux";
import { Calendar } from 'react-native-calendars';
import { Actions } from "react-native-router-flux";
import { BookNowClass, PaypalToken } from "../../../actions";
import Util from "../../../common/Util";
import DateTimePicker from "react-native-modal-datetime-picker";
import Styles from "./Styles";
import Images from "../../../common/images";
import Color from "../../../common/Color";
import KeyWords from "../../../common/Localization";
import GlobalStyle from "../../../common/GlobalStyle";
import {
  SpinnerLoad,
  ButtonComponent,
  ModelAlert,
  DatePickerComponent
} from "../../../components";
import Header from "../../../components/header/header";

class BookNowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      endTime: null,
      showStartPicker: false,
      showEndPicker: false,
      successData: false,
    };
  }

  back = () => {
    Actions.pop();
  };

  pay = async () => {
    const { userData, SelectedUser, BookNowClass } = this.props;
    console.log("paypal function");
    await BookNowClass({
      api_token: userData.api_token != null ? userData.api_token : userData.token,
      user_id: userData._id,
      classId: SelectedUser._id,
      from_time: SelectedUser.time,
      to_time: SelectedUser.end_time,
      actualPrice: SelectedUser.price,
      payedPrice: (SelectedUser.price + 1),
      classdate: SelectedUser.startDate != undefined ? (SelectedUser.startDate).substring(0, 10) : ''
    })
    // await PaypalToken();
    // Actions.Pay({ type: "replace" });
  };

  modelBtn = () => {
    this.setState({ successData: false });
  };

  calendar = () => {
    const { SelectedUser } = this.props;

    return (
      <Calendar
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 350
        }}
        markedDates={{
          [SelectedUser.sd]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
        hideArrows
      />
    );
  };

  _modelShow = () => {
    const { successData } = this.state;
    return (
      <ModelAlert
        successData={successData}
        modelStyle={Styles.formView}
        onClose={() => {
          this.setModalVisible();
        }}
      >
        <View style={Styles.modelTextView}>
          <Text style={Styles.modelSuccess} />
          <View style={Styles.modelText}>
            <Image
              source={Images.paySuccessImg}
              resizeMode="contain"
              style={Styles.imageStyle}
            />
            <Text style={Styles.successMessage}>{KeyWords.bookSuccess}</Text>
          </View>
        </View>
        <View style={[GlobalStyle.viewCenter, Styles.modelBtnView]}>
          <Item
            rounded
            style={[Styles.modelBtn, GlobalStyle.viewCenter]}
            onPress={() => this.modelBtn()}
          >
            <Text style={Styles.btnText}>{KeyWords.okBtn}</Text>
          </Item>
        </View>
      </ModelAlert>
    );
  };

  handleDatePicked = (isStartTime, date) => {
    if (isStartTime) {
      this.setState({ startTime: date, showStartPicker: false });
    } else {
      this.setState({ endTime: date, showEndPicker: false });
    }
  };

  hideDateTimePicker = isStartDate => {
    if (isStartDate) {
      this.setState({ showStartPicker: false });
    } else {
      this.setState({
        showEndPicker: false
      });
    }
  };

  render() {
    const { SpinnerVisible, SelectedUser } = this.props;
    const { showStartPicker, showEndPicker, startTime, endTime } = this.state;

    return (
      <Container>
        <Header title={KeyWords.bookNowText} />
        <Content padder style={Styles.contentStyle}>
          <SpinnerLoad spinnerVisible={SpinnerVisible} />
          <View style={Styles.bookArea}>
            <Text style={Styles.title}>{KeyWords.bookNowText}</Text>
          </View>
          <View style={[GlobalStyle.fullDivider, Styles.line]} />
          <View style={[GlobalStyle.row, Styles.lessonsArea]}>
            <View style={Styles.lessonsArea2}>
              <Text style={[Styles.amtLable, Styles.lessonText]}>
                {SelectedUser.title}
              </Text>
            </View>
            <View style={[Styles.priceView]}>
              <View style={GlobalStyle.row}>
                <Text style={Styles.lable}>
                  {KeyWords.price}
                  <Text>: </Text>
                </Text>
                <Text style={[Styles.amtLable]}>
                  ${SelectedUser.price == undefined ? 0 : (SelectedUser.price + 1)}
                </Text>
              </View>
            </View>
          </View>
          <View style={[GlobalStyle.fullDivider, Styles.nextLine]} />
          {this.calendar()}
          <View style={[GlobalStyle.fullDivider, Styles.nextLine2]} />
          <View style={{ margin: Util.getWidth(5) }}>
            <Text style={Styles.lable}>{KeyWords.timeSlot}</Text>
            <View style={{ flexDirection: "row", marginTop: 12 }}>
              <TouchableOpacity onPress={() => this.setState({ showStartPicker: true })} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "#aeb5bc", marginRight: 8, fontSize: 16 }}> Start Time</Text>
                  <Image source={Images.clockImg} style={{ width: 16, height: 16 }} />
                </View>
                <View>
                  <Text style={{ marginTop: 16, fontSize: 14 }}>
                    {startTime ? moment(startTime).format("h:mm a") : null}
                  </Text>
                  <DateTimePicker
                    isVisible={showStartPicker}
                    mode="time"
                    date={startTime ? startTime : new Date()}
                    titleIOS="Start Time"
                    onConfirm={(date) => this.handleDatePicked(true, date)}
                    onCancel={() => this.hideDateTimePicker(true)}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ showEndPicker: true })} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "#aeb5bc", marginRight: 8, fontSize: 16 }}>End Time</Text>
                  <Image source={Images.clockImg} style={{ width: 16, height: 16 }} />
                </View>
                <View>
                  <Text style={{ marginTop: 16, fontSize: 14 }}>
                    {endTime ? moment(endTime).format("h:mm a") : null}
                  </Text>
                  <DateTimePicker
                    isVisible={showEndPicker}
                    mode="time"
                    date={endTime ? endTime : new Date()}
                    titleIOS="End Time"
                    onConfirm={(date) => this.handleDatePicked(false, date)}
                    onCancel={() => this.hideDateTimePicker(false)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[
              GlobalStyle.fullDivider,
              { marginBottom: Util.getHeight(3) }
            ]}
          />

          <View style={[GlobalStyle.row]}>
            <View style={Styles.btnView}>
              <ButtonComponent
                btnText={KeyWords.back}
                btnStyle={Styles.backBtn}
                callFunction={() => this.back()}
              />
            </View>
            <View style={Styles.btnView}>
              <ButtonComponent
                btnText={KeyWords.pay}
                btnStyle={Styles.btn}
                callFunction={() => this.pay()}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const maptoprops = state => {
  console.log("instructor data === ", state.SearchIntructor.selectedUser);
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata,
    SelectedUser: state.SearchIntructor.selectedUser
  };
};

export default connect(
  maptoprops,
  { BookNowClass, PaypalToken }
)(BookNowComponent);

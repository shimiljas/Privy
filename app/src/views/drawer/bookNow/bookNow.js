import React from "react";
import { View, Text, Image } from "react-native";
import { Container, Content, Item } from "native-base";
import { connect } from "react-redux";
import Calendar from "react-native-calendar";
import { Actions } from "react-native-router-flux";
import { BookNowClass,PaypalToken } from "../../../actions";
import Util from "../../../common/Util";

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
      startTime: "Start Time",
      endTime: "End Time",
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false,
      successData: false
    };
  }

  back = () => {
    Actions.pop();
  };

  pay = async () => {
     const { userData, SelectedUser,BookNowClass} = this.props;
    console.log("paypal function");
    await BookNowClass({
      api_token:userData.api_token != null ? userData.api_token : userData.token,
      user_id: userData._id,
      classId:SelectedUser._id,
      from_time:SelectedUser.time, 
      to_time:SelectedUser.end_time,
      actualPrice:SelectedUser.price,
      payedPrice:(SelectedUser.price+1),
      classdate:SelectedUser.startDate != undefined? (SelectedUser.startDate).substring(0, 10):''
    })
    // await PaypalToken();
    // Actions.Pay({ type: "replace" });
  };

  modelBtn = () => {
    this.setState({ successData: false });
  };

  calendar = () => {
    const customStyle = {
      selectedDayCircle: {
        backgroundColor: Color.calenderColor
      },
      title: {
        color: Color.grayClg
      },
      titleText: {
        fontSize: 15
      },
      dayHeading: {
        color: Color.grayClg
      },
      weekendHeading: {
        color: Color.grayClg
      },
      weekendDayText: {
        color: Color.darkGray
      },
      selectedDayText: {
        color: Color.whiteClr
      },
      hasEventCircle: {
        backgroundColor: Color.calenderColor
      }
    };
    const { SelectedUser } = this.props;
    //alert([(SelectedUser.startDate).substring(0, 10), (SelectedUser.endDate).substring(0, 10)]);
    return (
      <View style={Styles.calenderView}>
        <Calendar
          showControls
          eventDates={[
            SelectedUser.startDate != undefined? (SelectedUser.startDate).substring(0, 10):'',
            SelectedUser.endDate != undefined? (SelectedUser.endDate).substring(0, 10):''
          ]}
          customStyle={customStyle}
        />
        <View style={Styles.transparent} />
      </View>
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

  render() {
    const { SpinnerVisible, SelectedUser } = this.props;

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
                  ${SelectedUser.price == undefined ? 0 : (SelectedUser.price+1)}
                </Text>
              </View>
            </View>
          </View>
          <View style={[GlobalStyle.fullDivider, Styles.nextLine]} />
          {this.calendar()}
          <View style={[GlobalStyle.fullDivider, Styles.nextLine2]} />
          <View style={{ margin: Util.getWidth(5) }}>
            <Text style={Styles.lable}>{KeyWords.timeSlot}</Text>
            <View style={GlobalStyle.row}>
              <DatePickerComponent
                title={KeyWords.startTime}
                titleStyle={{marginLeft: 15}}
                icon={Images.clockImg}
                iconStyle={Styles.sameIcon}
                // placeholder={KeyWords.startTime}
                type="disable"
                setValue={SelectedUser.time}
                fieldWidth={{ width: "50%" }}
                height={90}
                key="startTime"
              />
              <DatePickerComponent
                title={KeyWords.endTime}
                icon={Images.clockImg}
                iconStyle={Styles.sameIcon}
                //placeholder={KeyWords.endTime}
                type="disable"
                setValue={SelectedUser.end_time}
                fieldWidth={{ width: "50%" }}
                height={90}
                key="endTime"
              />
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
  { BookNowClass ,PaypalToken}
)(BookNowComponent);

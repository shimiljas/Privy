import React from "react";
import { View, Image } from "react-native";
import { Text, Item } from "native-base";
import Styles from "./Styles";
import RF from "react-native-responsive-fontsize";
import GlobalStyle from "../../common/GlobalStyle";
import Images from "../../common/images";
import Color from "../../common/Color";
import { Actions } from "react-native-router-flux";

class BaseComponent extends React.Component {
  render() {
    return this.props.rollId == "2" ? (
      <View style={Styles.container}>
        <View style={Styles.line} />
        <View style={Styles.contentArea}>
          <View style={Styles.textArea}>
            <Text style={Styles.timeStyle}>10 Aug 11AM -12AM</Text>
          </View>
          {this.props.contentView}
        </View>
      </View>
    ) : (
      this.props.contentView
    );
  }
}
class BookingCard extends React.Component {
  constructor(props) {
    super(props);
  }
  userProfile = () => {
    if (this.props.rollId == 2) Actions.InstructorProfile({ type: "replace" });
    else Actions.InstructorStudentProfile({ type: "replace" });
  };
  btnClick = () => {
    alert("In progress...");
    // if (this.props.bookingStatus == undefined) alert("cancel booking");
    // else Actions.BookNow({ type: "replace" });
  };
  getView = () => {
    const { bookingData,bookingStatus, lessons,rollId } = this.props;
    console.log("rollid", rollId);
    return (
      <View
        elevation={10}
        style={
          this.props.rollId == 2
            ? Styles.cardArea
            : [Styles.cardArea, this.props.rollId == "3" ? Styles.newCard : {}]
        }
      >
        <View
          style={[
            { height: this.props.rollId == "2" ? "70%" : "100%" },
            Styles.completeView
          ]}
        >
          <View style={Styles.imageView}>
            <Image
              resizeMode="contain"
              source={Images.userImg}
              style={Styles.imagestyle}
            />
          </View>
          <View style={Styles.textContainer}>
            {/* <TouchableOpacity onPress={() => this.userProfile()}> */}
            <Text
              onPress={() => this.userProfile()}
              style={[Styles.nameStyle, Styles.detailsText]}
            >
             {this.props.rollId == "2"?lessons.userId.name:bookingData.userId.name}
            </Text>
            {/* </TouchableOpacity> */}

            {this.props.rollId == "2" ? (
              <View>
                <Text style={[Styles.nameStyle, { color: Color.grayClg }]}>
                  {this.props.rollId == "2"?lessons.userId.streetAddress:bookingData.userId.streetAddress}
                </Text>
                <Text style={[Styles.nameStyle, { color: Color.grayClg }]}>
                {this.props.rollId == "2"?lessons.userId.state :bookingData.userId.state}
                {this.props.rollId == "2"?lessons.userId.zipCode:bookingData.userId.zipCode}
                </Text>
              </View>
            ) : (
              <View>
                <Text style={[Styles.nameStyle, { color: Color.grayClg }]}>
                  Berlin
                </Text>
                <View style={Styles.row}>
                  <Text style={[Styles.nameStyle, { color: Color.grayClg }]}>
                    Booked On{" "}
                  </Text>
                  <Text style={[Styles.nameStyle, Styles.nameStyle2]}>
                    9th Aug
                  </Text>
                </View>

                <View style={Styles.row}>
                  <Text style={[Styles.nameStyle, { color: Color.grayClg }]}>
                    Cancelled On{" "}
                  </Text>
                  <Text style={[Styles.nameStyle, Styles.nameStyle2]}>
                    10th Aug
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View style={Styles.lineV} />
          <View style={Styles.prizeView}>
            <Text style={Styles.nameStyle}>Price</Text>
            <Text style={[Styles.nameStyle, { fontSize: RF(2.3) }]}>
              $ {bookingData.payedPrice}
            </Text>
          </View>
        </View>
        <View style={{}}>
          {this.props.rollId == "2" ? (
            <Item
              rounded
              style={[Styles.btn, GlobalStyle.viewCenter]}
              onPress={() => this.btnClick()}
            >
              <Text style={Styles.btnText}>
                {bookingStatus == undefined ? "Cancel Booking" : "Re-Book"}
              </Text>
            </Item>
          ) : (
            <View style={Styles.detailsbtn}>
              {/* <Text style={Styles.detailsText}>Details</Text> */}
            </View>
          )}
        </View>
      </View>
    );
  };
  render() {
    return (
      <BaseComponent contentView={this.getView()} rollId={this.props.rollId} />
    );
  }
}
export { BookingCard };

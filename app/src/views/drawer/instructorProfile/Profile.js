import React from "react";
import { View, Text, Image, FlatList, ScrollView } from "react-native";
import { Container, Content, Item, Card, Textarea } from "native-base";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import StarRating from "react-native-star-rating";
import PropTypes from "prop-types";
import Styles from "./Styles";
import GlobalStyle from "../../../common/GlobalStyle";
import Images from "../../../common/images";
//import clientApi from "../../../common/ApiManager";
import { SpinnerLoad, ButtonComponent, ModelAlert } from "../../../components";
import { SendMessage } from "../../../actions";
import Header from "../../../components/header/header";
import Util from "../../../common/Util";
import Color from "../../../common/Color";

import KeyWords from "../../../common/Localization";

var categories = [
  { id: 1, title: "Language", subCategories: "English, Spanish" },
  { id: 2, title: "Arts", subCategories: "Music, Drawing" }
];

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sendMessage: false, message: "" };
  }

  bookNow = () => {
    Actions.BookNow({ type: "replace" });
  };

  sendMessage = () => {
    this.setState({ sendMessage: true });
  };

  modelBtn = async () => {
    const { SelectedUser, userData, SendMessage } = this.props;
    const { message } = this.state;
    this.setState({ sendMessage: false });
    await SendMessage({
      user_id: userData._id,
      api_token:
        userData.api_token != null ? userData.api_token : userData.token,
      reciever_id: SelectedUser.userId._id,
      content: message
    });
  };

  _cellDetailView = item => {
    return (
      <View style={Styles.marginTop2}>
        <Text style={Styles.lable}>{item.title}</Text>
        <Text style={Styles.subCategoryTitle}>{item.subCategories}</Text>
      </View>
    );
  };

  _keyExtractor = item => item.id;

  _modelShow = () => {
    const { sendMessage } = this.state;
    //console.log("item details", this.state.selectedData);
    return (
      <ScrollView>
        <ModelAlert
          successData={sendMessage}
          modelStyle={Styles.formView}
          onClose={() => {
            this.setModalVisible();
          }}
        >
          <View style={[Styles.modelTextView]}>
            <Text style={Styles.modelSuccess}>{KeyWords.sendMessage}</Text>
            <Textarea
              rowSpan={5}
              bordered
              placeholder={KeyWords.message}
              onChangeText={message => this.setState({ message })}
              keyboardType="default"
            />
          </View>

          <View style={[GlobalStyle.justifyContentCenter, Styles.modelBtnView]}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1,alignItems:'center' }}>
                <Item
                  rounded
                  style={[Styles.modelBtn, GlobalStyle.viewCenter]}
                  onPress={() => this.modelBtn()}
                >
                  <Text style={Styles.btnText}>{KeyWords.send}</Text>
                </Item>
              </View>

              <View style={{ flex: 1,alignItems:'center' }}>
                <Item
                  rounded
                  style={[Styles.modelBtn, GlobalStyle.viewCenter]}
                  onPress={() => this.setState({ sendMessage: false })}
                >
                  <Text style={Styles.btnText}>Close</Text>
                </Item>
              </View>
            </View>
          </View>
        </ModelAlert>
      </ScrollView>
    );
  };

  render() {
    const { SpinnerVisible, SelectedUser } = this.props;

    return (
      <Container>
        <Header title={KeyWords.instructors} />
        <Content padder>
          <SpinnerLoad spinnerVisible={SpinnerVisible} />
          {this._modelShow()}
          <View style={[GlobalStyle.row, Styles.mainTitleView]}>
            <View
              style={[
                GlobalStyle.width100p,
                GlobalStyle.alignItemsFlexStart,
                GlobalStyle.justifyContentCenter
              ]}
            >
              <Text style={Styles.title}>
                <Text onPress={() => Actions.Search({ type: "replace" })}>
                  {KeyWords.search}
                </Text>
                <Text>/ </Text>
                <Text onPress={() => Actions.pop()}>
                  {KeyWords.providers}
                  {KeyWords.list}
                </Text>
                <Text>/ </Text>
                <Text>
                  {KeyWords.providers}
                  {KeyWords.profile}
                </Text>
              </Text>
            </View>
          </View>
          <View style={Styles.listArea}>
            <Card>
              <View style={[GlobalStyle.row, Styles.basicDetailsView]}>
                <View style={Styles.profileImageBgStyle}>
                  <Image
                    resizeMode="contain"
                    source={Images.userImg}
                    style={Styles.profileImageStyle}
                  />
                </View>
                <View style={Styles.userDetailsView}>
                  <Text style={Styles.name}>{SelectedUser.userId.name}</Text>
                  <View style={[GlobalStyle.row, GlobalStyle.width100p]}>
                    <View
                      style={[
                        GlobalStyle.width50p,
                        GlobalStyle.alignItemsFlexStart,
                        GlobalStyle.justifyContentCenter
                      ]}
                    >
                      <Text style={[Styles.lable, GlobalStyle.alignSelfStart]}>
                        {KeyWords.distance}
                        <Text>: </Text>
                        <Text style={{ color: Color.darkGray }}>
                          {" "}
                          {SelectedUser.distance == undefined
                            ? "_"
                            : SelectedUser.distance}{" "}
                          Miles
                        </Text>
                      </Text>
                    </View>
                    <View
                      style={[
                        GlobalStyle.width50p,
                        GlobalStyle.alignItemsFlexEnd,
                        GlobalStyle.justifyContentCenter
                      ]}
                    >
                      <Text style={[Styles.lable]}>
                        {KeyWords.price}
                        <Text>: </Text>
                        <Text style={{ color: Color.darkGray }}>
                          ${" "}
                          {SelectedUser.price == undefined
                            ? 0
                            : SelectedUser.price + 1}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      GlobalStyle.row,
                      GlobalStyle.container,
                      Styles.marginTop2
                    ]}
                  >
                    <View
                      style={[
                        GlobalStyle.container,
                        GlobalStyle.alignItemsFlexStart
                      ]}
                    >
                      <StarRating
                        //disabled={true}
                        maxStars={5}
                        rating={3}
                        fullStarColor="#fac917"
                        starSize={Util.getHeight(2.5)}
                        emptyStarColor={Color.grayClg}
                      />
                    </View>
                    <View
                      style={[
                        GlobalStyle.alignItemsFlexEnd,
                        GlobalStyle.container
                      ]}
                    >
                      <Text
                        style={[Styles.lable, GlobalStyle.justifyContentCenter]}
                      >
                        {KeyWords.total}
                        {KeyWords.reviews}
                        <Text>: </Text>
                        <Text style={{ color: Color.darkGray }}>
                          {" "}
                          {SelectedUser.totalReviews == undefined
                            ? "0"
                            : SelectedUser.totalReviews}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[GlobalStyle.divider, Styles.marginTop2]} />
              <View style={Styles.descriptionView}>
                <Text style={Styles.subCategoryTitle}>
                  {SelectedUser.instructorProfileId.aboutMe == ""
                    ? "aboutMe"
                    : SelectedUser.instructorProfileId.aboutMe}
                </Text>
              </View>
              <View style={Styles.padding5}>
                <Text style={Styles.categoryTitle}>{KeyWords.categories}</Text>
                <FlatList
                  data={categories}
                  renderItem={({ item }) => this._cellDetailView(item)}
                  keyExtractor={this._keyExtractor}
                  listKey={categories[0].id}
                />
              </View>
              <View style={[GlobalStyle.row, Styles.btnView]}>
                <View
                  style={[
                    GlobalStyle.alignItemsCenter,
                    SelectedUser.price != undefined
                      ? GlobalStyle.width50p
                      : GlobalStyle.width75
                  ]}
                >
                  <ButtonComponent
                    btnText={KeyWords.sendMessage}
                    btnStyle={Styles.backBtn}
                    callFunction={() => this.sendMessage()}
                  />
                </View>
                {SelectedUser.price != undefined ? (
                  <View
                    style={[GlobalStyle.alignItemsCenter, GlobalStyle.width50p]}
                  >
                    <ButtonComponent
                      btnText={KeyWords.book + " " + KeyWords.now}
                      btnStyle={Styles.btn}
                      callFunction={() => this.bookNow()}
                    />
                  </View>
                ) : null}
              </View>
            </Card>
          </View>
        </Content>
      </Container>
    );
  }
}

ProfileComponent.propTypes = {
  SpinnerVisible: PropTypes.element.isRequired
};

const maptoprops = state => {
  console.log("SelectedUser instructor", state.SearchIntructor.selectedUser);
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata,
    SelectedUser: state.SearchIntructor.selectedUser
  };
};

export default connect(
  maptoprops,
  { SendMessage }
)(ProfileComponent);

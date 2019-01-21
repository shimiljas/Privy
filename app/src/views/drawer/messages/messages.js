import React from "react";
import { View, Alert, ScrollView, FlatList } from "react-native";
// import { Container, Content, Text } from "native-base";
import { Container, Content, Item, Text, Textarea } from "native-base";
import { connect } from "react-redux";
// import clientApi from "../../../common/ApiManager";
import { AllMessage, SendMessage } from "../../../actions";
import Styles from "./Styles";
import { CardComponentMessage, ModelAlert } from "../../../components";
import Header from "../../../components/header/header";
import KeyWords from "../../../common/Localization";
import GlobalStyle from "../../../common/GlobalStyle";
import modleStyles from "../instructorProfile/Styles";

class MessagesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessage: false,
      SelectedUser: {},
      message: ""
    };
    this.getMessages();
  }

  getMessages = async () => {
    const { userData, AllMessage } = this.props;
    var obj = {
      user_id: userData._id,
      api_token:
        userData.api_token != null ? userData.api_token : userData.token
    };
    await AllMessage(obj);
  };

  delete = () => {
    // Alert.alert(
    //   KeyWords.alert,
    //   KeyWords.deleteConfirmationMsg,
    //   [
    //     {
    //       text: KeyWords.cancel,
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel"
    //     },
    //     {
    //       text: KeyWords.ok,
    //       onPress: async () => {}
    //     }
    //   ],
    //   { cancelable: true, text: "Can" }
    // );
  };

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
              <View style={{ flex: 1, alignItems: "center" }}>
                <Item
                  rounded
                  style={[Styles.modelBtn, GlobalStyle.viewCenter]}
                  onPress={() => this.modelBtn()}
                >
                  <Text style={Styles.btnText}>{KeyWords.send}</Text>
                </Item>
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
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

  replyMsg = item => {
    this.setState({ sendMessage: true, SelectedUser: item });
  };
  modelBtn = async () => {
    const { userData, SendMessage } = this.props;
    const { SelectedUser } = this.state;
    console.log("send message person", SelectedUser);
    const { message } = this.state;

    if(message==''){
     alert("Please enter message")
    }else{
      this.setState({ sendMessage: false });
      await SendMessage({
        user_id: userData._id,
        api_token:
          userData.api_token != null ? userData.api_token : userData.token,
        reciever_id: SelectedUser.messages[0].reciever._id,
        content: message
      });
    }
    
  };

  render() {
    const { Messages, userData } = this.props;
    console.log("msg == ", Messages);
    return (
      <Container>
        <Header title={KeyWords.messages} />
        <Content padder contentContainerStyle={Styles.flexGrow}>
          <View style={Styles.padding10}>
            {this._modelShow()}
            <View>
              {Messages.length > 0 ? (
                <FlatList
                  contentContainerStyle={Styles.margin15}
                  horizontal={false}
                  numColumns={1}
                  data={Messages}
                  renderItem={({ item }) => {
                    console.log(item);
                    return (
                      <CardComponentMessage
                        data={item.messages[0]}
                        userId={userData.roleId}
                        click={() => this.delete(item)}
                        replyClick={() => {
                          this.replyMsg(item);
                        }}
                      />
                    );
                  }}
                  listKey="Messages"
                  //keyExtractor=
                />
              ) : (
                <Text style={Styles.margin15}>{KeyWords.noMsgReceived}</Text>
              )}
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const maptoprops = state => {
  console.log("messages list", state.AllMessages.messageList);
  return {
    userData: state.User.userdata,
    Messages: state.AllMessages.messageList
  };
};

export default connect(
  maptoprops,
  { AllMessage, SendMessage }
)(MessagesComponent);

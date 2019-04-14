import React from "react";
import { View, Alert, ScrollView, FlatList, AsyncStorage, Modal,TouchableOpacity, Image } from "react-native";
// import { Container, Content, Text } from "native-base";
import { Container, Content, Item, Text, Textarea } from "native-base";
import { connect } from "react-redux";
import clientApi from "../../../common/ApiManager";
import { AllMessage, SendMessage } from "../../../actions";
import Styles from "./Styles";
import { CardComponentMessage, ModelAlert } from "../../../components";
import Header from "../../../components/header/header";
import KeyWords from "../../../common/Localization";
import GlobalStyle from "../../../common/GlobalStyle";
import Images from "../../../common/images";
import Color from "../../../common/Color";

class MessagesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessage: false,
      SelectedUser: {},
      selMessage: {name: ""},
      cMsg: [],
      openConv: false,
      message: "This is very very very very loooooooooong messge to student..."
    };
    this.getMessages();
  }

  getMessages = async () => {
    const { userData, AllMessage } = this.props;
    var obj = {
      user_id: await AsyncStorage.getItem("userId"),
      api_token:
        userData.api_token != null ? userData.api_token : userData.token
    };
    await AllMessage(obj);
  };

  delete = (item) => {
    Alert.alert(
      KeyWords.alert,
      KeyWords.deleteConfirmationMsg,
      [
        {
          text: KeyWords.cancel,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: KeyWords.ok,
          onPress: async () => {
            await clientApi.callPostApi("del_msg.php", {
              user_id: await AsyncStorage.getItem("userId"),
              mid: item.mid
            }).then(res => {
              console.log("DELETE", res);
              if(res.success == 1) {
                alert(res.message);
                this.getCMsg(this.state.selMessage);
              }
            })
          }
        }
      ],
      { cancelable: true, text: "Can" }
    );
  };
  deleteConv = () => {
    Alert.alert(
      KeyWords.alert,
      KeyWords.deleteConfirmationMsg,
      [
        {
          text: KeyWords.cancel,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: KeyWords.ok,
          onPress: async () => {
            console.log( this.state.selMessage)
            await clientApi.callPostApi("del_msg_cid.php", {
              user_id: await AsyncStorage.getItem("userId"),
              cid: this.state.selMessage.cid
            }).then(res => {
              console.log("DELETE", res);
              // this.setState({openConv: false})
              if(res.success == 1) {
                alert(res.message);
                this.getMessages();
              }
            })
          }
        }
      ],
      { cancelable: true, text: "Can" }
    );
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

  showConv() {
    const { openConv, cMsg, selMessage } = this.state;
    console.log(cMsg, selMessage);
    return(
      <Modal
        visible={openConv}
        animationType={"slide"}
        transparent={false}
        onRequestClose={() => this.setState({openConv: false})}
      >
        <View style={{backgroundColor: "#ffffff99", flex:1}}>
          <View style={{flexDirection: 'row', backgroundColor: Color.inputBg, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.setState({openConv: false})}>
              <View style={{backgroundColor: Color.appDefultColor, padding: 10}}>
                <Text style={{color: Color.whiteClr, fontFamily: "Poppins"}}>{'< Back'}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ padding: 10, flex:1}}>
              <Text style={{ fontFamily: "Poppins"}}>{selMessage.name.toUpperCase()}</Text>
            </View>
            {/* <TouchableOpacity onPress={() => this.deleteConv()} >
              <Image source={Images.deleteImg} resizeMode={'contain'} style={{width: 32, height: 32, marginRight: 10}} />
            </TouchableOpacity> */}
          </View>
          <ScrollView style={{flex:1, padding: 10}}>
            {cMsg.map(msg => {
              return (
                <CardComponentMessage
                  data={msg}
                  hideReply={true}
                  click={() => this.delete(msg)}
                  replyClick={() => {
                    console.log("NOREPLY")
                  }}
                  nameClick={() => {
                    console.log("HELLO")
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    )
  }

  replyMsg = item => {
    this.setState({ sendMessage: true, SelectedUser: item });
  };
  modelBtn = async () => {
    const { userData, SendMessage } = this.props;
    const { SelectedUser } = this.state;
    const { message } = this.state;
    console.log("send message person", SelectedUser, message);

    if(message==''){
     alert("Please enter message")
    }else{
      this.setState({ sendMessage: false });
      await SendMessage({
        user_id: await AsyncStorage.getItem("userId"),
        api_token:
          userData.api_token != null ? userData.api_token : userData.token,
        receiver_id: SelectedUser.receiver,
        cid: SelectedUser.cid,
        content: message
      });
    }
  };

 async getCMsg(item) {
    await clientApi.callPostApi("get_messages_cid.php", {
      user_id: await AsyncStorage.getItem("userId"),
      cid: item.cid
    }).then(res => {
      console.log("all Messages", res);
      // this.setState({});
      if(res.success == 1) {
        this.setState({cMsg: res.data,openConv: true, selMessage: item})
      }
    })
  }

  render() {
    let { Messages, userData } = this.props;
    return (
      <Container>
        <Header title={KeyWords.messages} />
        <Content contentContainerStyle={Styles.flexGrow}>
          <View>
            {this._modelShow()}
            {this.showConv()}
            <View>
              {Messages.length > 0 ? (
                <FlatList
                  contentContainerStyle={Styles.margin15}
                  horizontal={false}
                  numColumns={1}
                  data={Messages}
                  renderItem={({ item }) => {
                    return (
                      <CardComponentMessage
                        data={item}
                        userId={userData.roleId}
                        click={() => this.deleteConv(item)}
                        replyClick={() => {
                          this.replyMsg(item);
                        }}
                        nameClick={() => {
                          this.getCMsg(item);
                        }}
                      />
                    );
                  }}
                  listKey="Messages"
                  keyExtractor={(item) => item.id + "as"}
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

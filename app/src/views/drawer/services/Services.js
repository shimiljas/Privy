import React from "react";
import {
  View,
  Image,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { Container, Content, Text, CheckBox, Row, Col } from "native-base";
import ModalSelector from "react-native-modal-selector";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Images from "../../../common/images";
import GlobalStyle from "../../../common/GlobalStyle";
import Styles from "./Styles";
import Color from "../../../common/Color";
import { ButtonComponent, CardComponentSer } from "../../../components";
import Header from "../../../components/header/header";
import styles from "../../../components/header/styles";
import KeyWords from "../../../common/Localization";
import clientApi from "../../../common/ApiManager";

var lessons = [];

var categories = [];

//var selectedData = [];

var services = [];

class ServicesComponent extends React.Component {
  constructor(props) {
    super(props);
    //console.log("services ", props);

    this.state = {
      //timePassed: false,
      modalVisible: false,
      category: 0,
      selectedData: [],
      services: services,
      editItemDetails: {},
      modifiedModelVisible: false
      //updateCagetory: ""
      //categories: categories,
    };

    this.getLessons();

    this.getCategories();

    this.getAllServices();
  }

  onValueChange(value) {
    const { selectedData } = this.state;
    console.log("called fun ===", value);
    this.setState({
      category: value,
      selectedData: []
    });
    console.log("called fun ===1", selectedData);
  }

  getLessons = async () => {
    var response = await clientApi.callGetApi("getLessonType");
    if (response.status == "true") {
      lessons = response.data;
      console.log("lessons == ", lessons);
    }
  };

  getCategories = async () => {
    var response = await clientApi.callGetApi("getCategories");
    console.log("=== ==== catwgories == ", response);
    if (response.status == "true") {
      categories = response.data;
      this.setState({
        category: categories[0]
      });
      //console.log("categories response == ", categories, categories[this.state.category]._id);
    } else {
      //console.log("categories else res == ", response);
    }
  };

  getAllServices = async () => {
    const { userData } = this.props;
    var obj = {
      user_id: userData._id
    };
    var response = await clientApi.callApi(
      "getService",
      obj,
      userData.api_token != null ? userData.api_token : userData.token
    );
    console.log(" ffh ser res == ", response);
    if (response.status == "true") {
      services = response.data;

      this.setState({ services: services });
    }
  };

  setModalVisible = () => {
    const { modalVisible } = this.state;
    var visible = !modalVisible;
    //console.log("modle bn function");
    this.setState({ modalVisible: visible });
  };

  updateSelectedValue = data => {
    const { selectedData } = this.state;
    this.setState({ selectedData: data });
    console.log("called fun == ", selectedData);
  };

  save = async () => {
    var lessonSelected = false;
    const { selectedData, category } = this.state;
    const { userData } = this.props;
    var visible = false;
    var subCaregorySelected = (lessonSelected = false);
    console.log("sub data -- ", selectedData);

    if (selectedData == "") {
      alert("Select sub-category and lessons");
    } else {
      console.log("nn selected data = ", selectedData);

      var subCategories = selectedData;
      if (subCategories.find(k => k == lessons[0]._id)) {
        subCategories = subCategories.filter(k => k !== lessons[0]._id);
        lessonSelected = true;
      }
      if (subCategories.find(k => k == lessons[1]._id)) {
        subCategories = subCategories.filter(k => k !== lessons[1]._id);
        lessonSelected = true;
      }
      if (subCategories.find(k => k == lessons[2]._id)) {
        subCategories = subCategories.filter(k => k !== lessons[2]._id);
        lessonSelected = true;
      }
      if (subCategories.find(k => k == lessons[3]._id)) {
        subCategories = subCategories.filter(k => k !== lessons[3]._id);
        lessonSelected = true;
      }

      if (subCategories.length > 0) {
        subCaregorySelected = true;
      }

      if (lessonSelected === true && subCaregorySelected === true) {
        console.log("subCategories data = ", subCategories);

        var obj = {
          user_id: userData._id,
          categoryId: category._id,
          subCategoryId: subCategories,
          oneOnOne: selectedData.find(k => k == lessons[0]._id) ? 1 : 0,
          groupLessons: selectedData.find(k => k == lessons[2]._id) ? 1 : 0,
          camp: selectedData.find(k => k == lessons[1]._id) ? 1 : 0,
          bootCamp: selectedData.find(k => k == lessons[3]._id) ? 1 : 0
        };

        console.log("add service data == ", obj);

        var response = await clientApi.callApi(
          "addService",
          obj,
          userData.api_token != null ? userData.api_token : userData.token,
          2
        );
        console.log("api response == ", response);
        if (response.status == "true") {
          this.getAllServices();
          Alert.alert(
            KeyWords.successs,
            response.message,
            [
              {
                text: KeyWords.ok,
                onPress: () => {
                  this.setState({
                    modalVisible: visible,
                    modifiedModelVisible: false,
                    selectedData: []
                  });
                }
              }
            ],
            { cancelable: false }
          );
        }
      } else {
        if (subCaregorySelected === false) {
          alert( KeyWords.selectSubCategoryMsg);
        }
        if (lessonSelected === false) {
          alert(KeyWords.selectLessonMsg);
        }
      }
    }
  };

  _deleteItem = async () => {
    const { editItemDetails } = this.state;
    const { userData } = this.props;
    Alert.alert(
      KeyWords.alert,
      KeyWords.deleteConfirmationMsg + "?",
      [
        {
          text: KeyWords.cancel,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: KeyWords.ok,
          onPress: async () => {
            var obj = {
              user_id: editItemDetails.userId,
              service_id: editItemDetails._id
            };

            console.log("delete service data == ", obj);
            var response = await clientApi.callApi(
              "deleteService",
              obj,
              userData.api_token != null ? userData.api_token : userData.token,
              2
            );
            if (response.status == "true") {
              this.getAllServices();
              Alert.alert(KeyWords.alert, response.message, [
                {
                  text: KeyWords.ok,
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                }
              ]);

              alert(response.message);
            }
          }
        }
      ],
      { cancelable: true, text: "Can" }
    );
  };
  _modifyBtnClick = item => {
    const { modifiedModelVisible, selectedData } = this.state;
    var visible = !modifiedModelVisible;
    if (visible == true) {
      var element = [];

      if (item.oneOnOne == true) element.push(lessons[0]._id);
      if (item.camp == true) element.push(lessons[1]._id);
      if (item.groupLessons == true) element.push(lessons[2]._id);
      if (item.bootCamp == true) element.push(lessons[3]._id);

      for (let index = 0; index < item.subCategoryId.length; index++) {
        element.push(item.subCategoryId[index]._id);
      }
      // categories = item.categoryId;
      console.log("categories data", categories);
      this.setState({
        selectedData: element,
        //cagetory: item.categoryId._id,
        editItemDetails: item
      });
    }
    this.setState({ modifiedModelVisible: visible });
    console.log("delete or edit item details", item, selectedData);
    this.setState({
      category: categories.find(x => x._id == item.categoryId._id)
    });
  };
  checkBoxClick = item => {
    const { selectedData } = this.state;
    var d = selectedData;
    if (d.find(k => k == item._id)) {
      d = d.filter(k => k !== item._id);
    } else {
      d.push(item._id);
    }
    this.updateSelectedValue(d);
  };
  subcategoryList = () => {
    const { category } = this.state;
    return (categories.length > 0 ? category.subcategory : []).map(item => {
      return (
        <View style={[GlobalStyle.row, Styles.marginTop2p]}>
          <CheckBox
            checked={
              this.state.selectedData.find(k => k == item._id) ? true : false
            }
            color="green"
            onPress={() => {
              this.checkBoxClick(item);
            }}
            style={Styles.btnPadding}
          />
          <Text style={Styles.text}>{item.name}</Text>
        </View>
      );
    });
  };
  lessonsList = () => {
    return lessons.map(item => {
      return (
        <View style={[GlobalStyle.row, Styles.marginTop2p]}>
          <CheckBox
            checked={
              this.state.selectedData.find(k => k == item._id) ? true : false
            }
            color="green"
            onPress={() => {
              this.checkBoxClick(item);
            }}
            style={Styles.btnPadding}
          />
          <Text style={Styles.text}>{item.name}</Text>
        </View>
      );
    });
  };
  _modelShow = data => {
    const {
      selectedData,
      modifiedModelVisible,
      modalVisible,
      category
    } = this.state;
    console.log("item details", category);
    return (
      <Modal
        style={Styles.modelView}
        animationType="slide"
        transparent
        visible={
          data == 2 ? modalVisible : data == 1 ? modifiedModelVisible : false
        }
        onRequestClose={() => {
          //data = 0;
          this.setModalVisible();
        }}
      >
        <View
          style={[
            GlobalStyle.viewCenter,
            GlobalStyle.fullHeight,
            { backgroundColor: Color.modelBackground }
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              {
                data == 2
                  ? this.setModalVisible()
                  : data == 1
                  ? this.setState({ modifiedModelVisible: false })
                  : false;
              }
            }}
            style={[Styles.height5p, Styles.closeBtnStyle]}
          >
            <Image source={Images.closeImg} style={Styles.closeBtn} />
          </TouchableOpacity>
          <View style={[Styles.formView]}>
            <View style={GlobalStyle.height10}>
              <Text style={Styles.subTitle}>{KeyWords.category}</Text>
            </View>

            <View style={[Styles.height15p, GlobalStyle.justifyContentCenter]}>
              {data == 2 ? (
                <ModalSelector
                  data={categories}
                  keyExtractor={item => item._id}
                  labelExtractor={item =>
                    item.name != null ? item.name : item.title
                  }
                  onChange={value => this.onValueChange(value)}
                  selectStyle={[
                    GlobalStyle.borderWidth0,
                    GlobalStyle.alignItemsFlexStart,
                    { color: "red" }
                  ]}
                />
              ) : (
                <Text>{category.name}</Text>
              )}
            </View>

            <View style={GlobalStyle.divider} />

            <View style={[GlobalStyle.height10, Styles.marginTop1p]}>
              <Text style={Styles.subTitle}>{KeyWords.subCategories}</Text>
            </View>

            <View style={[Styles.height20p]}>
              <ScrollView>{this.subcategoryList()}</ScrollView>
            </View>

            <View style={Styles.lessonTitleView}>
              <Text style={Styles.lessonTitle}>
                {KeyWords.typeOfLessonsProvided}
              </Text>
            </View>

            <View style={[Styles.height40p]}>
              <ScrollView>
          
                {this.lessonsList()}
          
              </ScrollView>
              {/* <GridView
                data={data}
                
                itemsPerRow={itemsPerRow}
                renderItem={this.lessonsList()}
              /> */}
              {/* <FlatListCheckboxComponent
                data={lessons}
                name="lessons"
                selectedData={selectedData}
                callFunction={data => this.updateSelectedValue(data)}
              /> */}
            </View>
            <View
              style={[GlobalStyle.height20, GlobalStyle.justifyContentCenter]}
            >
              {modalVisible == true
                ? this._addModelBtn()
                : this._editModelBtn()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  _editModelBtn = () => {
    return (
      <View style={[GlobalStyle.row]}>
        <View>
          <ButtonComponent
            btnText={KeyWords.delete}
            btnStyle={Styles.btn85p}
            callFunction={() => this._deleteItem()}
          />
        </View>
        <View>
          <ButtonComponent
            btnText={KeyWords.edit}
            btnStyle={Styles.btn85p}
            callFunction={() => this.save()}
          />
        </View>
      </View>
    );
  };
  _addModelBtn = () => {
    return (
      <View style={styles.btnView}>
        <ButtonComponent
          btnText={KeyWords.save}
          btnStyle={Styles.btn}
          callFunction={() => this.save()}
        />
      </View>
    );
  };
  _editModel = () => {
    return this._modelShow(1);
  };
  _addModel = () => {
    return this._modelShow(2);
  };
  render() {
    const { modalVisible, modifiedModelVisible, services } = this.state;
    return (
      <Container>
        <Header title={KeyWords.services} />
        <Content padder contentContainerStyle={Styles.flexGrow}>
          <View>
            {modalVisible == true ? this._addModel() : <View />}
            {modifiedModelVisible == true ? this._editModel() : <View />}

            <View style={[GlobalStyle.row]}>
              <View style={[Styles.mainTitleView]}>
                <Text style={Styles.title}>
                  {KeyWords.services + " " + KeyWords.provided}
                </Text>
              </View>

              <View style={Styles.menuIcon}>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible();
                    this.setState({ selectedData: [] });
                  }}
                >
                  <Image source={Images.addImg} />
                </TouchableHighlight>
              </View>
            </View>
            <View>
              {services.length > 0 ? (
                <FlatList
                  contentContainerStyle={Styles.margin15}
                  horizontal={false}
                  numColumns={1}
                  data={services}
                  renderItem={({ item }) => {
                    console.log(item);
                    return (
                      <CardComponentSer
                        click={() => this._modifyBtnClick(item)}
                        data={item}
                      />
                    );
                  }}
                  listKey="categories"
                  keyExtractor={category => category.categoryId.name}
                />
              ) : (
                <View style={[Styles.margin15, GlobalStyle.marginLeft15]}>
                  <Text>{KeyWords.noServicesAdded}</Text>
                </View>
              )}
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

ServicesComponent.propTypes = {
  userData: PropTypes.element.isRequired
};

const maptoprops = state => {
  return {
    userData: state.User.userdata
  };
};

export default connect(
  maptoprops,
  {}
)(ServicesComponent);

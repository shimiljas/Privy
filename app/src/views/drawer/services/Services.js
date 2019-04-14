import React from "react";
import {
  View,
  Image,
  Alert,
  FlatList,
  Modal,
  
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Container, Content, Text, CheckBox, Row, Col } from "native-base";

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


class ServicesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      category: {},
      selectedData: [],
      lessons:[],
      services:[],
      editItemDetails: {},
      modifiedModelVisible: false, pids: "EXIT", lIds: [],cIds: []
    };
  }

  async componentDidMount() {
    await this.getLessons();
    await this.getCategories();
    await this.getAllServices();
  }

  onValueChange(value) {
    const { selectedData } = this.state;
    this.setState({
      category: value,
      selectedData: [],
      
    });
    console.log("called fun ===1", selectedData);
  }

  getLessons = async () => {
    let response = await clientApi.callPostApi("get_lessons.php");
    if (response.success == 1) {
      console.log("LESSONS", response.data)
      this.setState({lessons : response.data});
    }
  };

  getCategories = async () => {
    let response = await clientApi.callPostApi("get_categories.php", {pid: null});
    if (response.success == 1) {
      categories = response.data;
      this.setState({
        categoryData: categories
      });
    }
  };

  getAllServices = async () => {
    let obj = {
      user_id: await AsyncStorage.getItem("userId")
    };
    let response = await clientApi.callPostApi(
      "get_services_ins.php",
      {...obj}
    );
    if (response.success == 1) {
      console.log(" ffh ser res == ", response);
      this.setState({ services: response.data.data, helperCats: response.data.cats });
    }
  };

  setModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({ modalVisible: !modalVisible, pids: "EXIT", lIds: [], cIds: [] });
  };

  updateSelectedValue = data => {
    const { selectedData } = this.state;
    this.setState({ selectedData: data });
    console.log("called fun == ", selectedData);
  };

  save = async () => {
    const { cIds, lIds } = this.state;
    const user_id = await AsyncStorage.getItem("userId");
    const result  = await clientApi.callPostApi("update_services_ins.php", {user_id, cid: cIds.join(","), lid: lIds.join(","), pid: cIds[0]})
    console.log("SERVICE ADD RESULT " , result);
    if(result.success == 1) {
      this.setState({services: result.data.data, modalVisible: false, pids: "EXIT", lIds: [], cIds: []});
      // this.setModalVisible();
    }
  };

  // saveItem = async () => {
  //   let lessonSelected = false;
  //   const { selectedData, category } = this.state;
  //   const { userData } = this.props;
  //   let visible = false;
  //   let subCaregorySelected = (lessonSelected = false);
  //   console.log("sub data -- ", selectedData);

  //   if (selectedData == "") {
  //     alert("Select sub-category and lessons");
  //   } else {
  //     console.log("nn selected data = ", selectedData);

  //     let subCategories = selectedData;
  //     if (subCategories.find(k => k == lessons[0]._id)) {
  //       subCategories = subCategories.filter(k => k !== lessons[0]._id);
  //       lessonSelected = true;
  //     }
  //     if (subCategories.find(k => k == lessons[1]._id)) {
  //       subCategories = subCategories.filter(k => k !== lessons[1]._id);
  //       lessonSelected = true;
  //     }
  //     if (subCategories.find(k => k == lessons[2]._id)) {
  //       subCategories = subCategories.filter(k => k !== lessons[2]._id);
  //       lessonSelected = true;
  //     }
  //     if (subCategories.find(k => k == lessons[3]._id)) {
  //       subCategories = subCategories.filter(k => k !== lessons[3]._id);
  //       lessonSelected = true;
  //     }

  //     if (subCategories.length > 0) {
  //       subCaregorySelected = true;
  //     }

  //     if (lessonSelected === true && subCaregorySelected === true) {
  //       console.log("subCategories data = ", subCategories);

  //       let obj = {
  //         user_id: userData._id,
  //         categoryId: category._id,
  //         subCategoryId: subCategories,
  //         oneOnOne: selectedData.find(k => k == lessons[0]._id) ? 1 : 0,
  //         groupLessons: selectedData.find(k => k == lessons[2]._id) ? 1 : 0,
  //         camp: selectedData.find(k => k == lessons[1]._id) ? 1 : 0,
  //         bootCamp: selectedData.find(k => k == lessons[3]._id) ? 1 : 0
  //       };

  //       console.log("add service data == ", obj);

  //       let response = await clientApi.callApi(
  //         "addService",
  //         obj,
  //         userData.api_token != null ? userData.api_token : userData.token,
  //         2
  //       );
  //       console.log("api response == ", response);
  //       if (response.status == "true") {
  //         this.getAllServices();
  //         Alert.alert(
  //           KeyWords.successs,
  //           response.message,
  //           [
  //             {
  //               text: KeyWords.ok,
  //               onPress: () => {
  //                 this.setState({
  //                   modalVisible: visible,
  //                   modifiedModelVisible: false,
  //                   selectedData: []
  //                 });
  //               }
  //             }
  //           ],
  //           { cancelable: false }
  //         );
  //       }
  //     } else {
  //       if (subCaregorySelected === false) {
  //         alert(KeyWords.selectSubCategoryMsg);
  //       }
  //       if (lessonSelected === false) {
  //         alert(KeyWords.selectLessonMsg);
  //       }
  //     }
  //   }
  // };

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
            let obj = {
              user_id: editItemDetails.userId,
              service_id: editItemDetails._id
            };

            console.log("delete service data == ", obj);
            let response = await clientApi.callApi(
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
    let visible = !modifiedModelVisible;
    if (visible == true) {
      let element = [];

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
  checkBoxClick = (itemId, stateType, pid = undefined) => {
    const data = this.state[stateType];
    let d = [...data];
    if(pid == null && stateType == "cIds") {
      d = []
    }
    if (d.find(k => k == itemId)) {
      d = d.filter(k => k !== itemId);
    } else {
      d.push(itemId);
    }
    this.setState({[stateType]: d})
  };
  subcategoryList = ( item ) => {
    const {cIds} = this.state;
    let isTick = cIds.find(x => x == item.id);
    return (
      <View style={[GlobalStyle.row]}>
        <CheckBox
          checked={ isTick ? true : false }
          color="green"
          onPress={() => this.checkBoxClick(item.id, "cIds", item.parent_id)}
          style={Styles.btnPadding}
        />
        <TouchableOpacity onPress={() =>  this.getSubCategories(item.id, false)}>
          <View style={{ padding: 5 }}>
            <Text style={[Styles.text, {fontFamily: "Poppins"}]}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  lessonsList = ({ item }) => {
    const {lIds} = this.state;
    let isTick = lIds.find(x => x == item.id);
    return (
      <View style={{ padding: 5 }}>
        <View style={[GlobalStyle.row, Styles.marginTop2p, { width: 180 }]}>
          <CheckBox
            checked={
              isTick ? true : false
            }
            color="green"
            onPress={() => {
              this.checkBoxClick(item.id, "lIds");
            }}
            style={Styles.btnPadding}
          />
          <Text style={[Styles.text, {fontFamily: "Poppins"}]}>{item.name}</Text>
        </View>
      </View>
    );
  };
  _modelShow = data => {
    return this.showAddService();
    // const {
    //   selectedData,
    //   modifiedModelVisible,
    //   modalVisible,
    //   category
    // } = this.state;
    // console.log("item details", category);
    // return (
    //   <Modal
    //     animationType="fade"
        
    //     visible={
    //       data == 2 ? modalVisible : data == 1 ? modifiedModelVisible : false
    //     }
    //     onRequestClose={() => {
    //       //data = 0;
    //       this.setModalVisible();
    //     }}
    //   >
    //     <View
    //       style={[
    //         GlobalStyle.viewCenter,
    //         GlobalStyle.fullHeight,
    //         { backgroundColor: Color.modelBackground }
    //       ]}
    //     >
    //       <TouchableOpacity
    //         onPress={() => {
    //           {
    //             data == 2
    //               ? this.setModalVisible()
    //               : data == 1
    //               ? this.setState({ modifiedModelVisible: false })
    //               : false;
    //           }
    //         }}
    //         style={[Styles.height5p, Styles.closeBtnStyle]}
    //       >
    //         <Image source={Images.closeImg} style={Styles.closeBtn} />
    //       </TouchableOpacity>
    //       <View style={Styles.formView}>
    //         <View style={{ paddingVertical: 10 }}>
    //           <Text style={{ fontSize: RF(2), color: Color.grayClg }}>
    //             {KeyWords.category}
    //           </Text>

    //           <DropDownCategory
    //             selectedName={this.state.category.name}
    //             data={categories}
    //             onSelect={category => this.setState({ category })}
    //           />
    //         </View>

    //         {/* <View style={[Styles.height15p, GlobalStyle.justifyContentCenter]}>
    //           {data == 2 ? (
    //             <ModalSelector
    //               data={categories}
    //               keyExtractor={item => item._id}
    //               labelExtractor={item =>
    //                 item.name != null ? item.name : item.title
    //               }
    //               onChange={value => this.onValueChange(value)}
    //               selectStyle={[
    //                 GlobalStyle.borderWidth0,
    //                 GlobalStyle.alignItemsFlexStart,
    //                 { color: "red" }
    //               ]}
    //             />
    //           ) : (
    //             <Text>{category.name}</Text>
    //           )}
    //         </View> */}

    //         <View style={{ paddingVertical: 10 }}>
    //           <Text style={Styles.subTitle}>{KeyWords.subCategories}</Text>
                                                                                                       
    //           <FlatList
    //             keyExtractor={item => item._id}
    //             data={category.subcategory}
    //             numColumns={2}
    //             extraData={this.state}
    //             renderItem={item => this.subcategoryList(item)}
    //           />
    //         </View>

    //         <View style={{ paddingVertical: 10 }}>
    //           <Text style={Styles.lessonTitle}>
    //             {KeyWords.typeOfLessonsProvided}
    //           </Text>

    //           <FlatList
    //             keyExtractor={item => item._id}
    //             data={lessons}
    //             numColumns={2}
    //             extraData={this.state}
    //             renderItem={item => this.lessonsList(item)}
    //           />
    //           {/* <GridView
    //             data={data}
                
    //             itemsPerRow={itemsPerRow}
    //             renderItem={this.lessonsList()}
    //           /> */}
    //           {/* <FlatListCheckboxComponent
    //             data={lessons}
    //             name="lessons"
    //             selectedData={selectedData}
    //             callFunction={data => this.updateSelectedValue(data)}
    //           /> */}
    //         </View>
    //         <View style={[GlobalStyle.justifyContentCenter]}>
    //           {modalVisible == true
    //             ? this._addModelBtn()
    //             : this._editModelBtn()}
    //         </View>
    //       </View>
    //     </View>
    //   </Modal>
    // );
  };
  showAddService = () => {
    const { modalVisible } = this.state;
    return(
      <Modal 
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => this.setModalVisible()}
      >
        <View style={{backgroundColor:"whitesmoke", flex:1, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row',padding: 5, justifyContent: "space-between", alignItems: 'center', backgroundColor: Color.inputBg}}>
            <TouchableOpacity onPress={() => this.getSubCategories(null, true)}>
            <View style={{ padding:"5%", borderRadius: 20}}>
              <Text style={{fontFamily: "Poppins-Medium", textAlign: 'center'}}>{'< Back'}</Text></View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => this.save()}>
              <View style={{ padding:"5%", backgroundColor: Color.appDefultColor, borderRadius: 20, elevation: 3}}>
                <Text style={{ fontFamily: "Poppins-Medium", color: "white", textAlign: 'center' }}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10, justifyContent: 'space-between', flexDirection: "column", flex:1}}>            
            {this.showCategories()}
            {this.showLessons()}
          </View>
        </View>
      </Modal>
    )
  }

  showCategories = () => {
    const { categoryData } = this.state;
    return (
      <View style={{ paddingVertical: 5 }}>
        <Text style={[Styles.lessonTitle, {fontFamily: "Poppins-Medium"}]}>
          {"Categories"}
        </Text>
        <View style={{height: 10}} />
        <FlatList 
            data={categoryData} keyExtractor={item => item.id} extraData={this.state.cIds}
            renderItem={({ item }) => this.subcategoryList(item)}
        />
      </View>
    )
  }

  async getSubCategories(pid, back = false) {
    let { pids , categoryData } = this.state;
    if(back) {
      if(pids == "EXIT") {
        this.setModalVisible();
        return;
      }
      pid = pids;
      pids = pid == null ? "EXIT" : categoryData[0].parent_id;
    } else {
      pids = categoryData[0].parent_id
    }
    let response = await clientApi.callPostApi("get_categories.php", {pid});
    if (response.success == 1 && response.data.length > 0) {
      let categories = response.data;
      this.setState({
        categoryData: categories, pids
      });
    } else {
      // alert(response.message);
    }
  }

  async deleteService(service) {
    console.log(service);
    const user_id = await AsyncStorage.getItem("userId");
    let response = await clientApi.callPostApi("del_service_ins.php", {user_id, pid: service.pid});
    if (response.success == 1) {
      console.log("RESPONSE DELTE SERIVCE", response)
      this.getAllServices();
      // let categories = response.data;
      // this.setState({
      //   categoryData: categories, pids
      // });
    } else {
      // alert(response.message);
    }
  }

  showLessons = () => {
    console.log(this.state.lessons, this.state.lIds, "HI THERE")
    return(
      <View style={{ paddingVertical: 10 }}>
        <Text style={[Styles.lessonTitle, {fontFamily: "Poppins-Medium"}]}>
          {KeyWords.typeOfLessonsProvided}
        </Text>
        <View style={{height: 10}} />
        <FlatList
          keyExtractor={item => item.id}
          data={this.state.lessons}
          numColumns={2}
          extraData={this.state.lIds}
          renderItem={item => this.lessonsList(item)}
        />
      </View>
    )
  }

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
    const { modalVisible, modifiedModelVisible, services, helperCats } = this.state;
    console.log("SERVICESSSS " , services);
    return (
      <Container>
        <Header title={KeyWords.services} />
        <Content contentContainerStyle={Styles.flexGrow}>
          <View>
            {modalVisible == true ? this._addModel() : <View />}
            {modifiedModelVisible == true ? this._editModel() : <View />}

            <View style={[GlobalStyle.row, { padding: "2%" }]}>
              <View style={[Styles.mainTitleView]}>
                <Text style={Styles.title}>
                  {KeyWords.services + " " + KeyWords.provided}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  this.setState({ selectedData: [], modalVisible: !modalVisible });
                }}
              >
                <Image
                  style={{ height: 32, resizeMode: "contain" }}
                  source={Images.addImg}
                />
              </TouchableOpacity>
            </View>
            <View>
              {this.state.services.length > 0 ? (
                <FlatList
                  contentContainerStyle={Styles.margin15}
                  horizontal={false}
                  numColumns={1}
                  extraData={this.state.services}
                  data={services}
                  renderItem={({ item }) => {
                    console.log(item);
                    let subCats = [];
                    let sLessons = [];
                    let foundItem = null;
                    let cids = item.cid.split(",").filter(x => x != item.pid)
                    // let lids = item.lid.split(",").filter(x => x != item.pid)
                    for(let id of cids) {
                      foundItem = helperCats.find(x => x.id == id)
                      if(foundItem) {
                        subCats.push(foundItem)
                      }
                    }
                    for(let id of item.lid.split(",")) {
                      foundItem = this.state.lessons.find(x => x.id == id)
                      if(foundItem) {
                        sLessons.push(foundItem)
                      }
                    }
                    const cardData = {
                      category: helperCats.find(x => x.id == item.pid),
                      subCats, sLessons
                    }
                    return (
                      <CardComponentSer
                        click={() => this._modifyBtnClick(cardData)}
                        onEdit={() => {
                          this.setState({
                            cIds: item.cid.split(",").map(x => parseInt(x)),
                            lIds: item.lid.split(",").map(x => parseInt(x)),
                            modalVisible: true
                          })
                        }}
                        onDelete={() => {
                          this.deleteService({pid: item.pid});
                        }}
                        data={cardData}
                      />
                    );
                  }}
                  listKey="categories"
                  keyExtractor={category => category.id+"s"}
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

class DropDownCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrop: false
    };
  }
  selectCategory(item) {
    this.setState({ openDrop: false });
    this.props.onSelect(item);
  }

  render() {
    return (
      <View style={{ backgroundColor: "transparent" }}>
        <TouchableOpacity onPress={() => this.setState({ openDrop: true })}>
          <View style={{ paddingVertical: 10 }}>
            <Text
              style={{
                borderBottomColor: "#999",
                borderBottomWidth: 1,
                fontSize: 25,
                fontWeight: "800",
                letterSpacing: 1.2,
                color: Color.grayClg
              }}
            >
              {this.props.selectedName}
            </Text>
          </View>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          onRequestClose={() => this.setState({ openDrop: false })}
          visible={this.state.openDrop}
        >
          <View style={[{ backgroundColor: "transparent", padding: 20 }]}>
            <FlatList
              data={this.props.data}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.selectCategory(item)}>
                  <View
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: "#AAA",
                      borderBottomWidth: 0.6
                    }}
                  >
                    <Text style={{ fontSize: 25, color: Color.grayClg }}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

export default connect(
  maptoprops,
  {}
)(ServicesComponent);

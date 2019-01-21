import React from "react";
import { View, Image, FlatList, TouchableHighlight, Alert } from "react-native";
import { Container, Content, Tabs, Tab, Text } from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MenuProvider } from "react-native-popup-menu";
import Images from "../../../common/images";
import GlobalStyle from "../../../common/GlobalStyle";
import Styles from "./Styles";
import clientApi from "../../../common/ApiManager";
import { CardComponentClass, SpinnerLoad } from "../../../components";
import Header from "../../../components/header/header";
import KeyWords from "../../../common/Localization";
import { getAllSchedules, addClassData } from "../../../actions";
import styles from "../../../components/roundInput/styles";

var lessons = [];

var classes = [];

class SchedulesComponent extends React.Component {
  static defaultProps = {
    SpinnerVisible: false
  };
  constructor(props) {
    super(props);
    this.state = { classes: classes, title: "", activeTabIndex: 0 };
  }

  componentDidMount() {
    console.log("sch did mount called");
    this.getLessons();
    this.getSchedules();
  }

  componentWillReceiveProps(props) {
    var index = 0;
    if (this.state.activeTabIndex != undefined)
      index = this.state.activeTabIndex;
    const { schedules } = props;
    console.log("sch == ", schedules);
    console.log("lessons dd == ", lessons);
    var filteredClasses = schedules.filter(function(result) {
      return result.lessonType === lessons[index].lessonNumber;
    });
    this.setState({ classes: filteredClasses });
  }

  getSchedules = () => {
    const { userData, getAllSchedules } = this.props;
    var obj = {
      user_id: userData._id,
      api_token:
        userData.api_token != null ? userData.api_token : userData.token
    };
    getAllSchedules(obj);
  };

  getLessons = async () => {
    var response = await clientApi.callGetApi("getLessonType");
    if (response.status == "true") {
      lessons = response.data;
      //alert(lessons[0].name);
      console.log("lessons == ", lessons);
      this.setState({ title: lessons[0].name });
    }
  };

  bookings = () => {
    alert("Functionality will be implemented later");
  };

  getActivetab = e => {
    //console.log("get classes = ",e, lessons);
    const { schedules } = this.props;
    var heading = e.ref.props.heading;
    //this.state.activeTabIndex
    var activeTabIndex = lessons.findIndex(function(result) {
      return result.name === heading;
    });
    this.setState({ activeTabIndex: activeTabIndex });
    var selectedLessonType = lessons.filter(function(result) {
      return result.name === heading;
    });
    var filteredClasses = schedules.filter(function(result) {
      return result.lessonType === selectedLessonType[0].lessonNumber;
    });
    //console.log("filtered classes = ",filteredClasses, selectedLessonType);
    this.setState({ title: heading, classes: filteredClasses });
  };

  addEditSchedule = () => {
    this.props.addClassData(null);
    //Actions.AddEditSchedule({ type: "replace" });
  };

  _renderTabBar = () => {
    return (
      <View style={{ height: "10%" }}>
        <Tabs
          onChangeTab={e => this.getActivetab(e)}
          tabBarUnderlineStyle={{ borderBottomWidth: 0, height: 0 }}
        >
          {lessons.map(x => {
            return (
              <Tab
                heading={x.name}
                tabStyle={[Styles.tab]}
                activeTabStyle={[Styles.activeTab]}
                textStyle={[Styles.tabText]}
                activeTextStyle={[Styles.activeTabText]}
                key={x.name}
              />
            );
          })}
        </Tabs>
      </View>
    );
  };

  edit = item => {
    this.props.addClassData(item);
    //Actions.AddEditSchedule({ type: "replace" });
    //console.log("edit content -- ",item);
    //Actions.AddEditSchedule({ type: "replace", content: "content data" });
  };

  delete = item => {
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
              user_id: item.userId,
              class_id: item._id
            };

            console.log("delete service data == ", obj);
            var response = await clientApi.callApi(
              "deleteClass",
              obj,
              userData.api_token != null ? userData.api_token : userData.token,
              2
            );
            if (response.status == "true") {
              this.getSchedules();
              alert(response.message);
            }
            //this.setState({ modifiedModelVisible: false });
          }
        }
      ],
      { cancelable: true, text: "Can" }
    );
  };

  render() {
    const { SpinnerVisible } = this.props;
    const { title, classes } = this.state;
    return (
      <Container>
        <Header title={KeyWords.scheduleTitle} />
        {this._renderTabBar()}
        <Content contentContainerStyle={Styles.flexGrow}>
          <SpinnerLoad spinnerVisible={SpinnerVisible} />
          <View>
            <View style={[GlobalStyle.row, Styles.headerView]}>
              <View style={Styles.headerTitleView}>
                <Text style={Styles.title}>{title}</Text>
              </View>
              <View>
                <TouchableHighlight
                  style={Styles.imageBck}
                  onPress={() => {
                    this.addEditSchedule();
                    //this.setState({ selectedData: [] });
                  }}
                >
                  <Image source={Images.addImg} style={Styles.addIcon} />
                </TouchableHighlight>
              </View>
            </View>
            <MenuProvider style={{ flex: 1, paddingTop: 20 }}>
              <View>
                {classes.length > 0 ? (
                  <FlatList
                    contentContainerStyle={Styles.margin15}
                    horizontal={false}
                    numColumns={1}
                    data={classes}
                    renderItem={({ item }) => {
                      console.log(item);
                      return (
                        <CardComponentClass
                          data={item}
                          editSelected={() => this.edit(item)}
                          deleteSelected={() => this.delete(item)}
                        />
                      );
                    }}
                    listKey="classes"
                  />
                ) : (
                  <Text style={Styles.margin15}>{KeyWords.noClassesAdded}</Text>
                )}
              </View>
            </MenuProvider>
          </View>
        </Content>
      </Container>
    );
  }
}

SchedulesComponent.propTypes = {
  schedules: PropTypes.arrayOf(PropTypes.any).isRequired,
  SpinnerVisible: PropTypes.bool,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  getAllSchedules: PropTypes.func.isRequired
};

const maptoprops = state => {
  console.log("schedules data = ", state.Schedule.schedules);
  return {
    userData: state.User.userdata,
    schedules: state.Schedule.schedules
  };
};

export default connect(
  maptoprops,
  { getAllSchedules, addClassData }
)(SchedulesComponent);

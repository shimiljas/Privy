/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  SearchInstructor,
  searchedInsturctorWihCategory
} from "../../../actions";

import Styles from "./Styles";
import GlobalStyle from "../../../common/GlobalStyle";
import Images from "../../../common/images";
import clientApi from "../../../common/ApiManager";
import {
  SpinnerLoad,
  ButtonComponent,
  CheckBoxComponent,
  PickerComponent,
  DatePickerComponent
} from "../../../components";
import Header from "../../../components/header/header";
import KeyWords from "../../../common/Localization";
import _ from "lodash";

var lessons = [];
var categories = [];
class SearchComponent extends React.Component {
  static defaultProps = {
    SpinnerVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subcategories: [],

      subCategory: { name: "Select Category", _id: 0 },
      subcategories_level2: [],
      subcategories_level3: [],
      subcategory_level2: { name: "Select Category", _id: 0 },
      subCategory_level3: { name: "Select Category", _id: 0 },
      selectedSubCategories: "",
      category: "",
      day: [],
      lessons: [],
      selectedLessons: "",
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thusday: true,
      friday: true,
      saturday: true,
      startDate: "Start Date",
      startTime: "Start Time",
      endTime: "End Time",
      advanceSearch: false,
      showStartDatePicker: false,
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false
    };
    this.getCategories();
    this.getLessons();
  }

  getCategories = async () => {
    var response = await clientApi.callPostApi("get_all_category.php", {});
    console.log("=== ==== catwgories == ", response);
    if (response.success == 1) {
      let categories = response.data.cats.filter(x => x.pid == null);
      console.log(categories, "categories");
      this.setState({
        categories: categories,
        lessons: response.data.lessons,
        allcategory: response.data.cats
      });
    } else {
      console.log("categories else res == ", response);
    }
  };

  getLessons = async () => {
    var response = await clientApi.callGetApi("getLessonType");
    if (response.status == "true") {
      lessons = response.data;
      console.log("lessons == ", lessons);
      this.setState({ lessons: lessons });
    }
  };

  getSelectedData = (name, value) => {
    if (name == "category" && value) {
      let subcategories = this.state.allcategory.filter(x => x.pid == value.id);

      this.setState({ subcategories: subcategories, category: value,subCategory:{}, subCategory_level3:{},
        subcategory_level2:{} });
      return;
    }

    if (name == "subCategory" && value) {
      console.log(this.state.allcategory, "this.state.allcategory", value);
      let subcategories_level2 = this.state.allcategory.filter(
        x => x.pid == value.id
      );

      this.setState({
        subcategories_level2: subcategories_level2,
        subCategory: value,
        subCategory_level3:{},
        subcategory_level2:{}
      });
      return;
    }

    if (name == "subcategory_level2" && value) {
      let subcategories_level3 = this.state.allcategory.filter(
        x => x.pid == value.id
      );
      this.setState({
        subcategories_level3: subcategories_level3,
        subcategory_level2: value,
        subCategory_level3:{},
    
      });
      return;
    }

    if (name == "subCategory_level3") {
      this.setState({
        subCategory_level3: value
      });
      return;
    }
  };
  submit = async () => {
    const {
      category,
      selectedSubCategories,
      selectedLessons,
      startDate,
      startTime,
      endTime,
      sunday,
      monday,
      tuesday,
      wednesday,
      thusday,
      friday,
      saturday,
      day
    } = this.state;
    const { SearchInstructor, userData } = this.props;
    console.log("Please select Category", category);
    if (category == "") {
      alert("Please select Category");
    } else {
      //  await this.dayRange();

      if (sunday == true) {
        console.log("array");
        this.setState({
          day: [...day, 0]
        });
      }
      if (monday == true) {
        this.setState({
          day: [...day, 1]
        });
      }
      if (tuesday == true) {
        this.setState({
          day: [2]
        });
      }
      if (wednesday == true) {
        this.setState({
          day: [...day, 3]
        });
      }
      if (thusday == true) {
        this.setState({
          day: [...day, 4]
        });
      }
      if (friday == true) {
        this.setState({
          day: [...day, 5]
        });
      }
      if (saturday == true) {
        this.setState({
          day: [...day, 6]
        });
      }
      await SearchInstructor({
        user_id: userData._id,
        api_token:
          userData.api_token != null ? userData.api_token : userData.token,
        categoryId: category._id,
        subCategoryId: selectedSubCategories._id,
        lessonType: selectedLessons.lessonNumber,
        startDate: startDate,
        fromTime: startTime,
        toTime: endTime,
        daysRange: day,
        lat: "22.7545",
        long: "75.2454"
      });
    }
  };

  getSelectedValue = (value, key) => {
    switch (key) {
      case "categories":
        this.setState({
          category: value,
          subCategories: value.subcategory
        });
        break;
      case "Subcategories":
        this.setState({ selectedSubCategories: value });
        break;
      case "Lessons":
        this.setState({ selectedLessons: value });
        break;
      default:
        console.log("getSelectedValue key not match");
        break;
    }
    console.log("selected value==", value);
  };

  submitSearch = async () => {
    const userID = await AsyncStorage.getItem("userId");
    const apiToken = await AsyncStorage.getItem("apiToken");
    const {
      category,
      subCategory,
      subcategory_level2,
      subCategory_level3
    } = this.state;

    console.log(category, subCategory, subcategory_level2, subCategory_level3);
    var error = true;
    if (
      (category != null && category._id == 0) ||
      (category == null || category == undefined || category == "")
    ) {
      error = false;
      alert("Please select category");
    } else if (
      (subCategory != null && subCategory._id == 0) ||
      (subCategory == null || subCategory == undefined || subCategory == "")
    ) {
      error = false;
      alert("Please select sub category");
    }
    console.log(subcategory_level2, subCategory, subCategory_level3);
    let cid = "";
    if (
      (subCategory.name !== "Select Category" &&
        subcategory_level2.name === " subcategory_level2.name",
      subCategory_level3.name === "Select Category")
    ) {
      cid = `${subCategory.id}`;
    }
    if (
      subCategory.name !== "Select Category" &&
      subcategory_level2.name !== "Select Category" &&
      subCategory_level3.name === "Select Category"
    ) {
      cid = `${subCategory.id},${subcategory_level2.id}`;
    }

    if (
      subCategory.name !== "Select Category" &&
      subcategory_level2.name !== "Select Category" &&
      subCategory_level3.name !== "Select Category"
    ) {
      cid = `${subCategory.id},${subcategory_level2.id},${
        subCategory_level3.id
      }`;
    }

    let body = {
      user_id: userID,
      pid: category.id,
      cid: cid,
      token: apiToken
    };
    console.log(body, "DFsdffsd-------<><>");
    this.props.searchedInsturctorWihCategory(body);
  };

  _showDateTimePicker = name => {
    switch (name) {
      case "startDate":
        this.setState({ showStartDatePicker: true });
        break;
      case "startTime":
        this.setState({ isStartTimePickerVisible: true });
        break;
      case "endTime":
        this.setState({ isEndTimePickerVisible: true });
        break;
    }
  };

  cancleDatePicker = () => {};

  dayRange = () => {
    const {
      sunday,
      monday,
      tuesday,
      wednesday,
      thusday,
      friday,
      saturday,
      day
    } = this.state;
    if (sunday == true) {
      this.setState({
        day: [...day, 0]
      });
    }
    if (monday == true) {
      this.setState({
        day: [...day, 1]
      });
    }
    if (tuesday == true) {
      this.setState({
        day: [...day, 2]
      });
    }
    if (wednesday == true) {
      this.setState({
        day: [...day, 3]
      });
    }
    if (thusday == true) {
      this.setState({
        day: [...day, 4]
      });
    }
    if (friday == true) {
      this.setState({
        day: [...day, 5]
      });
    }
    if (saturday == true) {
      this.setState({
        day: [...day, 6]
      });
    }
  };

  _handleDatePicked = (name, date) => {
    console.log("date pick", date);
    var d = new Date(date);
    switch (name) {
      case "startDate":
        console.log("date pick", date);
        this.setState({
          startDate: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(),
          showStartDatePicker: false,
          minimumDate: new Date(date)
        });
        break;
      case "startTime":
        this.setState({
          startTime: d.getHours() + ":" + d.getMinutes(),
          isStartTimePickerVisible: false
        });
        break;
      case "endTime":
        this.setState({
          endTime: d.getHours() + ":" + d.getMinutes(),
          isEndTimePickerVisible: false
        });
        break;
    }
  };
  _showDateTimePicker = name => {
    switch (name) {
      case "startDate":
        this.setState({ showStartDatePicker: true });
        break;
      case "startTime":
        this.setState({ isStartTimePickerVisible: true });
        break;
      case "endTime":
        this.setState({ isEndTimePickerVisible: true });
        break;
    }
  };

  _hideDateTimePicker = name => {
    switch (name) {
      case "startDate":
        this.setState({ showStartDatePicker: false });
        break;
      case "startTime":
        this.setState({ isStartTimePickerVisible: false });
        break;
      case "endTime":
        this.setState({ isEndTimePickerVisible: false });
        break;
    }
  };
  renderAdvanceSearch = () => {
    const {
      advanceSearch,
      lessons,
      startDate,
      sunday,
      monday,
      tuesday,
      wednesday,
      thusday,
      friday,
      saturday,
      startTime,
      endTime,
      showStartDatePicker,
      isStartTimePickerVisible,
      isEndTimePickerVisible
    } = this.state;
    if (advanceSearch == false) {
      return <View />;
    } else
      return (
        <View>
          <PickerComponent
            title={KeyWords.lessons}
            icon={Images.subCategoryImg}
            iconStyle={Styles.subcategory}
            placeholder={KeyWords.lessons}
            data={lessons}
            callFunction={value => this.getSelectedValue(value, "Lessons")}
            fieldWidth={GlobalStyle.width100p}
            height={90}
            enabled
            key="lessons"
            selectedValue={lessons}
          />
          <View style={[GlobalStyle.divider, Styles.dividerStyle]} />

          <DatePickerComponent
            title={KeyWords.startDate}
            icon={Images.premiumImg}
            iconStyle={Styles.premium}
            placeholder={KeyWords.startDate}
            data={startDate}
            fieldWidth={Styles.width100p}
            height={90}
            enabled
            minimumDate={new Date()}
            key="startDate"
            mode="date"
            showDateTimePicker={() => this._showDateTimePicker("startDate")}
            value={startDate}
            isDateTimePickerVisible={showStartDatePicker}
            onConfirm={value => this._handleDatePicked("startDate", value)}
            onCancel={() => this._hideDateTimePicker("startDate")}
          />

          <View style={[GlobalStyle.divider, Styles.dividerStyle]} />
          <Text style={[Styles.label, Styles.marginBottom3]}>
            {KeyWords.selectDaysRange}
          </Text>
          <View style={[GlobalStyle.row, Styles.marginBottom3]}>
            <View
              style={[GlobalStyle.width10p, GlobalStyle.justifyContentCenter]}
            >
              <Image
                source={Images.calenderImg}
                style={[Styles.icon, Styles.calender]}
              />
            </View>
            <View style={[GlobalStyle.row, GlobalStyle.width90p]}>
              <View style={Styles.radioView}>
                <CheckBoxComponent
                  title="Sunday"
                  value={sunday}
                  setValues={() => this.setState({ sunday: !sunday })}
                />
              </View>
              <View style={Styles.radioView}>
                <CheckBoxComponent
                  title="Monday"
                  value={monday}
                  setValues={() => this.setState({ monday: !monday })}
                />
              </View>
            </View>
          </View>
          <View style={[GlobalStyle.row, Styles.marginBottom3]}>
            <View style={[GlobalStyle.viewCenter, GlobalStyle.width10p]} />
            <View style={[GlobalStyle.row, GlobalStyle.width90p]}>
              <View style={Styles.radioView}>
                <CheckBoxComponent
                  title="Tuesday"
                  value={tuesday}
                  setValues={() => this.setState({ tuesday: !tuesday })}
                />
              </View>
              <View style={Styles.radioView}>
                <CheckBoxComponent
                  title="Wednesday"
                  value={wednesday}
                  setValues={() => this.setState({ wednesday: !wednesday })}
                />
              </View>
            </View>
          </View>
          <View style={[GlobalStyle.row, Styles.marginBottom3]}>
            <View style={[GlobalStyle.viewCenter, GlobalStyle.width10p]} />
            <View style={[GlobalStyle.row, GlobalStyle.width90p]}>
              <View style={Styles.radioView}>
                <CheckBoxComponent
                  title="Thusday"
                  value={thusday}
                  setValues={() => this.setState({ thusday: !thusday })}
                />
              </View>

              <View style={Styles.radioView}>
                <CheckBoxComponent
                  title="Friday"
                  value={friday}
                  setValues={() => this.setState({ friday: !friday })}
                />
              </View>
            </View>
          </View>
          <View style={[GlobalStyle.row, Styles.marginBottom3]}>
            <View style={[GlobalStyle.viewCenter, GlobalStyle.width10p]} />
            <View style={[GlobalStyle.row, GlobalStyle.width90p]}>
              <View style={Styles.radioView}>
                <CheckBoxComponent
                  title="Saturday"
                  value={saturday}
                  setValues={() => this.setState({ saturday: !saturday })}
                />
              </View>
            </View>
          </View>

          <Text style={Styles.label}>{KeyWords.selectTimeRange}</Text>
          <View style={GlobalStyle.row}>
            <DatePickerComponent
              //title={KeyWords.startTime}
              icon={Images.clockImg}
              iconStyle={[Styles.iconStyle, { marginTop: 3 }]}
              placeholder={KeyWords.startTime}
              data={startTime}
              fieldWidth={{ width: "40%" }}
              height={90}
              enabled
              key="startTime"
              mode="time"
              showDateTimePicker={() => this._showDateTimePicker("startTime")}
              value={startTime}
              isDateTimePickerVisible={isStartTimePickerVisible}
              onConfirm={value => this._handleDatePicked("startTime", value)}
              onCancel={() => this._hideDateTimePicker("startTime")}
            />
            <Text style={Styles.toText}>{KeyWords.toText}</Text>
            <DatePickerComponent
              //title={KeyWords.endTime}
              placeholder={KeyWords.endTime}
              data={endTime}
              fieldWidth={{ width: "40%" }}
              height={90}
              enabled
              // minimumDate={""}
              key="endTime"
              mode="time"
              showDateTimePicker={() => this._showDateTimePicker("endTime")}
              value={endTime}
              isDateTimePickerVisible={isEndTimePickerVisible}
              onConfirm={value => this._handleDatePicked("endTime", value)}
              onCancel={() => this._hideDateTimePicker("endTime")}
            />
          </View>
        </View>
      );
  };

  render() {
    const { SpinnerVisible } = this.props;
    const {
      categories,
      category,

      advanceSearch,
      subcategories,
      subCategory,
      subcategories_level2,
      subcategory_level2,
      subcategories_level3,
      subCategory_level3
    } = this.state;
    return (
      <Container>
        <Header title={KeyWords.search} />
        <Content padder>
          <SpinnerLoad spinnerVisible={SpinnerVisible} />
          <View style={[GlobalStyle.leftRightPadding]}>
            <View>
              <PickerComponent
                title={KeyWords.category}
                icon={Images.subCategoryImg}
                iconStyle={Styles.icon}
                placeholder={KeyWords.category}
                data={categories}
                callFunction={value => this.getSelectedData("category", value)}
                fieldWidth={Styles.width100p}
                height={90}
                enabled
                key="category"
                selectedValue={category}
                initValue={category.name}
              />
              <View style={[GlobalStyle.divider, Styles.dividerStyle]} />

              <PickerComponent
                title={KeyWords.subCategory}
                icon={Images.catalogImg}
                iconStyle={Styles.icon1}
                placeholder={KeyWords.subCategory}
                data={subcategories}
                selectedValue={subCategory}
                fieldWidth={Styles.width100p}
                height={90}
                enabled
                callFunction={value =>
                  this.getSelectedData("subCategory", value)
                }
                key="sub-categories"
                initValue={subCategory.name}
              />
              <View style={[GlobalStyle.divider, Styles.dividerStyle]} />
              {subcategories_level2.length > 0 ? (
                <View>
                  <PickerComponent
                    title={KeyWords.subCategory}
                    icon={Images.catalogImg}
                    iconStyle={Styles.icon1}
                    placeholder={KeyWords.subCategory}
                    data={subcategories_level2}
                    selectedValue={subcategory_level2}
                    fieldWidth={Styles.width100p}
                    height={90}
                    enabled
                    callFunction={value =>
                      this.getSelectedData("subcategory_level2", value)
                    }
                    key="sub-categories"
                    initValue={subcategory_level2.name}
                  />
                  <View style={[GlobalStyle.divider, Styles.dividerStyle]} />
                </View>
              ) : null}

              {subcategories_level3.length > 0 ? (
                <View>
                  <PickerComponent
                    title={KeyWords.subCategory}
                    icon={Images.catalogImg}
                    iconStyle={Styles.icon1}
                    placeholder={KeyWords.subCategory}
                    data={subcategories_level3}
                    selectedValue={subCategory_level3}
                    fieldWidth={Styles.width100p}
                    height={90}
                    enabled
                    callFunction={value =>
                      this.getSelectedData("subCategory_level3", value)
                    }
                    key="sub-categories"
                    initValue={subCategory_level3.name}
                  />
                  <View style={[GlobalStyle.divider, Styles.dividerStyle]} />
                </View>
              ) : null}

              <TouchableOpacity
                style={Styles.advanceOptionTextView}
                onPress={() =>
                  this.setState({
                    advanceSearch: !advanceSearch
                  })
                }
              >
                <Text style={Styles.advanceOptionTitle}>
                  {KeyWords.advanceOptions}
                </Text>
              </TouchableOpacity>
              {this.renderAdvanceSearch()}
            </View>

            <View style={Styles.height20}>
              <ButtonComponent
                btnText={KeyWords.search}
                btnStyle={Styles.btn}
                callFunction={() => this.submitSearch()}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

SearchComponent.propTypes = {
  SpinnerVisible: PropTypes.bool
};

const maptoprops = state => {
  console.log("class data === ", state.User.userdata);
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata
  };
};

export default connect(
  maptoprops,
  { SearchInstructor, searchedInsturctorWihCategory }
)(SearchComponent);

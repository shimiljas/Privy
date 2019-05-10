/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/sort-comp */
import React from "react";
import { View, Text, Image, AsyncStorage } from "react-native";
import { Container, Content } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Styles from "./Styles";
import GlobalStyle from "../../../common/GlobalStyle";
import Images from "../../../common/images";
import clientApi from "../../../common/ApiManager";
import {
  SpinnerLoad,
  ButtonComponent,
  InputComponent,
  CheckBoxComponent,
  PickerComponent,
  DatePickerComponent
} from "../../../components";
import Header from "../../../components/header/header";
import KeyWords from "../../../common/Localization";
import { addSchedule, getAllSchedules } from "../../../actions";

var services = [],
  categories = [],
  lessons = [],
  days = [
    {
      _id: 1,
      name: "Sunday"
    },
    {
      _id: 2,
      name: "Monday"
    },
    {
      _id: 3,
      name: "Tuesday"
    },
    {
      _id: 4,
      name: "Wednesday"
    },
    {
      _id: 5,
      name: "Thusday"
    },
    {
      _id: 6,
      name: "Friday"
    },
    {
      _id: 7,
      name: "Saturday"
    }
  ];
const hours = [
  {
    _id: 1,
    name: 1
  },
  {
    _id: 2,
    name: 2
  },
  {
    _id: 3,
    name: 3
  },
  {
    _id: 4,
    name: 4
  },
  {
    _id: 5,
    name: 5
  }
];
class EditScheduleScreen extends React.Component {
  static defaultProps = {
    SpinnerVisible: false
  };
  constructor(props) {
    super(props);

    this.state = {
      lessons: [],
      categories: [],
      minimumDate: "",
      subcategories: [],
      allcategory: [],
      category: { name: "Select Category", id: 0 },
      subcategories_level2: [],
      subcategories_level3: [],
      subCategory: { name: "Select Category", _id: 0 },
      subcategory_level2: { name: "Select Category", _id: 0 },
      subCategory_level3: { name: "Select Category", _id: 0 },
      title: this.props.data.title,
      description: this.props.data.des,
      startDate: this.props.data.sd,
      endDate: this.props.data.ed,
      startTime: this.props.data.st,
      showStartDatePicker: false,
      showEndDatePicker: false,
      showStartTimePicker: false,
      sizeLimit: this.props.data.size,
      price: this.props.data.fee,
      selectedDuration: "Select Duration",

      unLimit: this.props.data.size > 0 ? false : true
    };
    this.getLessons();
    this.getCategory();
  }

  componentWillMount() {}

  getCategory = async () => {
    categories = [];
    var response = await clientApi.callPostApi("get_all_category.php", {});
    console.log(response, "response");
    if (response.success == 1) {
      let categories = response.data.cats.filter(x => x.pid == null);
      console.log(categories, "categories");
      this.setState(
        {
          categories: categories,
          lessons: response.data.lessons,
          allcategory: response.data.cats
        },
        () => {
          let category = this.state.allcategory.find(
            x => x.id === this.props.data.cpid
          );
          let cat = this.props.data.csid.split(",");

          let subCategory = this.state.allcategory.find(x => x.id == cat[0]);
          let subcategory_level2 = this.state.allcategory.find(
            x => x.id == cat[1]
          );
          let subCategory_level3 = this.state.allcategory.find(
            x => x.id == cat[2]
          );

          let lesson = this.state.lessons.find(
            x => x.id == this.props.data.lid
          );

          let duration = hours.find(x => x._id == this.props.data.dhours);

          console.log(
            subcategory_level2,
            subCategory_level3,
            "herer",
            duration
          );
          this.setState({
            category,
            subCategory,
            subcategory_level2,
            subCategory_level3,
            lesson,
            duration
          });
        }
      );
    }
  };
  getLessons = async () => {
    var response = await clientApi.callGetApi("getLessonType");
    if (response.status == "true") {
      lessons = response.data;
      console.log("all lessons == ", lessons);

      this.setState({ lessons });

      //console.log("lessons == ", lessons);
    }
  };

  getSelectedData = (name, value) => {
    if (name == "category" && value) {
      let subcategories = this.state.allcategory.filter(x => x.pid == value.id);

      this.setState({ subcategories: subcategories, category: value });
      return;
    }
    if (name == "subCategory" && value) {
      console.log(this.state.allcategory, "this.state.allcategory", value);
      let subcategories_level2 = this.state.allcategory.filter(
        x => x.pid == value.id
      );

      this.setState({
        subcategories_level2: subcategories_level2,
        subCategory: value
      });
      return;
    }

    if (name == "subcategory_level2" && value) {
      let subcategories_level3 = this.state.allcategory.filter(
        x => x.pid == value.id
      );
      this.setState({
        subcategories_level3: subcategories_level3,
        subcategory_level2: value
      });
      return;
    }

    if (name == "subCategory_level3") {
      this.setState({
        subCategory_level3: value
      });
      return;
    }

    if (name == "lesson") {
      this.setState({ lesson: value });
      return;
    }

    if (name == "duration") {
      console.log("duration === ", value);
      this.setState({ duration: value });
      return;
    }
    if (name == "duration") {
      this.setState({ day: value });
      return;
    }
  };

  _showDateTimePicker = name => {
    switch (name) {
      case "startDate":
        this.setState({ showStartDatePicker: true });
        break;
      case "endDate":
        this.setState({ showEndDatePicker: true });
        break;
      case "startTime":
        this.setState({ showStartTimePicker: true });
        break;
    }
  };

  _handleDatePicked = (name, date) => {
    // console.log("sadfsa",date);
    // this.setState({minimumDate:date})
    console.log("minimumDate", this.state.minimumDate);

    var d = new Date(date);
    switch (name) {
      case "startDate":
        this.setState({
          startDate:
            d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
          showStartDatePicker: false,
          minimumDate: new Date(date)
        });

        break;
      case "endDate":
        this.setState({
          endDate:
            d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
          showEndDatePicker: false
        });
        break;
      case "startTime":
        this.setState({
          startTime: d.getHours() + ":" + d.getMinutes(),
          showStartTimePicker: false
        });
        break;
    }
  };

  submitdata = async () => {
    const userID = await AsyncStorage.getItem("userId");
    const apiToken = await AsyncStorage.getItem("apiToken");

    const { userData, addSchedule, schedule } = this.props;
    const {
      title,
      description,
      category,
      subCategory,
      lesson,
      startDate,
      endDate,
      startTime,
      duration,
      price,
      sizeLimit,
      day,
      unLimit,

      subcategory_level2,
      subCategory_level3
    } = this.state;

    console.log(userData);

    var error = true;
    if (title == "") {
      error = false;
      alert("Please enter title");
    } else if (description == "") {
      error = false;
      alert("Please enter description");
    } else if (
      (category != null && category._id == 0) ||
      (category == null || category == undefined || category == "")
    ) {
      error = false;
      alert("Please select category");
    } else if (
      (subcategory_level2 != null && subcategory_level2._id == 0) ||
      (subcategory_level2 == null ||
        subcategory_level2 == undefined ||
        subcategory_level2 == "")
    ) {
      error = false;
      alert("Please select sub category");
    } else if (
      (subCategory_level3 != null && subCategory_level3._id == 0) ||
      (subCategory_level3 == null ||
        subCategory_level3 == undefined ||
        subCategory_level3 == "")
    ) {
      error = false;
      alert("Please select sub category");
    } else if (
      (lesson != null && lesson.id == 0) ||
      (lesson == null || lesson == undefined || lesson == "")
    ) {
      error = false;
      alert("Please select lesson type");
    } else if (startDate == "Start Date") {
      error = false;
      alert("Please select start date");
    } else if (endDate == "End Date") {
      error = false;
      alert("Please select end date");
    } else if (
      startDate != "Start Date" &&
      endDate != "End Date" &&
      this.calcDateDiff(startDate, endDate) < 1
    ) {
      error = false;
      alert("End date should not be greater than start date");
    } else if (startTime == "Start Time") {
      error = false;
      alert("Please select start time");
    } else if (duration == "" || duration == undefined) {
      error = false;
      alert("Please select class duration");
    } else if (sizeLimit == "") {
      error = false;
      alert("Please select sizeLimit");
    } else if ((unLimit == false || unLimit == undefined) && sizeLimit == 0) {
      //if(sizeLimit==0){
      error = false;
      alert("Please enter class size or unlimited option");
      //}
    } else if (price == "" || price == null || price == undefined) {
      error = false;
      alert("Please enter price");
    }

    let cid = "";
    if (
      (subCategory.name !== "Select Category" &&
        subcategory_level2.name === "Select Category",
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

    const body = {
      rid: this.props.data.rid,
      user_id: userID,
      title: title,
      des: description,
      lid: lesson.id,
      pid: category.id,
      cid: cid,
      sd: startDate,
      ed: endDate,
      st: startTime,
      token: apiToken,
      dhours: duration._id,
      size: sizeLimit,
      isu: unLimit ? "1" : "0",
      fee: price
    };
    console.log(body);

    var methodName = "create_class_ins.php";

    var data = {
      methodName: methodName,
      data: body,
      token: "",
      update: true
    };

    addSchedule(data);
  };
  calcDateDiff = (startDate, endDate) => {
    var date1 = new Date(startDate);
    var date2 = new Date(endDate);
    var timeDiff = date2.getTime() - date1.getTime();
    console.log("date compaire", Math.ceil(timeDiff / (1000 * 3600 * 24)));
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  render() {
    const { userData, addSchedule, schedule } = this.props;
    const {
      title,
      description,
      category,
      subCategory,
      subcategories,
      lesson,
      lessons,
      startDate,
      endDate,
      startTime,
      duration,
      price,
      sizeLimit,
      day,
      streetAddress,
      city,
      state,
      country,
      zipcode,
      unLimit,
      showStartTimePicker,
      subcategories_level3,
      subcategories_level2,
      subcategory_level2,
      subCategory_level3,
      showStartDatePicker,
      selectedDuration,
      showEndDatePicker
    } = this.state;
    var error = true;
    console.log(this.props.data, "EditScheduleScreenEditScheduleScreen");
    return (
      <Container>
        <Header title={KeyWords.edit + " " + KeyWords.class} />
        <Content padder>
          <SpinnerLoad spinnerVisible={false} />
          <View style={GlobalStyle.leftRightPadding}>
            <InputComponent
              title={KeyWords.title}
              icon={Images.sideMenuIcons.book}
              iconStyle={Styles.icon}
              placeholder={KeyWords.title}
              multiline={false}
              value={title}
              setValues={text => this.setState({ title: text })}
              fieldWidth={Styles.width100p}
              height={90}
              maxLength={200}
            />
            <InputComponent
              title={KeyWords.description}
              icon={Images.sideMenuIcons.book}
              iconStyle={Styles.icon}
              placeholder={KeyWords.description}
              multiline
              value={description}
              setValues={text => this.setState({ description: text })}
              fieldWidth={Styles.width100p}
              height={90}
              maxLength={200}
            />
            {this.state.category ? (
              <PickerComponent
                title={KeyWords.category}
                icon={Images.subCategoryImg}
                iconStyle={Styles.icon}
                placeholder={KeyWords.category}
                data={this.state.categories}
                callFunction={value => this.getSelectedData("category", value)}
                fieldWidth={Styles.width100p}
                height={90}
                enabled
                key="category"
                selectedValue={category}
                initValue={category.name}
              />
            ) : null}

            <View style={[GlobalStyle.divider, Styles.dividerStyle]} />
            {subCategory ? (
              <PickerComponent
                title={KeyWords.subCategory}
                icon={Images.catalogImg}
                iconStyle={Styles.icon1}
                placeholder={KeyWords.subCategory}
                data={this.state.subcategories}
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
            ) : null}
            <View style={[GlobalStyle.divider, Styles.dividerStyle]} />

            {subcategory_level2 ? (
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

            {subCategory_level3 ? (
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
            {lesson ? (
              <PickerComponent
                title={KeyWords.lessonType}
                icon={Images.categoryImage}
                iconStyle={Styles.icon1}
                placeholder={KeyWords.lessonType}
                data={lessons}
                selectedValue={lesson}
                fieldWidth={Styles.width100p}
                height={90}
                enabled
                callFunction={value => this.getSelectedData("lesson", value)}
                key="lessons"
                initValue={lesson.name}
              />
            ) : null}
            <View style={[GlobalStyle.divider, Styles.dividerStyle]} />
            <DatePickerComponent
              title={KeyWords.startDate}
              icon={Images.calenderImg}
              iconStyle={Styles.icon}
              placeholder={KeyWords.startDate}
              data={startDate}
              //setValues={text => this.setState({ description: text })}
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
            <DatePickerComponent
              title={KeyWords.endDate}
              icon={Images.calenderImg}
              iconStyle={Styles.icon}
              placeholder={KeyWords.endDate}
              data={endDate}
              fieldWidth={Styles.width100p}
              height={90}
              enabled
              minimumDate={new Date()}
              key="endDate"
              mode="date"
              showDateTimePicker={() => this._showDateTimePicker("endDate")}
              value={endDate}
              isDateTimePickerVisible={showEndDatePicker}
              onConfirm={value => this._handleDatePicked("endDate", value)}
              onCancel={() => this._hideDateTimePicker("endDate")}
            />
            <View style={[GlobalStyle.divider, Styles.dividerStyle]} />
            <DatePickerComponent
              title={KeyWords.startTime}
              icon={Images.clockImg}
              iconStyle={Styles.sameIcon}
              placeholder={KeyWords.startTime}
              data={startTime}
              fieldWidth={Styles.width100p}
              height={90}
              enabled
              key="startTime"
              mode="time"
              showDateTimePicker={() => this._showDateTimePicker("startTime")}
              value={startTime}
              isDateTimePickerVisible={showStartTimePicker}
              onConfirm={value => this._handleDatePicked("startTime", value)}
              onCancel={() => this._hideDateTimePicker("startTime")}
            />
            <View style={[GlobalStyle.divider, Styles.dividerStyle]} />

            {duration ? (
              <PickerComponent
                title={KeyWords.duration}
                icon={Images.clockImg}
                iconStyle={Styles.sameIcon}
                placeholder={KeyWords.duration}
                data={hours}
                fieldWidth={Styles.width100p}
                height={90}
                enabled
                callFunction={value => this.getSelectedData("duration", value)}
                key="duration"
                initValue={duration.name}
              />
            ) : null}
            <View style={[GlobalStyle.divider, Styles.dividerStyle]} />
            <InputComponent
              title={KeyWords.sizeLimit}
              icon={Images.sizelimitImg}
              iconStyle={Styles.sameIcon}
              placeholder={KeyWords.sizeLimit}
              multiline={false}
              value={sizeLimit}
              setValues={text => this.setState({ sizeLimit: text })}
              fieldWidth={Styles.width100p}
              height={90}
              maxLength={200}
              keyboardType="numeric"
            />

            <View style={GlobalStyle.row}>
              <View style={Styles.width10p} />
              <View style={Styles.width90p}>
                <Text style={Styles.orText}>{KeyWords.or}</Text>
              </View>
            </View>

            <View style={[GlobalStyle.row, Styles.marginBottom1p]}>
              <View style={Styles.width10p} />
              <View
                style={[
                  Styles.width90p,
                  {
                    height: 25,
                    marginTop: 5
                  }
                ]}
              >
                <Text style={[Styles.lable]}>{KeyWords.unlimited}</Text>
              </View>
            </View>

            <View style={GlobalStyle.row}>
              <View style={Styles.width10p}>
                <Image source={Images.queueImg} style={Styles.sameIcon} />
              </View>
              <View style={[GlobalStyle.row, Styles.width90p]}>
                <CheckBoxComponent
                  title={KeyWords.yes}
                  value={unLimit}
                  setValues={() => this.setState({ unLimit: true })}
                />

                <CheckBoxComponent
                  title={KeyWords.no}
                  value={!unLimit}
                  setValues={() => this.setState({ unLimit: false })}
                />
              </View>
            </View>
            <InputComponent
              title={KeyWords.price}
              icon={Images.sideMenuIcons.dollar}
              iconStyle={Styles.icon}
              placeholder={KeyWords.price}
              multiline={false}
              value={price}
              setValues={text => this.setState({ price: text })}
              fieldWidth={Styles.width100p}
              height={90}
              maxLength={200}
              keyboardType="numeric"
            />

            <ButtonComponent
              btnText={KeyWords.submit}
              btnStyle={Styles.btn}
              callFunction={() => this.submitdata()}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const maptoprops = state => {
  //alert(state.Schedule.schedule.title);
  console.log("edit class state == ", state.User.userdata);
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata,
    schedule: state.Schedule.schedule,
    apiResponse: state.Schedule.response
  };
};

export default connect(
  maptoprops,
  { addSchedule, getAllSchedules }
)(EditScheduleScreen);

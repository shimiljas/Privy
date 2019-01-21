import React from "react";
import { View, Text, Image } from "react-native";
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

class AddEditScheduleComponent extends React.Component {
  static defaultProps = {
    SpinnerVisible: false
  };
  constructor(props) {
    super(props);
    const { userData, schedule } = props;
    console.log("ss -- ", schedule);
    if (schedule != null) {
      var startDate = "Start Date";
      var endDate = "End Date";
      var dt = schedule.startDate;
      //alert(dt);
      if (dt != null && dt != "") startDate = dt.substring(0, 10);

      dt = schedule.endDate;
      if (dt != null && dt != "") endDate = dt.substring(0, 10);

      this.state = {
        lessons: [],
        categories: [],
        minimumDate: "",
        subcategories: [],
        title: schedule.title,
        description: schedule.description,
        startDate: startDate,
        endDate: endDate,
        startTime: schedule.time,
        showStartDatePicker: false,
        showEndDatePicker: false,
        showStartTimePicker: false,
        sizeLimit: schedule.limit,
        price: schedule.price,
        streetAddress: schedule.streetAddress,
        city: schedule.city,
        state: schedule.state,
        country: schedule.country_permanent,
        zipcode: schedule.zipCode,
        day: schedule.day,
        unLimit: schedule.limit > 0 ? false : true,
        category: schedule.categoryId,
        subCategory: schedule.subCategoryId,
        lesson: schedule.lessonType,
        selectedDuration: schedule.duration,
        duration: schedule.duration
      };
    } else {
      this.state = {
        lessons: [],
        categories: [],
        subcategories: [],
        title: "",
        description: "",
        startDate: "Start Date",
        endDate: "End Date",
        startTime: "Start Time",
        showStartDatePicker: false,
        showEndDatePicker: false,
        showStartTimePicker: false,
        sizeLimit: "",
        price: "",
        streetAddress: userData.streetAddress,
        city: userData.city,
        state: userData.state,
        country: userData.country_permanent,
        zipcode: userData.zipCode,
        day: [],
        category: { name: "Select Category", _id: 0 },
        subCategory: { name: "Select Sub Category", _id: 0 },
        lesson: { name: "Select lesson", _id: 0 },
        selectedDuration: "Select Duration"
      };
    }
    //console.log("editData === ",this.props);
    this.getLessons();
    this.getInstructorCategoriesLesson();
  }

  componentWillReceiveProps(nextProps) {
    console.log("new props===", nextProps);
    if (nextProps.apiResponse != undefined) {
      if (nextProps.apiResponse.success == true) {
        var obj = {
          user_id: nextProps.userData._id,
          api_token:
            nextProps.userData.api_token != null
              ? nextProps.userData.api_token
              : nextProps.userData.token
        };
        nextProps.getAllSchedules(obj);
      }
    }
  }

  getLessons = async () => {
    var response = await clientApi.callGetApi("getLessonType");
    if (response.status == "true") {
      lessons = response.data;
      console.log("all lessons == ", lessons);
      if (!isNaN(this.state.lesson)) {
        var obj = {
          _id: lessons[this.state.lesson - 1]._id,
          name: lessons[this.state.lesson - 1].name
        };
        this.setState({ lesson: obj });
      }
      //console.log("lessons == ", lessons);
    }
  };

  getInstructorCategoriesLesson = async () => {
    const { userData } = this.props;
    var obj = {
      user_id: userData._id
    };
    categories = [];
    var response = await clientApi.callApi(
      "getInstructorCategoriesLesson",
      obj,
      userData.api_token != null ? userData.api_token : userData.token
    );
    if (response.status == "true") {
      services = response.data;
      //console.log("all services == ",services);
      services.forEach(function(service) {
        categories.push(service.categoryId);
      });
      this.setState({ categories: categories });
    }
  };

  getSelectedData = (name, value) => {
    console.log("selected service == ", services);
    var indexes = services
      .map(function(obj, index) {
        console.log();
        if (obj.categoryId == value) {
          return index;
        }
      })
      .filter(isFinite);

    console.log("selected category == ", indexes[0]);
    if (name == "category" && indexes[0] >= 0) {
      var serviceLessons = [];
      if (services[indexes[0]].oneOnOne == true)
        serviceLessons.push(lessons[0]);
      if (services[indexes[0]].camp == true) serviceLessons.push(lessons[1]);
      if (services[indexes[0]].groupLessons == true)
        serviceLessons.push(lessons[2]);
      if (services[indexes[0]].bootCamp == true)
        serviceLessons.push(lessons[3]);

      this.setState({
        category: value,
        subcategories: services[indexes[0]].subCategoryId,
        lessons: serviceLessons
      });
    } else if (name == "sub-category") {
      this.setState({ subCategory: value });
    } else if (name == "lesson") {
      this.setState({ lesson: value });
    } else if (name == "duration") {
      console.log("duration === ", value);
      this.setState({ duration: value });
    } else if (name == "day") {
      console.log("duration === ", value);
      this.setState({ day: value });
    }
  };

  calcDateDiff = (startDate, endDate) => {
    var date1 = new Date(startDate);
    var date2 = new Date(endDate);
    var timeDiff = date2.getTime() - date1.getTime();
    console.log("date compaire", Math.ceil(timeDiff / (1000 * 3600 * 24)));
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  submit = () => {
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
      streetAddress,
      city,
      state,
      country,
      zipcode,
      unLimit
    } = this.state;
    var error = true;

    var obj = {};
    //alert(startDate + " " + endDate);

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
      (subCategory != null && subCategory._id == 0) ||
      (subCategory == null || subCategory == undefined || subCategory == "")
    ) {
      error = false;
      alert("Please select sub-category");
    } else if (
      (lesson != null && lesson._id == 0) ||
      (lesson == null || lesson == undefined || lesson == "")
    ) {
      error = false;
      alert("Please select lesson type");
    } else if (
      (day.length == 0 || day == "") &&
      (startDate == "Start Date" || endDate == "End Date")
    ) {
      if (startDate == "Start Date") {
        error = false;
        alert("Please select start date");
      } else {
        if (endDate == "End Date") {
          error = false;
          alert("Please select end date");
        }
      }
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
    } else if ((unLimit == false || unLimit == undefined) && sizeLimit == 0) {
      //if(sizeLimit==0){
      error = false;
      alert("Please enter class size or unlimited option");
      //}
    } else if (price == "" || price == null || price == undefined) {
      error = false;
      alert("Please enter price");
    } else if (
      streetAddress == "" ||
      streetAddress == null ||
      streetAddress == undefined
    ) {
      error = false;
      alert("Please enter streetAddress");
    } else if (city == "" || city == null || city == undefined) {
      error = false;
      alert("Please enter city");
    } else if (state == "" || state == null || state == undefined) {
      error = false;
      alert("Please enter state");
    } else if (zipcode == "" || zipcode == null || zipcode == undefined) {
      error = false;
      alert("Please enter zip code");
    }



    //alert(parseInt(startTime)+parseInt(duration));

    if (error == true) {
      let splited_time =startTime.split(":");  
      //alert(parseInt(splited_time[0])+parseInt(duration)+':'+splited_time[1]);
      obj = {
        user_id: userData._id,
        categoryId: category._id,
        subCategoryId: subCategory._id,
        lessonType: lesson.lessonNumber,
        time: startTime,
        end_time: (parseInt(splited_time[0])+parseInt(duration)+':'+splited_time[1]),
        price: price,
        streetAddress: streetAddress,
        city: city,
        state: state,
        country: country,
        zipCode: zipcode,
        title: title,
        description: description,
        duration: duration,
        lat: "22.7545",
        long: "75.2454"
      };

      if (unLimit == true) {
        obj.limit = 0;
        obj.unlimited = 1;
      } else {
        obj.limit = sizeLimit;
      }

      console.log("day -- ", day);

      if (day.length == 0 || day == "" || day == undefined) {
        obj.startDate = startDate;
        obj.endDate = endDate;
      } else {
        obj.day = day._id;
      }
      var methodName = "addClass";
      if (schedule != null) {
        methodName = "updateClass";
        obj.class_id = schedule._id;
      }

      var data = {
        methodName: methodName,
        data: obj,
        token: userData.api_token != null ? userData.api_token : userData.token
      };
      console.log("class data - ", data);
      addSchedule(data);
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

  _hideDateTimePicker = name => {
    switch (name) {
      case "startDate":
        this.setState({ showStartDatePicker: false });
        break;
      case "endDate":
        this.setState({ showEndDatePicker: false });
        break;
      case "startTime":
        this.setState({ showStartTimePicker: false });
        break;
    }
  };

  render() {
    var hours = [
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
    const { SpinnerVisible, schedule } = this.props;
    console.log("selected class = ", schedule);
    const {
      title,
      description,
      categories,
      category,
      subcategories,
      lessons,
      lesson,
      subCategory,
      startDate,
      endDate,
      startTime,
      sizeLimit,
      unLimit,
      price,
      showStartDatePicker,
      showEndDatePicker,
      showStartTimePicker,
      streetAddress,
      city,
      minimumDate,
      state,
      zipcode,
      selectedDuration
    } = this.state;
    return (
      <Container>
        <Header title={KeyWords.add + " " + KeyWords.class} />
        <Content padder>
          <SpinnerLoad spinnerVisible={SpinnerVisible} />
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
                this.getSelectedData("sub-category", value)
              }
              key="sub-categories"
              initValue={subCategory.name}
            />
            <View style={[GlobalStyle.divider, Styles.dividerStyle]} />

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
              minimumDate={minimumDate}
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
              initValue={selectedDuration}
            />
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

            <InputComponent
              title={KeyWords.street + " " + KeyWords.address}
              icon={Images.locationImg}
              iconStyle={Styles.icon}
              placeholder={KeyWords.street + " " + KeyWords.address}
              multiline
              value={streetAddress}
              setValues={text => this.setState({ streetAddress: text })}
              fieldWidth={GlobalStyle.width100p}
              height={70}
              maxLength={100}
            />

            <InputComponent
              title={KeyWords.state}
              icon={Images.locationImg}
              iconStyle={Styles.icon}
              placeholder={KeyWords.state}
              multiline={false}
              value={state}
              setValues={text => this.setState({ state: text })}
              fieldWidth={GlobalStyle.width100p}
              height={70}
              maxLength={100}
            />

            <InputComponent
              title={KeyWords.city}
              icon={Images.locationImg}
              iconStyle={Styles.icon}
              placeholder={KeyWords.city}
              multiline={false}
              value={city}
              setValues={text => this.setState({ city: text })}
              fieldWidth={GlobalStyle.width100p}
              height={70}
              maxLength={100}
            />

            <InputComponent
              title={KeyWords.zipcode}
              icon={Images.locationImg}
              iconStyle={Styles.icon}
              placeholder={KeyWords.zipcode}
              multiline={false}
              value={zipcode}
              setValues={text => this.setState({ zipcode: text })}
              fieldWidth={GlobalStyle.width100p}
              height={70}
              maxLength={100}
              keyboardType="numeric"
            />

            <ButtonComponent
              btnText={KeyWords.submit}
              btnStyle={Styles.btn}
              callFunction={() => this.submit()}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

AddEditScheduleComponent.propTypes = {
  SpinnerVisible: PropTypes.bool,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  addSchedule: PropTypes.func.isRequired
};

const maptoprops = state => {
  //alert(state.Schedule.schedule.title);
  console.log("edit class state == ", state.Schedule);
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
)(AddEditScheduleComponent);

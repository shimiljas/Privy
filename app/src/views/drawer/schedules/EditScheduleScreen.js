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
export default class EditScheduleScreen extends React.Component {
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

  getSelectedData = (name, value) => {
    if (name == "category" && value) {
      let subcategories = this.state.allcategory.filter(x => x.pid == value.id);

      this.setState({ subcategories: subcategories, category: value });
      return;
    }
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
          </View>
        </Content>
      </Container>
    );
  }
}

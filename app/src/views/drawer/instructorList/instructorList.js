import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { Container, Content, Card } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
import ModalSelector from 'react-native-modal-selector';
import { SelectedUser, Booknow, showCalendar } from '../../../actions';
import Styles from './Styles';
import GlobalStyle from '../../../common/GlobalStyle';
import Images from '../../../common/images';
//import clientApi from "../../../common/ApiManager";
import { SpinnerLoad } from '../../../components';
import Header from '../../../components/header/header';
import Util from '../../../common/Util';
import Color from '../../../common/Color';
import KeyWords from '../../../common/Localization';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import clientApi from "../../../common/ApiManager";

var sortList = [
  { _id: 1, name: KeyWords.price },
  { _id: 2, name: KeyWords.distance },
  { _id: 3, name: KeyWords.alpha },
];

class InstructorComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  instructorProfile = async data => {
    const { SelectedUser } = this.props;
    await SelectedUser(data);

    // Actions.InstructorProfile({ type: "replace", data });
  };

  doBooking = async cid => {
    const userId = await AsyncStorage.getItem("userId");
    const apiToken = await AsyncStorage.getItem("apiToken");
    console.log("nabeel: userData: ", userId, apiToken);

    var obj = {
      user_id: userId,
      token: apiToken,
      cid
    }

    var response = await clientApi.callApi(
      "book_class.php",
      obj,
      apiToken
    );

    console.log("nabeel: response ", response, obj);

    if (response.success == 1) {
      alert("Booked Successfully");
      console.log(response);
      // update store with index from props
      // onApprovePress();
    }
  };

  bookNow = async data => {
    const { Booknow } = this.props;
    const { lid, cid } = data;
    console.log("nabeel: lid", lid);
    if (data && lid) {
      await Booknow(data);

      if (lid === 1) {
        Actions.BookNow({ type: 'replace' });
      } else if (lid === 2 || lid === 3) {
        this.doBooking(cid)
      }
    }
  };

  sortList = value => {
    console.log(value);
  };

  _cellDetailView = (data, index) => {
    const { showCalendar } = this.props;
    return (
      <Card style={[GlobalStyle.row, Styles.cardStyle]}>
        <TouchableOpacity
          style={Styles.profileImageView}
          onPress={() => this.instructorProfile(data)}
        >
          <FontAwesome name="user-circle" size={70} />
        </TouchableOpacity>
        <View style={Styles.userDetailsView}>
          <TouchableOpacity onPress={() => this.instructorProfile(data)}>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>
              {data.iname}
            </Text>
          </TouchableOpacity>
          <View>
            <Text numberOfLines={1} style={Styles.name}>
              {data.des}
            </Text>
          </View>
          <View style={{ width: '100%', height: 20 }} />
          {/* <Text style={Styles.name}>
            {KeyWords.distance}
            <Text>: 1</Text>
            {KeyWords.mile}
          </Text> */}
          <View style={GlobalStyle.width15p}>
            <StarRating
              disabled
              maxStars={5}
              rating={data.id}
              fullStarColor="#fac917"
              starSize={Util.getHeight(2.5)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              showCalendar(index);
              Actions.CalendarList({
                data: this.props.InstructorList,
                selected: index,
              })
            }}
          >
            <Text style={[Styles.link, { marginTop: Util.getHeight(1.5) }]}>
              {KeyWords.calendar}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.dividerView} />
        <View style={Styles.rightView}>
          <Text style={Styles.name}>
            {KeyWords.price}
            <Text>: </Text>
            <Text style={{ color: Color.darkGray, fontWeight: 'bold' }}>
              $ {data.spfee == undefined ? 0 : data.spfee + 1}
            </Text>
          </Text>
          {data.spfee != undefined
            ? <TouchableOpacity onPress={() => this.bookNow(data)}>
              <Text style={[Styles.link, { marginTop: Util.getHeight(8.5) }]}>
                {KeyWords.book + ' ' + KeyWords.now}
              </Text>
            </TouchableOpacity>
            : null}
        </View>
      </Card>
    );
  };

  _keyExtractor = item => item._id;

  render() {
    const { SpinnerVisible, InstructorList } = this.props;
    console.log("nabeel: render()", InstructorList);
    return (
      <Container>
        <Header title={KeyWords.instructors} />
        {/* <Content padder> */}
        <SpinnerLoad spinnerVisible={SpinnerVisible} />
        <View style={GlobalStyle.leftRightPadding}>
          <View style={[GlobalStyle.row, Styles.marginBottom1]}>
            <View
              style={[
                GlobalStyle.width45p,
                GlobalStyle.alignItemsFlexStart,
                GlobalStyle.justifyContentCenter,
              ]}
            >
              <Text style={Styles.title}>
                <Text onPress={() => Actions.Search({ type: 'replace' })}>
                  {KeyWords.search}
                </Text>
                <Text>/ </Text>
                {KeyWords.providers}
              </Text>
            </View>
            <View
              style={[
                GlobalStyle.width55p,
                GlobalStyle.alignItemsFlexEnd,
                GlobalStyle.justifyContentCenter,
              ]}
            >
              <View style={[GlobalStyle.row]}>
                <View style={[GlobalStyle.viewCenter, GlobalStyle.width20p]}>
                  <Text style={[Styles.title, GlobalStyle.alignSelfCenter]}>
                    {KeyWords.sort}
                  </Text>
                </View>
                <View style={Styles.pickerBottomLine}>
                  <ModalSelector
                    data={sortList}
                    keyExtractor={item => item._id}
                    labelExtractor={item =>
                      item.name != null ? item.name : item.title}
                    onChange={value => this.sortList(value)}
                    selectStyle={[
                      GlobalStyle.borderWidth0,
                      GlobalStyle.alignItemsFlexStart,
                      GlobalStyle.justifyContentCenter,
                    ]}
                  />
                </View>
                <View style={[GlobalStyle.width15p]}>
                  <Image
                    source={Images.upDownArrowImg}
                    resizeMode="contain"
                    style={Styles.imagestyle}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={Styles.listArea}>
            <FlatList
              data={InstructorList}
              renderItem={({ item, index }) => this._cellDetailView(item, index)}
              keyExtractor={this._keyExtractor}
              listKey="instructorsList"
            />
          </View>
        </View>
        {/* </Content> */}
      </Container>
    );
  }
}

InstructorComponent.propTypes = {
  //userData: PropTypes.element.isRequired,
  SpinnerVisible: PropTypes.element.isRequired,
  //mode: PropTypes.element.toText,
};

const maptoprops = state => {
  console.log('maptoprops==', state.SearchIntructor.searchedList);
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata,
    InstructorList: state.SearchIntructor.searchedList,
  };
};

export default connect(maptoprops, { SelectedUser, Booknow, showCalendar })(
  InstructorComponent
);

import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  FlatList,
} from 'react-native';
import {Container, Tab, Tabs} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {AllClasses, cancelClasses, BookClass} from '../../../actions';
import Header from '../../../components/header/header';
import Styles from './bookingStatus/Styles';
import CancelBooking from './bookingStatus/CancelBooking';
import ComingBooking from './bookingStatus/ComingBooking';
import KeyWords from '../../../common/Localization';
import RF from 'react-native-responsive-fontsize';
import BookingCard from './components/BookingCard';

class BookingScreen extends Component {
  constructor (props) {
    super (props);
    this.state = {
      // tabStatus:0
      sIndex: 0,
      bookings: [],
      allClasses: [],
      roleId: 3,
    };
    //his.getAllClasses();
  }

  async componentWillMount () {
    let ut = await AsyncStorage.getItem ('roleId');
    const {userData, AllClasses} = this.props;
    let object = {
      ut: ut,
      user_id: userData._id,
      api_token: userData.api_token,
    };
    this.setState ({roleId: ut});

    AllClasses (object);
  }
  componentWillReceiveProps (nextProps) {
    console.log (nextProps.changed, 'nextPropsnextPropsnextProps');
    if (
      this.state.sIndex == 0 &&
      nextProps.allClasses &&
      nextProps.allClasses.length > 0
    ) {
      const data = nextProps.allClasses.filter (data => data.cancel === 0);
      this.setState ({bookings: data, allClasses: nextProps.allClasses});
    } else if (
      this.state.sIndex == 1 &&
      nextProps.allClasses &&
      nextProps.allClasses.length > 0
    ) {
      let data = nextProps.allClasses.filter (data => data.cancel === 1);
      this.setState ({bookings: data, allClasses: nextProps.allClasses});
    }
  }

  // getAllClasses=()=>{
  //   console.log('all classes apip calls')
  //   const{userData,AllClasses}=this.props;
  //   const{tabStatus}=this.state;

  //   AllClasses({
  //     status:tabStatus,
  //     roll_id:userData.roleId,
  //     user_id: userData._id,
  //     api_token: userData.api_token != null ? userData.api_token : userData.token
  //    } );
  // }

  tabChange = index => {
    this.setState ({sIndex: index}, () => {
      if (this.state.sIndex == 0) {
        let data = this.state.allClasses.filter (data => data.cancel === 0);
        this.setState ({bookings: data});
      } else {
        let data = this.state.allClasses.filter (data => data.cancel === 1);
        this.setState ({bookings: data});
      }
    });
  };
  onScrollEnd (e) {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor (contentOffset.x / viewSize.width);
    console.log ('scrolled to page ', pageNum);
  }
  actionclick = item => {
    return;
    if (this.state.sIndex == 0) {
      const {userData, cancelClasses} = this.props;
      const object = {
        bid: item.bid,
        user_id: userData._id,
        api_token: userData.api_token,
      };

      cancelClasses (object);
    } else {
      const {userData, BookClass} = this.props;
      const object = {
        cid: item.cid,
        user_id: userData._id,
        api_token: userData.api_token,
      };
      BookClass (object);
      // this.props.cancelClassesForId();
    }
  };

  render () {
    const {userData} = this.props;
    return (
      <Container>
        <Header
          title={
            Actions.currentParams.headerName != undefined
              ? Actions.currentParams.headerName
              : KeyWords.booked + ' ' + KeyWords.lessons
          }
        />
        <View>
          <TabBar
            onSelect={sIndex => this.tabChange (sIndex)}
            selected={this.state.sIndex}
            data={[
              this.state.roleId == 3
                ? KeyWords.booked + ' ' + KeyWords.scheduleTitle
                : KeyWords.upcoming,
              this.state.roleId == 3
                ? KeyWords.cancelled + ' ' + KeyWords.scheduleTitle
                : KeyWords.previousL,
            ]}
          />
        </View>
        <View style={{flex: 1}}>
          <FlatList
            style={{padding: 10}}
            data={this.state.bookings}
            renderItem={({item}) => (
              <BookingCard
                Item={item}
                roleId={this.state.roleId ? this.state.roleId : 3}
                tab={this.state.sIndex}
                action={item => this.actionclick (item)}
              />
            )}
          />
        </View>
      </Container>
    );
  }
}

const TabBar = ({onSelect, selected, data}) => (
  <View
    style={{
      flexDirection: 'row',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    }}
  >
    <TouchableOpacity
      style={{
        flex: 1,
      }}
      onPress={() => onSelect (0)}
    >
      <View style={{backgroundColor: selected === 0 ? 'green' : 'white'}}>
        <Text
          style={{
            padding: '5%',
            fontSize: RF (2.3),
            fontFamily: 'Poppins-Medium',
            color: selected === 0 ? 'white' : 'black',
            textAlign: 'center',
          }}
        >
          {data[0]}
        </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        flex: 1,
      }}
      onPress={() => onSelect (1)}
    >
      <View style={{backgroundColor: selected === 1 ? 'green' : 'white'}}>
        <Text
          style={{
            padding: '5%',
            fontSize: RF (2.3),
            fontFamily: 'Poppins-Medium',
            textAlign: 'center',
            color: selected === 1 ? 'white' : 'black',
          }}
        >
          {data[1]}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

BookingScreen.propTypes = {
  //userData: PropTypes.element
};

const maptoprops = state => {
  console.log (state.AllClasses, 'state=======<>');
  return {
    userData: state.User.userdata,
    allClasses: state.AllClasses.allClasses,
    changed: state.AllClasses.changed,
  };
};
export default connect (maptoprops, {AllClasses, cancelClasses, BookClass}) (
  BookingScreen
);

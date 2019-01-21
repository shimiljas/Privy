import React, { Component } from "react";
import { BackHandler, Platform, StatusBar, NetInfo } from "react-native";
import {
  Router,
  Reducer,
  Scene,
  Actions,
  Drawer,
  Stack
} from "react-native-router-flux";
import { Container } from "native-base";
//for redux
import { connect } from "react-redux";
//Load all component
import SplashScreen from "./views/splash/Splash";
import LoginScreen from "./views/login/Login";
import PasswordScreen from "./views/password/Password";
import DrawerContent from "./components/drawer/DrawerContent";
import DashboardScreen from "./views/drawer/dashboard/Dashboard";
import ProfileScreen from "./views/drawer/profile/Profile";
import TermsScreen from "./views/terms/TermsScreen";
import FirstLoginScreen from "./views/firstLogin/FirstLogin";
import StudentProfileScreen from "./views/drawer/profile/StudentProfile";
import MyAccountScreen from "./views/drawer/myaccount/MyAccount";
import ServicesScreen from "./views/drawer/services/Services";
import OfflineNotice from "./components/offline/OfflineMessage";
import SchedulesScreen from "./views/drawer/schedules/schedules";
import AddEditScheduleScreen from "./views/drawer/schedules/addEditSchedule";
import MessagesScreen from "./views/drawer/messages/messages";
import BookingScreen from "./views/drawer/booking/BookingScreen";
import ReviewScreen from "./views/drawer/Reviews/ReviewScreen";
import SpecialPriceScreen from "./views/drawer/specialPrice/specialPrice";
import SearchScreen from "./views/drawer/search/search";
import PayNowScreen from "./views/drawer/paynow/paynow";
import BookNowScreen from "./views/drawer/bookNow/bookNow";
import InstructorListScreen from "./views/drawer/instructorList/instructorList";
import CalenderScreen from "./views/drawer/Calender/Calender";
import InstructorProfileScreen from "./views/drawer/instructorProfile/Profile";
import SubmitReviewScreen from "./views/drawer/Reviews/Form";
import InstructorStudentProfileScreen from "./views/drawer/studentProfile/StudentProfile";
//Common files
import Images from "./common/images";
import Colors from "./common/Color";
import Util from "./common/Util";

// Load Redux Actions
const reducerCreate = params => {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  };
};

// map redux store to props
function mapStateToProps() {
  return {
    // prop: state.prop
  };
}
function mapDispatchToProps() {
  return {
  };
}

class PrivyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
    if (Platform.OS == "android") {
      BackHandler.addEventListener("hardwareBackPress", function() {
        Actions.pop();
        return true;
      });
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = isConnected => {
    console.log("isConnected", isConnected);
    if (isConnected) {
      this.setState({ isInternetConnected: isConnected });
    } else {
      this.setState({ isInternetConnected: isConnected });
    }
  };

  _renderScene = (Component, title) => {
    return <Component title={title} />;
  };

  loadScenes = () => {
    return (
      <Router createReducer={reducerCreate}>
        <Scene key="root" hideNavBar>
          <Scene
            initial
            key="Splash"
            component={() => this._renderScene(SplashScreen)}
            title="Splash"
            panHandlers={null}
          />
          <Scene
            key="Login"
            component={() => this._renderScene(LoginScreen)}
            title="Login"
            panHandlers={null}
          />
          <Scene
            key="Password"
            component={() => this._renderScene(PasswordScreen)}
            title="Reset Password"
            panHandlers={null}
          />
          <Scene
            key="FirstLogin"
            component={() => this._renderScene(FirstLoginScreen)}
            title="First Login"
            panHandlers={null}
          />

          <Scene
            key="Terms"
            component={() => this._renderScene(TermsScreen)}
            title="Terms"
            panHandlers={null}
          />

          <Drawer
            hideNavBar
            drawer
            key="drawer"
            onExit={() => {
              console.log("Drawer closed");
            }}
            onEnter={() => {
              console.log("Drawer opened");
            }}
            contentComponent={DrawerContent}
            drawerImage={Images.MenuIcon}
            drawerWidth={Util.getWidth(60)}
          >
            <Scene hideNavBar panHandlers={null}>
              <Stack
                key="DashboardScreen"
                title="Dashboard"
                tabBarLabel="Privy"
              >
                <Scene
                  hideNavBar
                  key="Dashboard"
                  component={() => this._renderScene(DashboardScreen)}
                  title="Dashboard"
                />
              </Stack>

              <Stack
                key="MyAccountScreen"
                title="My Account"
                tabBarLabel="Privy"
              >
                <Scene
                  hideNavBar
                  key="MyAccount"
                  component={() => this._renderScene(MyAccountScreen)}
                  title="My Account"
                />
              </Stack>
              <Stack key="ProfileScreen" title="Profile" tabBarLabel="Privy">
                <Scene
                  hideNavBar
                  key="Profile"
                  component={() => this._renderScene(ProfileScreen)}
                  title="Profile"
                />
              </Stack>
              <Stack key="BookingScreen" title="Booking" tabBarLabel="Privy">
                <Scene
                  hideNavBar
                  key="Booking"
                  component={() => this._renderScene(BookingScreen)}
                  title="Booking"
                />
              </Stack>
              <Stack key="ReviewScreen" title="Review" tabBarLabel="Privy">
                <Scene
                  hideNavBar
                  key="Review"
                  component={() => this._renderScene(ReviewScreen)}
                  title="Review"
                />
              </Stack>

              <Stack key="StudentProfileScreen" title="Profile">
                <Scene
                  hideNavBar
                  key="StudentProfile"
                  component={() => this._renderScene(StudentProfileScreen)}
                  title="Profile"
                />
              </Stack>

              <Stack key="ServicesScreen" title="Services" tabBarLabel="Privy">
                <Scene
                  hideNavBar
                  key="Services"
                  component={() => this._renderScene(ServicesScreen)}
                  title="Services"
                />
              </Stack>

              <Stack key="SchedulesScreen" title="Classes" tabBarLabel="Privy">
                <Scene
                  hideNavBar
                  key="Schedules"
                  component={() => this._renderScene(SchedulesScreen)}
                  title="Classes"
                />
              </Stack>
              <Stack key="CalenderScreen" title="Classes" tabBarLabel="Privy">
                <Scene
                  hideNavBar
                  key="Calender"
                  component={() => this._renderScene(CalenderScreen)}
                  title="Calendar"
                />
              </Stack>

              <Stack
                key="AddEditScheduleScreen"
                title="Add Classes"
                tabBarLabel="Privy"
              >
                <Scene
                  hideNavBar
                  key="AddEditSchedule"
                  component={() => this._renderScene(AddEditScheduleScreen)}
                  title="Add Classes"
                />
              </Stack>

              <Stack key="MessagesScreen" title="Messages" tabBarLabel="Privy">
                <Scene
                  hideNavBar
                  key="Messages"
                  component={() => this._renderScene(MessagesScreen)}
                  title="Messages"
                />
              </Stack>

              <Stack
                key="SpecialPriceScreen"
                title="Special Price"
                tabBarLabel="Privy"
              >
                <Scene
                  hideNavBar
                  key="SpecialPrice"
                  component={() => this._renderScene(SpecialPriceScreen)}
                  title="Special Price"
                />
              </Stack>

              <Stack key="SearchScreen" title="Search" tabBarLabel="Privy">
                <Scene
                  hideNavBar
                  key="Search"
                  component={() => this._renderScene(SearchScreen)}
                  title="Search"
                />
              </Stack>

              <Stack key="PayNowScreen" title="Pay" tabBarLabel="Privy">
                <Scene
                  hideNavBar
                  key="Pay"
                  component={() => this._renderScene(PayNowScreen)}
                  title="Pay"
                />
              </Stack>

              <Stack key="BookNowScreen" title="Book Now" tabBarLabel="Privy">
                <Scene
                  hideNavBar
                  key="BookNow"
                  component={() => this._renderScene(BookNowScreen)}
                  title="BookNow"
                />
              </Stack>

              <Stack
                key="InstructorListScreen"
                title="Instructors"
                tabBarLabel="Privy"
              >
                <Scene
                  hideNavBar
                  key="InstructorList"
                  component={() => this._renderScene(InstructorListScreen)}
                  title="Instructors"
                />
              </Stack>

              <Stack
                key="InstructorProfileScreen"
                title="Instructors"
                tabBarLabel="Privy"
              >
                <Scene
                  hideNavBar
                  key="InstructorProfile"
                  component={() => this._renderScene(InstructorProfileScreen)}
                  title="Instructors"
                />
              </Stack>

              <Stack
                key="SubmitReviewScreen"
                title="Review"
                tabBarLabel="Privy"
              >
                <Scene
                  hideNavBar
                  key="SubmitReview"
                  component={() => this._renderScene(SubmitReviewScreen)}
                  title="Review"
                />
              </Stack>

              <Stack
                key="InstructorStudentProfileScreen"
                title="Student Profile"
                tabBarLabel="Privy"
              >
                <Scene
                  hideNavBar
                  key="InstructorStudentProfile"
                  component={() =>
                    this._renderScene(InstructorStudentProfileScreen)
                  }
                  title="Student Profile"
                />
              </Stack>
            </Scene>
          </Drawer>
        </Scene>
      </Router>
    );
  };

  render = () => {
    const { isInternetConnected } = this.state;
    if (isInternetConnected == false) {
      return (
        <Container>
          <OfflineNotice />
        </Container>
      );
    }
    return (
      <Container style={{ backgroundColor: Colors.appDefultColor }}>
        <StatusBar
          backgroundColor={Colors.appDefultColor}
          barStyle="dark-content"
        />
        {this.loadScenes()}
      </Container>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivyApp);

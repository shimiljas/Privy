import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Keyboard,
  Image,
  TouchableOpacity,
  FlatList,
  AsyncStorage
} from "react-native";
import { Text } from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Styles from "./Styles";
import Images from "../../common/images";
import GlobalStyles from "../../common/GlobalStyle";
import { getUserInfo, deshHomeValue } from "../../actions";

const routers = [
  // Add your Drawer items here
  {
    id: 101,
    key: "DashboardScreen",
    action: Actions.tab_1,
    text: "Dashboard",
    icon_selected: "dashboardActive",
    icon: "dashboard"
  },

  {
    id: 103,
    key: "ProfileScreen",
    action: Actions.tab_2,
    text: "My Profile",
    icon_selected: "userActive",
    icon: "user"
  },

  {
    id: 105,
    key: "MyAccountScreen",
    action: Actions.tab_3,
    text: "My Account",
    icon_selected: "keyActive",
    icon: "key"
  },
  {
    id: 106,
    key: "ServicesScreen",
    action: Actions.tab_3,
    text: "My Services",
    icon_selected: "bookActive",
    icon: "book"
  },
  {
    id: 107,
    key: "PaymentScreen",
    action: Actions.tab_3,
    text: "My Payments",
    icon_selected: "dollarActive",
    icon: "dollar"
  },
  {
    id: 110,
    key: "TermsNConditionScreen",
    action: Actions.tab_3,
    text: "Terms & Conditions",
    icon_selected: "termsOfConditionActive",
    icon: "termsOfCondition"
  },
  {
    id: 111,
    key: "SignOutScreen",
    action: Actions.tab_4,
    text: "Sign Out",
    icon_selected: "logoutActive",
    icon: "logout"
  }
];

const studentsRouters = [
  // Add your Drawer items here
  {
    id: 101,
    key: "DashboardScreen",
    action: Actions.tab_1,
    text: "Dashboard",
    icon_selected: "dashboardActive",
    icon: "dashboard"
  },
  {
    id: 102,
    key: "ReceiptsScreen",
    action: Actions.tab_2,
    text: "Receipts",
    icon_selected: "receiptsActive",
    icon: "receipts"
  },
  {
    id: 103,
    key: "StudentProfileScreen",
    action: Actions.tab_3,
    text: "My Profile",
    icon_selected: "userActive",
    icon: "user"
  },
  {
    id: 104,
    key: "TermsNConditionScreen",
    action: Actions.tab_3,
    text: "Terms & Conditions",
    icon_selected: "termsOfConditionActive",
    icon: "termsOfCondition"
  },
  {
    id: 105,
    key: "SignOutScreen",
    action: Actions.tab_5,
    text: "Sign Out",
    icon_selected: "logoutActive",
    icon: "logout"
  }
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0b5604",
    height: "100%",
    width: "100%"
  }
});

class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    // this = this;
    const { userData, getUserInfo } = this.props;
    var d = userData;
    console.log("drawer data -- ", d);

    var data = {
      user_id: d._id,
      api_token: d.api_token != null ? d.api_token : d.token
    };

    // getUserInfo(data);

    this.state = {
      menuItems: routers,
      selectedMenu: {
        key: "DashboardScreen",
        action: Actions.tab_2,
        text: "Dashboard",
        icon_selected: "ic_profile_white",
        icon: "ic_profile"
      },
      userData:{},
      name: ""
    }

    
  }

  // updateSelectedMenu=()=>{
  //   this.setState({ selectedMenu:{
  //     ...this.state.selectedMenu,
  //     [key] : this.props.HomeBtn}})
  // }

  _navigation = data => {
    // alert(data.key);
    switch (data.key) {
      case "DashboardScreen":
        Actions.drawerClose();
        Actions.Dashboard({ type: "replace" });
        break;
      case "ProfileScreen":
        Actions.drawerClose();
        Actions.Profile({ type: "replace" });
        break;
      case "StudentProfileScreen":
        Actions.drawerClose();
        Actions.StudentProfile({ type: "replace" });
        break;
      case "MyAccountScreen":
        Actions.drawerClose();
        Actions.MyAccount({ type: "replace" });
        break;
      case "ServicesScreen":
        Actions.drawerClose();
        Actions.Services({ type: "replace" });
        break;
      case "PaymentScreen":
        Actions.drawerClose();
        Actions.push("BookingScreen", { headerName: "My Payments" });
        break;
      case "ReceiptsScreen":
        // Actions.BookingScreen({ headerName: "Receipts" });
        Actions.push("BookingScreen", { headerName: "Receipts" });
        break;
      case "HelpsScreen":
        //Actions.Help({ type: "replace" });
        break;
      case "SignOutScreen":
        AsyncStorage.clear();
        console.log("logout");
        Actions.Login({ type: "reset" });
        break;
      case "TermsNConditionScreen":
        Actions.drawerClose();
        Actions.TermsNConditionScreen();
        break;
      default:
        alert("Functionality will be implemented later");
        //Actions.Dashboard({ type: "replace" });
        break;
    }
  };
  pressTouchOption = async data => {
    this.setState({ selectedMenu: data });
    console.log("sidemenu text", data.key, this.state.selectedMenu.key);
    // await deshHomeValue(data.key);
    this._navigation(data);
    // this.props.deshHomeValueReset(false)
  };
  _renderItem(data, index) {
    const { HomeBtn } = this.props;
    return (
      <TouchableOpacity
        style={Styles.rowBg}
        key={index}
        onPress={() => this.pressTouchOption(data)}
      >
        <View style={[GlobalStyles.row, Styles.menuItem]}>
          <Image
            style={Styles.icons}
            source={
              this.state.selectedMenu.key == data.key
                ? Images.sideMenuIcons[data.icon_selected]
                : Images.sideMenuIcons[data.icon]
            }
            resizeMode="contain"
          />

          <View style={Styles.menuText}>
            <Text
              style={
                this.state.selectedMenu.key == data.key
                  ? Styles.titleSelected
                  : Styles.titleText
              }
            >
              {data.text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  async componentDidMount() {
    let userObj = await AsyncStorage.getItem("USEROBJ");
    let roleId = await AsyncStorage.getItem("roleId");
    let userData = JSON.parse(userObj);
    let d = {
      name: userData.name,
      roleId
    }

    let xState = null;
    
    if (d.name == "") {
      if (d.roleId == 3) {
       xState = {
          menuItems: routers,
          selectedMenu: {
            key: "DashboardScreen",
            action: Actions.tab_2,
            text: "Dashboard",
            icon_selected: "ic_profile_white",
            icon: "ic_profile"
          },
          userData,
          name: d.name
        };
      } else {
       xState = {
          menuItems: studentsRouters,
          selectedMenu: {
            key: "DashboardScreen",
            action: Actions.tab_1,
            text: "Dashboard",
            icon_selected: "ic_dashboard_white",
            icon: "ic_dashboard"
          },
          userData,
          name: d.name
        };
      }
    } else {
      //console.log("ddd --- ",d);
     xState = {
        menuItems: d.roleId == 3 ? routers : studentsRouters,
        selectedMenu: {
          key: "DashboardScreen",
          action: d.roleId == 3 ? Actions.tab_1 : Actions.tab_2,
          text: "Dashboard",
          icon_selected: "ic_dashboard_white",
          icon: "ic_dashboard"
        },
        userData,
        name: d.name
      };
    }
    this.setState({...xState});
  }

   renderHeader() {
    
    Keyboard.dismiss();
    const { userData } = this.state;
    console.log("USER ROLE SSS", userData);
    return (
      <View style={Styles.menuHeader}>
        <View style={GlobalStyles.height15} />
        <View style={[GlobalStyles.row]}>
          <View style={[Styles.width19p, GlobalStyles.viewCenter]}>
            <Image source={{uri: userData.profilePic}} style={Styles.image} />
          </View>

          <View style={[Styles.userNameView]}>
            <Text numberOfLines={1} style={Styles.userName}>
              {userData.name == ""
                ? userData.email.split("@")[0].toUpperCase()
                : userData.name}
            </Text>
          </View>
        </View>
        <View style={Styles.borderView} />
      </View>
    );
  }

  render() {
    const { menuItems } = this.state;
    return (
      <View style={[styles.container]}>
        {this.renderHeader()}
        <FlatList
          data={menuItems ? menuItems : null}
          extraData={this.state}
          renderItem={({ item, index }) => this._renderItem(item, index)}
          keyExtractor={item => item.id + ""}
        />
      </View>
    );
  }
}

DrawerContent.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  //SpinnerVisible: PropTypes.element.isRequired
  getUserInfo: PropTypes.func.isRequired
};

//export default DrawerContent;
const maptoprops =  (state) => {
  return {
    userData: state.User.userdata,
    HomeBtn: state.DashboardCall.dashBoard
  };
};

export default connect(
  maptoprops,
  { getUserInfo, deshHomeValue }
)(DrawerContent);

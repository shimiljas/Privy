import React from "react";

import { TouchableOpacity, View, Text, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Styles from "./styles";
import Images from "../../common/images";
import { deshHomeValue } from "../../actions";

class Header extends React.Component {
  static defaultProps = {
    backIcon: undefined,
    styleBack: undefined,
    title: ""
  };

  constructor(props) {
    super(props);
  }

  homeBtnClick = async () => {
    const { deshHomeValue } = this.props;
    //  await deshHomeValue('DashboardScreen'
    //  );

    Actions.Dashboard({ type: "replace" });
  };

  render() {
    const {
      backIcon,
      styleBack,
      title,
      onHome,
      onToggleProfile,
      roleId
    } = this.props;
    return (
      <View style={[Styles.container, styleBack]}>
        <TouchableOpacity
          style={Styles.backBg}
          onPress={() => {
            backIcon == undefined ? Actions.drawerOpen() : Actions.pop();
          }}
        >
          <View style={Styles.backBtn}>
            <Image
              source={backIcon == undefined ? Images.MenuIcon : Images.backImg}
              style={Styles.imageSize}
            />
          </View>
        </TouchableOpacity>
        <View style={Styles.titleBg}>
          <Text
            style={[
              Styles.titleText,
              styleBack == undefined ? {} : { color: "white" }
            ]}
          >
            {title}
          </Text>
        </View>
        {backIcon == undefined && onHome == true ? (
          <TouchableOpacity
            style={Styles.backBg}
            onPress={() => onToggleProfile()}
          >
            <View style={Styles.imageSize2}>
              <Image
                style={Styles.imageSize2}
                source={
                  roleId == 3 ? Images.instructorIcon : Images.studentIcon
                }
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={Styles.backBg} />
        )}
        {backIcon == undefined ? (
          <TouchableOpacity
            style={Styles.backBg}
            onPress={() => this.homeBtnClick()}
          >
            <Image source={Images.homeBtn} style={Styles.imageSize2} />
          </TouchableOpacity>
        ) : (
          <View style={Styles.backBg} />
        )}

        {backIcon == undefined ? (
          <TouchableOpacity style={Styles.backBg}>
            <Image source={Images.message_Image} style={Styles.imageSize2} />
          </TouchableOpacity>
        ) : (
          <View style={Styles.backBg} />
        )}
      </View>
    );
  }
}

Header.propTypes = {
  backIcon: PropTypes.string,
  styleBack: PropTypes.string,
  title: PropTypes.string
};

//export default DrawerContent;
const maptoprops = state => {
  //console.log("new drawer state", state);
  return {};
};

export default connect(
  maptoprops,
  { deshHomeValue }
)(Header);
// export { Header };

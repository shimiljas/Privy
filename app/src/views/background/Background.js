import React, { Component } from "react";
import { View, Image } from "react-native";
import PropTypes from 'prop-types';
import Styles from "./Styles";
import Util from "../../common/Util";
import Images from "../../common/images";

class Background extends Component() {
  render() {
    const { children } = this.props;
    return (
      <View style={Styles.backgroundImage}>
        {children}

        <Image
          source={Images.bottomImg}
          width="247"
          height="128"
          style={{
            position: "relative",
            bottom: -70,
            left: Util.getWidth() - 247,
            width: 247,
            height: 126
          }}
        />
      </View>
    );
  }
}

Background.propTypes = {
	children: PropTypes.element.isRequired
};

export default Background;

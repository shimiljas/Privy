import React from "react";

import { View, Text, Image, TextInput } from "react-native";
import Color from "../../common/Color";
import GlobalStyle from "../../common/GlobalStyle";

class InfoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title, icon, iconStyle, children } = this.props;
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ justifyContent: "center", paddingRight: 10 }}>
            <Image style={iconStyle} source={icon} />
          </View>
          <View style={{ width: "90%" }}>
            <Text style={{ color: Color.grayClg }}>{title}</Text>
            {children}
          </View>
        </View>
      </View>
    );
  }
}

export { InfoInput };

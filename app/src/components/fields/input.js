import React from "react";
import { View, Image } from "react-native";
import { InputGroup, Text, Input } from "native-base";
import Styles from "./Styles";
import GlobalStyle from "../../common/GlobalStyle";

class InputComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={[GlobalStyle.row]}>
          <View style={[GlobalStyle.viewCenter, GlobalStyle.width10p]} />
          <View style={Styles.inputView}>
            <Text style={Styles.inputText}>{this.props.title}</Text>
          </View>
        </View>
        <View style={[GlobalStyle.row]}>
          <View
            style={[
              GlobalStyle.viewCenter,
              GlobalStyle.width10p,
              GlobalStyle.alignItemsFlexStart
            ]}
          >
            <Image source={this.props.icon} style={this.props.iconStyle} />
          </View>
          <View style={Styles.inputView}>
            <InputGroup borderType="underline">
              <Input
                placeholder={this.props.placeholder}
                onChangeText={this.props.setValues}
                style={this.props.fieldWidth}
                multiline={this.props.multiline}
                value={String(this.props.value)}
                maxHeight={this.props.height}
                maxLength={this.props.maxLength}
                keyboardType={this.props.keyboardType}
                disabled={
                  ((this.props.fieldDisable != null ||
                    this.props.fieldDisable != undefined) &&
                    this.props.fieldDisable) == true
                    ? true
                    : false
                }
              />
            </InputGroup>
          </View>
        </View>
      </View>
    );
  }
}

export { InputComponent };

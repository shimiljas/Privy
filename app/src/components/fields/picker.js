import React from "react";
import { View, Image } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { Text } from "native-base";
import Styles from "./Styles";
import GlobalStyle from "../../common/GlobalStyle";

class PickerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  onValueChange = () => {};

  render() {
	const { title, icon, iconStyle, data, callFunction, initValue } = this.props;
    return (
      <View>
        <View style={[GlobalStyle.row]}>
          <View style={[GlobalStyle.viewCenter, GlobalStyle.width10p]} />
          <View style={Styles.inputView}>
            <Text style={Styles.inputText}>{title}</Text>
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
            <Image source={icon} style={iconStyle} />
          </View>
          <View style={Styles.inputView}>
            <ModalSelector
              data={data}
              keyExtractor={item => item._id}
              labelExtractor={item =>
                item.name != null ? item.name : item.title
              }
              onChange={(option)=> callFunction(option)}
              selectStyle={[
                GlobalStyle.borderWidth0,
                GlobalStyle.alignItemsFlexStart
              ]}
              initValue={initValue}
            />
          </View>
        </View>
      </View>
    );
  }
}

export { PickerComponent };

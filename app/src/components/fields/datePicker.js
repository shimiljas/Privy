import React from "react";
import { View, Image } from "react-native";
import { Text } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import Styles from "./Styles";
import GlobalStyle from "../../common/GlobalStyle";

class DatePickerComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  test() {}

  render() {
    const {
      title,
      type,
      setValue,
      fieldWidth,
      icon,
      iconStyle,
      value,
      isDateTimePickerVisible,
      mode,
      showDateTimePicker,
      onConfirm,
      onCancel,
      minimumDate,
      titleStyle
    } = this.props;
    return (
      <View style={fieldWidth}>
        {title ? (
          <View style={[GlobalStyle.row]}>
            <View style={[GlobalStyle.viewCenter, GlobalStyle.width10p]} />
            <View style={Styles.inputView}>
              <Text style={Styles.inputText}>{title}</Text>
            </View>
          </View>
        ) : (
          <View />
        )}
        <View style={[GlobalStyle.row]}>
          {icon ? (
            <View
              style={[
                GlobalStyle.viewCenter,
                GlobalStyle.width10p,
                GlobalStyle.alignItemsFlexStart
              ]}
            >
              <Image source={icon} style={iconStyle} />
            </View>
          ) : (
            <View />
          )}

          {type == undefined ? (
            <View
              style={[
                Styles.inputView,
                title == undefined || title == null ? { marginLeft: "10%" } : {}
              ]}
            >
              <Text style={[Styles.lableText]} onPress={showDateTimePicker}>
                {value}
              </Text>
              <DateTimePicker
                isVisible={isDateTimePickerVisible}
                onConfirm={onConfirm}
                minimumDate={minimumDate}
                onCancel={onCancel}
                mode={mode}
              />
            </View>
          ) : (
            <View style={Styles.inputView}>
              <Text style={Styles.lableText}>{setValue}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export { DatePickerComponent };

import React from "react";

import { View } from "react-native";
import { Input, Icon, Item } from "native-base";
import styles from "./styles";

class RoundInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      placeValue,
      changeValue,
      inputValue,
      secure,
      iconName,
      type
    } = this.props;
    return (
      <Item rounded style={styles.fieldSpacing}>
        <View style={styles.iconBg}>
          <Icon name={iconName} style={styles.iconView} />
        </View>
        <View style={styles.inputBg}>
          <Input
            placeholder={placeValue}
            keyboardType={type}
            autoCapitalize="none"
            style={styles.textSize16}
            onChangeText={changeValue}
            value={inputValue}
            secureTextEntry={secure}
          />
        </View>
      </Item>
    );
  }
}
export { RoundInput };

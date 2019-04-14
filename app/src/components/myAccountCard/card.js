import React from "react";
import { View, Image } from "react-native";
import { Card, Text, Item } from "native-base";
import Styles from "./Styles";
import GlobalStyle from "../../common/GlobalStyle";

class CardComponentAcc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={this.props.style}>
        <View style={[Styles.center, GlobalStyle.height30]}>
          <Image source={this.props.image} />
        </View>
        <View style={[Styles.center, GlobalStyle.height15]}>
          <Text style={Styles.planPriceText}>{this.props.price}</Text>
        </View>
        <View style={[Styles.center, GlobalStyle.height25]}>
          <Text style={Styles.planText}>{this.props.title}</Text>
        </View>

        <View style={[Styles.center, GlobalStyle.height30]}>
          <Item
            rounded
            style={[Styles.btn, { backgroundColor: this.props.selected }]}
            onPress={this.props.callUpdate}
          >
            <Text style={Styles.btnText}>{this.props.btnText}</Text>
          </Item>
        </View>
      </Card>
    );
  }
}
export { CardComponentAcc };

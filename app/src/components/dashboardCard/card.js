import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Card, Text } from "native-base";
import PropTypes from "prop-types";
import Styles from "./Styles";
import GlobalStyle from "../../common/GlobalStyle";

class CardComponent extends React.Component {
  static defaultProps = {
    footerImage: ""
  };
  constructor(props) {
    super(props);
  }

  test() {}

  render() {
    const {
      onClickOfTitle,
      style,
      title,
      image,
      imageStyle,
      restyle,
      value,
      onClickOfSubtitle,
      subTitle,
      footerImage,
      footerValue
    } = this.props;
    const { card, headerText, valueText, amountText, imageValText } = Styles;
    return (
      <Card style={[GlobalStyle.viewCenter, card]}>
        <View style={[GlobalStyle.viewFull, GlobalStyle.viewCenter]}>
          <View style={Styles.space} />
          <TouchableOpacity
            onPress={onClickOfTitle}
            style={[Styles.amountAreaText, GlobalStyle.viewCenter, style]}
          >
            <Text style={headerText}>{title}</Text>
          </TouchableOpacity>

          <View style={[Styles.imageAreaView, GlobalStyle.viewCenter]}>
            <Image
              source={image}
              resizeMode="contain"
              style={[Styles.imageView, imageStyle]}
            />
          </View>
          <View
            style={[Styles.amountAreaText, GlobalStyle.viewCenter, restyle]}
          >
            <Text style={amountText}>{value}</Text>
          </View>

          <TouchableOpacity
            style={[Styles.valueAreaText, restyle]}
            onPress={onClickOfSubtitle}
          >
            <Text style={valueText}>{subTitle}</Text>
          </TouchableOpacity>
          <View style={[Styles.bottomImageArea, GlobalStyle.viewCenter]}>
            <View style={[GlobalStyle.viewCenter, Styles.bottomImageArea2]}>
              {footerImage != "" ? (
                <Image
                  resizeMode="contain"
                  opacity={0.6}
                  source={footerImage}
                  style={Styles.bottomImage}
                />
              ) : (
                <View />
              )}
              <Text
                style={[
                  imageValText,
                  { paddingBottom: subTitle == "Unread" ? 5 : null },
                  { paddingTop: subTitle == "My Reviews" ? 5 : null }
                ]}
              >
                {footerValue}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    );
  }
}

CardComponent.propTypes = {
  onClickOfTitle: PropTypes.func.isRequired,
  style: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageStyle: PropTypes.string.isRequired,
  restyle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onClickOfSubtitle: PropTypes.func.isRequired,
  subTitle: PropTypes.string.isRequired,
  footerImage: PropTypes.string,
  footerValue: PropTypes.string.isRequired
};

export { CardComponent };

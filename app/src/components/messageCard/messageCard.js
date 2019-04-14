import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Card, CardItem, Text } from "native-base";
import PropTypes from "prop-types";
import Styles from "./Styles";
import Images from "../../common/images";
import GlobalStyle from "../../common/GlobalStyle";
import KeyWords from "../../common/Localization";

class CardComponentMessage extends React.Component {
  static defaultProps = {
    click: true,
    replyClick: true
  };
  constructor(props) {
    super(props);
  }

  test() {}

  render() {
    const { data, click, replyClick, userId,nameClick, hideReply = false} = this.props;
   
    return (
      <TouchableOpacity onPress={() => nameClick()}>
        <Card style={Styles.cardView}>
          <CardItem style={Styles.cardItemView}>
            <View>
              <Image
                resizeMode="contain"
                source={Images.userImg}
                style={Styles.profilePic}
              />
            </View>
            
              <View style={Styles.titleView}>
                <Text style={Styles.title}> {data.name.toUpperCase()} </Text>
                <Text style={Styles.time}>{KeyWords.justNow}</Text>
              </View>
            
            <TouchableOpacity onPress={click} style={Styles.imageView}>
              <Image source={Images.deleteImg} />
            </TouchableOpacity>
          </CardItem>
          <CardItem cardBody>
            <Text style={Styles.message}>{data.content}</Text>
          </CardItem>
          <View style={[GlobalStyle.divider, Styles.leftRightMargin]} />
          {!hideReply ? <CardItem style={GlobalStyle.height20}>
            <View style={GlobalStyle.justifyContentCenter}>
              <Image source={Images.replyImg} />
            </View>
            <TouchableOpacity style={Styles.replyView} onPress={replyClick}>
              <Text style={Styles.reply}>{KeyWords.reply}</Text>
            </TouchableOpacity>
          </CardItem> : null}
        </Card>
      </TouchableOpacity>
    );
  }
}

CardComponentMessage.propTypes = {
  click: PropTypes.bool,
  data: PropTypes.element.isRequired,
  replyClick: PropTypes.func,
  nameClick: PropTypes.func
};

export { CardComponentMessage };

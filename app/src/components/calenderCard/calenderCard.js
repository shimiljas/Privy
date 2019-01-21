import React from "react";
import { View, Image } from "react-native";
import { Text } from "native-base";
import Styles from "./Styles";
import Images from "../../common/images";
import Color from "../../common/Color";
import KeyWords from "../../common/Localization";

class CalenderCard extends React.Component {
  constructor(props) {
    super(props);
  }

  test() {}

  render() {
    return (
      <View style={Styles.cardArea}>
        <View style={Styles.container}>
          <View style={Styles.dataView}>
            <Image
              resizeMode="stretch"
              source={Images.dateShowImage}
              style={Styles.dataImage}
            />
            <View style={Styles.dataText}>
              <Text style={[Styles.nameStyle, { color: Color.whiteClr }]}>30</Text>
            </View>
          </View>
          <View style={Styles.LeftArea}>
            <Text style={[Styles.nameStyle2]}>{KeyWords.category}</Text>
            <Text style={[Styles.nameStyle, Styles.paddingBottom5]}>English</Text>
            <Text style={[Styles.nameStyle2]}>{KeyWords.limit}</Text>
            <Text style={[Styles.nameStyle]}>30</Text>
          </View>
          <View style={Styles.middleView}>
            <Image
              resizeMode="contain"
              source={Images.scienceImg}
              style={Styles.imagestyle}
            />
          </View>
          <View style={Styles.rightView}>
            <Text style={[Styles.nameStyle2]}>{KeyWords.time}</Text>
            <Text style={[Styles.nameStyle, Styles.paddingBottom5]}>01pm - 2pm</Text>
            <Text style={[Styles.nameStyle2]}>{KeyWords.titleBooking}</Text>
            <Text style={[Styles.nameStyle]}>22</Text>
          </View>
        </View>
      </View>
    );
  }
}
export { CalenderCard };

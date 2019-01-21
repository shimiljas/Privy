import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Card, CardItem, Text } from "native-base";
import Styles from "./Styles";
import Images from "../../common/images";
import { FlatListComponent } from "../../components";
import KeyWords from "../../common/Localization";
import GlobalStyle from "../../common/GlobalStyle";

class CardComponentSer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, click } = this.props;

    var newlessons = [];
    var obj = {};
    if (data.oneOnOne) {
      obj = { name: "1 On 1", image: Images.oneononeImg };
      newlessons.push(obj);
    }

    if (data.groupLessons) {
      obj = { name: "Group Lessons", image: Images.oneononeImg };
      newlessons.push(obj);
    }

    if (data.camp) {
      obj = { name: "Camp", image: Images.oneononeImg };
      newlessons.push(obj);
    }

    if (data.bootCamp) {
      obj = { name: "Boot Camp", image: Images.oneononeImg };
      newlessons.push(obj);
    }
    return (
      <Card style={Styles.cardStyle}>
        <CardItem style={GlobalStyle.height15}>
          <View style={Styles.titleView}>
            <Text style={Styles.title}>{data.categoryId.name}</Text>
          </View>
          <TouchableOpacity onPress={click} style={Styles.imageView}>
            <Image source={Images.moreImg} style={Styles.moreIcon} />
          </TouchableOpacity>
        </CardItem>
        <CardItem style={GlobalStyle.height30}>
          <FlatListComponent data={data.subCategoryId} key="subCategories" />
        </CardItem>
        <CardItem style={GlobalStyle.height15}>
          <View style={Styles.titleView}>
            {newlessons.length > 0 ? (
              <Text style={Styles.title}>{KeyWords.typeOfLessonsProvided}</Text>
            ) : (
              <Text />
            )}
          </View>
        </CardItem>
        <CardItem style={Styles.height35p}>
          <FlatListComponent data={newlessons} key="lessons" />
        </CardItem>
      </Card>
    );
  }
}

export { CardComponentSer };

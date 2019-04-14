import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Card, CardItem, Text } from "native-base";
import Styles from "./Styles";
import Images from "../../common/images";
import { FlatListComponent } from "../../components";
import KeyWords from "../../common/Localization";
import GlobalStyle from "../../common/GlobalStyle";
import Color from "../../common/Color";

class CardComponentSer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, onEdit, onDelete } = this.props;

    var newlessons = [];
    var obj = {};
    for(let lesson of data.sLessons) {
      if (lesson.name == "1 On 1") {
        obj = { name: "1 On 1", image: Images.oneononeImg };
        newlessons.push(obj);
      }
  
      if (lesson.name == "Group Lesson") {
        obj = { name: "Group Lesson", image: Images.grouplessonsImg };
        newlessons.push(obj);
      }
  
      if (lesson.name == "Camps") {
        obj = { name: "Camps", image: Images.campImg };
        newlessons.push(obj);
      }
  
      if (lesson.name == "Boot Camp") {
        obj = { name: "Boot Camp", image: Images.bulkCampImg };
        newlessons.push(obj);
      }
    }
    
    return (
      <Card style={Styles.cardStyle}>
        <CardItem style={{...GlobalStyle.row, justifyContent: 'space-between',} }>
          <View style={Styles.titleView}>
            <Text style={Styles.title}>{data.category.name}</Text>
          </View>
          <View style={GlobalStyle.row}>
          <TouchableOpacity onPress={() => onEdit()} >
            <Image source={Images.editImg} style={{...Styles.moreIcon,tintColor: Color.grayClg}} />
          </TouchableOpacity>
          <View style={{marginHorizontal:5}} />
          <TouchableOpacity onPress={() => onDelete()} >
            <Image source={Images.deleteImg} style={Styles.moreIcon} />
          </TouchableOpacity>
          </View>
        </CardItem>
        <CardItem style={GlobalStyle.height30}>
          <FlatListComponent data={data.subCats} key="subCategories" />
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

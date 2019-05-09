import React from "react";
import { View, Image } from "react-native";
import { Card, CardItem, Text } from "native-base";
import PropTypes from "prop-types";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuContext
} from "react-native-popup-menu";
import Styles from "./Styles";
import Images from "../../common/images";
import GlobalStyle from "../../common/GlobalStyle";
import { ButtonComponent } from "..";
import KeyWords from "../../common/Localization";

class CardComponentClass extends React.Component {
  constructor(props) {
    super(props);
  }

  bookings = () => {
    alert("Functionality will be implemented later");
  };

  optionClicked = value => {
    const { editSelected, deleteSelected } = this.props;
    if (value == 1) editSelected();
    else deleteSelected();
  };

  render() {
    const { data } = this.props;
    var str = data.startDate;
    var startDate = "-";
    var month_names_short = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    if (str != null) {
      startDate = str.substring(0, 10);
      var dt = new Date(startDate);
      startDate =
        dt.getDate() +
        " " +
        month_names_short[dt.getMonth()] +
        " " +
        dt.getFullYear();
    }
    return (
      <Card style={[Styles.cardStyle]}>
        <MenuContext customStyles={Styles.menuContext}>
          <CardItem style={GlobalStyle.height10}>
            <View style={Styles.titleView}>
              <Text style={Styles.title}>
                {data.title != "" ? data.title : KeyWords.title}
              </Text>
            </View>
            <View style={Styles.imageView}>
              <Menu onSelect={value => this.optionClicked(value)}>
                <MenuTrigger>
                  <Image source={Images.moreImg} style={Styles.moreIcon} />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption value={1} text="Edit" />
                  <MenuOption value={2} text="Delete" />
                </MenuOptions>
              </Menu>
            </View>
          </CardItem>
          <CardItem
            style={[
              GlobalStyle.height10,
              Styles.marginLeft5p,
              Styles.marginBottom5p
            ]}
          >
            <Text style={Styles.value}>
              {data.des != "" ? data.des : KeyWords.description}
            </Text>
          </CardItem>
          <CardItem style={[GlobalStyle.height50, Styles.marginLeft5p]}>
            <View>
              <View style={GlobalStyle.row}>
                <View style={GlobalStyle.width50p}>
                  <Text style={Styles.lable}>{KeyWords.date}</Text>
                  <Text style={Styles.value}>{data.sd}</Text>
                </View>
                <View style={GlobalStyle.width50p}>
                  <Text style={Styles.lable}>{KeyWords.price}</Text>
                  <Text style={Styles.value}>{data.fee}</Text>
                </View>
              </View>
              <View style={[GlobalStyle.row, Styles.marginTop4p]}>
                <View style={GlobalStyle.width50p}>
                  <Text style={Styles.lable}>{KeyWords.duration}</Text>
                  <Text style={Styles.value}>{data.dhours}</Text>
                </View>
                <View style={GlobalStyle.width50p}>
                  <Text style={Styles.lable}>{KeyWords.category}</Text>
                  <Text style={Styles.value}>
                    {data.cat_name ? data.cat_name : ""}
                  </Text>
                </View>
              </View>
              <View style={[GlobalStyle.row, Styles.marginTop4p]}>
                <View style={GlobalStyle.width50p}>
                  <Text style={Styles.lable}>{KeyWords.size}</Text>
                  <Text style={Styles.value}>{data.size}</Text>
                </View>
                <View style={GlobalStyle.width50p}>
                  <Text style={Styles.lable}>{KeyWords.address}</Text>
                  <Text style={Styles.value}>
                    {data.streetAddress}
                    <Text>, </Text>
                    {data.city}
                    <Text>, </Text>
                    {data.state}
                    <Text>, </Text>
                    {data.zipCode}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  GlobalStyle.row,
                  Styles.marginTop4p,
                  Styles.marginBottom5p
                ]}
              >
                <View style={GlobalStyle.width50p}>
                  <Text style={Styles.lable}>{KeyWords.time}</Text>
                  <Text style={Styles.value}>{data.st}</Text>
                </View>
              </View>
            </View>
          </CardItem>
          <CardItem style={GlobalStyle.height20}>
            <View
              style={[
                GlobalStyle.row,
                GlobalStyle.viewCenter,
                GlobalStyle.width
              ]}
            >
              <View style={[GlobalStyle.width45p, GlobalStyle.viewCenter]}>
                <ButtonComponent
                  btnText={KeyWords.booking + " " + "0"}
                  btnStyle={Styles.btn85p}
                  callFunction={() => this.bookings(1)}
                />
              </View>
              <View style={[GlobalStyle.width55p, GlobalStyle.viewCenter]}>
                <ButtonComponent
                  btnText={KeyWords.cancellations + " " + "0"}
                  btnStyle={Styles.btn100p}
                  callFunction={() => this.bookings(2)}
                />
              </View>
            </View>
          </CardItem>
        </MenuContext>
      </Card>
    );
  }
}

CardComponentClass.propTypes = {
  data: PropTypes.element.isRequired
};

export { CardComponentClass };

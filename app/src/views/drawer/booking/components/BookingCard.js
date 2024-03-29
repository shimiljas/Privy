import React, { Component } from "react";
import { Text, FlatList, Image, View, TouchableOpacity } from "react-native";
import { Container, Content, Item, Card, Textarea } from "native-base";
import { connect } from "react-redux";
import Styles from "../bookingStatus/Styles";
import Color from "../../../../common/Color";
import Util from "../../../../common/Util";
import GlobalStyle from "../../../../common/GlobalStyle";
import Images from "../../../../common/images";

import KeyWords from "../../../../common/Localization";

export default class BookingCard extends Component {
  render() {
    return (
      <Card>
        <View
          style={{ width: "100%", height: this.props.roleId !== 3 ? 200 : 150 }}
        >
          <View
            style={{
              flex: 3,
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 1, padding: 10 }}>
              <Image
                resizeMode="contain"
                source={Images.userImg}
                style={{ width: 120, height: 100 }}
              />
            </View>
            <View
              style={{
                flex: 1.5,
                paddingLeft: 5,
                paddingVertical: 10,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "grey"
                }}
              >
                {this.props.Item.cname}
              </Text>

              <Text numberOfLines={1}>{this.props.Item.des}</Text>
              <Text style={[Styles.lable, GlobalStyle.alignSelfStart]}>
                Starting time: {this.props.Item.stime}
              </Text>
              {this.props.roleId === 3 ? (
                <Text
                  style={{
                    color: "blue",
                    marginTop: 5,
                    textDecorationLine: "underline",
                    fontSize: 13
                  }}
                >
                  Detail
                </Text>
              ) : null}
            </View>
            <View
              style={{
                width: 1,
                height: "80%",
                paddingVertical: 15,
                backgroundColor: "grey"
              }}
            />

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Price</Text>
              <Text>${this.props.Item.fee}</Text>
            </View>
          </View>
          {this.props.roleId !== 3 ? (
            <View
              style={{
                flex: 2,

                alignItems: "flex-end",
                justifyContent: "center",
                paddingLeft: 10
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.action(this.props.Item)}
                style={{
                  width: 250,
                  height: 50,
                  backgroundColor: "green",
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  {this.props.tab == 0 ? "Cancel Booking" : "Book again"}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </Card>
    );
  }
}

import React from "react";

import {
  Text,
  View,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import Color from "../../common/Color";

class LocationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: []
    };
  }

  fetchAuto(e) {
    let newUrl = `https://www.niftiecommute.com/admin/loc/${e}`;
    return fetch(newUrl)
      .then(data => data.json())
      .then(data => {
        let locations = data.map(d => ({
          Name: d.main,
          Address: d.value,
          Lat: d.location.lat,
          Lng: d.location.lng
        }));
        this.setState({ locations });
      })
      .catch(err => console.log("err", err));
  }

  changeLocation(loc) {
    this.setState({ locations: [] });
    this.props.onSave(loc);
  }

  render() {
    const { isOpen, onClose, title } = this.props;
    const { locations } = this.state;
    return (
      <Modal
        visible={isOpen}
        animationType={"slide"}
        onRequestClose={() => onClose()}
      >
        <SafeAreaView>

          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => onClose()}>
              <Text
                style={{
                  width: "25%",
                  textAlign: "center",
                  fontSize: 20,
                  padding: 5,
                  backgroundColor: "black",
                  color: "white"
                }}
              >
                {"Back"}
              </Text>
            </TouchableOpacity>
            <View style={{ height: 10 }} />
            <TextInput
              onChangeText={home => this.fetchAuto(home)}
              style={{ color: Color.grayClg, fontSize: 25, padding: 0 }}
              placeholder={title}
            />
            <View style={{ height: 10 }} />
            <FlatList
              data={locations}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.changeLocation(item)}
                  key={item.Lat}
                  style={{
                    padding: 10,
                    borderBottomColor: "#DDD",
                    borderBottomWidth: 0.5
                  }}
                >
                  <Text
                    style={{
                      paddingVertical: 2,
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#666"
                    }}
                  >
                    {item.Name}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#777" }}>
                    {item.Address}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </SafeAreaView>

      </Modal>
    );
  }
}

export { LocationModal };

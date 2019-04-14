import React from "react";
import { View} from "react-native";
import { Container, Text } from "native-base";
import LinearGradient from "react-native-linear-gradient";

class SettingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false
    };
  }

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <LinearGradient
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 1.0 }}
            locations={[0.2, 0.9]}
            colors={["#FE044B", "#fdbe3d"]}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text> Setting Screen </Text>
          </LinearGradient>
        </View>
      </Container>
    );
  }
}

export default SettingComponent;

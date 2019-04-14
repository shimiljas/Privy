import React from "react";

import Spinner from "react-native-loading-spinner-overlay";
import Color from "../../common/Color";
import KeyString from "../../common/Localization";

class SpinnerLoad extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Spinner
        visible={this.props.spinnerVisible}
        textContent={KeyString.spinnerText}
        color={Color.appDefaultColor}
        overlayColor={Color.spinnerOverlay}
        textStyle={{ color: Color.appDefaultColor }}
      />
    );
  }
}
export { SpinnerLoad };

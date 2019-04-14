import React from "react";
import { View, Modal } from "react-native";
import PropTypes from "prop-types";
import Styles from "./styles";

class ModelAlert extends React.Component {
	static defaultProps = {
		successData: false,
		onClose: false,
		modelStyle: ''
	}
  constructor(props) {
    super(props);
  }

  test() {}

  render() {
    const { modelStyle, successData, children, onClose } = this.props;
    return (
      <Modal
        style={Styles.modelView}
        animationType="fade"
        transparent
        visible={successData}
        onRequestClose={onClose}
      >
        <View style={Styles.innerModel}>
          <View style={modelStyle}>{children}</View>
        </View>
      </Modal>
    );
  }
}

ModelAlert.propTypes = {
  modelStyle: PropTypes.string,
  successData: PropTypes.bool,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.bool
};

export { ModelAlert };

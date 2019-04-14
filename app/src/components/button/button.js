import React from "react";
import { Item, Text } from "native-base";
import PropTypes from "prop-types";
import Styles from "./Styles";
import GlobalStyle from "../../common/GlobalStyle";

/**
 *
 *
 * @class ButtonComponent
 * @extends {React.Component}
 */
class ButtonComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  test() {}

  render() {
	const { callFunction, btnStyle, btnText } = this.props;
    return (
      <Item
        rounded
        style={[GlobalStyle.viewCenter, btnStyle]}
        onPress={callFunction}
      >
        <Text style={Styles.btnText}>{btnText}</Text>
      </Item>
    );
  }
}

ButtonComponent.propTypes = {
	btnText: PropTypes.string.isRequired,
	btnStyle: PropTypes.objectOf(PropTypes.any).isRequired,
	callFunction: PropTypes.func.isRequired,
}

export { ButtonComponent };

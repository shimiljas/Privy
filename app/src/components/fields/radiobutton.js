import React from "react";
import { View } from "react-native";
import { Text, Radio } from "native-base";
import Styles from "./Styles";
import Color from "../../common/Color";
import GlobalStyle from "../../common/GlobalStyle";

class RadioButtonComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { value, setValues, title } = this.props;
		return (
			<View style={[GlobalStyle.row]}>
                <Radio selected={value} style={Styles.radioBtn} onPress={setValues} />
                <Text style={Styles.radioBtnTitle}>{title}</Text>
			</View>
		);
	}
}

export { RadioButtonComponent };

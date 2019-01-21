import React from "react";
import { View } from "react-native";
import { InputGroup, Icon, Text, CheckBox } from "native-base";
import Styles from "./Styles";
import Color from "../../common/Color";
import GlobalStyle from "../../common/GlobalStyle";

class CheckBoxComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { value, setValues, title } = this.props;
		return (
			<View style={[GlobalStyle.row, Styles.centerH]}>
				<View style={Styles.centerH}>
				<CheckBox color={Color.appDefultColor} checked={value} style={Styles.checkBox} onPress={setValues} />
				</View>
				<View style={ Styles.centerH}>
					<Text style={Styles.textTitle}>{title}</Text>
				</View>
			</View>
		);
	}
}

export { CheckBoxComponent };

import React from "react";
import { View, Image, FlatList } from "react-native";
import { Text } from "native-base";
import Styles from "./Styles";
import GlobalStyle from "../../common/GlobalStyle";
import Images from "../../common/images";

class FlatListComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	_keyExtractor = (item, index) => item.name;

	getImage = name => {
		name = name.toLowerCase();
		//console.log("eng == ", name);
		switch (name) {
			case "maths":
				return Images.maths;
			case "english":
				return Images.englishImg;
			case "science":
				return Images.scienceImg;
			case "spanish":
				return Images.spainImg;
			case "oneonone":
				return Images.oneononeImg;
			case "camp":
				return Images.campImg;
			case "grouplessons":
				return Images.grouplessonsImg;
			case "bootcamp":
				return Images.bulkCampImg;
			default:
				return Images.writingImg;
		}
	};

	render() {
		return (
			<View style={Styles.imagesView}>
				<FlatList
					contentContainerStyle={Styles.flexGrow}
					horizontal={true}
					data={this.props.data}
					keyExtractor={this._keyExtractor}
					listKey={this.props.data.name}
					renderItem={({ item }) => (
						<View style={[GlobalStyle.viewCenter, Styles.marginright]}>
							<Image source={this.getImage(item.name)} style={Styles.imagesStyle} />
							<Text>{item.name}</Text>
						</View>
					)}
				/>
			</View>
		);
	}
}
export { FlatListComponent };

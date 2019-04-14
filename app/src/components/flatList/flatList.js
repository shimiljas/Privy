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
		console.log("eng == ", name);
		switch (name) {
			case "maths":
				return Images.maths;
			case "english":
				return Images.englishImg;
			case "meditation":
				return Images.scienceImg;
			case "spanish":
				return Images.spainImg;
			case "1 on 1":
				return Images.oneononeImg;
			case "camps":
				return Images.campImg;
			case "group lesson":
				return Images.grouplessonsImg;
			case "boot camp":
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
							<Text style={{fontFamily: "Poppins"}}>{item.name}</Text>
						</View>
					)}
				/>
			</View>
		);
	}
}
export { FlatListComponent };

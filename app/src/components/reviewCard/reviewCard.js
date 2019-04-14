import React from "react";
import { View, Image } from "react-native";
import { Card, CardItem, Body, Text, Item } from "native-base";
import Styles from "./Styles";
import RF from "react-native-responsive-fontsize";
import GlobalStyle from "../../common/GlobalStyle";
import Images from "../../common/images";
import Color from "../../common/Color";
import { Actions } from "react-native-router-flux";
import styles from "../modelAlert/styles";
import StarRating from 'react-native-star-rating';
import Util from "../../common/Util";

class ReviewCard extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View elevation={10} style={[Styles.cardArea,this.props.btn == undefined ?{}:{height: Util.getHeight(40)}]}>
				<View style={{ height: "20%", width: "90%",marginHorizontal:'5%',justifyContent:'center',flexDirection: "row"}} >
						<Text style={Styles.lessonText}>Booking 1</Text>
						<View style={Styles.timeView}>
					    	<Text style={[Styles.timeTextDesign,{alignSelf:'flex-end'}]}>10 Jul 18(1pm - 2pm)</Text>
						</View>
					</View>
				
				<View style={{ height:this.props.btn == undefined ?  "37%":"27%", marginTop:'3%',width: "100%", flexDirection: "row" }}>
					<View style={{ height: "75%", width: "30%", alignItems: "center" }}>
						<Image resizeMode="contain" source={Images.userImg} style={Styles.imagestyle} />
					</View>
					<View style={{ height: "750%", width: "25%" }}>
						<Text style={Styles.nameStyle}>Lobby Clark</Text>
						<Text style={[Styles.nameStyle, { color: Color.grayClg }]}>Berlin</Text>
					</View>
					<View style={{ height: "75%", width: '10%',alignItems:'center'}}>
					<View style={{ height: "75%", width: 1, backgroundColor: Color.grayClg }}>
					
					</View>
					</View>
					<View style={{ height: "75%", width: "30%",}}>
						<Text style={Styles.nameStyle}>Rating</Text>
						<StarRating
                                                disabled={true}
                                                maxStars={5}
                                                rating={3}
                                                fullStarColor='#fac917'
                                                starSize={Util.getHeight(2.5)}
                                                emptyStarColor={Color.grayClg}                                                
                                            />
					</View>
				</View>
				<View style={{ height:this.props.btn == undefined ?  "30%":"25%", width: "100%", justifyContent: "center" }} >
				  <View style={{  	flex: 1,width: "90%",marginHorizontal:'5%',justifyContent:'center',flexDirection: "row"}} >
				  <Text style={[Styles.timeText,{ color: Color.grayClg ,flex:1.6}]}>Was the intructor on time</Text>
						<Text style={Styles.timeText}>YES</Text>
					</View>
					<View style={{ 	flex: 1,width: "90%",marginHorizontal:'5%',justifyContent:'center',flexDirection: "row"}} >
					<Text style={[Styles.timeText,{ color: Color.grayClg ,flex:1.6}]}>Was the instructor Profeesi</Text>
						<Text style={Styles.timeText}>NO</Text>
					</View>
					<View style={{ flex:1, width: "90%",marginHorizontal:'5%',justifyContent:'center',flexDirection: "row"}} >
					<Text style={[Styles.timeText,{ color: Color.grayClg ,flex:1.6}]}>Would you Recommend</Text>
						<Text style={Styles.timeText}>YES</Text>
					</View>
				</View>
				 {this.props.btn != undefined ? <View style={{height: "30%", width: "100%",justifyContent:'center',alignItems:'center'}}>
						<Item
							rounded
							style={[Styles.btn, GlobalStyle.viewCenter]}
							onPress={() => console.log("Approved clicked")}
						>
							<Text style={Styles.btnText}>Approved</Text>
						</Item>
					
				</View>:null}
				
			</View>
		);
	}
}
export { ReviewCard };

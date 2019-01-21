import React from "react";
import { View,Text,ScrollView } from "react-native";
import { Container } from "native-base";
import GlobalStyle from "../../../common/GlobalStyle";
import KeyString from '../../../common/Localization';
import Images from "../../../common/images";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { ButtonComponent } from "../../../components";
import  Header  from "../../../components/header/header";
import Styles from "./Styles";

class TermsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		
		};
	}
	render() {
		return (
			<Container>
	         <Header title="Terms & Conditions" />
			 <View style={GlobalStyle.viewFull}>
			     <View style={[{height:'8%',justifyContent:'center',marginLeft:'5%'}]}>
				   <Text style={Styles.textStyles}> Terms & Conditions</Text>
				 </View>
			     <View style={[{ height:'70%',marginHorizontal:'7%'}]}>
				 <ScrollView>
				  <Text style={{}}>{KeyString.termsCondition} </Text>

				 </ScrollView>
				 </View>
			     <View style={[{height:'12%',justifyContent:'center',alignItems:'center'}]}>
				  <ButtonComponent btnText="Agree" btnStyle={Styles.btn} />

				 </View>
				
			 </View>
			  
            </Container>
		);
	}
}

const maptoprops = state => {

	return {
		
	};
};
export default connect(
	maptoprops,
	{  }
)(TermsScreen);

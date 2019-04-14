import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Container } from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import GlobalStyle from "../../common/GlobalStyle";
import KeyWords from "../../common/Localization";
import { ButtonComponent } from "../../components";
import Styles from "./Styles";
import Header from "../../components/header/header";
import clientApi from "../../common/ApiManager";


class TermsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {content: ""};
  }

  componentDidMount() {
    clientApi.callPostApi("get_terms.php").then(res => {
      console.log("RESULT GETTERMS", res);
      if(res.success == 1) {
        this.setState({content: res.data.content})
      }
    })  
  }

  back = () => {
    //Actions.pop();
    Actions.pop();
  };

  render() {
    return (
      <Container>
        <Header title={KeyWords.termsCondition} backIcon="back" />
        <View style={GlobalStyle.viewFull}>
          {/* <View style={Styles.titleView}>
            <Text style={Styles.textStyles}> {KeyWords.termsCondition} </Text>
          </View> */}
          <View style={Styles.textView}>
            <ScrollView>
              <Text>{this.state.content}</Text>
            </ScrollView>
          </View>
          <View style={Styles.btnView}>
            <ButtonComponent
              btnText={KeyWords.back}
              btnStyle={Styles.btn}
              callFunction={() => this.back()}
            />
          </View>
        </View>
      </Container>
    );
  }
}

const maptoprops = () => {
  return {};
};

export default connect(
  maptoprops,
  {}
)(TermsScreen);

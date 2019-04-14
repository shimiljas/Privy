import React from "react";
import { View, FlatList } from "react-native";
import { Text, CheckBox } from "native-base";
import Styles from "./Styles";
import GlobalStyle from "../../common/GlobalStyle";

class FlatListCheckboxComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedData: this.props.selectedData, refresh: true };
  }

  _keyExtractor = (item, index) => item.name;
  
  componentWillReceiveProps(){
  this.setState({selectedData:this.props.selectedData});
  console.log("called componentWillReceiveProps ===1",this.state.selectedData);
  }

  render() {
	
    return (
      <View style={GlobalStyle.width100p}>
        <FlatList
          style={GlobalStyle.height100}
          numColumns={2}
          horizontal={false}
          data={this.props.data}
          keyExtractor={this._keyExtractor}
          listKey={this.props.name}
          extraData={this.state.refresh}
          renderItem={({ item }) => (
            <View
              style={[
                GlobalStyle.row,
                GlobalStyle.width50p,
                GlobalStyle.height100,
                Styles.marginTop2p
              ]}
            >
              <CheckBox
                checked={
                  this.state.selectedData.find(k => k == item._id)
                    ? true
                    : false
                }
                color="green"
                onPress={() => {
                  var d = this.state.selectedData;
                  if (d.find(k => k == item._id)) {
                    d = d.filter(k => k !== item._id);
                  } else {
                    d.push(item._id);
                  }

                  this.setState(previousState => {
                    return { selectedData: d, refresh: !this.state.refresh };
                  });

                  this.props.callFunction(d);
                }}
                style={Styles.btnPadding}
              />
              <Text style={Styles.text}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}
export { FlatListCheckboxComponent };

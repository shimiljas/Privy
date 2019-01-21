import Color from "../../common/Color";
import GlobalStyle from "../../common/GlobalStyle";

export default {
	modelView: {
		position: "absolute",
		left: 0,
		padding: "5%",
		backgroundColor: "red"
	},
	innerModel: [GlobalStyle.viewCenter, GlobalStyle.fullHeight, { backgroundColor: Color.modelBackground }]
};

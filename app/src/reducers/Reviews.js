import { SENDREVIEWS,SENDAPPROVEREVIEW,ALLPENDINGREVIEWS,ALLAPPROVEREVIEWS} from "../actions/Types";

const INITIAL_STATE = {
  visible: false,
  reviewStatus: "",
  reviewApproveStaus:'',
  reviewPendingList:[],
  reviewApproveList:[]
};

export default (state = INITIAL_STATE, action) => {
  // console.log("redux reducer", action);
  switch (action.type) {
    case SENDREVIEWS:
      return { ...state, messageStatus: action.reviewStatus };
      case SENDAPPROVEREVIEW:
      return { ...state, reviewApproveStaus: action.reviewApproveStaus };
    case ALLPENDINGREVIEWS:
      return { ...state, reviewPendingList: action.reviewPendingList };
      case ALLAPPROVEREVIEWS:
      return { ...state, reviewApproveList: action.reviewApproveList };
    default:
      return { ...state };
  }
};

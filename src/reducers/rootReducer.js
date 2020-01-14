import { combineReducers } from "redux";
import authReducer from "reducers/authReducer";
import statCardReducer from "reducers/statCardReducer";
import errorReducer from "./errorReducer";
import jobReducer from  './jobReducer';
import userReducer from "./userReducer";
export default combineReducers({
  // the authReducer will work only with authState
  authState: authReducer,
  // the statCardReducer will work only with statCardState
  statCardState: statCardReducer,
  errorState : errorReducer,
  jobState  : jobReducer,
  userState : userReducer
});
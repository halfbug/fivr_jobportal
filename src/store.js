import { createStore, applyMiddleware, compose  } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "reducers/rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
function configureStore(state = { 
  authState: { 
    currentUser:{uid: null,
      displayName: null,
      role : null,
      email:null
    }
  }, 
  statCardState: {},
  errorState: {},
  jobState: {}
}) {
  return createStore(rootReducer, state, composeEnhancers(applyMiddleware(reduxThunk)));
}
export default configureStore;
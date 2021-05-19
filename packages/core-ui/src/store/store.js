import { combineReducers, createStore, compose } from 'redux';

const initialState={
    appName:"core-ui",
}

const coreUiReducer=(state=initialState,action)=>{
    switch (action.type) {   
        default:
            return state;
    }
};
const staticReducers={
    coreUI:coreUiReducer
}
const configureStore=(initialState)=>{
    const composeEnhancers= typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
    const enhancer = composeEnhancers();
    const store = createStore(createReducer(), enhancer);
    store.asyncReducers = {};

    store.injectReducer = (key, asyncReducer) => {
      store.asyncReducers[key] = asyncReducer;
      store.replaceReducer(createReducer(store.asyncReducers));
    };
    return store;  
}
const createReducer=(asyncReducers)=> {
    return combineReducers({
      ...staticReducers,
      ...asyncReducers,
    });
  }

  export const store=configureStore();
  export default configureStore;

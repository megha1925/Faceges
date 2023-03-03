import { createStore, applyMiddleware, compose } from "redux";
// import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { useMemo } from "react";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// let store;

const initialState = {};

const middleware = [thunk];

const configureStore = (preloadedState = initialState) =>
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
  );

let store;
//console.log(store.getState());
//export const wrapper = createWrapper(configureStore);

export const initializeStore = (preloadedState) => {
  let _store = store ?? configureStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = configureStore({ ...store.getStore(), preloadedState });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};

//export default useStore;

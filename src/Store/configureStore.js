import { configureStore, combineReducers } from '@reduxjs/toolkit';

const contador = () => 0;
const reducer = combineReducers({ contador });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

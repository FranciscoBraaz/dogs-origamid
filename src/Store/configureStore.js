import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { localStorage } from '../Middlewares/localStorage';
import photo from './photo';
import token from './token';
import user from './user';

const reducer = combineReducers({ photo, token, user });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorage),
});

export default store;

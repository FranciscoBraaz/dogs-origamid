import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { localStorage } from '../Middlewares/localStorage';
import photo from './photo';
import token from './token';
import user from './user';
import feed from './feed';
import ui from './ui';
import postPhoto from './postPhoto';

const reducer = combineReducers({ photo, postPhoto, token, user, feed, ui });
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorage),
});

export default store;

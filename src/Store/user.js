import { USER_GET } from '../Components/api';
import { createAsyncSlice } from '../Components/Helper/createAsyncSlice';
import { fetchToken, resetTokenState } from './token';

const slice = createAsyncSlice({
  name: 'user',
  fetchConfig: (token) => USER_GET(token),
});

const { resetState: resetUserState, fetchError } = slice.actions;
const fetchUser = slice.asyncAction;

export const fetchLogin = (user) => async (dispatch) => {
  const { payload } = await dispatch(fetchToken(user));
  if (payload.token) {
    await dispatch(fetchUser(payload.token));
  }
};

export const autoLogin = () => async (dispatch, getState) => {
  const { token } = getState();
  if (token.data?.token) {
    const { type } = await dispatch(fetchUser(token.data.token));
    if (type === fetchError.type) {
      dispatch(userLogout());
    }
  }
};

export const userLogout = () => async (dispatch) => {
  dispatch(resetUserState());
  dispatch(resetTokenState());
  window.localStorage.removeItem('token');
};

export default slice.reducer;

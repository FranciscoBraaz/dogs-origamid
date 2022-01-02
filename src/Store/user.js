import { USER_GET } from '../Components/api';
import { createAsyncSlice } from '../Components/Helper/createAsyncSlice';
import { fetchToken } from './token';

const user = createAsyncSlice({
  name: 'user',
  fetchConfig: (token) => USER_GET(token),
});

const fetchUser = user.asyncAction;

export const fetchLogin = (user) => async (dispatch) => {
  const { payload } = await dispatch(fetchToken(user));
  if (payload.token) {
    dispatch(fetchUser(payload.token));
  }
};

// export const autoLogin = () => async (dispatch) => {}

export default user.reducer;

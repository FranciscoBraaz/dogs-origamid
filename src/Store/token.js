import { TOKEN_POST } from '../Components/api';
import { createAsyncSlice } from '../Components/Helper/createAsyncSlice';
import { getLocalStorage } from '../Components/Helper/getLocalStorage';

const slice = createAsyncSlice({
  name: 'token',
  initialState: {
    loading: false,
    data: {
      token: getLocalStorage('token', null),
    },
    error: null,
  },
  reducers: {
    fetchSuccess: {
      reducer(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      prepare(payload) {
        return {
          payload,
          meta: {
            localStorage: {
              key: 'token',
              value: payload.token,
            },
          },
        };
      },
    },
  },
  fetchConfig: (user) => TOKEN_POST(user),
});

export const { resetState: resetTokenState } = slice.actions;
export const fetchToken = slice.asyncAction;

export default slice.reducer;

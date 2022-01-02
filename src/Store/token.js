import { TOKEN_POST } from '../Components/api';
import { createAsyncSlice } from '../Components/Helper/createAsyncSlice';

const token = createAsyncSlice({
  name: 'token',
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

export const fetchToken = token.asyncAction;

export default token.reducer;

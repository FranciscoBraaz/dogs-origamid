import { PHOTOS_GET } from '../Components/api';
import { createAsyncSlice } from '../Components/Helper/createAsyncSlice';

const slice = createAsyncSlice({
  name: 'feed',
  initialState: {
    list: [],
    pages: 1,
    infinite: true,
  },
  reducers: {
    addPhotos(state, action) {
      state.list.push(...action.payload);
      if (action.payload.length === 0) state.infinite = false;
    },
    addPages(state) {
      state.pages++;
    },
    resetState(state) {
      state.list = [];
      state.pages = 1;
      state.infinite = true;
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  fetchConfig: ({ page, total, user }) => PHOTOS_GET({ page, total, user }),
});

export const {
  addPhotos,
  addPages,
  resetState: resetFeedState,
} = slice.actions;
const requestFeed = slice.asyncAction;

export const loadNewPhotos =
  ({ total, user }) =>
  async (dispatch, getState) => {
    const { pages } = getState().feed;
    dispatch(addPages());

    const { payload } = await dispatch(
      requestFeed({ page: pages, total, user }),
    );

    dispatch(addPhotos(payload));
  };

export default slice.reducer;

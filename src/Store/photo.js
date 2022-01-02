import { PHOTO_GET } from '../Components/api';

const PHOTO_FETCH_STARTED = 'photo/fetchStarted';
const PHOTO_FETCH_SUCCESS = 'photo/fetchSuccess';
const PHOTO_FETCH_ERROR = 'photo/fetchError';

const fetchStarted = () => ({ type: PHOTO_FETCH_STARTED });

const fetchSuccess = (data) => ({ type: PHOTO_FETCH_SUCCESS, payload: data });

const fetchError = (error) => ({ type: PHOTO_FETCH_ERROR, payload: error });

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export default function photo(state = initialState, action) {
  switch (action.type) {
    case PHOTO_FETCH_STARTED:
      return { ...state, loading: true, data: null, error: null };
    case PHOTO_FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case PHOTO_FETCH_ERROR:
      return { ...state, loading: false, data: null, error: action.payload };
    default:
      return state;
  }
}

export const fetchPhoto = (id) => async (dispatch) => {
  try {
    dispatch(fetchStarted());
    const { url, options } = PHOTO_GET(id);
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === false) throw new Error(data.message);
    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchError(error));
  }
};

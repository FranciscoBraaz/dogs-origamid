import { PHOTO_POST } from '../Components/api';
import { createAsyncSlice } from '../Components/Helper/createAsyncSlice';

const slice = createAsyncSlice({
  name: 'postPhoto',
  fetchConfig: ({ formData, token }) => PHOTO_POST(formData, token),
});

export const photoPost = slice.asyncAction;
export default slice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTags,createTags,updateTags } from "../api/tags";


export const getTagsThunk = createAsyncThunk(
  "Tags/getTags",
  async function getTagsAsync() {
    const result = await getTags();
    return result.data;
  }
)

export const createTagsThunk = createAsyncThunk(
  "Tags/createTags",
  async function createTagsAsync({tagName}) {
    const result = await createTags(tagName);
    return result.data;
  }
)

export const updateTagsThunk = createAsyncThunk(
  "Tags/updateTags",
  async function updateTagsAsync({tagName,tagId}) {
    const result = await updateTags(tagName,tagId);
    return result.data;
  }
)


const initialState = {
  tags: [],
  isLoading: false,
  isLoaded: false,
  error: null
}
export const TagsSlice = createSlice({
  name: 'TagsSlice',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getTagsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTagsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
      state.tags = action.payload;
    });
    builder.addCase(getTagsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createTagsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createTagsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
    builder.addCase(createTagsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateTagsThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateTagsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
    builder.addCase(updateTagsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  }

})
export const {} = TagsSlice.actions;
export default TagsSlice.reducer;

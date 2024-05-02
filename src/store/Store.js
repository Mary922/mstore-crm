import { configureStore } from "@reduxjs/toolkit";
import { UnitsSlice } from "../slices/UnitsSlice";
import { TagsSlice } from "../slices/TagsSlice";


const Store = configureStore({
  reducer: {
    units: UnitsSlice.reducer,
    tags: TagsSlice.reducer,
  }
})
export default Store;

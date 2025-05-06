import { configureStore } from "@reduxjs/toolkit";
import { UnitsSlice } from "../slices/UnitsSlice";
import { TagsSlice } from "../slices/TagsSlice";
import { ColorsSlice } from "../slices/ColorsSlice";
import { CategoriesSlice } from "../slices/CategoriesSlice";
import { ProductsSlice } from "../slices/ProductsSlice";
import { SeasonsSlice } from "../slices/SeasonsSlice";
import { SizesSlice } from "../slices/SizesSlice";
import { CountriesSlice } from "../slices/CountriesSlice";
import { BrandsSlice } from "../slices/BrandsSlice";
import { GendersSlice } from "../slices/GenderSlice";


const Store = configureStore({
  reducer: {
    units: UnitsSlice.reducer,
    tags: TagsSlice.reducer,
    colors: ColorsSlice.reducer,
    categories: CategoriesSlice.reducer,
    products: ProductsSlice.reducer,
    seasons: SeasonsSlice.reducer,
    sizes: SizesSlice.reducer,
    countries: CountriesSlice.reducer,
    brands: BrandsSlice.reducer,
    genders: GendersSlice.reducer,
  }
})
export default Store;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CFormInput,
  CFormLabel,
  CCardHeader, CButton, CFormSelect, CFormTextarea
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, updateProduct,createProduct } from "../../api/products";
import { getTagsThunk } from "../../slices/TagsSlice";
import Select from "react-select";
import CIcon from "@coreui/icons-react";
import { cilPencil } from "@coreui/icons";
import { getCategoriesThunk } from "../../slices/CategoriesSlice";
import { getColorsThunk } from "../../slices/ColorsSlice";
import { getUnitsThunk } from "../../slices/UnitsSlice";
import { getSeasonsThunk } from "../../slices/SeasonsSlice";
import { getSizesThunk } from "../../slices/SizesSlice";
import { getCountriesThunk } from "../../slices/CountriesSlice";
import { getBrandsThunk } from "../../slices/BrandsSlice";
import { VALUE_NOT_SELECTED } from "../../constants";
import { getProductsThunk } from "../../slices/ProductsSlice";

const initialState = {
  product_name: "",
  tags: [],
  categories: [],
  colors: [],
  unit_id: -1,
  product_description: "",
  season_id: -1,
  size_id: -1,
  country_id: -1,
  brand_id: -1,
};
const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentProductId = params.productId;

  const [product, setProduct] = useState({});
  const [form, setForm] = useState(initialState);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    dispatch(getTagsThunk());
    dispatch(getCategoriesThunk());
    dispatch(getColorsThunk());
    dispatch(getUnitsThunk());
    dispatch(getSeasonsThunk());
    dispatch(getSizesThunk());
    dispatch(getCountriesThunk());
    dispatch(getBrandsThunk());
  }, []);
  const tagsList = useSelector(state => {
    return state.tags.tags;
  });
  const categoriesList = useSelector(state => {
    return state.categories.categories;
  });
  const colorsList = useSelector(state => {
    return state.colors.colors;
  });
  const unitsList = useSelector(state => {
    return state.units.units;
  });
  const seasonsList = useSelector(state => {
    return state.seasons.seasons;
  });
  const sizesList = useSelector(state => {
    return state.sizes.sizes;
  });
  const countriesList = useSelector(state => {
    return state.countries.countries;
  });
  const brandsList = useSelector(state => {
    return state.brands.brands;
  });

  useEffect(() => {
    (async () => {
        if (currentProductId) {
          try {
            const result = await getProduct(currentProductId);
            // console.log("RES PRODUCT", result);
            setProduct(result.data);
            const product = result.data;

            let selectedTagsOptions = [];
            let selectedCategoriesOptions = [];
            let selectedColorsOptions = [];
            for (let i = 0; i < product.Tags.length; i++) {
              let newObj = {
                value: product.Tags[i].tag_id,
                label: product.Tags[i].tag_name
              };
              selectedTagsOptions.push(newObj);
            }
            for (let i = 0; i < product.Categories.length; i++) {
              let newObj = {
                value: product.Categories[i].category_id,
                label: product.Categories[i].category_name
              };
              selectedCategoriesOptions.push(newObj);
            }
            for (let i = 0; i < product.Colors.length; i++) {
              let newObj = {
                value: product.Colors[i].color_id,
                label: product.Colors[i].color_name
              };
              selectedColorsOptions.push(newObj);
            }

            setForm({
              product_name: result.data.product_name,
              tags: selectedTagsOptions,
              categories: selectedCategoriesOptions,
              colors: selectedColorsOptions,
              unit_id: result.data.Unit.unit_id,
              season_id: result.data.Season.season_id,
              size_id: result.data.Size.size_id,
              country_id: result.data.Country.country_id,
              brand_id: result.data.Brand.brand_id,
              product_description: result.data.product_description
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          setIsEditMode(true);
        }
      }
    )();
  }, []);
  // console.log("Product STATE", product);
  console.log("FORM", form);

  const setFieldChange = (field, value) => {
    console.log(field, value);
    setForm((prevState) => {
      // console.log("prev", prevState);
      let newState = { ...prevState, [field]: value };
      // console.log("newState", newState);
      return newState;
    });
  };

  const tagsOptions = [];
  for (let i = 0; i < tagsList.length; i++) {
    let newObj = {
      value: tagsList[i].tag_id,
      label: tagsList[i].tag_name
    };
    tagsOptions.push(newObj);
  }

  const categoriesOptions = [];
  for (let i = 0; i < categoriesList.length; i++) {
    let newObj = {
      value: categoriesList[i].category_id,
      label: categoriesList[i].category_name
    };
    categoriesOptions.push(newObj);
  }

  const colorsOptions = [];
  for (let i = 0; i < colorsList.length; i++) {
    let newObj = {
      value: colorsList[i].color_id,
      label: colorsList[i].color_name
    };
    colorsOptions.push(newObj);
  }
  const unitsOptions = [VALUE_NOT_SELECTED];
  for (let i = 0; i < unitsList.length; i++) {
    let newObj = {
      value: unitsList[i].unit_id,
      label: unitsList[i].unit_name
    };
    unitsOptions.push(newObj);
  }
  const seasonsOptions = [VALUE_NOT_SELECTED];
  for (let i = 0; i < seasonsList.length; i++) {
    let newObj = {
      value: seasonsList[i].season_id,
      label: seasonsList[i].season_name
    };
    seasonsOptions.push(newObj);
  }
  const sizesOptions = [VALUE_NOT_SELECTED];
  for (let i = 0; i < sizesList.length; i++) {
    let newObj = {
      value: sizesList[i].size_id,
      label: sizesList[i].size_by_height
    };
    sizesOptions.push(newObj);
  }
  const countriesOptions = [VALUE_NOT_SELECTED];
  for (let i = 0; i < countriesList.length; i++) {
    let newObj = {
      value: countriesList[i].country_id,
      label: countriesList[i].country_name
    };
    countriesOptions.push(newObj);
  }
  const brandsOptions = [VALUE_NOT_SELECTED];
  for (let i = 0; i < brandsList.length; i++) {
    let newObj = {
      value: brandsList[i].brand_id,
      label: brandsList[i].brand_name
    };
    brandsOptions.push(newObj);
  }

  const handleUpdateProduct = async () => {
    const arrayOfTagIds = [];
    const arrayOfCategoriesIds = [];
    const arrayOfColorsIds = [];
    for (let i = 0; i < form.tags.length; i++) {
      arrayOfTagIds.push(form.tags[i].value);
    }
    for (let i = 0; i < form.categories.length; i++) {
      arrayOfCategoriesIds.push(form.categories[i].value);
    }
    for (let i = 0; i < form.colors.length; i++) {
      arrayOfColorsIds.push(form.colors[i].value);
    }
    await updateProduct({
      productId: currentProductId,
      productName: form.product_name,
      productTagsIds: arrayOfTagIds,
      productCategoriesIds: arrayOfCategoriesIds,
      productColorsIds: arrayOfColorsIds,
      productUnitId: form.unit_id,
      productSeasonId: form.season_id,
      productSizeId: form.size_id,
      productCountryId: form.country_id,
      productBrandId: form.brand_id,
      productDescription: form.product_description
    });
    setIsEditMode(false);
  };

  const handleCreateProduct = async () => {
    const arrayOfTagIds = [];
    const arrayOfCategoriesIds = [];
    const arrayOfColorsIds = [];
    for (let i = 0; i < form.tags.length; i++) {
      arrayOfTagIds.push(form.tags[i].value);
    }
    for (let i = 0; i < form.categories.length; i++) {
      arrayOfCategoriesIds.push(form.categories[i].value);
    }
    for (let i = 0; i < form.colors.length; i++) {
      arrayOfColorsIds.push(form.colors[i].value);
    }
    await createProduct({
      productName: form.product_name,
      productTagsIds: arrayOfTagIds,
      productCategoriesIds: arrayOfCategoriesIds,
      productColorsIds: arrayOfColorsIds,
      productUnitId: form.unit_id,
      productSeasonId: form.season_id,
      productSizeId: form.size_id,
      productCountryId: form.country_id,
      productBrandId: form.brand_id,
      productDescription: form.product_description
    });
    navigate(-2);
    dispatch(getProductsThunk());
  }

  const checkFilledForms = () => {
    let arrayOfNotFilledInputs = [];
    if (form.product_name.trim().length < 1) {
      arrayOfNotFilledInputs.push('name');
    }
    if (form.unit_id === -1) {
      arrayOfNotFilledInputs.push('unit');
    }
    if (form.tags.length < 1) {
      arrayOfNotFilledInputs.push('tags');
    }
    if (form.categories.length < 1) {
      arrayOfNotFilledInputs.push('categories');
    }
    if (form.colors.length < 1) {
      arrayOfNotFilledInputs.push('colors');
    }
    if (form.season_id === -1) {
      arrayOfNotFilledInputs.push('season');
    }
    if (form.size_id === -1) {
      arrayOfNotFilledInputs.push('size');
    }
    if (form.country_id === -1) {
      arrayOfNotFilledInputs.push('country');
    }
    if (form.brand_id === -1) {
      arrayOfNotFilledInputs.push('brand');
    }
    console.log({ arrayOfNotFilledInputs });
    if (arrayOfNotFilledInputs.length > 0) {
      alert(`Fill ${arrayOfNotFilledInputs.join(',')}`);
      return false
    }
    return true;
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <div>Id: {currentProductId}</div>
          {
            currentProductId ?
              <CIcon icon={cilPencil} style={{ width: "40px", height: "40px" }} onClick={() => setIsEditMode(true)} />
              : null
          }
        </CCardHeader>
        <CCardBody>
          <CFormLabel>Name: </CFormLabel>
          <CFormInput type={"text"}
                      disabled={!isEditMode}
                      value={form.product_name}
                      onChange={(event) => setFieldChange("product_name", event.target.value)} />
          <CFormLabel>Unit: </CFormLabel>
          <CFormSelect size="sm"
                       className="mb-3"
                       aria-label="Small select example"
                       disabled={!isEditMode}
                       options={unitsOptions}
                       value={form.unit_id}
                       onChange={(event) => setFieldChange("unit_id", Number.parseInt(event.target.value))}
          />
          <CFormLabel>Tags: </CFormLabel>

          <Select isMulti
                  isDisabled={!isEditMode}
                  name={"tags"}
                  classNamePrefix="select"
                  className="basic-multi-select"
                  options={tagsOptions}
                  value={form.tags}
                  onChange={event => setFieldChange("tags", event)}
          />
          <CFormLabel>Categories: </CFormLabel>
          <Select isMulti
                  isDisabled={!isEditMode}
                  name={"categories"}
                  classNamePrefix="select"
                  className="basic-multi-select"
                  options={categoriesOptions}
                  value={form.categories}
                  onChange={event => setFieldChange("categories", event)}
          />
          <CFormLabel>Colors: </CFormLabel>
          <Select isMulti
                  isDisabled={!isEditMode}
                  name={"colors"}
                  classNamePrefix="select"
                  className="basic-multi-select"
                  options={colorsOptions}
                  value={form.colors}
                  onChange={event => setFieldChange("colors", event)}
          />
          <CFormLabel>Season: </CFormLabel>
          <CFormSelect size="sm"
                       className="mb-3"
                       aria-label="Small select example"
                       disabled={!isEditMode}
                       options={seasonsOptions}
                       value={form.season_id}
                       onChange={(event) => setFieldChange("season_id", Number.parseInt(event.target.value))}
          />
          <CFormLabel>Size: </CFormLabel>
          <CFormSelect size="sm"
                       className="mb-3"
                       aria-label="Small select example"
                       disabled={!isEditMode}
                       options={sizesOptions}
                       value={form.size_id}
                       onChange={(event) => setFieldChange("size_id", Number.parseInt(event.target.value))}
          />
          <CFormLabel>Country: </CFormLabel>
          <CFormSelect size="sm"
                       className="mb-3"
                       aria-label="Small select example"
                       disabled={!isEditMode}
                       options={countriesOptions}
                       value={form.country_id}
                       onChange={(event) => setFieldChange("country_id", Number.parseInt(event.target.value))}
          />
          <CFormLabel>Brand: </CFormLabel>
          <CFormSelect size="sm"
                       className="mb-3"
                       aria-label="Small select example"
                       disabled={!isEditMode}
                       options={brandsOptions}
                       value={form.brand_id}
                       onChange={(event) => setFieldChange("brand_id", Number.parseInt(event.target.value))}
          />

          <CFormTextarea id="exampleFormControlTextarea1"
                         label="Description:"
                         rows={3}
                         text="Must be 3-10 words long."
                         disabled={!isEditMode}
                         value={form.product_description ? form.product_description : ""}
                         onChange={(event) => setFieldChange("product_description", event.target.value)}
          />

        </CCardBody>
      </CCard>
      {
        currentProductId ?
          <CButton onClick={handleUpdateProduct}>Обновить продукт</CButton>
          :
          <CButton onClick={()=> {
            if (!checkFilledForms()) {
              // alert('Заполните данные');
              return false;
            };
            handleCreateProduct();
            navigate(-1);
          }}>Добавить продукт</CButton>

      }
    </>
  );
};
export default Product;

import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CFormInput,
  CFormLabel,
  CCardHeader,
  CButton,
  CFormSelect,
  CFormTextarea,
  CTableRow,
  CCol,
  CTable,
  CTableHead,
  CTableHeaderCell, CTableBody, CRow, CTableDataCell, CInputGroup, CCardGroup, CForm, CFormCheck
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, updateProduct, createProduct } from "../../api/products";
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
import { GENDER_NAME, SIZES_NAME, VALUE_NOT_SELECTED, SIZES, GENDER } from "../../constants";
import { getProductsThunk } from "../../slices/ProductsSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
import { uploadImage } from "../../api/uploads";
import { getGendersThunk } from "../../slices/GenderSlice";

const initialState = {
  product_name: "",
  tags: [],
  categories: [],
  colors: [],
  unit_id: -1,
  product_description: "",
  season_id: -1,
  sizes: [],
  country_id: -1,
  brand_id: -1,
  gender_id: -1,
  imageId: "",
  imageIds: []
};
const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentProductId = params.productId;

  const [product, setProduct] = useState({});
  const [prices, setPrices] = useState([]);
  const [form, setForm] = useState(initialState);
  const [isEditMode, setIsEditMode] = useState(false);
  const [priceCreateMode, setPriceCreateMode] = useState(false);
  const [priceValue, setPriceValue] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [changePriceDate, setChangePriceDate] = useState(new Date());

  const [files, setFiles] = useState(null);
  const [imageId, setImageId] = useState("");
  const [imageIds, setImageIds] = useState([]);



  useEffect(() => {
    dispatch(getTagsThunk());
    dispatch(getCategoriesThunk());
    dispatch(getColorsThunk());
    dispatch(getUnitsThunk());
    dispatch(getSeasonsThunk());
    dispatch(getSizesThunk());
    dispatch(getCountriesThunk());
    dispatch(getBrandsThunk());
    dispatch(getGendersThunk())
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
  const gendersList = useSelector(state => {
    return state.genders.genders;
  })

  useEffect(() => {
    (async () => {
        if (currentProductId) {
          try {
            const result = await getProduct(currentProductId);
            console.log("RES PRODUCT", result);

            const product = result.data.product;
            setProduct(product);

            if (result?.data?.prices) {
              const prices = result.data.prices;
              setPrices(prices);
            }
            if (result?.data?.priceActual) {
              const actual = result.data.priceActual;
              setActualPrice(actual);
            }
            // console.log('pricespricesprices',prices);

            let selectedTagsOptions = [];
            let selectedCategoriesOptions = [];
            let selectedColorsOptions = [];
            let selectedSizesOptions = [];
            if (product?.Tags) {
              for (let i = 0; i < product.Tags.length; i++) {
                let newObj = {
                  value: product.Tags[i].tag_id,
                  label: product.Tags[i].tag_name
                };
                selectedTagsOptions.push(newObj);
              }
            }
            if (product?.Categories) {
              for (let i = 0; i < product.Categories.length; i++) {
                let newObj = {
                  value: product.Categories[i].category_id,
                  label: product.Categories[i].category_name
                };
                selectedCategoriesOptions.push(newObj);
              }
            }
            if (product?.Colors) {
              for (let i = 0; i < product.Colors.length; i++) {
                let newObj = {
                  value: product.Colors[i].color_id,
                  label: product.Colors[i].color_name
                };
                selectedColorsOptions.push(newObj);
              }
            }

            if (product.Sizes) {
              for (let i = 0; i < product.Sizes.length; i++) {
                let newObj = {
                  value: product.Sizes[i].size_id,
                  label: product.Sizes[i].size_name,
                  type: product.Sizes[i].size_type
                };
                selectedSizesOptions.push(newObj);
              }
            }
            if (product?.Unit) {
              setForm({
                product_name: product.product_name,
                tags: selectedTagsOptions,
                categories: selectedCategoriesOptions,
                colors: selectedColorsOptions,
                unit_id: product.Unit.unit_id,
                season_id: product.Season.season_id,
                sizes: selectedSizesOptions,
                country_id: product.Country.country_id,
                brand_id: product.Brand.brand_id,
                product_description: product.product_description
              });
            }

          } catch (error) {
            console.log(error);
          }
        } else {
          setIsEditMode(true);
        }
      }
    )();
  }, [priceValue]);


  const setFieldChange = (field, value) => {
    // console.log(field, value);
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
      label: categoriesList[i].category_name + " " + "(" + GENDER_NAME[categoriesList[i].gender] + ")"
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
  const sizesOptions = [SIZES.NOT_SELECTED];
  for (let i = 0; i < sizesList.length; i++) {
    let newObj = {
      value: sizesList[i].size_id,
      label: sizesList[i].size_name,
      type: sizesList[i].size_type,
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
  const gendersOptions = [VALUE_NOT_SELECTED];
  for (let i = 0; i < gendersList.length; i++) {
    let newObj = {
      value: gendersList[i].gender_id,
      label: gendersList[i].gender_name
    };
    gendersOptions.push(newObj);
  }

  const handleUpdateProduct = async () => {
    const arrayOfTagIds = [];
    const arrayOfCategoriesIds = [];
    const arrayOfColorsIds = [];
    const arrayOfSizesIds = [];
    for (let i = 0; i < form.tags.length; i++) {
      arrayOfTagIds.push(form.tags[i].value);
    }
    for (let i = 0; i < form.categories.length; i++) {
      arrayOfCategoriesIds.push(form.categories[i].value);
    }
    for (let i = 0; i < form.colors.length; i++) {
      arrayOfColorsIds.push(form.colors[i].value);
    }
    for (let i = 0; i < form.sizes.length; i++) {
      arrayOfSizesIds.push(form.sizes[i].value);
    }

    let newPrice = {
      product_id: currentProductId,
      price: priceValue,
      time_beginning: changePriceDate
    };
    await updateProduct({
      productId: currentProductId,
      productName: form.product_name,
      productTagsIds: arrayOfTagIds,
      productCategoriesIds: arrayOfCategoriesIds,
      productColorsIds: arrayOfColorsIds,
      productUnitId: form.unit_id,
      productSeasonId: form.season_id,
      productSizesIds: arrayOfSizesIds,
      productCountryId: form.country_id,
      productBrandId: form.brand_id,
      productGenderId: form.gender_id,
      productDescription: form.product_description,
      productPrice: newPrice,
      imageId: imageId,
      imageIds: imageIds
    });
    setIsEditMode(false);
    setPriceValue("");
    setChangePriceDate(new Date());
  };

  const handleCreateProduct = async () => {
    const arrayOfTagIds = [];
    const arrayOfCategoriesIds = [];
    const arrayOfColorsIds = [];
    const arrayOfSizesIds = [];
    for (let i = 0; i < form.tags.length; i++) {
      arrayOfTagIds.push(form.tags[i].value);
    }
    for (let i = 0; i < form.categories.length; i++) {
      arrayOfCategoriesIds.push(form.categories[i].value);
    }
    for (let i = 0; i < form.colors.length; i++) {
      arrayOfColorsIds.push(form.colors[i].value);
    }
    for (let i = 0; i < form.sizes.length; i++) {
      arrayOfSizesIds.push(form.sizes[i].value);
    }
    await createProduct({
      productName: form.product_name,
      price: priceValue,
      productTagsIds: arrayOfTagIds,
      productCategoriesIds: arrayOfCategoriesIds,
      productColorsIds: arrayOfColorsIds,
      productUnitId: form.unit_id,
      productSeasonId: form.season_id,
      productSizesIds: arrayOfSizesIds,
      productCountryId: form.country_id,
      productBrandId: form.brand_id,
      productGenderId: form.gender_id,
      productDescription: form.product_description,
      imageId: imageId,
      imageIds: imageIds

    });
    //navigate(-2);
    dispatch(getProductsThunk());
  };

  const checkFilledForms = () => {
    let arrayOfNotFilledInputs = [];
    if (form.product_name.trim().length < 1) {
      arrayOfNotFilledInputs.push("name");
    }
    if (form.unit_id === -1) {
      arrayOfNotFilledInputs.push("unit");
    }
    if (form.tags.length < 1) {
      arrayOfNotFilledInputs.push("tags");
    }
    if (form.categories.length < 1) {
      arrayOfNotFilledInputs.push("categories");
    }
    if (form.colors.length < 1) {
      arrayOfNotFilledInputs.push("colors");
    }
    if (form.season_id === -1) {
      arrayOfNotFilledInputs.push("season");
    }
    if (form.sizes.length < 1) {
      arrayOfNotFilledInputs.push("sizes");
    }
    if (form.country_id === -1) {
      arrayOfNotFilledInputs.push("country");
    }
    if (form.brand_id === -1) {
      arrayOfNotFilledInputs.push("brand");
    }
    if (form.gender_id === -1) {
      arrayOfNotFilledInputs.push("gender");
    }
    // console.log({ arrayOfNotFilledInputs });
    if (arrayOfNotFilledInputs.length > 0) {
      alert(`Fill ${arrayOfNotFilledInputs.join(",")}`);
      return false;
    }
    return true;
  };

  const pricesList = prices.map(price => {
    return (
      <CTableRow key={price.price_id}>
        <CTableDataCell>{price.price_id}</CTableDataCell>
        <CTableDataCell>{price.price}</CTableDataCell>
        <CTableDataCell>{moment.unix(price.time_beginning).format("DD.MM.YYYY HH:mm")}</CTableDataCell>
      </CTableRow>
    );
  });
  const priceCreateToggleMode = () => {
    setPriceCreateMode(!priceCreateMode);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleUploadImage = async () => {
    const res = await uploadImage(files);
    setImageIds(res.imageIds);
  };


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
          {/*{optionsSizesCheckbox.map((option) => (*/}
          {/*  <CFormCheck*/}
          {/*    key={option.id}*/}
          {/*    id={option.id}*/}
          {/*    label={option.label}*/}
          {/*    checked={selectedOption === option.id}*/}
          {/*    onChange={() => handleChangeCheckbox(option.id)}*/}
          {/*    disabled={selectedOption !== null && selectedOption !== option.id}*/}
          {/*  />*/}
          {/*))}*/}
          {/*<br />*/}

          <CFormLabel>Sizes: </CFormLabel>
          <Select isMulti
                  classNamePrefix="select"
                  className="basic-multi-select"
                  disabled={!isEditMode}
                  name={"sizes"}
                  options={sizesOptions}
                  value={form.sizes}
                  getOptionLabel={option => `${option.label} (${SIZES_NAME[option.type]})`}
                  getOptionValue={(option) => option.value}
                  onChange={(event) => setFieldChange("sizes", (event))}
          />
          <br />
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

          <CFormLabel>Gender: </CFormLabel>
          <CFormSelect size="sm"
                       className="mb-3"
                       aria-label="Small select example"
                       disabled={!isEditMode}
                       options={gendersOptions}
                       value={form.gender_id}
                       onChange={(event) => setFieldChange("gender_id", Number.parseInt(event.target.value))}
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
        :
      </CCard>
      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardHeader>Prices</CCardHeader>
            <CCardBody>
              <CTable striped hover bordered>
                <CTableHead color="primary">
                  <CTableRow>
                    <CTableHeaderCell scope={"col"}>Price id</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Price</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Time beginning</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {pricesList}
                </CTableBody>
              </CTable>
              <div>Actual price: {actualPrice.price} </div>
            </CCardBody>
            {
              priceCreateMode ?
                <CCardGroup style={{ marginLeft: "15px", marginBottom: "20px" }}>
                  <CFormInput value={priceValue}
                              onChange={event => setPriceValue(event.target.value)}
                              placeholder={"price"}
                              style={{ width: "50%", marginRight: "10px" }} />
                  <DatePicker selected={changePriceDate} onChange={date => setChangePriceDate((date))} />
                </CCardGroup>
                : null
            }
            <CButton style={{ width: "100px", marginBottom: "10px", marginLeft: "15px" }}
                     onClick={priceCreateToggleMode}>
              {
                priceCreateMode ? "Dont add price" : "Add price"
              }
            </CButton>
            <CRow>
              <CForm id={"form"}>
                <CFormLabel htmlFor={"name"}>Image:</CFormLabel>
                <CFormInput id={"file"} type={"file"} onChange={handleFileChange} multiple={true}></CFormInput>
                <CButton onClick={handleUploadImage}>Загрузить картинку</CButton>
              </CForm>
            </CRow>
          </CCard>
        </CCol>
      </CRow>

      {
        currentProductId ?
          <CButton onClick={handleUpdateProduct}>Обновить продукт</CButton>
          :
          <CButton onClick={() => {
            if (!checkFilledForms()) {
              // alert('Заполните данные');
              return false;
            }
            ;
            handleCreateProduct();
            navigate(-1);
          }}>Добавить продукт</CButton>

      }
    </>
  );
};
export default Product;

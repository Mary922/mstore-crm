import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CButton,
  CFormInput, CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import { createCategoriesThunk, getCategoriesThunk, updateCategoriesThunk } from "../../../slices/CategoriesSlice";
import { GENDER_NAME, VALUE_NOT_SELECTED } from "../../../constants";
import { getGenders } from "../../../api/genders";
import { getCategories, getParentsCategories } from "../../../api/categories";

const CategoriesModal = ({openModal,closeModal,category,deleteCategory}) => {
  const dispatch = useDispatch();
  const [categoryValue, setCategoryValue] = useState(category ? category.category_name : '');
  const [genders, setGenders] = useState([]);
  const [genderValue, setGenderValue] = useState(category ? category.gender : -1);
  const [categories, setCategories] = useState([]);
  const [categoryInputSelectedValue, setCategoryInputSelectedValue] = useState('');

  useEffect(()=> {
    (async ()=> {
      try {
        const result = await getGenders();
        const gendersList = result.data;
        setGenders(gendersList);

        const categories = await getCategories();
        if (categories.data.length > 0) {
          setCategories(categories.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  },[])

  const checkFilledInput = () => {
    if (categoryValue.trim().length < 1 || categoryValue === '' || genderValue === -1) {
      return false
    }
    return true;
  }
  const confirmDeleteCategory = async () => {
    const question = confirm('Are you sure you want to delete this category?');
    if (question) {
      deleteCategory();
    }
  }


  let gendersOptions = [VALUE_NOT_SELECTED];
  for (let i = 0; i < genders.length; i++) {
    let obj = {
      value: genders[i].gender_id,
      label: genders[i].gender_name
    }
    gendersOptions.push(obj);
  }

  let categoriesOptions = [VALUE_NOT_SELECTED];
  for (let i = 0; i < categories.length; i++) {
    let obj = {
      value: categories[i].category_id,
      label: `${categories[i].category_name} (${GENDER_NAME[categories[i].gender]})`
    }
    categoriesOptions.push(obj);
  }

  return (
    <>
      <CModal
        backdrop="static"
        visible={true}
        onClose={closeModal}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">{category ? 'Редактирование категории' : 'Создание новой категории'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CFormInput value={categoryValue}
                        onChange={(event) => setCategoryValue(event.target.value)}
                        placeholder={'new category'}
            />
          <CFormSelect size="sm"
                       className="mb-3"
                       aria-label="Small select example"
                       options={gendersOptions}
                       value={genderValue}
                       onChange={(event) => setGenderValue(event.target.value)}
          />
          <CFormSelect size="sm"
                       className="mb-3"
                       aria-label="Small select example"
                       options={categoriesOptions}
                       value={categoryInputSelectedValue}
                       onChange={(event) => setCategoryInputSelectedValue(event.target.value)}
          />
          {
            category ?  <CButton color={"primary"} onClick={deleteCategory}>Delete category</CButton> : null
          }
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Close
          </CButton>
          {category ?
            <CButton color="primary" onClick={async ()=> {
              if (!checkFilledInput()) {
                alert('Заполните данные');
                return false;
              }
              await dispatch(updateCategoriesThunk({
                categoryName: categoryValue.trim(),
                categoryId: category.category_id,
                gender: genderValue,
                parentId: categoryInputSelectedValue || null,
              }));
              await dispatch(getCategoriesThunk());
              closeModal();
            }}>Сохранить</CButton>
            :
            <CButton color="primary" onClick={async ()=> {
              if (!checkFilledInput()) {
                alert('Заполните данные');
                return false;
              }
              await dispatch(createCategoriesThunk({categoryName: categoryValue.trim(),gender: genderValue,parentId: categoryInputSelectedValue || null}));
              await dispatch(getCategoriesThunk());
              closeModal();
            }}>Сохранить</CButton>
          }
        </CModalFooter>
      </CModal>
    </>
  )
}
export default CategoriesModal;

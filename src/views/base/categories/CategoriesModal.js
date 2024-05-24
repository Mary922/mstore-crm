import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {
  CButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import { createCategoriesThunk, getCategoriesThunk, updateCategoriesThunk } from "../../../slices/CategoriesSlice";

const CategoriesModal = ({openModal,closeModal,category,deleteCategory}) => {
  const dispatch = useDispatch();
  const [categoryValue, setCategoryValue] = useState(category ? category.category_name : '');

  const checkFilledInput = () => {
    if (categoryValue.trim().length < 1 || categoryValue === '') {
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
                categoryId: category.category_id
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
              await dispatch(createCategoriesThunk({categoryName: categoryValue.trim()}));
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

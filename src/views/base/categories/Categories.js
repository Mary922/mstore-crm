import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CTableDataCell,
  CTableRow,
  CRow,
  CCol,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CCard,
  CCardBody,
  CTableHead,
  CButton
} from "@coreui/react";
import { getCategoriesThunk,deleteCategoriesThunk } from "../../../slices/CategoriesSlice";
import CategoriesModal from "./CategoriesModal";
import { GENDER, GENDER_NAME } from "../../../constants";
import { getGenders } from "../../../api/genders";

const Categories = () => {
  const dispatch = useDispatch();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, []);

  const openModal = () => {
    setModalIsVisible(true);
  };
  const closeModal = () => {
    setModalIsVisible(false);
    setCategory(null);
  };
  const deleteCategory = async () => {
    await dispatch(deleteCategoriesThunk({categoryId: category.category_id}));
    await dispatch(getCategoriesThunk());
    closeModal();
  }

  const categories = useSelector(state => {
    return state.categories.categories;
  });
  console.log("CATEGORIES", categories);
  console.log('category', category);

  const categoriesList = categories.map(category => {
    const parentCategory = categories.find(cat => cat.category_id === category.parent_id);
    console.log('parentCategory', parentCategory);
    return (
      <CTableRow key={category.category_id} onClick={() => {
        openModal();
        setCategory(category);
      }}>
        <CTableDataCell>{category.category_id}</CTableDataCell>
        <CTableDataCell>{category.category_name}</CTableDataCell>
        <CTableDataCell>{GENDER_NAME[category.gender]}</CTableDataCell>
        <CTableDataCell> {parentCategory ? parentCategory.category_name : "—"}</CTableDataCell>
      </CTableRow>
    );
  });


  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardBody>
              <CTable striped hover bordered>
                <CTableHead color="primary">
                  <CTableRow>
                    <CTableHeaderCell scope={"col"}>Id</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Category name</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Gender</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Родительская категория</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {categoriesList}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          <CButton color="primary" onClick={openModal}>Добавить категорию</CButton>
        </CCol>
      </CRow>
      {
        modalIsVisible ?  <CategoriesModal openModal={openModal}
                                           closeModal={closeModal}
                                           category={category}
                                           deleteCategory={deleteCategory}
          />
          : null
      }
    </>
  );
};
export default Categories;

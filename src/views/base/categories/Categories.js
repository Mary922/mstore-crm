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

  const categoriesList = categories.map(category => {
    return (
      <CTableRow key={category.category_id} onClick={() => {
        openModal();
        setCategory(category);
      }}>
        <CTableDataCell>{category.category_id}</CTableDataCell>
        <CTableDataCell>{category.category_name}</CTableDataCell>
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

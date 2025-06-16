import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../slices/ProductsSlice";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable, CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getProductsThunk());
  },[])

  const products = useSelector(state => {
    return state.products.products
  })

  const redirectToProduct = (id) => {
    navigate(`/product/${id}`);
  }
  const redirectToNewProduct = () => {
    navigate(`/product/new`);
  }

  const productsList = products.map(product => {

    return (
      <CTableRow key={product.product_id} onClick={() => {
        redirectToProduct(product.product_id)
      }}>
        <CTableDataCell>{product.product_id}</CTableDataCell>
        <CTableDataCell>{product.product_name}</CTableDataCell>
        <CTableDataCell>{product.Unit.unit_name}</CTableDataCell>
        <CTableDataCell>{product.price}</CTableDataCell>
        <CTableDataCell>{product.Tags.map(tag => tag.tag_name).join(', ')}</CTableDataCell>
        <CTableDataCell>{product.Categories.map(category => category.category_name).join(', ')}</CTableDataCell>
        <CTableDataCell>{product.Colors.map(color => color.color_name).join(', ')}</CTableDataCell>
        <CTableDataCell>{product.Season.season_name}</CTableDataCell>
        <CTableDataCell>{product.Sizes.map(size => size.size_name).join(', ')}</CTableDataCell>
        <CTableDataCell>{product.Country.country_name}</CTableDataCell>
        <CTableDataCell>{product.Brand.brand_name}</CTableDataCell>
        <CTableDataCell>{product.product_description}</CTableDataCell>
        <CTableDataCell>{moment.unix(product.created_at).format("MM.DD.YYYY HH:mm")}</CTableDataCell>
        <CTableDataCell></CTableDataCell>
      </CTableRow>
    );
  });



  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardBody>
              <CButton onClick={redirectToNewProduct} className='mb-2'>Добавить новый продукт</CButton>
              <CTable striped hover bordered>
                <CTableHead color="primary">
                  <CTableRow>
                    <CTableHeaderCell scope={"col"}>Id</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Название</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Ед.изм.</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Цена</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Теги</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Категории</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Цвета</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Сезон</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Размеры</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Страна</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Бренд</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Описание</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Создано</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Удалено</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {productsList}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
export default Products;

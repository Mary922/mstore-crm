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
  console.log('PRODUCTS', products);

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
        <CTableDataCell>{product.Tags.map(tag => tag.tag_name).join(', ')}</CTableDataCell>
        <CTableDataCell>{product.Categories.map(category => category.category_name).join(', ')}</CTableDataCell>
        <CTableDataCell>{product.Colors.map(color => color.color_name).join(', ')}</CTableDataCell>
        <CTableDataCell>{product.Season.season_name}</CTableDataCell>
        <CTableDataCell>{product.Size.size_by_height}</CTableDataCell>
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
              <CTable striped hover bordered>
                <CTableHead color="primary">
                  <CTableRow>
                    <CTableHeaderCell scope={"col"}>Id</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Product name</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Unit</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Tags</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Categories</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Colors</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Season</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Size</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Country</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Brand</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Description</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>created</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>deleted</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {productsList}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          <CButton onClick={redirectToNewProduct}>Add new product</CButton>
        </CCol>
      </CRow>
    </>
  );
}
export default Products;

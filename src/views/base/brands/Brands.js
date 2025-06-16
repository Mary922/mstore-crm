import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard, CCardBody,
  CCol, CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { getBrandsThunk } from "../../../slices/BrandsSlice";
import { BrandsModal } from "./BrandsModal";

const Brands = () => {
  const dispatch = useDispatch();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [brand, setBrand] = useState("");

  useEffect(() => {
    dispatch(getBrandsThunk());
  }, []);

  const openModal = () => {
    setModalIsVisible(true);
  };
  const closeModal = () => {
    setModalIsVisible(false);
    setBrand(null);
  };

  const brands = useSelector(state => {
    return state.brands.brands;
  });
  console.log("brands", brands);

  const brandsList = brands.map(brand => {
    return (
      <CTableRow key={brand.brand_id} onClick={() => {
        openModal();
        setBrand(brand);
      }}>
        <CTableDataCell>{brand.brand_id}</CTableDataCell>
        <CTableDataCell>{brand.brand_name}</CTableDataCell>
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
                    <CTableHeaderCell scope={"col"}>Brand name</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {brandsList}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          <CButton className='mx-2 my-2' color="primary" onClick={openModal}>Добавить бренд</CButton>
        </CCol>
      </CRow>
      {
        modalIsVisible ? <BrandsModal openModal={openModal}
                                     closeModal={closeModal}
                                     brand={brand} />
          : null
      }
    </>
  );
};
export default Brands;

import React, { useEffect, useState } from "react";
import {
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
import { getSizesThunk } from "../../../slices/SizesSlice";

const Sizes = () => {
  const dispatch = useDispatch();
  const [size, setSize] = useState("");

  useEffect(() => {
    dispatch(getSizesThunk());
  }, []);

  const sizes = useSelector(state => {
    return state.sizes.sizes;
  });

  const sizesList = sizes.map(size => {
    return (
      <CTableRow key={size.size_id} onClick={() => {
        setSize(size);
      }}>
        <CTableDataCell>{size.size_id}</CTableDataCell>
        <CTableDataCell>{size.size_by_height}</CTableDataCell>
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
                    <CTableHeaderCell scope={"col"}>Size by height</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {sizesList}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
export default Sizes;

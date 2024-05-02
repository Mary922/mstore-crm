import React, { useEffect } from "react";
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
import { getUnitsThunk } from "../../../slices/UnitsSlice";
import { useDispatch, useSelector } from "react-redux";

const Units = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUnitsThunk());
  }, []);

  const units = useSelector(state => {
    return state.units.units;
  });
  console.log("UNITS", units);

  const unitsList = units.map(unit => {
    return (
      <CTableRow key={unit.unit_id}>
        <CTableDataCell>{unit.unit_id}</CTableDataCell>
        <CTableDataCell>{unit.unit_name}</CTableDataCell>
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
                    <CTableHeaderCell scope={"col"}>Unit name</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {unitsList}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>


        </CCol>
      </CRow>

    </>
  );
};
export default Units;

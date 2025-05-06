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
import { getCountriesThunk } from "../../../slices/CountriesSlice";

const Countries = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");

  useEffect(() => {
    dispatch(getCountriesThunk());
  }, []);

  const countries = useSelector(state => {
    return state.countries.countries;
  });

  const countriesList = countries.map(country => {
    return (
      <CTableRow key={country.country_id} onClick={() => {
        setCountry(country);
      }}>
        <CTableDataCell>{country.country_id}</CTableDataCell>
        <CTableDataCell>{country.country_name}</CTableDataCell>
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
                    <CTableHeaderCell scope={"col"}>Country name</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {countriesList}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
export default Countries;

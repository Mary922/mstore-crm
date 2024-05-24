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
import { getSeasonsThunk } from "../../../slices/SeasonsSlice";

const Seasons = () => {
  const dispatch = useDispatch();
  const [season, setSeason] = useState("");

  useEffect(() => {
    dispatch(getSeasonsThunk());
  }, []);

  const seasons = useSelector(state => {
    return state.seasons.seasons;
  });

  const seasonsList = seasons.map(season => {
    return (
      <CTableRow key={season.season_id} onClick={() => {
        setSeason(season);
      }}>
        <CTableDataCell>{season.season_id}</CTableDataCell>
        <CTableDataCell>{season.season_name}</CTableDataCell>
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
                    <CTableHeaderCell scope={"col"}>Season name</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {seasonsList}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
export default Seasons;

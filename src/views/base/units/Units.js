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
import { getUnitsThunk } from "../../../slices/UnitsSlice";
import { useDispatch, useSelector } from "react-redux";
import { UnitsModal } from "./UnitsModal";

const Units = () => {
  const dispatch = useDispatch();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [unit, setUnit] = useState("");

  useEffect(() => {
    dispatch(getUnitsThunk());
  }, []);

  const openModal = () => {
    setModalIsVisible(true);
  };
  const closeModal = () => {
    setModalIsVisible(false);
    setUnit(null);
  };

  const units = useSelector(state => {
    return state.units.units;
  });

  const unitsList = units.map(unit => {
    return (
      <CTableRow key={unit.unit_id} onClick={() => {
        openModal();
        setUnit(unit);
      }}>
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
          <CButton className='my-2 mx-2' color="primary" onClick={openModal}>Добавить единицу измерения</CButton>
        </CCol>
      </CRow>
      {
        modalIsVisible ? <UnitsModal openModal={openModal}
                                     closeModal={closeModal}
                                     unit={unit} />
          : null
      }
    </>
  );
};
export default Units;

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
import { deleteColorsThunk, getColorsThunk } from "../../../slices/ColorsSlice";
import { ColorsModal } from "./ColorsModal";

const Colors = () => {
  const dispatch = useDispatch();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [color, setColor] = useState("");

  useEffect(() => {
    dispatch(getColorsThunk());
  }, []);

  const openModal = () => {
    setModalIsVisible(true);
  };
  const closeModal = () => {
    setModalIsVisible(false);
    setColor(null);
  };
  const deleteColor = async () => {
    await dispatch(deleteColorsThunk({colorId: color.color_id}));
    await dispatch(getColorsThunk());
    closeModal();
  }

  const colors = useSelector(state => {
    return state.colors.colors;
  });

  const colorsList = colors.map(color => {
    return (
      <CTableRow key={color.color_id} onClick={() => {
        openModal();
        setColor(color);
      }}>
        <CTableDataCell>{color.color_id}</CTableDataCell>
        <CTableDataCell>{color.color_name}</CTableDataCell>
        <CTableDataCell><div style={{backgroundColor: color.color_rgb,height: '50px',width: '50px'}}></div></CTableDataCell>
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
                    <CTableHeaderCell scope={"col"}>Color name</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Color rgb</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {colorsList}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          <CButton className='mx-2 my-2' color="primary" onClick={openModal}>Добавить цвет</CButton>
        </CCol>
      </CRow>
      {
        modalIsVisible ? <ColorsModal openModal={openModal}
                                      closeModal={closeModal}
                                      color={color}
                                      deleteColor={deleteColor} />
          : null
      }
    </>
  );
};
export default Colors;

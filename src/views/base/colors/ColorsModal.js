import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CFormInput,
  CInputGroup
} from "@coreui/react";
import { useDispatch } from "react-redux";
import { createColorsThunk, getColorsThunk, updateColorsThunk } from "../../../slices/ColorsSlice";

const ColorsModal = ({openModal,closeModal,color,deleteColor}) => {
  const dispatch = useDispatch();
  const [colorValue, setColorValue] = useState(color ? color.color_name : '');
  const [colorRGB, setColorRGB] = useState(color ? color.color_rgb : '');

  const checkFilledInput = () => {
    if (colorValue.trim().length < 1 || colorValue === '' || colorRGB.length < 6) {
      return false
    }
    return true;
  }
  const confirmDeleteColor = async () => {
    const question = confirm('Are you sure you want to delete this color?');
    if (question) {
      deleteColor();
    }
  }

  return (
    <>
      <CModal
        backdrop="static"
        visible={true}
        onClose={closeModal}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">{color ? 'Редактирование цвета' : 'Создание нового цвета'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CInputGroup>
            <CFormInput value={colorValue}
                        onChange={(event) => setColorValue(event.target.value)} />
            <CFormInput
              type="color"
              value={colorRGB}
              onChange={event => setColorRGB(event.target.value)}
              label="Цвет"
            />
          </CInputGroup>
          {
            color ?  <CButton color={"primary"} onClick={confirmDeleteColor}>Delete color</CButton> : null
          }

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Close
          </CButton>
          {color ?
            <CButton color="primary" onClick={async ()=> {
              if (!checkFilledInput()) {
                alert('Заполните данные');
                return false;
              }
              await dispatch(updateColorsThunk({
                colorName: colorValue.trim(),
                colorRGB: colorRGB,
                colorId: color.color_id
              }));
              await dispatch(getColorsThunk());
              closeModal();
            }}>Сохранить</CButton>
            :
            <CButton color="primary" onClick={async ()=> {
              if (!checkFilledInput()) {
                alert('Заполните данные');
                return false;
              }
              await dispatch(createColorsThunk({colorName: colorValue.trim(),colorRGB: colorRGB}));
              await dispatch(getColorsThunk());
              closeModal();
            }}>Сохранить</CButton>
          }
        </CModalFooter>
      </CModal>
    </>
  )
}
export { ColorsModal }

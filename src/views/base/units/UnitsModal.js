import React, { useState } from "react";
import { CButton, CModal, CModalHeader, CModalTitle, CModalFooter, CModalBody, CFormInput } from "@coreui/react";
import { useDispatch } from "react-redux";
import { createUnitsThunk, getUnitsThunk, updateUnitsThunk } from "../../../slices/UnitsSlice";

const UnitsModal = ({closeModal,unit}) => {
  const dispatch = useDispatch();
  const [unitValue, setUnitValue] = useState(unit ? unit.unit_name : '');

  const checkFilledInput = () => {
    if (unitValue.length < 1) {
      return false
    }
    return true;
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
          <CModalTitle id="StaticBackdropExampleLabel">{unit ? 'Редактирование единицы измерения' : 'Создание новой единицы измерения'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {
            unit ? <CFormInput value={unitValue}
                              onChange={(event) => setUnitValue(event.target.value)} />
              :  <CFormInput value={unitValue}
                             onChange={(event) => setUnitValue(event.target.value)}
                             placeholder={'New tag unit'}/>
          }
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Close
          </CButton>
          {unit ?
            <CButton color="primary" onClick={async ()=> {
              await dispatch(updateUnitsThunk({
                unitName: unitValue,
                unitId: unit.unit_id
              }));
              await dispatch(getUnitsThunk());
              closeModal();
            }}>Сохранить</CButton>
            : <CButton color="primary" onClick={async ()=> {
              if (!checkFilledInput()) {
                alert('Заполните данные');
                return false;
              }
              await dispatch(createUnitsThunk({unitName: unitValue}));
              await dispatch(getUnitsThunk());
              closeModal();
            }}>Сохранить</CButton>
          }
        </CModalFooter>
      </CModal>
    </>
  )
}
export { UnitsModal }

import React, { useState } from "react";
import { CButton, CModal, CModalHeader, CModalTitle, CModalFooter, CModalBody, CFormInput } from "@coreui/react";
import { useDispatch } from "react-redux";
import { createBrandsThunk, getBrandsThunk, updateBrandsThunk } from "../../../slices/BrandsSlice";

const BrandsModal = ({openModal,closeModal,brand}) => {
  const dispatch = useDispatch();
  const [brandValue, setBrandValue] = useState(brand ? brand.brand_name : '');

  const checkFilledInput = () => {
    if (brandValue.length < 1) {
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
          <CModalTitle id="StaticBackdropExampleLabel">{brand ? 'Редактирование бренда' : 'Создание нового бренда'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {
            brand ? <CFormInput value={brandValue}
                               onChange={(event) => setBrandValue(event.target.value)} />
              :  <CFormInput value={brandValue}
                             onChange={(event) => setBrandValue(event.target.value)}
                             placeholder={'New brand'}/>
          }
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Close
          </CButton>
          {brand ?
            <CButton color="primary" onClick={async ()=> {
              await dispatch(updateBrandsThunk({
                brandName: brandValue,
                brandId: brand.brand_id
              }));
              await dispatch(getBrandsThunk());
              closeModal();
            }}>Сохранить</CButton>
            : <CButton color="primary" onClick={async ()=> {
              if (!checkFilledInput()) {
                alert('Заполните данные');
                return false;
              }
              await dispatch(createBrandsThunk({brandName: brandValue}));
              await dispatch(getBrandsThunk());
              closeModal();
            }}>Сохранить</CButton>
          }
        </CModalFooter>
      </CModal>
    </>
  )
}
export { BrandsModal }

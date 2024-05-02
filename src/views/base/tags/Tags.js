import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTagsThunk } from "../../../slices/TagsSlice";
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
import { TagsModal } from "./TagsModal";

const Tags = () => {
  const dispatch = useDispatch();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [tag,setTag] = useState('');

  useEffect(() => {
    dispatch(getTagsThunk());
  }, []);

  const openModal = () => {
    setModalIsVisible(true);
  };
  const closeModal = () => {
    setModalIsVisible(false);
    setTag(null);
  };

  const tags = useSelector(state => {
    return state.tags.tags;
  });
  console.log("TAGS", tags);

  const tagsList = tags.map(tag => {
    return (
      <CTableRow key={tag.tag_id} onClick={()=> {
        openModal();
        setTag(tag);
      }}>
        <CTableDataCell>{tag.tag_id}</CTableDataCell>
        <CTableDataCell>{tag.tag_name}</CTableDataCell>
        <CTableDataCell>{tag.deleted_at}</CTableDataCell>
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
                    <CTableHeaderCell scope={"col"}>Tag name</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Deleted</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tagsList}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
          <CButton color="primary" onClick={openModal}>Добавить тег</CButton>
        </CCol>
      </CRow>
      {
        modalIsVisible ? <TagsModal openModal={openModal}
                                    closeModal={closeModal}
                                    tag={tag} />
          : null
      }
    </>
  );
};
export default Tags;

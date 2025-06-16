import React, { useState } from "react";
import { CButton, CModal, CModalHeader, CModalTitle, CModalFooter, CModalBody, CFormInput } from "@coreui/react";
import { useDispatch } from "react-redux";
import { createTagsThunk, getTagsThunk, updateTagsThunk } from "../../../slices/TagsSlice";

const TagsModal = ({closeModal,tag,deleteTags}) => {
  const dispatch = useDispatch();
  const [tagValue, setTagValue] = useState(tag ? tag.tag_name : '');

  const checkFilledInput = () => {
    if (tagValue.length < 1) {
      return false
    }
    return true;
  }
  const confirmDeleteTag = async () => {
    const question = confirm('Are you sure you want to delete this tag?');
    if (question) {
      deleteTags();
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
          <CModalTitle id="StaticBackdropExampleLabel">{tag ? 'Редактирование тега' : 'Создание нового тега'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {
            tag ? <CFormInput value={tagValue}
                              onChange={(event) => setTagValue(event.target.value)} />
              :  <CFormInput value={tagValue}
                                    onChange={(event) => setTagValue(event.target.value)}
                                    placeholder={'New tag name'}/>
          }
          {
            tag ?  <CButton color={"primary"} onClick={confirmDeleteTag}>Delete category</CButton> : null
          }
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Close
          </CButton>
          {tag ?
            <CButton color="primary" onClick={async ()=> {
              if (!checkFilledInput()) {
                alert('Заполните данные');
                return false;
              }
              await dispatch(updateTagsThunk({
                tagName: tagValue,
                tagId: tag.tag_id
              }));
              await dispatch(getTagsThunk());
              closeModal();
            }}>Сохранить</CButton>
            : <CButton color="primary" onClick={async ()=> {

              if (!checkFilledInput()) {
                alert('Заполните данные');
                return false;
              }
              await dispatch(createTagsThunk({tagName: tagValue}));
              await dispatch(getTagsThunk());
              closeModal();
            }}>Сохранить</CButton>
          }
        </CModalFooter>
      </CModal>
    </>
  )
}
export { TagsModal }

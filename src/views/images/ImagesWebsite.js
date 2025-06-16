import React, { useState } from "react";
import { CButton, CCard, CForm, CFormInput, CFormLabel, CFormSelect, CNav, CRow } from "@coreui/react";
import { uploadImageStatic } from "../../api/uploads";
import {CFormCheck} from "@coreui/react";

const ImagesWebsite = () => {

  const [imageIds, setImageIds] = useState([]);
  const [files, setFiles] = useState(null);

  const [field, setField] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: '0', label: 'header' },
    { id: '1', label: 'footer' },
    { id: '2', label: 'home' },
    { id: '3', label: 'logo' },
    { id: '4', label: 'favicon' },
    { id: '5', label: 'boys' },
    { id: '6', label: 'girls' },
    { id: '7', label: 'baby' },
  ];

  const handleChange = (id) => {
    if (selectedOption === id) {
      setSelectedOption(null);
    } else {
      setSelectedOption(id);
    }
    setField(options[id].label);
  };


  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const checkFilledCheckbox = async () => {
    if (field === '') {
      // console.log('Choose field');
    }
    if (files === null) {
      // console.log('Add files');
    }

    await handleUploadImage();
  }

  const handleUploadImage = async () => {
    const res = await uploadImageStatic(files,'web',field);
    setImageIds(res.imageIds);
  };

  return (
    <>
      <div className='mx-4 my-2'>
      <CCard>
        <div className='mx-4 my-2'>
        <CRow>
          {options.map((option) => (
            <CFormCheck
              key={option.id}
              id={option.id}
              label={option.label}
              checked={selectedOption === option.id}
              onChange={() => handleChange(option.id)}
              disabled={selectedOption !== null && selectedOption !== option.id}
            />
          ))}
          <CForm id={"form"}>
            <CFormLabel htmlFor={"name"}>Картинки для сайта:</CFormLabel>
            <CFormInput id={"file"} type={"file"} onChange={handleFileChange} multiple={true}></CFormInput>
            <CButton className='my-2' onClick={checkFilledCheckbox}>Загрузить картинку</CButton>
          </CForm>
        </CRow>
        </div>
      </CCard>
      </div>
    </>
  );
};
export default ImagesWebsite;

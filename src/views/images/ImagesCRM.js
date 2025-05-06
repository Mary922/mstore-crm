import React, { useState } from "react";
import { CButton, CCard, CForm, CFormInput, CFormLabel, CFormSelect, CNav, CRow } from "@coreui/react";
import { uploadImageStatic } from "../../api/uploads";
import {CFormCheck} from "@coreui/react";

const ImagesCRM = () => {

  const [imageIds, setImageIds] = useState([]);
  const [files, setFiles] = useState(null);

  const [field, setField] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: '0', label: 'header' },
    { id: '1', label: 'footer' },
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

  const handleUploadImage = async () => {
    const res = await uploadImageStatic(files,'crm',field);
    setImageIds(res.imageIds);
  };

 console.log('FIELD',field)

  return (
    <>
      <CCard>
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
          {/*<CFormCheck id="flexCheckDefault" value={'header'} disabled={isChecked} onChange={(event) => saveField(event.target.value)} label="Header"/>*/}
          {/*<CFormCheck id="flexCheckDefault" value={'footer'} onChange={(event) => saveField(event.target.value)} label="Footer"/>*/}
          <CForm id={"form"}>
            <CFormLabel htmlFor={"name"}>Images crm:</CFormLabel>
            <CFormInput id={"file"} type={"file"} onChange={handleFileChange} multiple={true}></CFormInput>
            <CButton onClick={handleUploadImage}>Загрузить картинку</CButton>
          </CForm>
        </CRow>
      </CCard>
    </>
  );
};
export default ImagesCRM;

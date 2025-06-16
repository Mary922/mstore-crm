import React, { useEffect, useState } from "react";
import { CButton, CCard, CForm, CFormInput, CFormLabel, CFormSelect, CNav, CRow } from "@coreui/react";
import { uploadImageStatic } from "../../api/uploads";
import {CFormCheck} from "@coreui/react";
import { checkAuthorzation } from "../../api/auth";

const ImagesCRM = () => {

  const [imageIds, setImageIds] = useState([]);
  const [files, setFiles] = useState(null);
  const [field, setField] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(()=>{
    (async () => {
        const res = await checkAuthorzation();
    })();
  },[])
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

  return (
    <>
      <div className='mx-4 my-2'>
      <CCard>
        <div className='mx-2 my-2'>
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
            <CButton className='my-2' onClick={handleUploadImage}>Загрузить картинку</CButton>
          </CForm>
        </div>
      </CCard>
      </div>
    </>
  );
};
export default ImagesCRM;

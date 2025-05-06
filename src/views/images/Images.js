// import React, { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { CButton, CCard, CForm, CFormInput, CFormLabel, CNav, CRow } from "@coreui/react";
// import { uploadImage } from "../../api/uploads";
//
// const Images = () => {
//
//   const [imageIds, setImageIds] = useState([]);
//   const [files, setFiles] = useState(null);
//
//   const handleFileChange = (e) => {
//     if (e.target.files) {
//       setFiles(e.target.files);
//     }
//   };
//
//   const handleUploadImage = async () => {
//     const res = await uploadImage(files);
//     setImageIds(res.imageIds);
//   };
//
//   return (
//     <>
//       <CCard>
//         <CRow>
//           <CForm id={"form"}>
//             <CFormLabel htmlFor={"name"}>Image:</CFormLabel>
//             <CFormInput id={"file"} type={"file"} onChange={handleFileChange} multiple={true}></CFormInput>
//             <CButton onClick={handleUploadImage}>Загрузить картинку</CButton>
//           </CForm>
//         </CRow>
//       </CCard>
//     </>
//   );
// };
// export default Images;

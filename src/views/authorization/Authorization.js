import {React,useState} from "react";
import {CCard,CCardBody,CCardHeader,CButton,CForm,CCol,CFormInput} from "@coreui/react";
import {signin} from "../../api/auth";

const Authorization = () => {
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');

    const login = async (e) => {
      const result = await signin({username:username,password:password});
      console.log('TOK',result.data.accessToken)
      if (result.data.accessToken) {
        localStorage.setItem('user',JSON.stringify(result.data));
        window.location.replace('/')
      } else {
        alert('Auth error,no token')
      }


    }

  return (
    <>
      <CCard className="text-center">
        <CCardHeader>Authorization</CCardHeader>
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
          >
            <CCol md={4}>
              <CFormInput
                type="text"
                label="First name"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
            </CCol>
            <CCol md={4}>
              <CFormInput
                type="text"
                label="Password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary"
                       type="submit"
                       onClick={login}>
                Submit form
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}
export default Authorization;

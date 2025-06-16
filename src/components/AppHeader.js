import React from 'react'
import { useNavigate } from "react-router-dom";
import {
  CContainer,
  CHeader,
  CHeaderNav,
} from '@coreui/react'

import { AppBreadcrumb } from './index'
import { CIcon } from '@coreui/icons-react';
import { cilAccountLogout } from '@coreui/icons';



const AppHeader = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logOut = () => {
    if (user) {
      localStorage.removeItem('user');
    }
  }
  const redirectToLogin = () => {
    navigate(`/login`);
  }


  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderNav>
          <AppBreadcrumb />
        </CHeaderNav>
        <div className='flex items-center justify-center'>
          <div className="flex flex-row">
            {
              user ?
                <>
                <div className='mr-2'>Привет,{user?.username}</div>
                <CIcon size='xl'
                       className="cursor-pointer"
                       onClick={()=>{
                         logOut();
                         navigate("/login");
                       }} icon={cilAccountLogout} />
                </>
                    :
                <div className='cursor-pointer' onClick={redirectToLogin}>Войти</div>
            }
          </div>
        </div>
      </CContainer>
    </CHeader>
  );
}

export default AppHeader

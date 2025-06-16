import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol, CRow,
  CTable,
  CTableBody, CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import { getClients } from "../../api/clients";
import moment from "moment/moment";

const Clients = () => {

  const [clients, setClients] = useState([]);

  useEffect(() => {
    (async () => {
        const result = await getClients();
        const clients = result.data;
        setClients(clients);
    })();
  }, []);

    const clientsList = clients.map((client) => {
      return (
        <CTableRow key={client.client_id}>
          <CTableDataCell>{client.client_id}</CTableDataCell>
          <CTableDataCell>{client.client_name}</CTableDataCell>
          <CTableDataCell>{client.client_surname}</CTableDataCell>
          <CTableDataCell>{client.client_email}</CTableDataCell>
          <CTableDataCell>{client.client_password}</CTableDataCell>
          <CTableDataCell>{moment.unix(client.client_birthday).format("MM.DD.YYYY HH:mm")}</CTableDataCell>
          <CTableDataCell>{moment.unix(client.created_at).format("MM.DD.YYYY HH:mm")}</CTableDataCell>
        </CTableRow>
      )
    })

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
                    <CTableHeaderCell scope={"col"}>Имя</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Фамилия</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Email</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Пароль</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>День рождения</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Создан</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {clientsList}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}
export default Clients;

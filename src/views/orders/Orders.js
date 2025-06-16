import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCol, CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import moment from "moment";
import { getOrders } from "../../api/orders";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await getOrders();
      const orders = result.data;
      setOrders(orders);
    })();
  }, []);

  const ordersList = orders.map((order) => {
    return (
      <CTableRow key={order.order_id}>
        <CTableDataCell>{order.order_id}</CTableDataCell>
        <CTableDataCell>{order.City?.Region?.region_name}</CTableDataCell>
        <CTableDataCell>{order.City?.city_name}</CTableDataCell>
        <CTableDataCell>{order.address}</CTableDataCell>
        <CTableDataCell>{order.phone}</CTableDataCell>
        <CTableDataCell>{order.order_sum}</CTableDataCell>
        <CTableDataCell>{moment.unix(order.created_at).format("MM.DD.YYYY HH:mm")}</CTableDataCell>
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
                    <CTableHeaderCell scope={"col"}>Регион</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Город</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Адрес</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Телефон</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Сумма заказа</CTableHeaderCell>
                    <CTableHeaderCell scope={"col"}>Создан</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {ordersList}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}
export default Orders;

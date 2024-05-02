import React from 'react'

const Units = React.lazy(() => import('./views/base/units/Units'))
const Tags = React.lazy(() => import('./views/base/tags/Tags'))
const Colors = React.lazy(() => import('./views/base/colors/Colors'))

const Clients = React.lazy(() => import('./views/clients/Clients'))
const Orders = React.lazy(() => import('./views/orders/Orders'))


const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/base/units', name: 'Units', element: Units},
  { path: '/base/tags', name: 'Tags', element: Tags},
  { path: '/base/colors', name: 'Colors', element: Colors},

  { path: '/clients', name: 'Clients', element: Clients },
  { path: '/orders', name: 'Orders', element: Orders },
]

export default routes

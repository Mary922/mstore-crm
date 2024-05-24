import React from 'react'

const Units = React.lazy(() => import('./views/base/units/Units'))
const Tags = React.lazy(() => import('./views/base/tags/Tags'))
const Colors = React.lazy(() => import('./views/base/colors/Colors'))
const Categories = React.lazy(() => import('./views/base/categories/Categories'))
const Seasons = React.lazy(() => import('./views/base/seasons/Seasons'))
const Sizes = React.lazy(() => import('./views/base/sizes/Sizes'))
const Countries = React.lazy(() => import('./views/base/countries/Countries'))
const Brands = React.lazy(() => import('./views/base/brands/Brands'))

const Products = React.lazy(() => import('./views/products/Products'))
const Product = React.lazy(() => import('./views/products/Product'))
const Prices = React.lazy(() => import('./views/prices/Prices'))
const Clients = React.lazy(() => import('./views/clients/Clients'))
const Orders = React.lazy(() => import('./views/orders/Orders'))
const Authorization = React.lazy(() => import('./views/authorization/Authorization'))
const Home = React.lazy(() => import('./views/pages/home/Home'))


const routes = [
  { path: '/', exact: true, name: 'Home',element: Home},

  { path: '/base/units', name: 'Units', element: Units},
  { path: '/base/tags', name: 'Tags', element: Tags},
  { path: '/base/colors', name: 'Colors', element: Colors},
  { path: '/base/categories', name: 'Categories', element: Categories},
  { path: '/base/seasons', name: 'Seasons', element: Seasons},
  { path: '/base/sizes', name: 'Sizes', element: Sizes},
  { path: '/base/countries', name: 'Countries', element: Countries},
  { path: '/base/brands', name: 'Brands', element: Brands},

  { path: '/products', name: 'Products', element: Products},
  { path: '/product/:productId', name: 'Product', element: Product},
  { path: '/product/new', name: 'Product', element: Product},
  { path: '/prices', name: 'Prices', element: Prices },
  { path: '/clients', name: 'Clients', element: Clients },
  { path: '/orders', name: 'Orders', element: Orders },
  { path: '/authorization', name: 'Authorization', element: Authorization },
]

export default routes

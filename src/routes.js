import React from 'react'
import Login from "./views/pages/login/Login";
import Footer from "./views/images/ImagesWebsite";


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
const Clients = React.lazy(() => import('./views/clients/Clients'))
const Orders = React.lazy(() => import('./views/orders/Orders'))
const Authorization = React.lazy(() => import('./views/authorization/Authorization'))
const Home = React.lazy(() => import('./views/pages/home/Home'))

// const Images = React.lazy(() => import('./views/images/Images/Images'))
// const WebHeader = React.lazy(() => import('./views/images/Website/WebHeader'))

const ImagesCRM = React.lazy(() => import('./views/images/ImagesCRM'));
const ImagesWeb = React.lazy(() => import('./views/images/ImagesWebsite'));

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
  { path: '/clients', name: 'Clients', element: Clients },
  { path: '/orders', name: 'Orders', element: Orders },
  // { path: '/images', name: 'Images', element: Images},

  // { path: '/images/web', name: 'WebHeader', element: WebHeader },
  { path: '/images/crm', name: 'ImagesCRM', element: ImagesCRM },
  { path: '/images/web', name: 'ImagesWeb', element: ImagesWeb },

  { path: '/authorization', name: 'Authorization', element: Authorization },
  { path: '/login', name: 'Login', element: Login },
]

export default routes

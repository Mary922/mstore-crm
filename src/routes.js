import React from 'react'
import Login from "./views/pages/login/Login";


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
const Home = React.lazy(() => import('./views/pages/home/Home'))

const ImagesCRM = React.lazy(() => import('./views/images/ImagesCRM'));
const ImagesWeb = React.lazy(() => import('./views/images/ImagesWebsite'));

const routes = [
  { path: '/', exact: true, name: 'Домашняя страница',element: Home},

  { path: '/base/units', name: 'Единицы измерения', element: Units},
  { path: '/base/tags', name: 'Теги', element: Tags},
  { path: '/base/colors', name: 'Цвета', element: Colors},
  { path: '/base/categories', name: 'Категории', element: Categories},
  { path: '/base/seasons', name: 'Сезоны', element: Seasons},
  { path: '/base/sizes', name: 'Размеры', element: Sizes},
  { path: '/base/countries', name: 'Страны', element: Countries},
  { path: '/base/brands', name: 'Бренды', element: Brands},

  { path: '/products', name: 'Продукты', element: Products},
  { path: '/product/:productId', name: 'Продукт', element: Product},
  { path: '/product/new', name: 'Новый продукт', element: Product},
  { path: '/clients', name: 'Клиенты', element: Clients },
  { path: '/orders', name: 'Заказы', element: Orders },
  { path: '/images/crm', name: 'Картинки CRM', element: ImagesCRM },
  { path: '/images/web', name: 'Картинки Web', element: ImagesWeb },
  { path: '/login', name: 'Логин', element: Login },
]

export default routes

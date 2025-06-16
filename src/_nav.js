import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilContact,
  cilBasket,
  cilCart,
  cilPuzzle,
  cilImage
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'


const _nav = [
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Основное',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Единицы измерения',
        to: '/base/units',
      },
      {
        component: CNavItem,
        name: 'Теги',
        to: '/base/tags',
      },
      {
        component: CNavItem,
        name: 'Цвета',
        to: '/base/colors',
      },
      {
        component: CNavItem,
        name: 'Категории',
        to: '/base/categories',
      },
      {
        component: CNavItem,
        name: 'Сезоны',
        to: '/base/seasons',
      },
      {
        component: CNavItem,
        name: 'Размеры',
        to: '/base/sizes',
      },
      {
        component: CNavItem,
        name: 'Страны',
        to: '/base/countries',
      },
      {
        component: CNavItem,
        name: 'Бренды',
        to: '/base/brands',
      }
    ],
  },
  {
    component: CNavItem,
    name: 'Продукты',
    to: '/products',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Клиенты',
    to: '/clients',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Заказы',
    to: '/orders',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Картинки',
    to: '/base',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Crm',
        to: '/images/crm',
      },
      {
        component: CNavItem,
        name: 'Website',
        to: '/images/web',
      },
    ]}
]

export default _nav

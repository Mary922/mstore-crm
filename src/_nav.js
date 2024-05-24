import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilContact,
  cilBasket,
  cilCart,
  cilPuzzle,
  cilStar,
  cilMoney
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
        name: 'Units',
        to: '/base/units',
      },
      {
        component: CNavItem,
        name: 'Tags',
        to: '/base/tags',
      },
      {
        component: CNavItem,
        name: 'Colors',
        to: '/base/colors',
      },
      {
        component: CNavItem,
        name: 'Categories',
        to: '/base/categories',
      },
      {
        component: CNavItem,
        name: 'Seasons',
        to: '/base/seasons',
      },
      {
        component: CNavItem,
        name: 'Sizes',
        to: '/base/sizes',
      },
      {
        component: CNavItem,
        name: 'Countries',
        to: '/base/countries',
      },
      {
        component: CNavItem,
        name: 'Brands',
        to: '/base/brands',
      }
    ],
  },
  {
    component: CNavItem,
    name: 'Products',
    to: '/products',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Prices',
    to: '/prices',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Clients',
    to: '/clients',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/orders',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },

]

export default _nav

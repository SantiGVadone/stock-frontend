import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Stock } from './screens/Stock'
import { ProductDetail } from './screens/ProductDetail'
import { AddProduct } from './screens/AddProduct'
import { EditProduct } from './screens/EditProduct'
import { Login } from './screens/Login'
import { Register } from './screens/Register'
import { PickStore } from './screens/PickStore'
import Profile from './screens/Profile'
import Filters from './screens/Filters'

const RootStack = createNativeStackNavigator({
  screens: {
    Register: {
      screen: Register,
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: Login,
      options: {
        headerShown: false,
      },
    },
    PickStore: {
      screen: PickStore,
      options: {
        headerShown: false,
      },
    },
    Stock: {
      screen: Stock,
      options: {
        headerShown: false,
      },
    },
    Filters: {
      screen: Filters,
      options: {
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      options: {
        headerShown: false,
      },
    },
    ProductDetail: {
      screen: ProductDetail,
      options: {
        title: 'Detalle del Producto',
      },
    },
    AddProduct: {
      screen: AddProduct,
      options: {
        presentation: 'transparentModal',
        headerShown: false,
      },
    },
    EditProduct: {
      screen: EditProduct,
      options: {
        presentation: 'transparentModal',
        headerShown: false,
      },
    },
  },
})

export const Navigation = createStaticNavigation(RootStack)

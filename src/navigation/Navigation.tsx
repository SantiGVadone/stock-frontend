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
import { RequireAuth } from './RequireAuth'
import { AddStore } from './screens/AddStore'
// import Filters from './screens/Filters'

const RootStack = createNativeStackNavigator({
  screens: {
    // Publicas
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
    AddStore: {
      screen: AddStore,
      options: {
        headerShown: false,
      },
    },

    // Protegidas (requieren Login)

    Stock: {
      screen: (props: any) => (
        <RequireAuth {...props}>
          <Stock />
        </RequireAuth>
      ),
      options: {
        headerShown: false,
      },
    },
    // Filters: {
    //   screen: Filters,
    //   options: {
    //     headerShown: false,
    //   },
    // },
    Profile: {
      screen: (props: any) => (
        <RequireAuth {...props}>
          <Profile />
        </RequireAuth>
      ),
      options: {
        headerShown: false,
      },
    },
    ProductDetail: {
      screen: (props: any) => (
        <RequireAuth {...props}>
          <ProductDetail />
        </RequireAuth>
      ),
      options: {
        title: 'Detalle del Producto',
      },
    },
    AddProduct: {
      screen: (props: any) => (
        <RequireAuth {...props}>
          <AddProduct />
        </RequireAuth>
      ),
      options: {
        presentation: 'transparentModal',
        headerShown: false,
      },
    },
    EditProduct: {
      screen: (props: any) => (
        <RequireAuth {...props}>
          <EditProduct />
        </RequireAuth>
      ),
      options: {
        presentation: 'transparentModal',
        headerShown: false,
      },
    },
  },
})

export const Navigation = createStaticNavigation(RootStack)

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
import { PickStore } from './screens/PickStore'
import { RequireAuth } from './RequireAuth'
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

    // Protegidas (requieren Login)

    Stock: {
      screen: () => (
        <RequireAuth>
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
      screen: () => (
        <RequireAuth>
          <Profile />
        </RequireAuth>
      ),
      options: {
        headerShown: false,
      },
    },
    ProductDetail: {
      screen: () => (
        <RequireAuth>
          <ProductDetail />
        </RequireAuth>
      ),
      options: {
        title: 'Detalle del Producto',
      },
    },
    AddProduct: {
      screen: () => (
        <RequireAuth>
          <AddProduct />
        </RequireAuth>
      ),
      options: {
        presentation: 'transparentModal',
        headerShown: false,
      },
    },
    EditProduct: {
      screen: () => (
        <RequireAuth>
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

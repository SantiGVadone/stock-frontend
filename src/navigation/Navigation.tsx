import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Stock } from '../navigation/screens/Stock'
import { ProductDetail } from './screens/ProductDetail'
import { AddProduct } from './screens/AddProduct'
import { EditProduct } from './screens/EditProduct'

const RootStack = createNativeStackNavigator({
  screens: {
    Stock: {
      screen: Stock,
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

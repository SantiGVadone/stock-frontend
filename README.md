# App de gestion de Stock

> [!NOTE]
> Esta APP esta echa con fines educativos y de practica
> La app actualmente esta en la version BETA, ya que faltan unos pasos para tener la v 1.0
> El repositorio del Back-End es: https://github.com/santigvadone/stock-backend

# TO DO (menos importante)

- ✅ Que el boton de editar en la pantalla de ProductDetail este en el header
- ✅ Agregar el boton de eliminar producto, ya sea en la pantalla de ProductDetail o en la pantalla de Stock(con algun movimiento de izquierda a derecha)

# TO DO (FIX)

- Estos fueron todos completados con el overflow-x-scroll

* ✅ Revisar alguna mejora para los nombres y las descripciones largas en la pantalla de AddProduct
* ✅ Revisar como se comporta el campo de cantidad en la pantalla de AddProduct
* ✅ Revisar alguna mejora para los nombres y las descripciones largas en la pantalla de EditProduct
* ✅ Revisar como se comporta el campo de cantidad en la pantalla de EditProduct
* ✅ Revisar como se comporta la App con el teclado (que no tape nada, y que se ajuste al despliegue de este)

- Este fue solucionado usando la propiedad numberOfNails={} la cual dice cuantas lineas tiene que ocupar el text

* ✅ Revisar el comportamiento de la pantalla de Stock con los nombres o las descripciones largas (que no se agrande la card, que simplemente se pongan los '...' cuando no entre en el espacio que ya esta fijado)

# TO DO for the 1.0.0 version

- ✅ Que la app no mande un console.log(), sino que realmente Funcione el CREATE
- ✅ Que la app no mande un console.log(), sino que realmente Funcione el UPDATE
- ✅ Generar ID's para los productos, aunquesea en orden numerico por el momento
- ✅ Que funcionen los botones de +1 y -1 para la cantidad en la pantalla de ProductDetail
- ✅ Que la pantalla de Stock se actualice al crear un producto
- ✅ Que la pantalla de Stock se actualice al editar un producto
- ✅ Solucionar los formatos responsive con los nombres largos y las descripciones largas

* - Para crear la primera APP de Android tengo que:
    - Hacer un Logo que me guste.
    - Ver en que DB voy a dejar todo, ya que la APP va a quedar en uso.
    - Ver si la voy a seguir hosteando en la notebook o si pago un hosteo.

- CREAR la primera APK para android

# Futuras tareas (8/6/26)

- ✅ LoginPage:
  - ✅ Hacer que el login haga la peticion HTTP
  - ✅ Guardar el Token
  - ✅ Seleccionar una tienda de las que devuelve la peticion de login
  - ✅ Poner el ID de esa tienda en el x-store-id
  - ✅ Si el usuario se logeo correctamente, en un useContext se tiene que guardar:
    - ✅ Si esta logeado
    - ✅ En que tienda esta logeado
    - ✅ A que tiendas tiene acceso
    - ✅ Data del usuario: nombre y todo eso
- ✅ RegisterPage:
  - ✅ Hacer que el register haga la peticion HTTP
  - ✅ Si salio bien redirigir a la LoginPage
- ✅ Agregar el icono de Usuario en la pantalla principal
  - Donde quiero que se pueda invitar a un empleado (en caso de ser JEFE)
  - Quiero que se pueda renunciar
  - Quiero que se pueda cambiar de tienda

# Futura version 1.1

- ✅ Agregar Login con JWT
- Agregar la funcion de cargar imagenes de cada producto.
- Agregar la funcion de seleccionar un minimo de stock de cada producto (si el producto llega a ese minimo, la app lo tiene que notificar)

# Futura version 1.1.1

- ✅ Agregar un motor de busqueda en la pantalla de Stock
- ✅ Solucionar el formato del boton de eliminar dentro de la pantalla de Stock
- ✅ Que la pantalla de Stock se actualice al volver a esta

# Futura version 2.0

- Agregar el escaneo del codigo de barra de productos, por medio de la camara

# Feats no tan importantes

- ✅ Que la SearchBar este un poco mas abajo
- ✅ Agregar una animation a la SearchBar para que se Expanda y se Comprima
- ❗❗❗Cambiar las pestañas de CreateProduct y de EditProduct
- ✅ Agregar un Label para cada Input en la pantalla de Login
- ✅ Agregar boton para hacer visible la contraseña

# Futura V1.4

- ✅ Crear una tienda
- Editar una tienda
- ✅ Ver todas las tiendas
- Eliminar una tienda
- ✅ Login
- ✅ useContext para el login
- ✅ useContext para la tienda seleccionada
- poder cambiar de tinda
- poder eliminar la cuenta
- ✅ poder cerrar sesion

# Hoy 16/6/26

- ✅ Agregar template de ProfilePage
- ✅ Acomode la StockPage nueva
- ✅ Tengo que ver bien el tema del contador del stockPage
- ✅ Arregle el tema del setSearch en el textInput

# Hoy 17/6

- ✅ Añadir la pantalla de ProductDetail nueva
  - ✅ Poder eliminar desde ese pantalla
  - ✅ Poder editar desde esa pantalla
- ✅ Corregir las funciones que estan en el useStock.tsx
  - ✅ Agregar
  - ✅ Editar
  - ✅ Eliminar
  - ✅ FetchAll
  - ✅ Nueva funcion de Login

# To Do From 17/6

- ✅ Use context para pasar estado de loging
- ✅ Aislar la funcion handleAdd
- ✅ Aislar la funcion handleSubstract
- 🔴 Revisar un error del backend al utilizar handleAdd o handleSubstract
- ✅ Mejorar la RegisterScreen
- ✅ Crear la PickStoreScreen (pantalla para poder elegir una tienda de las que devuelve el login)
  - ✅ Crear la pantalla de Crear una tienda nueva
- 🟡 Actualizar la pantalla de AddProduct
- 🟡 Actualizar la pantalla de EditProduct
- Hacer funcional la pantalla de Profile
  - Crear un apartado para la eleccion de tiendas dentro de Profile
- ✅ Agregar un Logo a la APP
- Agregar alguna pantalla de bienvenida, con logos y animaciones

# To Do 13/7 (en orden de prioridad)

- ✅ Arreglar la pantalla de Nueva Tienda
  - ✅ Arreglar como se ve el Header de Nueva Tienda
  - ✅ Arreglar el ir hacia atras en Nueva tienda

- ✅ Hacer funcional la pantalla de Profile
  - ✅ Mostrar los datos reales del usuario: el Nombre, Rol ...
  - ✅ Mostrar los datos reales de las tiendas del usuario: Tienda Actual, tiendas disponibles y rangos
    - ✅ Poder seleccionar una de estas tiendas de manera rapida y facil
    - ✅ Redirigir a la pantalla de crear tienda en caso de que se necesite

  - Crear la pantalla Mi Perfil
    - Mostrar y poder editar datos del usuario, Nombre, Apellido, Email, Telefono, Creado el xxx

  - Crear la pantalla Notificaciones
    - Poder Configurar las notificaciones

  - Crear la pantalla Seguridad
    - Poder configurar el login con datos biometricos
    - Poder Cambiar la contraseña
    - Poder ver si el mail esta verificado(poder verificarlo en caso de que no sea asi)

  - Crear la pantalla Ajustes de Tienda (se va a mostrar solo si el usuario es Jefe)
    - Poder ver y editar los datos de la tienda ( nombre, ubi, Telefono)

  - Crear la Pantalla Gestionar Equipo(se va a mostrar solo si el usuario es Jefe):
    - Ver todos los empleados que hay en la tienda
    - Poder eliminar algun empleado
    - Poder Agregar algun empleado

  - Crear la pantalla de Ayuda y Soporte
    - Que envie a la web de la app o empresa, que pueda enviar un mail tambien

  - Agregar la opcion de Renunciar abajo de Cerrar Sesion (con confirmacion obvio)
    - En el caso del empleado, al renunciar simplemente se borra al empleado de la tienda
    - En el caso del Jefe, se le avisa que no va a poder recuperar nada, y se borra la tienda, la relacion de empleados tienda y la relacion de jefe tienda y todos los productos de esa tienda

- ✅ Actualizar AddProduct (tenia pensado que sea como una pantalla modal que ocupe un 3/4 de la pantalla con bordes redondeados o algo asi)
  - ✅ Tengo que poder Ingresar:
    - 🟡 Foto de este (opcional)
    - ✅ Nombre
    - ✅ Descripcion (opcional)
    - ✅ Cantidad
    - ✅ Categoria
- ✅ Actualizar EditProduct
  - Tengo que poder Editar:
    - 🟡 Foto de este (opcional)
    - ✅ Nombre
    - ✅ Descripcion (opcional)
    - ✅ Cantidad
    - ✅ Categoria
- Agregar WelcomeScreens

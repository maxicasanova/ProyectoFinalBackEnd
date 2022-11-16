# **Backend Coderhouse - Proyecto Final**

El objetivo de este repositorio es proveer un proyecto en nodejs que cumpla con la consigna del trabajo final del curso de Backend de Coderhouse.

**Caracteristicas**

*Modulos*

- Node JS

- Express

- Passport

- Mongoose (MongoDB)

- Handlebars/Pug/Ejs (Plantillas)

- Socket.IO

- Nodemailer

Rutas

*Rutas*

Ruta|Metodo|Accion|Autenticado|Tipo parametros|Tipo respuesta
-|-|-|-|-|-
/products|GET|Lista todos los productos|Si|N/A|json
/products|POST|Agrega un producto|Admin|json|json
/products/:id|GET|Obtiene el detalle del producto identificado por :id|Si|N/A|json
/products/:id|PUT|Actualiza el producto identificado por :id|Admin|json|json
/products/:id|DELETE|Elimina el producto identificado por :id|Admin|N/A|json
/products/category/:category|GET|Lista todos los productos de la categoria :category|Si|N/A|json
/cart|GET|Devuelve la vista de carrito|Si|N/A|json
/cart|POST|Crea un nuevo carrito|Si|N/A|json
/cart/:id|DELETE|Elimina el carrito identificado por :id|Admin|N/A|json
/cart/:id/productos|GET|Lista todos los productos del carrito :id|Si|N/A|json
/cart/:id/productos/:id_prod|POST|Agrega un producto al carrito :id|Si|json|json
/cart/empty/:id|DELETE|Vacia el carrito :id|Si|N/A|json
/cart/:id/productos/:id_prod|DELETE|Elimina el producto :id_prod del carrito :id|Si|N/A|json
/order/:id|POST|Genera la orden de compra segun el contenido del carrito :id|Si|N/A|json
/user/logged|GET|Devuelve la informacion del usuario autenticado|Si|N/A|json
/user/login|GET|Devuelve la vista de login|No|N/A|html
/user/login|POST|Autentica un usuario|No|json|json
/user/logout|GET|Elimina la sesion del usuario autenticado|Si|N/A|html
/user/register|GET|Devuelve la vista de registro|No|N/A|html
/user/register|POST|Crea un nuevo usuario|No|multipart/form-data|json
/user/faillogin|GET|Muestra una vista de error de logueo|html
/user/failsignup|GET|Muestra una vista de error de registro|html
/chat|GET|Devuelve la vista de mensajeria|Si|N/A|html
/serverinfo|GET|Devuelve la vista de informacion del servidor|Si|N/A|Json

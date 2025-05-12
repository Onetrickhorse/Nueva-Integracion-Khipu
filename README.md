# Nueva-Integracion-Khipu
Nuevo test de integracion con Khipu

<p>
Este proyecto fue creado usando JS para front-end y Node.js para la parte backend.

La razon de esto proyeco fue para testear la integracion de Khipu en modo desarrollador con una applicacion web para pago de products.
</p>
<br />

<p>
La documentacion que use fue la siguiente:

<ul>
<li>https://docs.khipu.com/portal/en/payment-api/</li>
<li>https://docs.khipu.com/openapi/en/v1/instant-payment/openapi/operation/postPayment/</li>
<li>https://docs.khipu.com/portal/en/khipu-client-web/</li>
</ul>
</p>
<br />
<p>
La documentacion de payment-api es para entender el processo de intgracion con la API de Khipu. Este paso tambien es importante de enteder ya que explica sobre el modo de desarrollador para hacer las llamades de API.
</p>
<p>
La documentacion de postPayment explica cual endpoint se tiene que ocupar para crear un POST de pagos. Aqui es donde hice el testing de la API Key de modo desarrollador para validarla, testear el payload, y enteder las propiedas que retorna el json de respuesta. 
Tambien explica los campos requeridos que deben ser enviados en el body, y este codigo fue el que tome para crear la llamada de api para la integracion de la pagina de pago.
</p>
<p>
Finalmente, la documentacion de khipu-client-web la utilize para poder generar el modal una vez que se genere el request POST, en el cual redirecciona al cliente a la pagina para eligir el banco que quiera usar (en este caso DemoBank) y se generan los pasos de validacion como ingresar la cuenta rut, password, y verificacion.
</p>
<h2>Explicando el deployment</h2>
<p>
Por ultimo, deicid crear esta applicacion de manera fullstack para poder hacer el deployment usando Render.com para que se pueda testear en produccion. Use Node.js ya que esstoy mas familiarizado con el syntax de JS. Tambien fue para poder usar la llave API de una forma segura sin tener que subirla al repositorio de github en la parte de front-end. Esta llave la pude guardar en las variables de ambiente en Render.com, lo cual es mas seguro. 
</p>

# Decisiones Clave del Proyecto

Este documento explica las decisiones importantes que se tomaron al construir el "Reto del Contador de Mensajes". El objetivo es entender la lógica detrás de la estructura, cómo se manejaron los datos y qué se podría mejorar.

## 1. Cómo se Diseñó la Solución

La aplicación se construyó como un sistema completo, dividido en partes más pequeñas (servicios individuales), organizadas con Docker Compose. Esto permite que cada parte funcione de manera independiente y sea más fácil de mantener.

### 1.1. Estructura General

-   **Parte de Servidor (Backend API)**: Es el cerebro de la aplicación. Se encarga de recibir los mensajes (como una "notificación automática"), responder a las consultas sobre cuántos mensajes hay y enviar información en tiempo real a la interfaz de usuario. Aquí también se gestiona la comunicación en tiempo real.
-   **Procesador de Tareas (Worker)**: Es como un asistente que trabaja en segundo plano. Recoge los mensajes que llegan, los cuenta por hora y envía resúmenes a otros servicios. Esto asegura que la aplicación principal no se sature y pueda seguir recibiendo mensajes rápidamente.
-   **Interfaz de Usuario (Frontend)**: Es lo que ves y con lo que interactúas. Permite consultar los conteos de mensajes y ver las actualizaciones al instante, como si estuvieras viendo un marcador en vivo.
-   **Base de Datos (PostgreSQL)**: Donde se guarda toda la información importante: los mensajes que ya se procesaron y los conteos por hora.
-   **Cola de Mensajes (RabbitMQ)**: Funciona como una sala de espera para los mensajes. Cuando llega un mensaje, se pone en esta cola para ser procesado más tarde. Esto hace que el sistema sea más robusto y rápido, ya que no tiene que procesar todo al instante.

### 1.2. Cómo se Guardan los Datos

Se usan dos tipos principales de registros para guardar la información:

-   **`Mensaje Procesado`**: Guarda una huella de cada mensaje que ya se recibió. Esto es clave para no contar el mismo mensaje dos veces si llega por error repetido.
-   **`Conteo Horario`**: Almacena cuántos mensajes se recibieron en una cuenta específica durante cada hora. Es un resumen que se actualiza constantemente.

### 1.3. Puntos de Acceso (Puertas de Comunicación)

Son las "puertas" por donde la aplicación se comunica:

-   **`POST /api/v1/webhook/message`**: La puerta principal para recibir nuevos mensajes.
-   **`GET /api/v1/counts`**: Para preguntar cuántos mensajes se han contado en un periodo.
-   **`POST /api/v1/mock/daily-total`**: Una puerta especial para simular que llega un resumen diario de mensajes. Cuando se usa, la interfaz de usuario se actualiza al instante.

### 1.4. Cómo se Comunican las Partes

-   **RabbitMQ**: Para enviar mensajes de forma segura y eficiente entre la parte que recibe los mensajes y la parte que los procesa. Es como un sistema de correo interno muy fiable.
-   **Socket.IO**: Para que la interfaz de usuario y el servidor hablen en tiempo real. Cuando algo importante sucede en el servidor (como un nuevo mensaje simulado), la interfaz de usuario se entera al instante y lo muestra sin necesidad de recargar la página.

## 2. Asegurando que los Datos Sean Correctos (Evitando Duplicados y Manteniendo la Coherencia)

### 2.1. Evitando Mensajes Duplicados

Para que un mensaje no se cuente más de una vez, incluso si llega repetido, se usa una técnica para "procesar una sola vez". Cada mensaje tiene una identificación única. Antes de procesar un mensaje, se verifica si esa identificación ya se vio. Si es así, se ignora, garantizando que cada mensaje se cuente solo una vez.

### 2.2. Conteo Fiable

Cuando se actualizan los conteos por hora en la base de datos, se hace de una manera que asegura que la información siempre sea correcta. Esto significa que, si algo falla a mitad de la actualización, la base de datos vuelve a su estado anterior, evitando conteos erróneos.

## 3. Qué se Asume y Qué se Podría Mejorar

### 3.1. Suposiciones Importantes

-   Se asume que la fecha y hora de los mensajes (`created_at`) siempre vienen en un formato estándar y en horario universal (UTC).
-   Se pensó que un solo procesador de tareas (`worker`) sería suficiente para el volumen de mensajes. Si hubiera muchísimos mensajes, se necesitarían más procesadores trabajando en paralelo.
-   La seguridad (quién puede acceder a qué) no fue el foco principal de este reto, pero es vital en una aplicación real.

### 3.2. Ideas para Mejorar en el Futuro

-   **Más Procesadores de Tareas**: Añadir más "workers" para manejar un volumen mucho mayor de mensajes al mismo tiempo.
-   **Seguridad Avanzada**: Implementar sistemas robustos para verificar la identidad de los usuarios y controlar sus permisos.
-   **Manejo de Errores Inteligente**: Mejorar cómo la aplicación reacciona a los errores, por ejemplo, reintentando automáticamente las tareas que fallan o enviando mensajes a una "bandeja de entrada" de errores para revisión, con reintentos espaciados.
-   **Monitoreo Completo**: Usar herramientas para vigilar el rendimiento de la aplicación, detectar problemas rápidamente y entender cómo funciona todo en tiempo real.
-   **Configuración Flexible**: Guardar la configuración importante (como contraseñas de bases de datos) en un lugar seguro y centralizado, para que sea fácil de cambiar sin tocar el código.
-   **Más Pruebas**: Escribir más pruebas automáticas para asegurar que cada parte de la aplicación funciona perfectamente y que los cambios no rompen nada.
-   **Interfaz de Usuario Más Interactiva**: Añadir funciones como gráficos, filtros avanzados y más opciones para personalizar cómo se ve la información.
-   **Reglas Claras para los Mensajes**: Establecer reglas estrictas sobre cómo deben ser los mensajes que entran y salen del sistema para evitar errores y asegurar que todas las partes se entiendan.

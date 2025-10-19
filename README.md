# Reto del Contador de Mensajes

Este proyecto es una aplicación full-stack diseñada para contar mensajes, procesarlos y mostrar estadísticas por hora. Consiste en un frontend de React, un backend de Node.js/TypeScript, una base de datos PostgreSQL y RabbitMQ para la cola de mensajes.

## Tecnologías Utilizadas

**Frontend:**
- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand (Gestión de Estado)
- Socket.IO Client (Comunicación en tiempo real)

**Backend:**
- Node.js
- TypeScript
- Express.js
- Sequelize (ORM para PostgreSQL)
- amqplib (cliente de RabbitMQ)
- Socket.IO (Comunicación en tiempo real)

**Base de Datos:**
- PostgreSQL

**Cola de Mensajes:**
- RabbitMQ

**Orquestación:**
- Docker Compose

## Estructura del Proyecto

- `backend/`: Contiene la aplicación backend de Node.js/TypeScript.
- `frontend/`: Contiene la aplicación frontend de React/TypeScript.
- `.env`: Variables de entorno para el proyecto.
- `docker-compose.yml`: Define los servicios, redes y volúmenes para la aplicación.

## Configuración y Ejecución del Proyecto

Para poner el proyecto en marcha, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone <repository_url>
    cd message-counter-challenge
    ```

2.  **Configura las Variables de Entorno:**
    Crea un archivo `.env` en el directorio raíz del proyecto con el siguiente contenido (puedes ajustar los valores según sea necesario):
    ```
    POSTGRES_USER=user
    POSTGRES_PASSWORD=pass
    POSTGRES_DB=message_counter
    DB_HOST=db
    DB_PORT=5432
    RABBITMQ_USER=user
    RABBITMQ_PASSWORD=pass
    RABBITMQ_HOST=rabbitmq
    RABBITMQ_PORT=5672
    RABBITMQ_URL=amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}
    DB_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}
    PORT=3000
    VITE_API_BASE_URL=http://localhost:3000
    ```

3.  **Construye y Ejecuta con Docker Compose:**
    Navega al directorio raíz del proyecto y ejecuta:
    ```bash
    docker-compose up -d --build
    ```
    Este comando:
    -   Construirá las imágenes de Docker para los servicios de backend y frontend.
    -   Iniciará todos los servicios definidos en `docker-compose.yml` (PostgreSQL, RabbitMQ, API de Backend, Worker de Backend, Frontend).
    -   Ejecutará las migraciones de la base de datos.
    -   Configurará la comunicación en tiempo real a través de Socket.IO.

4.  **Accede a la Aplicación:**
    Una vez que todos los servicios estén en funcionamiento, puedes acceder a la aplicación frontend en tu navegador web en:
    ```
    http://localhost:8080
    ```

## Endpoints de la API del Backend

Aquí se detallan los endpoints principales de la API del backend:

-   **GET /api/v1/counts**: Consulta el conteo de mensajes por hora para un `account_id` y un rango de fechas.
    -   **Parámetros de consulta**: `account_id`, `from` (ISO string), `to` (ISO string).
    -   **Ejemplo de uso (Frontend)**: La aplicación frontend utiliza este endpoint para mostrar los resultados en la tabla.

-   **POST /api/v1/mock/daily-total**: Endpoint de mock para simular la recepción de un total diario de mensajes. Al recibir una petición, este endpoint emite un evento de Socket.IO en tiempo real al frontend.
    -   **Cuerpo de la petición (JSON)**:
        ```json
        {
            "account_id": "acc_test",
            "total_messages_today": 123
        }
        ```
    -   **Ejemplo de uso (cURL)**:
        ```bash
        curl -X POST -H "Content-Type: application/json" \
             -d '{"account_id": "acc_test", "total_messages_today": 123}' \
             http://localhost:3000/api/v1/mock/daily-total
        ```

## Uso del Frontend

La aplicación frontend ofrece una interfaz de usuario mejorada y moderna para interactuar con el sistema de conteo de mensajes:

-   **Formulario de Consulta**: Utiliza el formulario en la parte izquierda para ingresar un `Account ID` y un rango de fechas (`Desde` y `Hasta`). Al hacer clic en "Consultar", la tabla de resultados se actualizará con los conteos horarios correspondientes.
-   **Tabla de Resultados**: Muestra los conteos de mensajes por hora para la consulta realizada. La tabla ha sido diseñada para ser más legible y visualmente atractiva.
-   **Actualizaciones en Tiempo Real (Socket.IO)**: Cuando se envía una petición al endpoint de mock del backend (`/api/v1/mock/daily-total`), la aplicación frontend recibirá un evento en tiempo real a través de Socket.IO. Una notificación destacada aparecerá en la parte superior de la pantalla, mostrando el `Account ID` y el `Total Mensajes Hoy` recibidos, demostrando la capacidad de comunicación en tiempo real del sistema.

## Desarrollo

Para el desarrollo local, la forma recomendada de trabajar es utilizando Docker Compose para asegurar un entorno consistente. Sin embargo, también puedes ejecutar los servicios de forma individual para tareas específicas como pruebas o linting.

### Con Docker Compose (Recomendado)

Para iniciar los servicios en modo desarrollo (con recarga en caliente si está configurado en los Dockerfiles):

```bash
docker-compose up
```

Para ejecutar comandos específicos dentro de un servicio en ejecución (por ejemplo, pruebas):

-   **Backend Tests**:
    ```bash
    docker-compose exec api npm test
    ```
-   **Frontend Tests**:
    ```bash
    docker-compose exec frontend npm test
    ```

### Ejecución Individual (Alternativa)

Si prefieres trabajar con los servicios de forma individual (asegúrate de que los servicios de `db` y `rabbitmq` estén corriendo con Docker Compose o de forma local):

### Backend (`backend/`)

-   **Instalar dependencias**:
    ```bash
    cd backend
    npm install
    ```
-   **Ejecutar pruebas**:
    ```bash
    cd backend
    npm test
    ```
-   **Linting**:
    ```bash
    cd backend
    npm run lint
    ```
-   **Compilación/Type Checking**:
    ```bash
    cd backend
    npm run build
    ```
-   **Iniciar el servidor de desarrollo**:
    ```bash
    cd backend
    npm run dev
    ```

### Frontend (`frontend/`)

-   **Instalar dependencias**:
    ```bash
    cd frontend
    npm install
    ```
-   **Ejecutar pruebas**:
    ```bash
    cd frontend
    npm test
    ```
-   **Linting**:
    ```bash
    cd frontend
    npm run lint
    ```
-   **Compilación/Type Checking**:
    ```bash
    cd frontend
    npm run build
    ```
-   **Iniciar el servidor de desarrollo**:
    ```bash
    cd frontend
    npm run dev
    ```

## Solución de Problemas

-   Si encuentras problemas con los servicios que no se inician, revisa los logs de Docker:
    ```bash
    docker-compose logs <nombre_del_servicio>
    ```
    (por ejemplo, `docker-compose logs api` o `docker-compose logs frontend`)
-   Asegúrate de que Docker Desktop (o tu entorno Docker) esté ejecutándose.
-   Si los problemas de construcción persisten, intenta limpiar la caché de Docker por completo:
    ```bash
    docker system prune -a -f
    ```
    **Advertencia**: Este comando eliminará *todos* los datos de Docker no utilizados (imágenes, contenedores, volúmenes, redes) y debe usarse con precaución.
-   Si realizas cambios en el código del backend o frontend, es posible que debas reconstruir el servicio específico:
    ```bash
    docker-compose up -d --build <nombre_del_servicio>
    ```
    (por ejemplo, `docker-compose up -d --build frontend`)

# Reto del Contador de Mensajes

Este proyecto es una aplicación full-stack diseñada para contar mensajes, procesarlos y mostrar estadísticas por hora. Consiste en un frontend de React, un backend de Node.js/TypeScript, una base de datos PostgreSQL y RabbitMQ para la cola de mensajes.

## Tecnologías Utilizadas

**Frontend:**
- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand (Gestión de Estado)

**Backend:**
- Node.js
- TypeScript
- Express.js
- Sequelize (ORM para PostgreSQL)
- amqplib (cliente de RabbitMQ)

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

4.  **Accede a la Aplicación:**
    Una vez que todos los servicios estén en funcionamiento, puedes acceder a la aplicación frontend en tu navegador web en:
    ```
    http://localhost:8080
    ```

## Endpoints de la API del Backend

(Añade detalles sobre los endpoints de tu API de backend aquí, por ejemplo, `/api/v1/counts`, `/api/v1/webhook/message`)

## Uso del Frontend

(Añade detalles sobre cómo usar la aplicación frontend, por ejemplo, cómo consultar los recuentos, qué muestra la tabla de resultados)

## Desarrollo

(Añade cualquier instrucción específica para el desarrollo local, por ejemplo, ejecutar pruebas, linting, etc.)

## Solución de Problemas

-   Si encuentras problemas con los servicios que no se inician, revisa los logs de Docker:
    ```bash
    docker-compose logs <nombre_del_servicio>
    ```
    (por ejemplo, `docker-compose logs api` o `docker-compose logs frontend`)
-   Asegúrate de que Docker Desktop (o tu entorno Docker) esté ejecutándose.
-   Si realizas cambios en el código del backend o frontend, es posible que debas reconstruir el servicio específico:
    ```bash
    docker-compose up -d --build <nombre_del_servicio>
    ```
    (por ejemplo, `docker-compose up -d --build frontend`)

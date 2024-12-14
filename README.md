# Sistema de Gestión Hotelera

Este proyecto es una solución desarrollada para la cadena hotelera Example, cuyo objetivo es centralizar la gestión de reservas, disponibilidad de habitaciones y operaciones de inventario a través de tres servicios independientes: un servicio SOAP, una API REST y un microservicio de inventario.

### Introducción

La solución está diseñada utilizando Node.js y PostgreSQL debido a las siguientes razones:

- **Node.js**: Su capacidad para manejar aplicaciones escalables y orientadas a microservicios, junto con su ecosistema rico en librerías, lo convierte en una excelente opción para desarrollar servicios web.
- **PostgreSQL**: Un sistema de base de datos relacional robusto y altamente compatible con sistemas modernos, ideal para manejar datos estructurados y consultas complejas de manera eficiente.

Este trabajo fue desarrollado como parte de las actividades académicas de la Universidad de las Américas. Autor: Ismael Ordoñez.

---

## Requisitos Previos

1. **Node.js y npm** instalados en tu sistema.
2. **PostgreSQL** configurado y ejecutándose localmente o en un servidor remoto.
3. **Nodemon** instalado globalmente:
   ```bash
   npm i -g nodemon
   ```
4. Clonar los proyectos SOAP, REST API e Inventory desde el repositorio proporcionado.

---

## Configuración Inicial

Para cada proyecto (SOAP, REST API e Inventory):

1. Ejecutar los scripts SQL incluidos en cada carpeta para crear las tablas y datos de prueba iniciales. Por ejemplo:

   ```bash
   psql -U postgres -d <nombre_base_datos> -f <ruta_del_archivo.sql>
   ```

   Asegúrate de que las credenciales y la configuración de la base de datos coincidan con las especificadas en cada archivo `index.js`.

2. Instalar las dependencias ejecutando:

   ```bash
   npm install
   ```

---

## Ejecución de los Servicios

### 1. **SOAP Service (Consulta de Disponibilidad)**

Este servicio permite consultar la disponibilidad de habitaciones en formato XML.

- Para iniciar el servicio:
  ```bash
  nodemon
  ```
- Para ejecutar las pruebas (asegúrate de que el servicio esté corriendo):
  ```bash
  npm test
  ```

### 2. **REST API (Gestor de Reservas)**

Esta API permite realizar, consultar y cancelar reservas.

- Para iniciar el servicio:
  ```bash
  nodemon
  ```
- Para ejecutar las pruebas:
  ```bash
  npm test
  ```

### 3. **Inventory Service (Gestión de Habitaciones)**

Este microservicio permite registrar nuevas habitaciones y actualizar su estado.

- Para iniciar el servicio:
  ```bash
  nodemon
  ```
- Para ejecutar las pruebas:
  ```bash
  npm test
  ```

---

## Estructura de Carpetas

Cada servicio sigue la siguiente estructura básica:

```
project-name/
|-- db.sql              # Script para la base de datos
|-- src                 # Código fuente
|   |-- app.js
|   |-- index.js
|-- package.json        # Configuración del proyecto
|-- tests/              # Carpeta de pruebas con Jest
|   |-- <nombre_test>.js
```

---

## Ejemplo de Pruebas

Se incluyen ejemplos documentados de cómo probar cada funcionalidad:

### SOAP

- **Solicitud:**
  ```xml
  <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
      <checkAvailability>
        <startDate>2024-12-15</startDate>
        <endDate>2024-12-16</endDate>
        <roomType>Single</roomType>
      </checkAvailability>
    </Body>
  </Envelope>
  ```
- **Respuesta:**
  ```xml
  <rooms>
    <room>
      <roomId>1</roomId>
      <roomType>Single</roomType>
      <availableDate>2024-12-15</availableDate>
      <status>available</status>
    </room>
  </rooms>
  ```

### REST API

- **Crear reserva:**

  ```bash
  curl -X POST http://localhost:8002/reservations -H "Content-Type: application/json" -d '{
    "roomNumber": 101,
    "customerName": "John Doe",
    "startDate": "2024-12-15",
    "endDate": "2024-12-16"
  }'
  ```

- **Consultar reserva:**

  ```bash
  curl -X GET http://localhost:8002/reservations/1
  ```

- **Cancelar reserva:**

  ```bash
  curl -X DELETE http://localhost:8002/reservations/1
  ```

### Inventory Service

- **Registrar habitación:**

  ```bash
  curl -X POST http://localhost:8003/rooms -H "Content-Type: application/json" -d '{
    "roomNumber": 103,
    "roomType": "Suite",
    "status": "available"
  }'
  ```

- **Actualizar estado:**

  ```bash
  curl -X PATCH http://localhost:8003/rooms/1 -H "Content-Type: application/json" -d '{
    "status": "maintenance"
  }'
  ```

---

## Autor

Este proyecto fue desarrollado por Ismael Ordoñez como parte de los requerimientos académicos de la Universidad de las Américas.

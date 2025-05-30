# BookReadIt

BookReadIt es una plataforma para descubrir, seguir y debatir sobre libros.

## Características

- Registro e inicio de sesión de usuarios
- Búsqueda y creación de páginas de libros
- Temas de discusión y comentarios jerárquicos
- Sistema de notificaciones
- Gestión de roles (propietario, moderador)
- Etiquetas para clasificar libros

## Instalación

1. Clona el repositorio.
2. Instala dependencias:
   ```
   npm install
   ```
3. Crea un archivo `.env` con la URL de la API:
   ```
   VITE_API_URL='https://bookreadit-api-706429685302.europe-west1.run.app/api'
   ```
4. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

## Scripts útiles

- `npm run dev` — Inicia el entorno de desarrollo
- `npm run build` — Compila la aplicación para producción
- `npm run lint` — Ejecuta ESLint

## Estructura del proyecto

- `/src/components` — Componentes reutilizables
- `/src/pages` — Vistas principales
- `/src/api` — Llamadas a la API
- `/src/hooks` — Hooks personalizados
- `/src/context` — Contextos globales

## Licencia

MIT
# Project Architecture Overview

This project follows a **feature-first / domain-driven** architecture for scalability, maintainability, and clarity. Below is a description of each main folder and its purpose:

## Root Level
- **environments/**
  - Configuración de entornos (variables globales como la URL base de la API).
  - Ejemplo: `environment.ts`

- **src/**
  - Código fuente principal de la aplicación.

---

## src/app/
- **router/**: Configuración de rutas globales (React Router).
- **providers/**: Proveedores globales (Theme, Context, etc).
- **store/**: Estado global de la app (si aplica, por ejemplo, Redux o Zustand global).
- **styles/**: Estilos globales de la aplicación.
- **App.tsx**: Componente raíz de la aplicación.
- **main.tsx**: Punto de entrada de la app.

## src/shared/
- **components/**: Componentes reutilizables en múltiples features (ej: Loader, SearchBar, Modal).
- **hooks/**: Hooks reutilizables y genéricos.
- **services/**: Servicios globales (ej: httpClient para Axios).
- **types/**: Tipos globales y utilidades compartidas.
- **utils/**: Funciones utilitarias globales.

## src/features/
Cada subcarpeta representa un dominio funcional (feature) y contiene todo lo necesario para esa funcionalidad.

### Ejemplo: src/features/user-management/
- **components/**: Componentes específicos del feature (UserTable, UserForm, UserFilters).
- **pages/**: Páginas del feature (UsersPage, UserDetailPage).
- **hooks/**: Hooks específicos del feature (useUsers, useCreateUser).
- **services/**: Lógica de negocio y acceso a datos del feature (userService, UserManager, UserRepository).
- **state/**: Estado local/global del feature (userStore, slices, context).
- **types/**: Tipos, interfaces y modelos del feature (user.types.ts, User class).
- **utils/**: Utilidades específicas del feature (data mappers, helpers).
- **index.ts**: Barrel export para facilitar los imports.

---

## Buenas prácticas
- Los componentes, hooks, servicios y tipos específicos de un feature van dentro de su carpeta de feature.
- Todo lo reutilizable entre features va en `shared/`.
- La configuración global y el punto de entrada van en `app/`.
- Las variables de entorno y configuración global van en `environments/`.

---

Esta estructura permite escalar el proyecto fácilmente, mantener el código organizado y separar claramente las responsabilidades.

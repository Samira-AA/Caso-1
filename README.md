# Arquitectura del proyecto

Documento que describe la estructura de carpetas y responsabilidades. El objetivo es mantener un proyecto escalable, mantenible y coherente siguiendo un enfoque feature-first / domain-driven.

## Resumen
- Separación por dominio: agrupar por features (features/).
- Reutilizables globales en `shared/`.
- Configuración global y entry points en `app/`.
- Variables de entorno en `environments/`.

## Estructura principal
- `app/`
  Contiene la configuración global de la aplicación y los puntos de entrada.
  - `router/` — Configuración de rutas (React Router).
  - `providers/` — Providers globales (ThemeProvider, AuthProvider, etc.).
  - `store/` — Store global si aplica (por ejemplo, configuración de Redux/Zustand global).
  - `styles/` — Estilos globales (variables CSS, themes).
  - `App.tsx` — Componente raíz que compone providers y router.
  - `main.tsx` — Entry point (render).

- `shared/`
  Recursos reutilizables por varias features.
  - `components/` — Componentes UI genéricos (Button, Input, ModalBase, Spinner).
  - `hooks/` — Hooks genéricos reutilizables (useDebounce, useLocalStorage).
  - `services/` — Cliente HTTP base (axios instance), utilidades de fetch comunes.
  - `utils/` — Helpers globales.
  - `types/` — Tipos e interfaces comunes.
  - `constants/` — Constantes compartidas.

- `features/`
  Agrupa por dominio funcional. Cada feature es autónoma y contiene su propia lógica y UI.
  Estructura obligatoria por feature:
  - `features/<feature-name>/`
    - `components/` — Componentes específicos de la feature (pequeños y enfocados).
    - `pages/` — Pages/containers usados por rutas.
    - `hooks/` — Hooks propios de la feature (encapsulan lógica de negocio y side effects).
    - `services/` — Capa de datos:
      - `FeatureManager` — Orquesta reglas de negocio, transformaciones y manejo de errores. Punto de entrada para la capa de vista.
      - `FeatureRepository` — Acceso al data source (API, indexedDB, etc.). Sin reglas de negocio.
    - `state/` — Estado compartido de la feature (Zustand slices, context o reducers).
    - `types/` — Tipos e interfaces propios del feature (incluye el modelo de `user` si aplica).
    - `utils/` — Utilidades específicas del feature (mappers, formateadores).
    - `index.ts` — Barrel export para la feature.

  Ejemplo: `features/user-management/`
  - `components/`
    - `UserTable.tsx` — Presentación de la lista.
    - `UserForm.tsx` — Formulario de creación/edición.
    - `UserFilters.tsx` — Filtros / buscador.
  - `pages/`
    - `UsersPage.tsx` — Página que usa los componentes de la feature.
    - `UserDetailPage.tsx`
  - `hooks/`
    - `useUsers.ts` — obtiene lista, estado de carga, filtro.
    - `useCreateUser.ts`
  - `services/`
    - `userManager.ts` — Reglas y transformación.
    - `userRepository.ts` — Llamadas HTTP a la API.
  - `state/`
    - `userStore.ts` — Zustand slice o contexto.
  - `types/`
    - `user.types.ts` — Interface `User` (id, name, email, ...).
  - `utils/`
    - `dataMappers.ts` — Mapeos de respuesta a modelo UI.
  - `index.ts`

- `environments/`
  Variables de entorno específicas de cada entorno (no adjuntar claves secretas en repo).
  - `environment.ts` (ejemplo, TypeScript):
    production: boolean
    baseUrl: string
  Ejemplo (TypeScript):
      export const environment = {
          production: false,
          baseUrl: "https://<TU_API_BASE_URL>"
      }

## Cómo arrancar (ejemplo)
1. Instalar dependencias: `npm install`
2. Variables: ajustar `environments/environment.ts` con `baseUrl`.
3. Ejecutar: `npm run dev` (o script definido).

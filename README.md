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

## Reglas técnicas y buenas prácticas
- Componentes específicos de feature en `features/.../components`. Componentes globales en `shared/components`.
- Hooks específicos en `features/.../hooks`. Hooks genéricos en `shared/hooks`.
- Lógica de fetch/axios en `features/.../services`. Cliente base en `shared/services`.
- Centralizar tipos por feature en `features/.../types`.
- Usar barrel `index.ts` en cada feature para exportaciones limpias.
- Nombres: PascalCase para componentes, camelCase para hooks y utilidades, kebab-case o carpetas consistentes.
- Separación UI / lógica: los hooks contienen la lógica; los componentes, la presentación.
- Evitar archivos gigantes; preferir componentes pequeños y focused.
- Mantener import paths relativos consistentes y corregir imports rotos.

## Consideraciones para la funcionalidad actual (User Management)
- Consumo de datos con `fetch` o `axios` dentro de `useEffect` en hooks de la feature (`features/user-management/hooks/useUsers.ts`).
- Mostrar por cada usuario: `name` y `email`.
- Implementar buscador por nombre en `UserFilters.tsx` + `useUsers`.
- Mostrar "Cargando..." mientras se obtienen datos (estado `loading` en hook).
- Utilizar `key` en listas.
- Tests y tipado con TypeScript para mantener calidad.

## Limpieza y mantenimiento
- Eliminar archivos duplicados y componentes no usados.
- Eliminar imports muertos.
- Homogeneizar nombres y estructura.
- Documentar cada feature con su `README` si es complejo.

## Cómo arrancar (ejemplo)
1. Instalar dependencias: `npm install`
2. Variables: ajustar `environments/environment.ts` con `baseUrl`.
3. Ejecutar: `npm run dev` (o script definido).

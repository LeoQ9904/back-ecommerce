# Back-Ecommerce

Un proyecto backend para e-commerce construido con NestJS, configurado con estándares de desarrollo estrictos y herramientas de calidad de código.

## 🚀 Características

- **Framework**: NestJS con TypeScript
- **Calidad de Código**: ESLint con reglas estrictas
- **Formato de Código**: Prettier con tab de 4 espacios
- **Git Hooks**: Husky para validación pre-commit
- **Commits**: Conventional Commits con Commitlint
- **Lint-Staged**: Validación automática en archivos staged

## 📋 Requisitos

- Node.js >= 20.13.1
- npm >= 10.7.0

## 🛠️ Instalación

```bash
$ npm install
```

## 🏃‍♂️ Ejecución

```bash
# desarrollo
$ npm run start

# modo watch
$ npm run start:dev

# modo debug
$ npm run start:debug

# producción
$ npm run start:prod
```

## 🧪 Pruebas

```bash
# pruebas unitarias
$ npm run test

# pruebas e2e
$ npm run test:e2e

# cobertura de pruebas
$ npm run test:cov

# modo watch para pruebas
$ npm run test:watch
```

## 📝 Scripts de Desarrollo

```bash
# Formatear código
$ npm run format

# Verificar formato (sin aplicar cambios)
$ npm run format:check

# Ejecutar linting y auto-fix
$ npm run lint

# Verificar linting (sin aplicar cambios)
$ npm run lint:check

# Crear commit interactivo con Commitizen
$ npm run commit

# Verificar último commit
$ npm run commitlint
```

## 🔧 Configuración de Desarrollo

### Estándares de Código

- **Indentación**: 4 espacios (no tabs)
- **Comillas**: Simples (`'`)
- **Punto y coma**: Requerido
- **Longitud máxima de línea**: 100 caracteres
- **Trailing commas**: ES5 style

### Conventional Commits

Este proyecto usa [Conventional Commits](https://conventionalcommits.org/). Los tipos de commit permitidos son:

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `docs`: Cambios en documentación
- `style`: Cambios de formato (espacios, comas, etc.)
- `refactor`: Refactoring de código
- `perf`: Mejoras de rendimiento
- `test`: Agregar o modificar pruebas
- `chore`: Cambios en build o herramientas auxiliares
- `ci`: Cambios en CI/CD
- `build`: Cambios en el sistema de build
- `revert`: Revertir cambios anteriores

### Ejemplo de commit:

```bash
feat(auth): add JWT authentication system
```

### Git Flow

Este proyecto utiliza **Git Flow** para organizar el desarrollo:

- **`master`**: Rama de producción (código estable)
- **`develop`**: Rama de desarrollo (integración continua)
- **`feature/*`**: Nuevas características
- **`release/*`**: Preparación de versiones
- **`hotfix/*`**: Correcciones urgentes

Ver [GIT-FLOW.md](./GIT-FLOW.md) para documentación completa.

#### Comandos básicos:

```bash
# Iniciar nueva característica
git flow feature start mi-feature

# Finalizar característica
git flow feature finish mi-feature

# Ver estado de Git Flow
npm run flow:status
```

### Pre-commit Hooks

Antes de cada commit se ejecutará automáticamente:

1. **Lint-staged**: Validación y formato automático de archivos modificados
2. **ESLint**: Verificación de reglas de código
3. **Prettier**: Formato automático del código
4. **Tests**: Ejecución de pruebas unitarias
5. **Commitlint**: Validación del formato del mensaje de commit

### VSCode Settings

El proyecto incluye configuración de VSCode (`.vscode/settings.json`) que:

- Establece tab de 4 espacios
- Formatea al guardar
- Ejecuta ESLint automáticamente
- Organiza imports automáticamente

## 🚫 Reglas ESLint Estrictas

El proyecto está configurado con reglas ESLint muy estrictas que incluyen:

- Tipado explícito requerido
- No uso de `any`
- Manejo obligatorio de promesas
- Preferencia por readonly cuando sea posible
- Uso obligatorio de const/let sobre var
- Y muchas más reglas para mantener código de alta calidad

## ⚡ Comandos Útiles

```bash
# Crear commit interactivo (recomendado)
$ npm run commit

# Verificar que el código pase todas las validaciones
$ npm run lint:check && npm run format:check && npm test

# Fix automático de issues de formato y linting
$ npm run lint && npm run format
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feat/amazing-feature`)
3. Usa commits convencionales (`npm run commit`)
4. Haz push a tu rama (`git push origin feat/amazing-feature`)
5. Abre un Pull Request

Los hooks de pre-commit se encargarán de validar tu código automáticamente.

## ⚖️ Licencia

Este proyecto tiene licencia UNLICENSED.

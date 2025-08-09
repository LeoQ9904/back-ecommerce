# Git Flow - Guía de Uso

## 📋 Introducción

Git Flow está configurado en este proyecto para mantener un flujo de trabajo organizado y profesional. Este documento explica cómo usar Git Flow correctamente.

## 🌳 Estructura de Ramas

### Ramas Principales:

- **`master`**: Rama de producción - Solo código estable y listo para producción
- **`develop`**: Rama de desarrollo - Integración continua de nuevas características

### Ramas de Soporte:

- **`feature/*`**: Nuevas características y funcionalidades
- **`release/*`**: Preparación de nuevas versiones
- **`hotfix/*`**: Correcciones urgentes en producción
- **`bugfix/*`**: Correcciones de bugs en desarrollo
- **`support/*`**: Soporte a versiones antiguas

## 🚀 Comandos Git Flow

### Features (Características)

#### Iniciar una nueva característica:

```bash
git flow feature start nombre-caracteristica
# O usando npm script:
npm run flow:feature:start nombre-caracteristica
```

#### Finalizar una característica:

```bash
git flow feature finish nombre-caracteristica
# O usando npm script:
npm run flow:feature:finish nombre-caracteristica
```

#### Publicar característica (para colaboración):

```bash
git flow feature publish nombre-caracteristica
```

#### Obtener característica publicada:

```bash
git flow feature pull origin nombre-caracteristica
```

### Releases (Versiones)

#### Iniciar una nueva versión:

```bash
git flow release start 1.0.0
# O usando npm script:
npm run flow:release:start 1.0.0
```

#### Finalizar una versión:

```bash
git flow release finish 1.0.0
# O usando npm script:
npm run flow:release:finish 1.0.0
```

### Hotfixes (Correcciones Urgentes)

#### Iniciar un hotfix:

```bash
git flow hotfix start 1.0.1
# O usando npm script:
npm run flow:hotfix:start 1.0.1
```

#### Finalizar un hotfix:

```bash
git flow hotfix finish 1.0.1
# O usando npm script:
npm run flow:hotfix:finish 1.0.1
```

### Bugfixes (Correcciones de Bugs)

#### Iniciar una corrección:

```bash
git flow bugfix start nombre-bug
```

#### Finalizar una corrección:

```bash
git flow bugfix finish nombre-bug
```

## 📝 Flujo de Trabajo Recomendado

### 1. Desarrollo de Características

```bash
# 1. Asegúrate de estar en develop
git checkout develop
git pull origin develop

# 2. Inicia una nueva característica
git flow feature start mi-nueva-funcionalidad

# 3. Desarrolla tu código
# ... código, commits, etc ...

# 4. Usa conventional commits
git commit -m "feat: add new authentication system"

# 5. Finaliza la característica
git flow feature finish mi-nueva-funcionalidad
```

### 2. Preparación de Release

```bash
# 1. Inicia el release
git flow release start 1.1.0

# 2. Realiza ajustes finales, actualiza versiones, changelog
npm version 1.1.0
git commit -m "chore: bump version to 1.1.0"

# 3. Finaliza el release
git flow release finish 1.1.0
```

### 3. Hotfix Urgente

```bash
# 1. Inicia el hotfix desde master
git flow hotfix start 1.1.1

# 2. Corrige el problema crítico
git commit -m "fix: resolve critical security vulnerability"

# 3. Finaliza el hotfix
git flow hotfix finish 1.1.1
```

## ⚙️ Configuración Actual

```
Rama de producción: master
Rama de desarrollo: develop
Prefijos de ramas:
- feature/
- bugfix/
- release/
- hotfix/
- support/
```

## 🔧 Scripts NPM Disponibles

```bash
# Ver estado de Git Flow
npm run flow:status

# Features
npm run flow:feature:start <nombre>
npm run flow:feature:finish <nombre>

# Releases
npm run flow:release:start <version>
npm run flow:release:finish <version>

# Hotfixes
npm run flow:hotfix:start <version>
npm run flow:hotfix:finish <version>
```

## 📋 Reglas y Mejores Prácticas

### ✅ DO (Hacer):

- Usar conventional commits en todas las ramas
- Mantener features pequeñas y enfocadas
- Hacer rebase antes de finish cuando sea necesario
- Actualizar la versión en package.json durante releases
- Hacer pruebas completas antes de finish
- Usar nombres descriptivos para features/hotfixes

### ❌ DON'T (No Hacer):

- No hacer commits directos a master o develop
- No mezclar múltiples características en un feature
- No dejar features abiertas por mucho tiempo
- No hacer force push en ramas compartidas
- No saltar la validación de pre-commit

## 🔄 Estados de Ramas

### Master (Producción)

- Solo código estable y probado
- Cada commit debe estar etiquetado con versión
- Protegida contra commits directos

### Develop (Desarrollo)

- Integración continua de features
- Siempre debe estar en estado funcional
- Base para nuevas características

### Feature Branches

- Vida corta (días/semanas, no meses)
- Una característica por rama
- Borrar después de merge

## 📊 Workflow Visual

```
master     ●─────●─────●─────●
           │     │     │     │
           │     │   hotfix  │
           │     │     │     │
develop    ●──●──●──●──●──●──●
           │  │  │  │  │  │  │
           │  │  │  │release │
           │  │  │  │  │     │
feature    │  ●──●──●  │     │
           │           │     │
bugfix     ●───●───●───●     │
```

## 🚨 Comandos de Emergencia

### Cancelar un feature en progreso:

```bash
git checkout develop
git branch -D feature/nombre-feature
```

### Ver todas las ramas de flow:

```bash
git branch | grep -E "(feature|release|hotfix|bugfix)"
```

### Limpiar ramas locales merged:

```bash
git branch --merged develop | grep -v develop | xargs -n 1 git branch -d
```

## 📞 Soporte

Si tienes dudas sobre Git Flow:

1. Consulta esta documentación
2. Usa `git flow help`
3. Revisa el estado con `npm run flow:status`

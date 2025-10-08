# Etapa 1: Construcción (build)
FROM node:20-alpine AS builder

# Instalar pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias usando pnpm
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Compilar aplicación
RUN pnpm run build

# Etapa 2: Producción
FROM node:20-alpine AS production

# Instalar pnpm en la imagen de producción
RUN npm install -g pnpm

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

WORKDIR /app

# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml ./

# Instalar solo dependencias de producción
RUN pnpm install --prod --frozen-lockfile && pnpm store prune

# Copiar aplicación compilada
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

# Crear directorio para uploads y asignar permisos
RUN mkdir -p /app/uploads && chown -R nestjs:nodejs /app/uploads

# Cambiar a usuario no-root
USER nestjs

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Exponer puerto (Render usa PORT dinámico)
EXPOSE $PORT

# Comando de inicio
CMD ["node", "dist/main.js"]

# Etapa 1: Construcción (build)
FROM node:20-alpine AS builder

# Instalar pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar todas las dependencias para el build
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Compilar aplicación
RUN pnpm run build

# Etapa 2: Producción
FROM node:20-alpine AS production

# Instalar pnpm y utilidades necesarias
RUN npm install -g pnpm && \
    apk add --no-cache wget

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

WORKDIR /app

# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml ./

# Instalar solo dependencias de producción (sin ejecutar scripts de prepare/postinstall)
ENV HUSKY=0
ENV CI=true
RUN pnpm install --prod --frozen-lockfile --ignore-scripts && \
    pnpm store prune && \
    rm -rf ~/.pnpm-store

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

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/health || exit 1

# Comando de inicio
CMD ["node", "dist/src/main.js"]

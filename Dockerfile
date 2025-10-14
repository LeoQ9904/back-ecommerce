# Etapa 1: Build de la aplicación
FROM node:20-alpine AS builder

WORKDIR /app

# Habilitar Corepack y fijar la versión de pnpm ANTES de instalar dependencias
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

# Copiar archivos base
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias (sin frozen-lockfile para evitar conflictos en Render)
RUN pnpm install --no-frozen-lockfile

# Copiar el resto del código y compilar
COPY . .
RUN pnpm run build


# Etapa 2: Imagen final de producción
FROM node:20-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

# Habilitar Corepack y fijar la versión de pnpm también aquí
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

# Copiar archivos necesarios
COPY package.json pnpm-lock.yaml ./

# Instalar solo dependencias de producción (sin frozen-lockfile)
RUN pnpm install --prod --no-frozen-lockfile --ignore-scripts && \
    pnpm store prune && \
    rm -rf ~/.pnpm-store

# Copiar build desde el builder
COPY --from=builder /app/dist ./dist

# Exponer el puerto configurado
EXPOSE 3000

CMD ["node", "dist/main.js"]

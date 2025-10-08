# Etapa 1: Construcción (build)
# Usa una imagen base completa para compilar la aplicación.
FROM node:20-alpine AS builder

WORKDIR /app

# Copia los archivos de configuración de dependencias para aprovechar el caché.
COPY package*.json ./
# Instala todas las dependencias, incluyendo las de desarrollo, para la compilación.
RUN npm install

# Copia el código fuente.
COPY . .

# Ejecuta el comando de compilación de NestJS.
RUN npm run build

# Etapa 2: Producción (production)
# Usa una imagen base ligera para el contenedor final.
FROM node:20-alpine AS production

WORKDIR /app

# Solo copia las dependencias de producción.
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

# Copia los archivos compilados desde la etapa de construcción.
COPY --from=builder /app/dist ./dist

# Configura la aplicación para producción.
ENV NODE_ENV production

# Indica el puerto de la aplicación.
EXPOSE 3000

# Comando para iniciar la aplicación en producción.
CMD ["node", "dist/main.js"]

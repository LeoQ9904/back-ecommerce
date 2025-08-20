# Imagen base con Node
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app
# Copiar package.json e instalar dependencias

COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando por defecto
CMD ["node", "dist/main.js"]

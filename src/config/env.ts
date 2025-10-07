export const env = {
    PORT: process.env.PORT ?? 3000,
    MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://mongodb:27017/ecommerce',
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    NAME_APPLICATION: process.env.NAME_APPLICATION ?? 'Nombre aplicación',
    DESCRIPTION_APPLICATION: process.env.DESCRIPTION_APPLICATION ?? 'Descripción de la aplicación',
    DOMINIO_API: process.env.DOMINIO_API ?? 'http://localhost:3000',
} as const;

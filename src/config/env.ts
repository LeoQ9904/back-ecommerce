export const env = {
    PORT: Number(process.env.PORT) || 3000,
    MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://mongodb:27017/ecommerce',
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    NAME_APPLICATION: process.env.NAME_APPLICATION ?? 'Back E-commerce API',
    DESCRIPTION_APPLICATION:
        process.env.DESCRIPTION_APPLICATION ?? 'API REST para sistema de e-commerce',
    DOMINIO_API: process.env.DOMINIO_API ?? 'http://localhost:3000',

    // JWT Configuration
    JWT_SECRET: process.env.JWT_SECRET ?? 'your-secret-key-here',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '24h',

    // Pagination defaults
    DEFAULT_PAGE_SIZE: Number(process.env.DEFAULT_PAGE_SIZE) || 10,
    MAX_PAGE_SIZE: Number(process.env.MAX_PAGE_SIZE) || 100,

    // File upload configuration
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE ?? '5MB',
    UPLOAD_PATH: process.env.UPLOAD_PATH ?? './uploads',
} as const;

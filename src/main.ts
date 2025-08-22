import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    // Configurar validación global
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    );

    // Configurar CORS
    app.enableCors();

    // Configuración de Swagger
    const config = new DocumentBuilder()
        .setTitle('E-commerce API')
        .setDescription('API para sistema de e-commerce')
        .setVersion('1.0')
        .addTag('Products', 'Gestión de productos')
        .addTag('Auth', 'Autenticación y autorización')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
            'JWT-auth'
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
        customSiteTitle: 'E-commerce API Documentation',
        customfavIcon: '/favicon.ico',
        customCss: '.swagger-ui .topbar { display: none }',
    });

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Aplicación ejecutándose en puerto ${port}`);
    console.log(`📚 Documentación Swagger disponible en: http://localhost:${port}/api/docs`);
}
void bootstrap();

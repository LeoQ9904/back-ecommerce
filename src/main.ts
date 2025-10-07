import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from './config/env';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Servir archivos estáticos
    app.useStaticAssets('uploads', {
        prefix: '/uploads/',
    });

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
        .setTitle(env.NAME_APPLICATION)
        .setDescription(env.DESCRIPTION_APPLICATION)
        .setVersion('1.0')
        .addTag('Categories', 'Gestión de categorías de la tienda')
        .addTag('Products', 'Gestión de productos')
        .addTag('Carts', 'Gestión de carritos de compra')
        .addTag('Uploads', 'Cargar imágenes al sistema')
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
        customSiteTitle: `${env.NAME_APPLICATION} Documentation`,
        customfavIcon: '/favicon.ico',
        customCss: '.swagger-ui .topbar { display: none }',
    });

    await app.listen(env.PORT);
}
void bootstrap();

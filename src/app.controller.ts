import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('App')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener mensaje de bienvenida' })
    @ApiResponse({ status: 200, description: 'Mensaje de bienvenida' })
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('health')
    @ApiOperation({ summary: 'Verificar estado de la aplicación' })
    @ApiResponse({ status: 200, description: 'La aplicación está funcionando correctamente' })
    healthCheck(): { status: string; timestamp: string; uptime: number } {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        };
    }
}

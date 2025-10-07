import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        const response = context.switchToHttp().getResponse<Response>();

        return next.handle().pipe(
            map((data: T) => ({
                data,
                status: response.statusCode,
                success: response.statusCode < 400,
                message: response.statusCode < 400 ? 'Success' : 'Error',
            }))
        );
    }
}

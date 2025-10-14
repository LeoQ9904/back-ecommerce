import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CartDocument } from '../../carts/schema/cart.schema';
import { env } from '../../config/env';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    private readonly transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: env.SMTP_HOST,
            port: env.SMTP_PORT,
            secure: false,
            auth: {
                user: env.SMTP_USER,
                pass: env.SMTP_PASS,
            },
        });
    }

    async sendCartConfirmation(userEmail: string, cartData: CartDocument): Promise<void> {
        try {
            const mailOptions = {
                from: env.FROM_EMAIL,
                to: userEmail,
                subject: 'Confirmación de order - Pedido Creado',
                html: this.generateCartConfirmationTemplate(cartData),
            };

            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Correo de confirmación enviado a: ${userEmail}`);
        } catch (error) {
            this.logger.error(`Error enviando correo a ${userEmail}:`, error);
            throw error;
        }
    }

    private formatCurrency(amount: number): string {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
        }).format(amount);
    }

    private generateCartConfirmationTemplate(cartData: CartDocument): string {
        const itemsHtml = cartData.items
            .map(
                item => `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">
                        ${item.product.name}
                    </td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
                        ${item.quantity} x ${item.product.unit}
                    </td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
                        ${this.formatCurrency(item.product.price * item.quantity)}
                    </td>
                </tr>
            `
            )
            .join('');

        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">¡Orden creada exitosamente!</h2>
                <p>Tu orden ha sido creada con el número de orden: <strong>#${cartData.numberOrder}</strong></p>

                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <thead>
                        <tr style="background-color: #f5f5f5;">
                            <th style="padding: 10px; text-align: left;">Producto</th>
                            <th style="padding: 10px; text-align: center;">Cantidad</th>
                            <th style="padding: 10px; text-align: right;">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>

                <div style="text-align: right; margin: 20px 0;">
                    <p style="font-size: 18px; font-weight: bold;">
                        Total: ${this.formatCurrency(cartData.totalPrice)}
                    </p>
                </div>

                <p style="color: #666; font-size: 14px;">
                    Gracias por tu compra. Te notificaremos sobre el estado de tu pedido.
                </p>
            </div>
        `;
    }
}

# Configuración de Correo Electrónico

## Variables de Entorno Requeridas

Agrega las siguientes variables a tu archivo `.env`:

```env
# Email configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña-de-aplicación
FROM_EMAIL=noreply@tudominio.com
```

## Configuración para Gmail

1. Habilita la verificación en 2 pasos en tu cuenta de Gmail
2. Genera una contraseña de aplicación:
    - Ve a tu cuenta de Google
    - Seguridad → Verificación en 2 pasos → Contraseñas de aplicaciones
    - Genera una nueva contraseña para "Correo"
    - Usa esta contraseña en `SMTP_PASS`

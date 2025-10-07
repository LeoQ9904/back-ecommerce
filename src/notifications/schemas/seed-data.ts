import { NotificationStatus } from './notification.schema';

export const defaultNotifications = [
    {
        title: '¡Bienvenido a nuestra tienda!',
        description:
            'Descubre nuestros productos de calidad y ofertas especiales. Tu satisfacción es nuestra prioridad.',
        backgroundImage:
            'https://boostify-nesst.myshopify.com/cdn/shop/files/banner-1.png?crop=center&height=631&v=1659435495&width=1076',
        status: NotificationStatus.ACTIVE,
        isVisible: true,
        priority: 10,
    },
    {
        title: 'Productos de alta calidad',
        description:
            'Aprovecha esta oferta especial en toda la categoría de electrónicos. Válido hasta fin de mes.',
        backgroundImage:
            'https://boostify-nesst.myshopify.com/cdn/shop/files/banner-2.png?crop=center&height=631&v=1659491181&width=1076',
        status: NotificationStatus.ACTIVE,
        isVisible: true,
        priority: 8,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
    },
    {
        title: 'Tenemos un gran surtido para la canasta familiar',
        description:
            'Envío gratis en compras superiores a $500. Promoción válida por tiempo limitado.',
        backgroundImage:
            'https://boostify-nesst.myshopify.com/cdn/shop/files/banner-3.png?crop=center&height=631&v=1659491181&width=1076',
        status: NotificationStatus.ACTIVE,
        isVisible: true,
        priority: 7,
        expirationDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 días
    },
];

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProductsService } from '../products/products.service';

async function seedProducts() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const productsService = app.get(ProductsService);

    const sampleProducts = [
        {
            name: 'iPhone 15 Pro',
            description: 'Smartphone Apple con chip A17 Pro, pantalla de 6.1 pulgadas y cámaras profesionales',
            price: 1199.99,
            stock: 25,
            category: 'Electronics',
            brand: 'Apple',
            weight: 187,
            tags: ['smartphone', 'apple', 'premium', 'pro'],
            rating: 4.8,
            reviewCount: 156,
            imageUrl: 'https://example.com/iphone15pro.jpg'
        },
        {
            name: 'Samsung Galaxy S24 Ultra',
            description: 'Smartphone Samsung con S Pen, pantalla de 6.8 pulgadas y zoom 100x',
            price: 1299.99,
            stock: 20,
            category: 'Electronics',
            brand: 'Samsung',
            weight: 232,
            tags: ['smartphone', 'samsung', 'ultra', 's-pen'],
            rating: 4.7,
            reviewCount: 89,
            imageUrl: 'https://example.com/galaxys24ultra.jpg'
        },
        {
            name: 'MacBook Air M3',
            description: 'Laptop Apple con chip M3, pantalla de 13 pulgadas y hasta 18 horas de batería',
            price: 1099.99,
            stock: 15,
            category: 'Electronics',
            brand: 'Apple',
            weight: 1240,
            tags: ['laptop', 'apple', 'macbook', 'm3'],
            rating: 4.9,
            reviewCount: 234,
            imageUrl: 'https://example.com/macbookair.jpg'
        },
        {
            name: 'Nike Air Max 90',
            description: 'Zapatillas deportivas clásicas con amortiguación Air Max y diseño icónico',
            price: 120.00,
            stock: 50,
            category: 'Footwear',
            brand: 'Nike',
            weight: 450,
            tags: ['zapatillas', 'nike', 'air-max', 'deportivas'],
            rating: 4.5,
            reviewCount: 312,
            imageUrl: 'https://example.com/airmax90.jpg'
        },
        {
            name: 'Adidas Ultraboost 22',
            description: 'Zapatillas de running con tecnología Boost y upper Primeknit',
            price: 180.00,
            stock: 30,
            category: 'Footwear',
            brand: 'Adidas',
            weight: 320,
            tags: ['zapatillas', 'adidas', 'running', 'boost'],
            rating: 4.6,
            reviewCount: 198,
            imageUrl: 'https://example.com/ultraboost.jpg'
        },
        {
            name: 'Levi\'s 501 Original',
            description: 'Jeans clásicos de corte recto, 100% algodón y fit original',
            price: 89.99,
            stock: 40,
            category: 'Clothing',
            brand: 'Levi\'s',
            weight: 600,
            tags: ['jeans', 'levis', 'denim', 'clasico'],
            rating: 4.4,
            reviewCount: 445,
            imageUrl: 'https://example.com/levis501.jpg'
        },
        {
            name: 'Sony WH-1000XM5',
            description: 'Auriculares inalámbricos con cancelación de ruido líder en la industria',
            price: 399.99,
            stock: 35,
            category: 'Electronics',
            brand: 'Sony',
            weight: 250,
            tags: ['auriculares', 'sony', 'noise-cancelling', 'wireless'],
            rating: 4.8,
            reviewCount: 167,
            imageUrl: 'https://example.com/sonywh1000xm5.jpg'
        },
        {
            name: 'The Lord of the Rings',
            description: 'Trilogía completa de El Señor de los Anillos de J.R.R. Tolkien',
            price: 45.99,
            stock: 60,
            category: 'Books',
            brand: 'HarperCollins',
            weight: 1200,
            tags: ['libro', 'fantasia', 'tolkien', 'clasico'],
            rating: 4.9,
            reviewCount: 1024,
            imageUrl: 'https://example.com/lotr.jpg'
        },
        {
            name: 'Nintendo Switch OLED',
            description: 'Consola híbrida con pantalla OLED de 7 pulgadas y dock mejorado',
            price: 349.99,
            stock: 25,
            category: 'Electronics',
            brand: 'Nintendo',
            weight: 420,
            tags: ['consola', 'nintendo', 'gaming', 'oled'],
            rating: 4.7,
            reviewCount: 89,
            imageUrl: 'https://example.com/switcholed.jpg'
        },
        {
            name: 'Dyson V15 Detect',
            description: 'Aspiradora inalámbrica con tecnología de detección láser',
            price: 749.99,
            stock: 12,
            category: 'Home & Garden',
            brand: 'Dyson',
            weight: 3100,
            tags: ['aspiradora', 'dyson', 'inalambrica', 'laser'],
            rating: 4.6,
            reviewCount: 78,
            imageUrl: 'https://example.com/dysonv15.jpg'
        }
    ];

    console.log('🌱 Iniciando seed de productos...');

    for (const productData of sampleProducts) {
        try {
            const product = await productsService.create(productData);
            console.log(`✅ Producto creado: ${product.name} (SKU: ${product.sku})`);
        } catch (error) {
            console.error(`❌ Error creando producto ${productData.name}:`, error.message);
        }
    }

    console.log('🎉 Seed completado!');
    
    // Mostrar estadísticas
    const stats = await productsService.getStatistics();
    console.log('\n📊 Estadísticas:');
    console.log(`Total de productos: ${stats.totalProducts}`);
    console.log(`Valor total del inventario: $${stats.totalValue.toFixed(2)}`);
    console.log(`Precio promedio: $${stats.averagePrice.toFixed(2)}`);
    console.log(`Categorías: ${stats.categories}`);

    await app.close();
}

seedProducts().catch(console.error);

const dataPrincipalCategories = [
    {
        name: 'Todos',
        description: 'Todos productos frescos del campo',
        isActive: true,
    },
    {
        name: 'Frutas y Verduras',
        description: 'Productos frescos del campo',
        isActive: true,
    },
    {
        name: 'Granos y Cereales',
        description: 'Cereales, legumbres y granos básicos',
        isActive: true,
    },
    {
        name: 'Proteínas',
        description: 'Carnes, aves, pescados y huevos',
        isActive: true,
    },
    {
        name: 'Lácteos y Derivados',
        description: 'Leche, quesos, yogurt y derivados lácteos',
        isActive: true,
    },
    {
        name: 'Panadería y Pastelería',
        description: 'Pan fresco, pasteles y productos de panadería',
        isActive: true,
    },
    {
        name: 'Despensa y Abarrotes',
        description: 'Productos básicos para la despensa',
        isActive: true,
    },
    {
        name: 'Bebidas',
        description: 'Jugos, gaseosas, agua y bebidas variadas',
        isActive: true,
    },
    {
        name: 'Productos Orgánicos y Agroecológicos',
        description: 'Productos cultivados de forma orgánica',
        isActive: true,
    },
    {
        name: 'Productos de Limpieza y Hogar',
        description: 'Artículos de limpieza y cuidado del hogar',
        isActive: true,
    },
    {
        name: 'Cuidado Personal',
        description: 'Productos de higiene y cuidado personal',
        isActive: true,
    },
    {
        name: 'Flores y Plantas',
        description: 'Flores de corte y plantas ornamentales',
        isActive: true,
    },
];

const dataSubCategories = [
    // Frutas y Verduras
    {
        name: 'Frutas Frescas',
        description: 'Frutas frescas de temporada',
        isActive: true,
        parentId: 'Frutas y Verduras',
    },
    {
        name: 'Tropicales',
        description: 'Mango, piña, papaya',
        isActive: true,
        parentId: 'Frutas y Verduras',
    },
    {
        name: 'Cítricos',
        description: 'Naranja, limón, mandarina',
        isActive: true,
        parentId: 'Frutas y Verduras',
    },
    {
        name: 'De temporada',
        description: 'Uva, manzana, pera, durazno',
        isActive: true,
        parentId: 'Frutas y Verduras',
    },
    {
        name: 'Verduras Frescas',
        description: 'Verduras y hortalizas frescas',
        isActive: true,
        parentId: 'Frutas y Verduras',
    },
    {
        name: 'De hoja',
        description: 'Espinaca, lechuga, acelga, repollo',
        isActive: true,
        parentId: 'Frutas y Verduras',
    },
    {
        name: 'Raíces y tubérculos',
        description: 'Papa, yuca, zanahoria, remolacha',
        isActive: true,
        parentId: 'Frutas y Verduras',
    },
    {
        name: 'Hortalizas',
        description: 'Pepino, tomate, cebolla, pimentón',
        isActive: true,
        parentId: 'Frutas y Verduras',
    },
    {
        name: 'Aromáticas',
        description: 'Cilantro, perejil, hierbabuena',
        isActive: true,
        parentId: 'Frutas y Verduras',
    },

    // Granos y Cereales
    {
        name: 'Arroz',
        description: 'Diferentes tipos de arroz',
        isActive: true,
        parentId: 'Granos y Cereales',
    },
    {
        name: 'Maíz y derivados',
        description: 'Arepas, harinas de maíz',
        isActive: true,
        parentId: 'Granos y Cereales',
    },
    {
        name: 'Fríjoles y lentejas',
        description: 'Leguminosas básicas',
        isActive: true,
        parentId: 'Granos y Cereales',
    },
    {
        name: 'Garbanzos y otras leguminosas',
        description: 'Variedad de legumbres',
        isActive: true,
        parentId: 'Granos y Cereales',
    },
    {
        name: 'Avena, cebada y otros cereales',
        description: 'Cereales integrales',
        isActive: true,
        parentId: 'Granos y Cereales',
    },

    // Proteínas
    {
        name: 'Carnes Rojas',
        description: 'Res, cerdo, cordero',
        isActive: true,
        parentId: 'Proteínas',
    },
    {
        name: 'Aves',
        description: 'Pollo, pavo, gallina campesina',
        isActive: true,
        parentId: 'Proteínas',
    },
    {
        name: 'Pescados y Mariscos',
        description: 'Productos del mar frescos',
        isActive: true,
        parentId: 'Proteínas',
    },
    {
        name: 'Huevos',
        description: 'Orgánicos, criollos, comerciales',
        isActive: true,
        parentId: 'Proteínas',
    },

    // Lácteos y Derivados
    {
        name: 'Leche',
        description: 'Entera, deslactosada, vegetal',
        isActive: true,
        parentId: 'Lácteos y Derivados',
    },
    {
        name: 'Quesos',
        description: 'Fresco, campesino, mozzarella, doble crema',
        isActive: true,
        parentId: 'Lácteos y Derivados',
    },
    {
        name: 'Yogurt y kumis',
        description: 'Productos lácteos fermentados',
        isActive: true,
        parentId: 'Lácteos y Derivados',
    },
    {
        name: 'Mantequilla y crema',
        description: 'Grasas lácteas',
        isActive: true,
        parentId: 'Lácteos y Derivados',
    },

    // Panadería y Pastelería
    {
        name: 'Pan fresco',
        description: 'Integral, blanco, artesanal',
        isActive: true,
        parentId: 'Panadería y Pastelería',
    },
    {
        name: 'Tortillas, arepas y masas',
        description: 'Masas frescas',
        isActive: true,
        parentId: 'Panadería y Pastelería',
    },
    {
        name: 'Pasteles y galletas',
        description: 'Productos dulces',
        isActive: true,
        parentId: 'Panadería y Pastelería',
    },
    {
        name: 'Bizcochos y repostería artesanal',
        description: 'Repostería casera',
        isActive: true,
        parentId: 'Panadería y Pastelería',
    },

    // Despensa y Abarrotes
    {
        name: 'Aceites y grasas',
        description: 'Girasol, oliva, manteca, ghee',
        isActive: true,
        parentId: 'Despensa y Abarrotes',
    },
    {
        name: 'Azúcares y endulzantes',
        description: 'Panela, miel, stevia',
        isActive: true,
        parentId: 'Despensa y Abarrotes',
    },
    {
        name: 'Café, té e infusiones',
        description: 'Bebidas calientes',
        isActive: true,
        parentId: 'Despensa y Abarrotes',
    },
    {
        name: 'Salsas, aderezos y condimentos',
        description: 'Condimentos y especias',
        isActive: true,
        parentId: 'Despensa y Abarrotes',
    },
    {
        name: 'Enlatados y conservas',
        description: 'Productos en conserva',
        isActive: true,
        parentId: 'Despensa y Abarrotes',
    },

    // Bebidas
    {
        name: 'Jugos naturales y néctares',
        description: 'Bebidas de frutas',
        isActive: true,
        parentId: 'Bebidas',
    },
    {
        name: 'Gaseosas y refrescos',
        description: 'Bebidas carbonatadas',
        isActive: true,
        parentId: 'Bebidas',
    },
    {
        name: 'Agua',
        description: 'Con/sin gas',
        isActive: true,
        parentId: 'Bebidas',
    },
    {
        name: 'Bebidas energéticas',
        description: 'Bebidas deportivas',
        isActive: true,
        parentId: 'Bebidas',
    },
    {
        name: 'Bebidas alcohólicas',
        description: 'Cervezas artesanales, vinos, licores locales',
        isActive: true,
        parentId: 'Bebidas',
    },

    // Productos Orgánicos y Agroecológicos
    {
        name: 'Frutas y verduras orgánicas',
        description: 'Productos orgánicos frescos',
        isActive: true,
        parentId: 'Productos Orgánicos y Agroecológicos',
    },
    {
        name: 'Granos y semillas integrales',
        description: 'Cereales orgánicos',
        isActive: true,
        parentId: 'Productos Orgánicos y Agroecológicos',
    },
    {
        name: 'Lácteos orgánicos',
        description: 'Productos lácteos orgánicos',
        isActive: true,
        parentId: 'Productos Orgánicos y Agroecológicos',
    },
    {
        name: 'Café especial y cacao fino',
        description: 'Productos premium',
        isActive: true,
        parentId: 'Productos Orgánicos y Agroecológicos',
    },

    // Productos de Limpieza y Hogar
    {
        name: 'Detergentes y jabones',
        description: 'Productos de limpieza básicos',
        isActive: true,
        parentId: 'Productos de Limpieza y Hogar',
    },
    {
        name: 'Desinfectantes',
        description: 'Productos desinfectantes',
        isActive: true,
        parentId: 'Productos de Limpieza y Hogar',
    },
    {
        name: 'Utensilios básicos de aseo',
        description: 'Herramientas de limpieza',
        isActive: true,
        parentId: 'Productos de Limpieza y Hogar',
    },
    {
        name: 'Papel higiénico y servilletas',
        description: 'Productos de papel',
        isActive: true,
        parentId: 'Productos de Limpieza y Hogar',
    },

    // Cuidado Personal
    {
        name: 'Higiene oral',
        description: 'Cepillos, pasta dental',
        isActive: true,
        parentId: 'Cuidado Personal',
    },
    {
        name: 'Jabones y geles',
        description: 'Productos de baño',
        isActive: true,
        parentId: 'Cuidado Personal',
    },
    {
        name: 'Champús y acondicionadores',
        description: 'Cuidado capilar',
        isActive: true,
        parentId: 'Cuidado Personal',
    },
    {
        name: 'Cuidado de la piel',
        description: 'Cremas y lociones',
        isActive: true,
        parentId: 'Cuidado Personal',
    },

    // Flores y Plantas
    {
        name: 'Flores de corte',
        description: 'Rosas, girasoles, claveles',
        isActive: true,
        parentId: 'Flores y Plantas',
    },
    {
        name: 'Plantas ornamentales',
        description: 'Plantas decorativas',
        isActive: true,
        parentId: 'Flores y Plantas',
    },
    {
        name: 'Aromáticas y medicinales en maceta',
        description: 'Plantas funcionales',
        isActive: true,
        parentId: 'Flores y Plantas',
    },
];

export { dataPrincipalCategories, dataSubCategories };

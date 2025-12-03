import { db } from './db';
import { Category } from '@prisma/client';

async function main() {
  console.log('Seeding products...');

  const products = [
    {
      name: 'Basket',
      description:
        'A durable handwoven basket crafted from eco-friendly materials, offering excellent storage for household items. Its natural finish blends seamlessly with any décor while providing a stylish and practical solution for organizing personal essentials.',
      image: '/products/basket.jpg',
      price: 50,
      Category: Category.ACCESSORIES,
      tags: ['storage', 'handmade', 'eco-friendly'],
    },
    {
      name: 'Black Chair',
      description:
        'A sleek black chair designed for modern interiors, featuring ergonomic curves and premium cushioning for exceptional comfort. Its sturdy construction and minimalist look make it suitable for dining rooms, workspaces, and contemporary home décor.',
      image: '/products/black-chair.jpg',
      price: 120,
      Category: Category.CHAIRS,
      tags: ['modern', 'ergonomic', 'upholstery'],
    },
    {
      name: 'Black Clock',
      description:
        'A minimalist black clock with a clean, contemporary design that complements any room. Featuring silent quartz movement and easy-to-read hands, it adds both functionality and refined elegance to modern home or office spaces.',
      image: '/products/black-clock.jpg',
      price: 70,
      Category: Category.CLOCKS,
      tags: ['minimalist', 'silent', 'modern'],
    },
    {
      name: 'Cup',
      description:
        'A beautifully crafted ceramic cup designed for both hot and cold beverages. Its smooth texture, comfortable grip, and durable build make it ideal for daily use, whether enjoying morning coffee or evening tea.',
      image: '/products/cup.jpg',
      price: 15,
      Category: Category.ACCESSORIES,
      tags: ['ceramic', 'kitchen', 'drinkware'],
    },
    {
      name: 'Dark Lamp',
      description:
        'A stylish dark-colored lamp that enhances any room with warm, ambient lighting. Its adjustable head allows flexible illumination, while the modern design blends perfectly with bedrooms, living rooms, or professional workspace environments.',
      image: '/products/dark-lamp.jpg',
      price: 80,
      Category: Category.LAMPS,
      tags: ['led', 'ambient', 'adjustable'],
    },
    {
      name: 'Drawer',
      description:
        'A compact wooden drawer unit built for efficient organization and long-lasting use. With smooth-sliding compartments and a clean minimalist design, it fits perfectly in bedrooms, offices, or entryways to keep daily essentials neatly arranged.',
      image: '/products/drawer.jpg',
      price: 150,
      Category: Category.TABLES,
      tags: ['storage', 'wooden'],
    },
    {
      name: 'Golden Clock',
      description:
        'A luxurious golden clock featuring elegant detailing and a polished metallic finish. Its reliable quartz movement ensures accurate timekeeping, while its sophisticated design adds a striking decorative accent to upscale homes and office interiors.',
      image: '/products/golden-clock.jpg',
      price: 200,
      Category: Category.CLOCKS,
      tags: ['luxury', 'gold', 'decor'],
    },
    {
      name: 'Gray Chair',
      description:
        'A comfortable gray chair upholstered in high-quality fabric that resists wear and maintains its shape. Its ergonomic design provides support for long sitting periods, making it an excellent choice for homes, offices, or dining spaces.',
      image: '/products/gray-chair.jpg',
      price: 130,
      Category: Category.CHAIRS,
      tags: ['fabric', 'comfortable', 'modern'],
    },
    {
      name: 'Grey Clock',
      description:
        'A modern grey wall clock featuring silent movement and a sleek minimalist frame. Its contemporary design suits a variety of interiors, offering reliable timekeeping while serving as a refined decorative piece in any living or workspace.',
      image: '/products/grey-clock.jpg',
      price: 75,
      Category: Category.CLOCKS,
      tags: ['wall-clock', 'silent', 'contemporary'],
    },
    {
      name: 'White Chair',
      description:
        'A clean and modern white chair built with durable materials and smooth edges. Its versatile style suits dining rooms, home offices, and study areas while offering comfortable seating with a refreshing, bright aesthetic that elevates any space.',
      image: '/products/white-chair.jpg',
      price: 140,
      Category: Category.CHAIRS,
      tags: ['white', 'minimal', 'dining'],
    },
    {
      name: 'Wooden Table',
      description:
        'A sturdy wooden table featuring a beautiful natural grain finish. Its spacious surface makes it perfect for dining, working, or displaying décor. Crafted with durability in mind, it adds warmth and timeless character to any room.',
      image: '/products/wooden-table.jpg',
      price: 300,
      Category: Category.TABLES,
      tags: ['wooden', 'handcrafted', 'natural'],
    },
    {
      name: 'Lamp',
      description:
        'A minimalist lamp designed to provide gentle ambient lighting, ideal for reading or relaxation. Its adjustable neck ensures directional illumination, while the sleek design blends seamlessly with modern bedrooms, offices, or cozy living spaces.',
      image: '/products/lamp.jpg',
      price: 90,
      Category: Category.LAMPS,
      tags: ['minimalist', 'adjustable'],
    },
    {
      name: 'Table',
      description:
        'A versatile table designed for multiple purposes including work, dining, or décor display. Featuring a smooth surface and durable frame, it blends modern practicality with a clean aesthetic that suits a wide range of interior styles.',
      image: '/products/table.jpg',
      price: 250,
      Category: Category.TABLES,
      tags: ['versatile', 'modern', 'multi-purpose'],
    },
    {
      name: 'Teapot',
      description:
        'A beautifully designed ceramic teapot crafted for tea enthusiasts. It retains heat effectively and pours smoothly, making it perfect for daily brewing. Its elegant shape enhances kitchen décor while delivering a pleasant tea-drinking experience.',
      image: '/products/teapot.jpg',
      price: 60,
      Category: Category.ACCESSORIES,
      tags: ['tea', 'ceramic', 'kitchen'],
    },
    {
      name: 'Vase',
      description:
        'A decorative ceramic vase perfect for fresh flowers, dried arrangements, or standalone display. Its timeless design and smooth finish enhance any room, adding a touch of elegance to living spaces, dining areas, or entryway tables.',
      image: '/products/vase.jpg',
      price: 70,
      Category: Category.ACCESSORIES,
      tags: ['decor', 'ceramic', 'flowers'],
    },
  ];

  for (const product of products) {
    const { ...dataWithoutId } = product;

    await db.product.upsert({
      where: { name: product.name },
      update: dataWithoutId,
      create: product,
    });
  }

  console.log('Products seeded.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

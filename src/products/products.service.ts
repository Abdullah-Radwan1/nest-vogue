import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category as PrismaCategory } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // GET /products
  findAll() {
    return this.prisma.product.findMany();
  }

  // GET /products/:id
  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // GET /products/category?category=TABLES
  categoryProducts(category?: PrismaCategory) {
    if (!category) {
      return this.prisma.product.findMany({
        take: 8,
      });
    }
    return this.prisma.product.findMany({
      where: { Category: category },
      take: 8,
    });
  }

  // GET /products/related?category=Snacks
  relatedProducts(category: PrismaCategory) {
    return this.prisma.product.findMany({
      where: { Category: category },
      take: 4,
    });
  }

  // GET /products/filter?minPrice=&maxPrice=&sort=&categories=&search=
  async filteredProducts(
    minPrice?: number,
    maxPrice?: number,
    sort?: string,
    categories?: string[],
    search?: string,
  ) {
    const where: any = {};

    // Search by term
    if (search) {
      const term = search.toLowerCase();
      where.OR = [
        { name: { contains: term, mode: 'insensitive' } },
        { description: { contains: term, mode: 'insensitive' } },
      ];
    }

    // Price filtering
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    // Category filtering
    if (categories && categories.length > 0) {
      where.Category = { in: categories as PrismaCategory[] };
    }

    // Sorting
    let orderBy: any;
    switch (sort) {
      case 'price-low-high':
        orderBy = { price: 'asc' };
        break;
      case 'price-high-low':
        orderBy = { price: 'desc' };
        break;
      case 'name-a-z':
        orderBy = { name: 'asc' };
        break;
      case 'name-z-a':
        orderBy = { name: 'desc' };
        break;
      default:
        orderBy = { price: 'asc' };
    }

    return this.prisma.product.findMany({
      where,
      orderBy,
    });
  }
}

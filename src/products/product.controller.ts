import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Category as PrismaCategory } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  // GET /products
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET /products/category?category=Snacks
  @Get('category')
  categoryProducts(@Query('category') category?: PrismaCategory) {
    return this.service.categoryProducts(category);
  }

  // GET /products/related?category=Snacks
  @Get('related')
  relatedProducts(@Query('category') category: string) {
    if (!category) {
      // Return proper JSON response with status
      return { message: 'No category provided', products: [] };
    }

    const cat = category.toUpperCase() as PrismaCategory; // تحويل للكيس الصحيح
    return this.service.relatedProducts(cat);
  }

  // GET /products/filter?minPrice=&maxPrice=&sort=&categories=&search=
  @Get('filter')
  filtered(
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('sort') sort?: string,
    @Query('categories') categories?: string,
    @Query('search') search?: string,
  ) {
    return this.service.filteredProducts(
      minPrice ? Number(minPrice) : undefined,
      maxPrice ? Number(maxPrice) : undefined,
      sort,
      categories ? categories.split(',') : undefined,
      search,
    );
  }
  // GET /products/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}

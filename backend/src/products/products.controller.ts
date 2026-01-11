import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product-admin.dto';
// import { AdminAuthGuard } from '../guards/admin-auth.guard'; // Will create this later

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query('brand') brand?: string, @Query('search') search?: string) {
    if (brand) {
      return this.productsService.findByBrand(brand);
    }
    if (search) {
      return this.productsService.searchProducts(search);
    }
    return this.productsService.findAll();
  }

  // Admin endpoint to get all products including drafts
  // @UseGuards(AdminAuthGuard)
  @Get('admin/all')
  async findAllForAdmin() {
    return this.productsService.findAllForAdmin();
  }

  @Get('brands')
  async getAllBrands() {
    return this.productsService.getAllBrands();
  }

  @Get('categories')
  async getAllCategories() {
    return this.productsService.getAllCategories();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findById(Number(id));
  }

  // Admin endpoint to get product including drafts
  // @UseGuards(AdminAuthGuard)
  @Get('admin/:id')
  async findOneForAdmin(@Param('id') id: string) {
    return this.productsService.findByIdForAdmin(Number(id));
  }

  @Get(':id/variants')
  async getProductVariants(@Param('id') id: string) {
    return this.productsService.getProductVariants(Number(id));
  }

  // Admin endpoints
  // @UseGuards(AdminAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @UseGuards(AdminAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(Number(id), updateProductDto);
  }

  // @UseGuards(AdminAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(Number(id));
  }

  // @UseGuards(AdminAuthGuard)
  @Put(':id/publish')
  async publish(@Param('id') id: string) {
    return this.productsService.publish(Number(id));
  }

  // @UseGuards(AdminAuthGuard)
  @Put(':id/unpublish')
  async unpublish(@Param('id') id: string) {
    return this.productsService.unpublish(Number(id));
  }
}